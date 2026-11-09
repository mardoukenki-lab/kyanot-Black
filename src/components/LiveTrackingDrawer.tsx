import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  Clock,
  FileText,
  Printer,
  ChevronRight,
  Shield,
  ArrowRight,
  Sparkles,
  UserCheck,
  Send,
  ExternalLink
} from 'lucide-react';
import { DossierRecord } from '../types';
import { realtimeSync } from '../services/realtimeSync';

interface LiveTrackingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dossier: DossierRecord | null;
  allDossiers: DossierRecord[];
  onSelectDossier: (id: string) => void;
  onShowToast: (message: string) => void;
}

export const LiveTrackingDrawer: React.FC<LiveTrackingDrawerProps> = ({
  isOpen,
  onClose,
  dossier,
  allDossiers,
  onSelectDossier,
  onShowToast
}) => {
  const [newNoteText, setNewNoteText] = useState('');

  if (!isOpen || !dossier) return null;

  const steps = [
    {
      index: 0,
      title: 'Pièces Justificatives',
      sub: 'Téléversement & Coffre-fort numérique',
      desc: 'Pièces d’identité, titres fonciers ou projets de statuts reçus.'
    },
    {
      index: 1,
      title: 'Vérification Préliminaire',
      sub: 'Instruction & Contrôle de recevabilité',
      desc: `Dossier recevable et pris en charge par le secrétariat général de l'Étude.`
    },
    {
      index: 2,
      title: 'Examen par les Clercs',
      sub: 'Contrôle domanial & conformité',
      desc: 'Réquisitions au Livre Foncier, vérification ACD, rédaction de la minute.'
    },
    {
      index: 3,
      title: 'Signature Solennelle',
      sub: 'À l’Étude de Me Koffi (Bd. VGE)',
      desc: 'Lecture officielle et apposition du Sceau Authentique de la République.'
    }
  ];

  const handleSimulateAdvance = () => {
    const nextStep = (dossier.currentStepIndex + 1) % 4;
    const updated = realtimeSync.advanceDossierStep(dossier.id, nextStep);
    if (updated) {
      onShowToast(
        `[Temps Réel] Étape mise à jour pour ${dossier.id} : Étape ${nextStep + 1} (${steps[nextStep].title}) !`
      );
    }
  };

  const handlePrintAttestation = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) {
      onShowToast("Veuillez autoriser les fenêtres pop-up pour imprimer l'attestation.");
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Récépissé de Dépôt en Ligne - ${dossier.id}</title>
        <style>
          body { font-family: 'Times New Roman', serif; padding: 40px; color: #111; line-height: 1.5; }
          .header { text-align: center; border-bottom: 2px solid #C99B3B; padding-bottom: 20px; margin-bottom: 30px; }
          .title { font-size: 24px; font-weight: bold; text-transform: uppercase; margin: 10px 0; color: #0c1b38; }
          .seal { float: right; width: 100px; height: 100px; border: 2px dashed #C99B3B; border-radius: 50%; text-align: center; line-height: 90px; font-size: 11px; font-weight: bold; color: #AA7C23; }
          .badge { display: inline-block; padding: 4px 10px; background: #e6fffa; border: 1px solid #38b2ac; border-radius: 4px; font-weight: bold; color: #234e52; }
          .section { margin: 20px 0; }
          .field { margin-bottom: 10px; }
          .field strong { display: inline-block; width: 220px; }
          .footer { margin-top: 50px; border-top: 1px solid #ccc; padding-top: 20px; font-size: 12px; text-align: center; color: #555; }
        </style>
      </head>
      <body>
        <div class="seal">SCEAU OFFICIEL</div>
        <div class="header">
          <p style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #AA7C23;">RÉPUBLIQUE DE CÔTE D'IVOIRE &bull; UNION - DISCIPLINE - TRAVAIL</p>
          <div class="title">ÉTUDE DE MAÎTRE KOFFI YASSOUA ALAIN</div>
          <p>Notaire &bull; Bd. VGE – Immeuble Balance (face Solibra) &bull; Abidjan</p>
          <p style="font-weight: bold; margin-top: 15px;">RÉCÉPISSÉ D'ENREGISTREMENT &amp; ATTESTATION PROVISOIRE DE DÉPÔT</p>
        </div>

        <div class="section">
          <div class="field"><strong>Numéro de Dossier :</strong> <span class="badge">${dossier.id}</span></div>
          <div class="field"><strong>Formalité Enregistrée :</strong> ${dossier.formaliteTitle}</div>
          <div class="field"><strong>Demandeur :</strong> ${dossier.clientName}</div>
          <div class="field"><strong>Téléphone de liaison :</strong> ${dossier.clientPhone}</div>
          <div class="field"><strong>Statut instruction :</strong> Pièces transmises pour analyse notariale</div>
          <div class="field"><strong>Date de Dépôt Numérique :</strong> ${new Date(dossier.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
          ${dossier.details.immoRefAcd ? `<div class="field"><strong>Référence Titre / ACD :</strong> ${dossier.details.immoRefAcd}</div>` : ''}
          ${dossier.details.immoLocation ? `<div class="field"><strong>Localisation du Bien :</strong> ${dossier.details.immoLocation}</div>` : ''}
        </div>

        <div class="section" style="background: #fbfbfb; padding: 15px; border-left: 4px solid #C99B3B;">
          <h4 style="margin-top: 0;">Mentions d'authenticité :</h4>
          <p style="font-size: 13px;">Le présent document atteste que le dossier référencé ci-dessus est régulièrement entré au greffe de l'Étude de Maître KOFFI Yassoua Alain via la transmission numérique. La minute de l'acte authentique est en cours d'instruction et fera foi publique une fois revêtue des signatures requises.</p>
        </div>

        <div class="footer">
          Chambre des Notaires de Côte d'Ivoire &bull; 30 B.P. 524 Abidjan 30 &bull; Tél: +225 07 09 34 13 41 &bull; Email: kyanot.etudedemaitrekoffi@gmail.com
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    realtimeSync.addClercNote(
      dossier.id,
      'Client / Mandant',
      newNoteText.trim(),
      'Message usager'
    );
    setNewNoteText('');
    onShowToast('Message transmis à l’Étude en temps réel.');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-navy-950 border-l border-gold-500/30 h-full flex flex-col shadow-2xl overflow-hidden relative">
        {/* Header Drawer */}
        <div className="p-6 border-b border-gold-500/20 bg-navy-900/90 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
                Suivi Synchronisé en Temps Réel
              </span>
            </div>
            <h3 className="font-serif text-2xl text-white font-semibold mt-1">
              Dossier <span className="text-gold-300 font-mono">{dossier.id}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{dossier.formaliteTitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintAttestation}
              className="p-2 rounded-lg bg-navy-800 border border-gold-500/30 text-gold-300 hover:text-white hover:border-gold-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Imprimer l'attestation provisoire"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Récépissé</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Dossier Switcher if multiple */}
        {allDossiers.length > 1 && (
          <div className="px-6 py-2 bg-navy-900/40 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 shrink-0">Changer de dossier :</span>
            {allDossiers.map((d) => (
              <button
                key={d.id}
                onClick={() => onSelectDossier(d.id)}
                className={`px-2.5 py-1 rounded-md shrink-0 font-mono transition-all ${
                  d.id === dossier.id
                    ? 'bg-gold-500/20 text-gold-300 border border-gold-400 font-bold'
                    : 'bg-navy-900 text-slate-300 hover:text-white'
                }`}
              >
                {d.id}
              </button>
            ))}
          </div>
        )}

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status banner with quick simulation button */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-navy-900 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-medium">
                État actuel de l'acte
              </span>
              <p className="text-white font-serif text-lg font-semibold mt-0.5">
                {steps[dossier.currentStepIndex]?.title} &bull;{' '}
                <span className="text-emerald-300 font-normal text-sm">
                  {steps[dossier.currentStepIndex]?.sub}
                </span>
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Demandeur : <strong>{dossier.clientName}</strong> ({dossier.clientPhone})
              </p>
            </div>

            <button
              onClick={handleSimulateAdvance}
              className="px-3.5 py-2 rounded-lg bg-gold-500/20 border border-gold-400/50 text-gold-300 hover:bg-gold-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all self-start sm:self-center cursor-pointer shrink-0"
              title="Permet de tester la progression en temps réel"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Simuler étape suivante</span>
            </button>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-3">
            <h4 className="font-serif text-base text-gold-300 font-semibold flex items-center justify-between">
              <span>Progression de la formalité</span>
              <span className="text-xs text-slate-400 font-normal">
                Étape {dossier.currentStepIndex + 1} sur 4
              </span>
            </h4>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
              {steps.map((st) => {
                const isCompleted = dossier.currentStepIndex > st.index;
                const isCurrent = dossier.currentStepIndex === st.index;

                return (
                  <div key={st.index} className="relative group">
                    <div
                      className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-emerald-400 border-emerald-300 text-navy-950 ring-4 ring-emerald-500/20'
                          : isCurrent
                          ? 'bg-gold-400 border-gold-300 ring-4 ring-gold-500/30 animate-pulse'
                          : 'bg-navy-950 border-white/20'
                      }`}
                    >
                      {isCompleted && <CheckCircle className="w-3 h-3 text-navy-950 font-bold" />}
                    </div>

                    <div
                      className={`p-3.5 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-navy-900 border-gold-400/50 shadow-lg'
                          : isCompleted
                          ? 'bg-navy-900/60 border-emerald-500/30'
                          : 'bg-navy-950/40 border-white/5 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-semibold text-white">
                          {st.index + 1}. {st.title}
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                            isCompleted
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : isCurrent
                              ? 'bg-gold-500/20 text-gold-300'
                              : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          {isCompleted ? 'Complété' : isCurrent ? 'En cours' : 'À venir'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Uploaded Documents List */}
          <div className="space-y-3 pt-2">
            <h4 className="font-serif text-base text-gold-300 font-semibold flex items-center justify-between">
              <span>Documents transmis au Greffe ({dossier.documents.length})</span>
              <span className="text-xs text-emerald-400">Coffre chiffré 256-bit</span>
            </h4>

            <div className="space-y-2">
              {dossier.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-navy-900 border border-gold-500/15 text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate max-w-[340px]">
                    <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200 font-medium truncate">{doc.name}</span>
                    <span className="text-slate-400 shrink-0">({doc.size})</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider shrink-0 ${
                      doc.status === 'conforme'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30'
                        : 'bg-gold-500/15 text-gold-300 border border-gold-400/30'
                    }`}
                  >
                    {doc.status === 'conforme' ? '✓ Conforme' : 'En vérification'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Clerc Notes & Communications */}
          <div className="space-y-3 pt-2">
            <h4 className="font-serif text-base text-gold-300 font-semibold flex items-center justify-between">
              <span>Journal d'instruction &amp; Observations de l'Étude</span>
              <span className="text-xs text-slate-400">Synchronisé en direct</span>
            </h4>

            <div className="space-y-2.5">
              {dossier.timeline.map((note) => (
                <div
                  key={note.id}
                  className="p-3.5 rounded-xl bg-navy-900 border border-white/5 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-gold-400" />
                      {note.author} &bull;{' '}
                      <span className="text-slate-400 font-normal">{note.role}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">{note.timestamp}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{note.message}</p>
                  {note.stageBadge && (
                    <span className="inline-block text-[10px] font-medium text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {note.stageBadge}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Quick message form */}
            <form onSubmit={handleAddNote} className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Ajouter une précision ou question pour le clerc..."
                className="flex-1 px-3 py-2 rounded-lg bg-navy-900 border border-gold-500/20 text-white text-xs focus:outline-none focus:border-gold-400"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Envoyer</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-gold-500/20 bg-navy-900/90 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Dernière synchronisation :{' '}
            <strong className="text-slate-200">
              {new Date(dossier.lastUpdatedAt).toLocaleTimeString('fr-FR')}
            </strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-navy-800 text-slate-200 hover:text-white border border-white/10 cursor-pointer"
          >
            Fermer l'espace suivi
          </button>
        </div>
      </div>
    </div>
  );
};
