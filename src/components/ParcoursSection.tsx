import React from 'react';
import { Check, UploadCloud, FileCheck, Award } from 'lucide-react';

export const ParcoursSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 relative border-t border-gold-500/20 bg-navy-900/40" id="parcours">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-gold-400 font-semibold">
            Parcours Notarial en Ligne
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl gold-gradient-text font-semibold">
            Quatre étapes, une seule visite à l'Étude
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            La transmission et l'examen préalable de vos documents se font en ligne. Le rendez-vous en présentiel à notre
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
                Sélectionnez votre acte juridique parmi les domaines proposés (immobilier, société,
                succession, procuration, famille...).
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
                Déposez vos pièces d'identité et documents justificatifs en toute sécurité depuis votre
                smartphone ou votre ordinateur.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs text-emerald-300 gap-1.5 font-medium">
              <UploadCloud className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transmission sécurisée</span>
            </div>
          </div>

          {/* Étape 3 */}
          <div className="luxury-card rounded-2xl p-6 relative border border-gold-500/20 flex flex-col justify-between">
            <div>
              <span className="font-serif text-4xl font-bold text-gold-400 opacity-60">03</span>
              <h4 className="font-serif text-xl text-white font-semibold mt-3 mb-2">Instruction</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Les clercs examinent la conformité légale de vos pièces, effectuent les vérifications
                et rédigent la minute notariale.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs text-gold-300 gap-1.5 font-medium">
              <FileCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Contrôle &amp; Rédaction</span>
            </div>
          </div>

          {/* Étape 4 */}
          <div className="luxury-card rounded-2xl p-6 relative border border-gold-500/20 flex flex-col justify-between">
            <div>
              <span className="font-serif text-4xl font-bold text-emerald-400 opacity-80">04</span>
              <h4 className="font-serif text-xl text-white font-semibold mt-3 mb-2">Signez</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Une fois le dossier approuvé, vous venez à l'Étude d'Abidjan uniquement pour la
                lecture et la signature solennelle.
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
