import React, { useState } from 'react';
import {
  X,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
  RefreshCw,
  FolderOpen,
  ArrowRight
} from 'lucide-react';
import { DossierRecord } from '../types';
import { realtimeSync } from '../services/realtimeSync';

interface ClercBackofficeModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossiers: DossierRecord[];
  activeDossierId: string;
  onSelectDossier: (id: string) => void;
  onShowToast: (message: string) => void;
}

export const ClercBackofficeModal: React.FC<ClercBackofficeModalProps> = ({
  isOpen,
  onClose,
  dossiers,
  activeDossierId,
  onSelectDossier,
  onShowToast
}) => {
  const [selectedId, setSelectedId] = useState(activeDossierId);
  const [clercMessage, setClercMessage] = useState('');

  if (!isOpen) return null;

  const currentDossier = dossiers.find((d) => d.id === selectedId) || dossiers[0];

  const handleAdvance = (stepIdx: number, customMessage?: string) => {
    if (!currentDossier) return;
    const updated = realtimeSync.advanceDossierStep(currentDossier.id, stepIdx, customMessage);
    if (updated) {
      onShowToast(
        `[Action Clerc] Dossier ${currentDossier.id} passé à l'étape ${stepIdx + 1}. Synchronisé en direct !`
      );
    }
  };

  const handleSendClercObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDossier || !clercMessage.trim()) return;
    realtimeSync.addClercNote(
      currentDossier.id,
      'Me Alain KOFFI (Notaire Titulaire)',
      clercMessage.trim(),
      'Observation officielle'
    );
    setClercMessage('');
    onShowToast(`Observation transmise au client du dossier ${currentDossier.id}.`);
  };

  const handleResetDemo = () => {
    realtimeSync.resetToDefaultShowcase();
    onShowToast('Dossiers réinitialisés à la démonstration initiale.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="luxury-card stitched-border rounded-2xl max-w-4xl w-full p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto shadow-2xl">
        <button
          className="absolute top-5 right-5 text-slate-400 hover:text-gold-300 p-1 rounded-lg transition-colors cursor-pointer"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-400"></span>
            <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold">
              Étude de Me KOFFI Yassoua Alain &bull; Espace Clercs &amp; Notaire
            </span>
          </div>
          <h3 className="font-serif text-2xl gold-gradient-text font-semibold">
            Console d'Instruction &amp; Synchronisation Temps Réel
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Cette interface interne permet aux clercs et à Maître Koffi de qualifier les actes, de
            valider les contrôles fonciers (ACD) et d'informer instantanément les clients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Dossier list */}
          <div className="lg:col-span-5 space-y-3 border-r border-gold-500/20 pr-0 lg:pr-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Dossiers en cours ({dossiers.length})
              </span>
              <button
                onClick={handleResetDemo}
                className="text-[11px] text-gold-400 hover:text-gold-200 flex items-center gap-1 cursor-pointer"
                title="Réinitialiser"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Réinitialiser</span>
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {dossiers.map((d) => {
                const isSelected = d.id === currentDossier?.id;
                return (
                  <div
                    key={d.id}
                    onClick={() => {
                      setSelectedId(d.id);
                      onSelectDossier(d.id);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-navy-900 border-gold-400 shadow-md ring-1 ring-gold-400/40'
                        : 'bg-navy-950/70 border-white/10 hover:border-gold-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-gold-300">{d.id}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
                        Étape {d.currentStepIndex + 1}/4
                      </span>
                    </div>
                    <p className="text-xs text-white font-medium mt-1 truncate">{d.clientName}</p>
                    <p className="text-[11px] text-slate-400 truncate">{d.formaliteTitle}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active dossier controls */}
          {currentDossier && (
            <div className="lg:col-span-7 space-y-5">
              <div className="p-4 rounded-xl bg-navy-950/90 border border-gold-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Dossier sélectionné :</span>
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {currentDossier.id}
                  </span>
                </div>
                <h4 className="font-serif text-lg text-white font-semibold">
                  {currentDossier.formaliteTitle}
                </h4>
                <div className="text-xs text-slate-300 grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
                  <div>
                    <span className="text-slate-400">Demandeur :</span>{' '}
                    <strong>{currentDossier.clientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Téléphone :</span>{' '}
                    <strong className="font-mono">{currentDossier.clientPhone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Statut :</span>{' '}
                    <strong className="text-emerald-300">
                      En cours d'instruction
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Documents :</span>{' '}
                    <strong>{currentDossier.documents.length} fichier(s)</strong>
                  </div>
                </div>
              </div>

              {/* Action buttons to advance status live */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gold-300 uppercase tracking-wider block">
                  Actionner la progression en direct :
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() =>
                      handleAdvance(
                        0,
                        'Réception des pièces confirmée. Dossier en cours de vérification documentaire.'
                      )
                    }
                    className="p-2.5 rounded-lg bg-navy-900 border border-white/10 hover:border-gold-400 text-left transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-white block">1. Réception pièces</span>
                    <span className="text-[10px] text-slate-400">Dépôt initial</span>
                  </button>

                  <button
                    onClick={() =>
                      handleAdvance(
                        1,
                        `Dossier validé et pris en charge pour instruction notariale approfondie.`
                      )
                    }
                    className="p-2.5 rounded-lg bg-navy-900 border border-white/10 hover:border-gold-400 text-left transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-white block">2. Dossier recevable</span>
                    <span className="text-[10px] text-slate-400">Contrôle préliminaire</span>
                  </button>

                  <button
                    onClick={() =>
                      handleAdvance(
                        2,
                        'Contrôle foncier achevé au Livre Foncier. ACD certifié conforme, absence de double vente confirmée. Rédaction de la minute en cours.'
                      )
                    }
                    className="p-2.5 rounded-lg bg-navy-900 border border-white/10 hover:border-emerald-400 text-left transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-emerald-300 block">3. Examen clerc &bull; ACD</span>
                    <span className="text-[10px] text-slate-400">Livre foncier vérifié</span>
                  </button>

                  <button
                    onClick={() =>
                      handleAdvance(
                        3,
                        'Minute rédigée et revêtue du visa notarié. Convocation émise pour la signature solennelle à l’Étude (Bd. VGE, Immeuble Balance).'
                      )
                    }
                    className="p-2.5 rounded-lg bg-gold-500/20 border border-gold-400 text-left transition-colors cursor-pointer shadow-md"
                  >
                    <span className="font-semibold text-gold-200 block">4. Prêt pour signature</span>
                    <span className="text-[10px] text-gold-300/80">Convocation cabinet</span>
                  </button>
                </div>
              </div>

              {/* Add clerc note form */}
              <form onSubmit={handleSendClercObservation} className="space-y-2">
                <span className="text-xs font-semibold text-gold-300 uppercase tracking-wider block">
                  Notifier le client en direct (WhatsApp / SMS / Suivi en ligne) :
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: Titre foncier validé auprès de la conservation foncière..."
                    className="flex-1 px-3 py-2.5 rounded-lg bg-navy-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    value={clercMessage}
                    onChange={(e) => setClercMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-lg gold-btn font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Notifier</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Étude de Maître KOFFI Yassoua Alain &bull; Abidjan</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-navy-900 text-slate-200 hover:text-white border border-white/10 cursor-pointer"
          >
            Fermer la console
          </button>
        </div>
      </div>
    </div>
  );
};
