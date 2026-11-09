import React from 'react';
import { Check, UploadCloud, Smartphone, Award } from 'lucide-react';

export const ParcoursSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 relative border-t border-gold-500/20 bg-navy-900/40" id="parcours">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-gold-400 font-semibold">
            Parcours Client KYANOT
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl gold-gradient-text font-semibold">
            Quatre étapes, une seule visite à l'Étude
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Tout ce qui peut se faire à distance se fait en ligne. Le rendez-vous en présentiel à notre
            cabinet (Bd. VGE, Abidjan) est réservé à la signature solennelle de l'acte authentique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Étape 1 */}
          <div className="luxury-card rounded-2xl p-6 relative border border-gold-500/20 flex flex-col justify-between">
            <div>
              <span className="font-serif text-4xl font-bold text-gold-400 opacity-60">01</span>
              <h4 className="font-serif text-xl text-white font-semibold mt-3 mb-2">Choisissez</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Sélectionnez votre formalité parmi les domaines proposés (immobilier, société,
                succession, procuration...).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs text-gold-300 gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5 text-gold-400" />
              <span>En moins d'1 minute</span>
            </div>
          </div>

          {/* Étape 2 */}
          <div className="luxury-card rounded-2xl p-6 relative border border-gold-500/20 flex flex-col justify-between">
            <div>
              <span className="font-serif text-4xl font-bold text-gold-400 opacity-60">02</span>
              <h4 className="font-serif text-xl text-white font-semibold mt-3 mb-2">Téléversez</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Déposez vos pièces d'identité et documents justificatifs directement depuis votre
                smartphone ou votre ordinateur.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs text-emerald-300 gap-1.5 font-medium">
              <UploadCloud className="w-3.5 h-3.5 text-emerald-400" />
              <span>Coffre fort chiffré</span>
            </div>
          </div>

          {/* Étape 3 */}
          <div className="luxury-card rounded-2xl p-6 relative border border-gold-500/20 flex flex-col justify-between">
            <div>
              <span className="font-serif text-4xl font-bold text-gold-400 opacity-60">03</span>
              <h4 className="font-serif text-xl text-white font-semibold mt-3 mb-2">Réglez</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Payez vos frais de pré-instruction en toute simplicité par Mobile Money (Orange,
                Wave, MTN ou Moov).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs text-gold-300 gap-1.5 font-medium">
              <Smartphone className="w-3.5 h-3.5 text-gold-400" />
              <span>Reçu instantané</span>
            </div>
          </div>

          {/* Étape 4 */}
          <div className="luxury-card rounded-2xl p-6 relative border border-gold-500/20 flex flex-col justify-between">
            <div>
              <span className="font-serif text-4xl font-bold text-emerald-400 opacity-80">04</span>
              <h4 className="font-serif text-xl text-white font-semibold mt-3 mb-2">Signez</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Les clercs instruisent et préparent la minute. Vous venez à l'Étude uniquement pour la
                signature solennelle.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs text-gold-300 gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-gold-400" />
              <span>Acte Authentique revêtu</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
