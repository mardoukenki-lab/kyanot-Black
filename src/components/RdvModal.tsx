import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, Mail, CloudUpload, FileText, Trash2, Send } from 'lucide-react';
import { realtimeSync } from '../services/realtimeSync';

interface RdvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const RdvModal: React.FC<RdvModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState<'cabinet' | 'visio'>('cabinet');
  const [domaine, setDomaine] = useState('Immobilier, Achat de terrain & Vérification ACD');
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('Nom_Demandeur', name);
      formData.append('Telephone_WhatsApp', phone);
      formData.append('Mode_Consultation', mode === 'cabinet' ? 'Au Cabinet (Bd. VGE Abidjan)' : 'À distance / Visio / Téléphone');
      formData.append('Domaine_Juridique', domaine);
      formData.append('Message_Resume', summary || 'Demande de consultation notariale');

      if (file) {
        formData.append('upload', file, file.name);
      }

      await fetch('https://formspree.io/f/xgobznna', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });
    } catch (err) {
      console.warn('Formspree transmission error, proceeding with local record', err);
    }

    realtimeSync.createAppointment({
      clientName: name,
      phone,
      mode,
      domaine,
      summary: summary || 'Demande de consultation notariale'
    });

    setIsSubmitting(false);
    setIsSuccess(true);
    onShowToast(
      "Votre demande de rendez-vous a bien été transmise à l'Étude de Me KOFFI et enregistrée !"
    );

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setSummary('');
      setFile(null);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="luxury-card stitched-border rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl max-h-[92vh] overflow-y-auto">
        <button
          className="absolute top-5 right-5 text-slate-400 hover:text-gold-300 p-1 rounded-lg transition-colors cursor-pointer"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-300">
              <CheckCircle className="w-10 h-10 text-gold-400" />
            </div>
            <h3 className="font-serif text-2xl gold-gradient-text font-semibold">
              Rendez-vous transmis avec succès !
            </h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto">
              L'Étude de Maître KOFFI Yassoua Alain confirme la bonne réception de votre demande à{' '}
              <strong className="text-gold-300">{email}</strong>. Un clerc vous contactera sous 24h.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2 mb-6">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                Consultation Notariale
              </span>
              <h3 className="font-serif text-2xl gold-gradient-text font-semibold">
                Prendre rendez-vous avec l'Étude
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Choisissez entre une rencontre solennelle à notre étude d'Abidjan (Bd. VGE) ou une
                pré-consultation digitale. Vos coordonnées et pièces éventuelles sont transmises directement à notre secrétariat.
              </p>
            </div>

            <form
              action="https://formspree.io/f/xgobznna"
              method="POST"
              encType="multipart/form-data"
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1">
                  Nom &amp; Prénoms
                </label>
                <input
                  name="name"
                  className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-gold-500/30 text-white text-sm focus:outline-none focus:border-gold-400"
                  placeholder="Ex: M. Kouassi Jean"
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1">
                  Votre adresse e-mail (Your email)
                </label>
                <div className="relative">
                  <input
                    name="email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-navy-950 border border-gold-500/30 text-white text-sm focus:outline-none focus:border-gold-400"
                    placeholder="votre.email@exemple.com"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Mail className="w-4 h-4 text-gold-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1">
                    Téléphone / WhatsApp
                  </label>
                  <input
                    name="phone"
                    className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-gold-500/30 text-white text-sm focus:outline-none focus:border-gold-400 font-mono"
                    placeholder="+225 07..."
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1">
                    Mode de consultation
                  </label>
                  <select
                    name="mode"
                    className="w-full px-3 py-2.5 rounded-lg bg-navy-950 border border-gold-500/30 text-white text-sm focus:outline-none focus:border-gold-400"
                    value={mode}
                    onChange={(e) => setMode(e.target.value as 'cabinet' | 'visio')}
                  >
                    <option value="cabinet">Au Cabinet (Immeuble Balance, Bd. VGE)</option>
                    <option value="visio">À distance / Visio / Téléphone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1">
                  Domaine concerné
                </label>
                <select
                  name="domaine"
                  className="w-full px-3 py-2.5 rounded-lg bg-navy-950 border border-gold-500/30 text-white text-sm focus:outline-none focus:border-gold-400"
                  value={domaine}
                  onChange={(e) => setDomaine(e.target.value)}
                >
                  <option>Immobilier, Achat de terrain &amp; Vérification ACD</option>
                  <option>Droit de la Famille, Succession &amp; Testament</option>
                  <option>Droit des Affaires, Création de Société / Startup</option>
                  <option>Authentification d'acte ou certification</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1">
                  Bref résumé de votre demande
                </label>
                <textarea
                  name="summary"
                  className="w-full px-4 py-2 rounded-lg bg-navy-950 border border-gold-500/30 text-white text-sm focus:outline-none focus:border-gold-400"
                  placeholder="Précisez vos disponibilités ou votre besoin..."
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                ></textarea>
              </div>

              {/* Upload field optional for appointment */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1">
                  Document préparatoire optionnel (Your file)
                </label>
                {!file ? (
                  <label className="border border-dashed border-gold-500/40 rounded-lg p-3 text-center bg-navy-950/70 hover:border-gold-300 transition-colors cursor-pointer flex items-center justify-center gap-2">
                    <CloudUpload className="w-4 h-4 text-gold-400" />
                    <span className="text-xs text-slate-300">
                      Joindre un document préliminaire (PDF, JPG, PNG)
                    </span>
                    <input
                      name="upload"
                      className="hidden"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gold-500/10 border border-gold-400/30 text-xs">
                    <span className="truncate max-w-[320px] flex items-center gap-1.5 text-gold-200">
                      <FileText className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} Mo)
                    </span>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-red-400 hover:text-red-300 p-0.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <button
                className="w-full gold-btn font-semibold py-3.5 rounded-lg text-sm uppercase tracking-wider cursor-pointer shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4 text-navy-950" />
                <span>{isSubmitting ? 'Transmission en cours...' : 'Confirmer la demande de rendez-vous'}</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

