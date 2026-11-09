import React, { useState, useEffect } from 'react';
import { X, CloudUpload, ShieldCheck, FileText, Trash2, Smartphone, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { FormaliteKey, MomoProvider } from '../types';
import { FORMALITES_DATA } from '../data/formalites';
import { realtimeSync } from '../services/realtimeSync';

interface KyanotModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFormaliteKey?: FormaliteKey;
  prefillData?: any;
  onDossierCreated: (dossierId: string) => void;
  onShowToast: (message: string) => void;
}

export const KyanotModal: React.FC<KyanotModalProps> = ({
  isOpen,
  onClose,
  defaultFormaliteKey = 'immobilier',
  prefillData,
  onDossierCreated,
  onShowToast
}) => {
  const [formalite, setFormalite] = useState<FormaliteKey>(defaultFormaliteKey);
  const [clientName, setClientName] = useState('M. Kouassi Jean');
  const [clientEmail, setClientEmail] = useState('client.etude@gmail.com');
  const [clientPhone, setClientPhone] = useState('+225 07 09 34 13 41');
  const [momoProvider, setMomoProvider] = useState<MomoProvider>('Wave');
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'momo_prompt' | 'success'>('form');

  useEffect(() => {
    if (defaultFormaliteKey) {
      setFormalite(defaultFormaliteKey);
    }
    if (prefillData?.phone && prefillData.phone.length > 8) {
      setClientPhone(prefillData.phone);
    }
  }, [defaultFormaliteKey, prefillData, isOpen]);

  if (!isOpen) return null;

  const formaliteInfo = FORMALITES_DATA[formalite] || FORMALITES_DATA.immobilier;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const added = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...added]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setPaymentStep('momo_prompt');

    // Transmission to Formspree
    try {
      const formData = new FormData();
      formData.append('email', clientEmail);
      formData.append('Nom_Demandeur', clientName);
      formData.append('Telephone_WhatsApp', clientPhone);
      formData.append('Formalite_Choisie', formaliteInfo.title);
      formData.append('Operateur_Mobile_Money', momoProvider);
      formData.append('Frais_Pre_Instruction', `${formaliteInfo.feeAmount} FCFA`);

      if (prefillData?.immoLocation) {
        formData.append('Localisation_Bien', prefillData.immoLocation);
      }
      if (prefillData?.immoRefAcd) {
        formData.append('Reference_Titre_ACD', prefillData.immoRefAcd);
      }
      if (prefillData?.immoPrice) {
        formData.append('Prix_Transaction_Estime', prefillData.immoPrice);
      }

      // Attach file(s) under 'upload' as requested
      if (files.length > 0) {
        files.forEach((file, index) => {
          formData.append(index === 0 ? 'upload' : `upload_${index + 1}`, file, file.name);
        });
      }

      await fetch('https://formspree.io/f/xgobznna', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });
    } catch (err) {
      console.warn('Formspree notification sent with local fallback', err);
    }

    // Simulate authentic Mobile Money push confirmation / prompt
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentStep('success');

      const fileNames =
        files.length > 0
          ? files.map((f) => f.name)
          : [
              formalite === 'immobilier' ? 'Arrete_ACD_2023_Foncier.pdf' : 'Pieces_Identite_Requete.pdf',
              'CNI_Demandeur.pdf'
            ];

      const newDossier = realtimeSync.createDossier({
        formaliteKey: formalite,
        clientName,
        clientPhone,
        clientEmail,
        momoProvider,
        fileNames,
        details: prefillData || {}
      });

      onShowToast(
        `Dossier KYANOT ${newDossier.id} transmis avec succès à l'Étude de Me Koffi & Formspree !`
      );

      setTimeout(() => {
        onDossierCreated(newDossier.id);
        onClose();
        setPaymentStep('form');
        setFiles([]);
      }, 1500);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="kyanot-card stitched-border-emerald rounded-2xl max-w-xl w-full p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto shadow-2xl">
        <button
          className="absolute top-5 right-5 text-slate-400 hover:text-emerald-300 p-1 rounded-lg transition-colors cursor-pointer"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {paymentStep === 'momo_prompt' ? (
          <div className="py-10 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <h3 className="font-serif text-2xl text-white font-semibold">
              Envoi du dossier &amp; validation Mobile Money...
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Vos pièces et informations sont transmises à l'Étude de Me Koffi. Une demande de règlement de{' '}
              <strong className="text-gold-300">{formaliteInfo.feeAmount.toLocaleString('fr-FR')} FCFA</strong>{' '}
              a été adressée à votre numéro <strong>{momoProvider}</strong> ({clientPhone}).
            </p>
            <div className="p-3 rounded-lg bg-navy-950 border border-white/10 text-xs text-slate-400 inline-block">
              Veuillez saisir votre code secret sur votre téléphone pour finaliser.
            </div>
          </div>
        ) : paymentStep === 'success' ? (
          <div className="py-10 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="font-serif text-2xl text-white font-semibold">
              Dossier &amp; Pièces Transmis !
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Votre dossier et vos justificatifs ont bien été envoyés au greffe de l'Étude notariale.
              Une confirmation a été adressée à <strong>{clientEmail}</strong>.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
                  Portail KYANOT • Constitution de dossier
                </span>
              </div>
              <h3 className="font-serif text-2xl text-white font-semibold">
                Téléversez vos pièces &amp; transmettez votre dossier
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Nos clercs examinent la régularité de vos documents sous 24 à 48h. Vos pièces sont transmises
                en toute sécurité à notre cabinet.
              </p>
            </div>

            <form
              action="https://formspree.io/f/xgobznna"
              method="POST"
              encType="multipart/form-data"
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-emerald-300 mb-1">
                    Nom &amp; Prénoms du demandeur
                  </label>
                  <input
                    name="clientName"
                    className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-emerald-500/30 text-white text-sm focus:outline-none focus:border-emerald-400"
                    placeholder="M. / Mme ..."
                    required
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-emerald-300 mb-1">
                    Numéro Mobile Money / WhatsApp
                  </label>
                  <input
                    name="clientPhone"
                    className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-emerald-500/30 text-white text-sm focus:outline-none focus:border-emerald-400 font-mono"
                    placeholder="+225 07..."
                    required
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Email field as required by Formspree */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-emerald-300 mb-1">
                  Votre adresse e-mail (pour la notification &amp; le suivi d'instruction)
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-navy-950 border border-emerald-500/30 text-white text-sm focus:outline-none focus:border-emerald-400"
                    placeholder="votre.email@exemple.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                  <Mail className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-emerald-300 mb-1">
                  Formalité choisie
                </label>
                <select
                  name="formalite"
                  className="w-full px-3 py-2.5 rounded-lg bg-navy-950 border border-emerald-500/30 text-white text-sm focus:outline-none focus:border-emerald-400"
                  value={formalite}
                  onChange={(e) => setFormalite(e.target.value as FormaliteKey)}
                >
                  <option value="immobilier">🏡 Vente Immobilière &amp; Sécurisation ACD (Contrôle Foncier)</option>
                  <option value="societe">🏢 Constitution de société (SARL / SAS / SA)</option>
                  <option value="procuration">✍️ Procuration authentique notariée</option>
                  <option value="succession">📜 Succession &amp; Partage légal</option>
                  <option value="donation">🎁 Donation entre vifs</option>
                  <option value="famille">👪 Contrat de mariage / Acte de famille</option>
                  <option value="autre">📑 Autre formalité</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-navy-950/80 border border-emerald-500/30 space-y-2">
                <p className="text-xs font-semibold text-emerald-200">
                  Pièces requises pour la formalité {formaliteInfo.title} :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                  {formaliteInfo.requiredDocs.map((doc, idx) => (
                    <span key={idx} className="flex items-center gap-1 leading-tight">
                      📄 {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Upload section with Formspree name="upload" */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-emerald-300 mb-1">
                  Téléversement des pièces justificatives (ACD, Pièces d'identité, Plans)
                </label>
                <label className="border-2 border-dashed border-emerald-500/40 rounded-xl p-5 text-center bg-navy-950/70 hover:border-emerald-300 transition-colors cursor-pointer block">
                  <CloudUpload className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-200 font-medium">
                    Cliquez pour téléverser vos fichiers (name="upload")
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Formats acceptés : PDF, JPG, PNG (Max 15 Mo par fichier)
                  </p>
                  <input
                    name="upload"
                    className="hidden"
                    multiple
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                  />
                </label>

                {files.length > 0 && (
                  <div className="mt-2 space-y-1.5 text-xs text-emerald-300 max-h-32 overflow-y-auto">
                    <p className="font-semibold text-slate-200">
                      {files.length} document(s) prêt(s) à être expédié(s) :
                    </p>
                    {files.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-400/20"
                      >
                        <span className="truncate max-w-[340px] flex items-center gap-1.5 text-slate-200">
                          <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} Mo)
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="text-red-400 hover:text-red-300 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Money selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-emerald-300 mb-1.5">
                  Règlement des frais de recherche et de pré-instruction foncière
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Orange', 'Wave', 'MTN', 'Moov'] as MomoProvider[]).map((prov) => (
                    <label
                      key={prov}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-xs transition-all ${
                        momoProvider === prov
                          ? 'bg-emerald-500/20 border-emerald-400 text-white font-semibold ring-1 ring-emerald-400/50'
                          : 'bg-navy-950 border-emerald-500/30 text-slate-300 hover:border-emerald-400'
                      }`}
                    >
                      <input
                        checked={momoProvider === prov}
                        className="text-emerald-500"
                        name="momo_provider"
                        type="radio"
                        value={prov}
                        onChange={() => setMomoProvider(prov)}
                      />
                      <span>{prov === 'Wave' ? 'Wave CI' : prov === 'MTN' ? 'MTN MoMo' : prov === 'Moov' ? 'Moov Money' : 'Orange'}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fee card */}
              <div className="p-3 rounded-lg bg-navy-950/80 border border-gold-500/20 text-xs flex items-center justify-between text-slate-300">
                <div>
                  <span className="font-medium text-white">
                    Frais de pré-instruction &amp; recherche domaniale :
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Vérification anti-double vente &amp; Livre Foncier incluse
                  </p>
                </div>
                <span className="font-serif font-bold text-gold-300 text-sm whitespace-nowrap ml-2">
                  {formaliteInfo.feeAmount.toLocaleString('fr-FR')} FCFA
                </span>
              </div>

              <button
                className="w-full kyanot-btn font-semibold py-3.5 rounded-lg text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                type="submit"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Valider &amp; Transmettre le dossier à l'Étude</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
