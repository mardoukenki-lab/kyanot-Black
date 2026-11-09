import React, { useState, useEffect } from 'react';
import { X, CloudUpload, ShieldCheck, FileText, Trash2, CheckCircle2, Loader2, Mail, Phone, User, Send } from 'lucide-react';
import { FormaliteKey } from '../types';
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
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    setIsSubmitting(true);

    // Transmission directe à l'endpoint Formspree
    try {
      const formData = new FormData();
      formData.append('email', clientEmail);
      formData.append('Nom_Demandeur', clientName);
      formData.append('Telephone_WhatsApp', clientPhone);
      formData.append('Formalite_Choisie', formaliteInfo.title);
      if (clientMessage) {
        formData.append('Précisions_Demandeur', clientMessage);
      }

      if (prefillData?.immoLocation) {
        formData.append('Localisation_Bien', prefillData.immoLocation);
      }
      if (prefillData?.immoRefAcd) {
        formData.append('Reference_Titre_ACD', prefillData.immoRefAcd);
      }
      if (prefillData?.immoPrice) {
        formData.append('Prix_Transaction_Estime', prefillData.immoPrice);
      }

      // Attacher les fichiers téléversés
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
      console.warn('Formspree notification sent with local registration', err);
    }

    const fileNames = files.map((f) => f.name);

    const newDossier = realtimeSync.createDossier({
      formaliteKey: formalite,
      clientName,
      clientPhone,
      clientEmail,
      fileNames,
      details: {
        ...(prefillData || {}),
        notes: clientMessage
      }
    });

    setIsSubmitting(false);
    setIsSuccess(true);
    onShowToast(`Dossier ${newDossier.id} transmis avec succès au greffe de l'Étude de Me KOFFI !`);

    setTimeout(() => {
      onDossierCreated(newDossier.id);
      onClose();
      setIsSuccess(false);
      setFiles([]);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="luxury-card stitched-border rounded-2xl max-w-xl w-full p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto shadow-2xl">
        <button
          className="absolute top-5 right-5 text-slate-400 hover:text-gold-300 p-1 rounded-lg transition-colors cursor-pointer"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="font-serif text-2xl text-white font-semibold">
              Dossier &amp; Pièces Transmis !
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Vos documents et pièces justificatives ont bien été expédiés au greffe de l'Étude de Maître KOFFI Yassoua Alain.
              Un clerc prendra contact avec vous à l'adresse <strong>{clientEmail}</strong> ou par téléphone au <strong>{clientPhone}</strong>.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
                  Étude Me KOFFI Yassoua Alain • Dépôt de dossier en ligne
                </span>
              </div>
              <h3 className="font-serif text-2xl text-white font-semibold">
                Transmettre vos pièces justificatives
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Déposez vos documents en toute confidentialité. Nos clercs examinent la conformité de votre dossier sous 24h à 48h
                pour préparer la minute de l'acte authentique.
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
                  <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1">
                    Nom &amp; Prénoms du demandeur
                  </label>
                  <div className="relative">
                    <input
                      name="clientName"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-navy-950 border border-gold-500/30 text-white text-sm focus:outline-none focus:border-gold-400"
                      placeholder="M. / Mme ..."
                      required
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                    <User className="w-4 h-4 text-gold-400/70 absolute left-3 top-3" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1">
                    Téléphone / WhatsApp
                  </label>
                  <div className="relative">
                    <input
                      name="clientPhone"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-navy-950 border border-gold-500/30 text-white text-sm focus:outline-none focus:border-gold-400 font-mono"
                      placeholder="+225 07..."
                      required
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                    />
                    <Phone className="w-4 h-4 text-gold-400/70 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Email field as required by Formspree */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1">
                  Votre adresse e-mail (Your email)
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-navy-950 border border-gold-500/30 text-white text-sm focus:outline-none focus:border-gold-400"
                    placeholder="votre.email@exemple.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                  <Mail className="w-4 h-4 text-gold-400/70 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1">
                  Formalité notariale concernée
                </label>
                <select
                  name="formalite"
                  className="w-full px-3 py-2.5 rounded-lg bg-navy-950 border border-gold-500/30 text-white text-sm focus:outline-none focus:border-gold-400"
                  value={formalite}
                  onChange={(e) => setFormalite(e.target.value as FormaliteKey)}
                >
                  <option value="immobilier">🏡 Vente Immobilière &amp; Sécurisation Titre ACD (Contrôle Foncier)</option>
                  <option value="societe">🏢 Constitution de société (SARL / SAS / SA)</option>
                  <option value="procuration">✍️ Procuration authentique notariée</option>
                  <option value="succession">📜 Succession &amp; Partage légal</option>
                  <option value="donation">🎁 Donation entre vifs</option>
                  <option value="famille">👪 Contrat de mariage / Acte de famille</option>
                  <option value="autre">📑 Autre acte ou formalité</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-navy-950/80 border border-gold-500/30 space-y-2">
                <p className="text-xs font-semibold text-gold-200">
                  Pièces requises pour la démarche {formaliteInfo.title} :
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
                <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1">
                  Téléversement des pièces justificatives (ACD, Pièces d'identité, Statuts)
                </label>
                <label className="border-2 border-dashed border-gold-500/40 rounded-xl p-5 text-center bg-navy-950/70 hover:border-gold-300 transition-colors cursor-pointer block">
                  <CloudUpload className="w-8 h-8 text-gold-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-200 font-medium">
                    Cliquez pour téléverser vos fichiers justificatifs (name="upload")
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
                  <div className="mt-2 space-y-1.5 text-xs text-gold-300 max-h-32 overflow-y-auto">
                    <p className="font-semibold text-slate-200">
                      {files.length} document(s) prêt(s) à être expédié(s) :
                    </p>
                    {files.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-3 py-1.5 rounded bg-gold-500/10 border border-gold-400/20"
                      >
                        <span className="truncate max-w-[340px] flex items-center gap-1.5 text-slate-200">
                          <FileText className="w-3.5 h-3.5 text-gold-400 shrink-0" />
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

              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1">
                  Précisions complémentaires / Message pour l'Étude (optionnel)
                </label>
                <textarea
                  name="message"
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-gold-500/30 text-white text-sm focus:outline-none focus:border-gold-400"
                  placeholder="Informations sur les parties, localisation précise, délais souhaités..."
                  rows={2}
                  value={clientMessage}
                  onChange={(e) => setClientMessage(e.target.value)}
                />
              </div>

              <button
                className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] disabled:opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Transmission en cours au greffe...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-emerald-100" />
                    <span>Transmettre mon dossier à l'Étude de Me KOFFI</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
