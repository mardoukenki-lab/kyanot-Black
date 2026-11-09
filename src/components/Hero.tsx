import React from 'react';
import { ShieldCheck, Sparkles, FolderCheck, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenKyanotModal: () => void;
  onOpenRdvModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenKyanotModal, onOpenRdvModal }) => {
  return (
    <section className="relative pt-10 pb-16 lg:py-20 overflow-hidden">
      {/* Reflet diagonal lumineux de fond */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Colonne Texte & CTA (7 colonnes) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs uppercase tracking-widest shadow-sm justify-center lg:justify-start">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Officier Public &amp; Ministériel • Abidjan, Côte d'Ivoire</span>
              <span className="text-gold-500">•</span>
              <span className="text-emerald-300 font-semibold">Service Digital KYANOT Inclus</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-300 font-normal">
                Étude de Me KOFFI Yassoua Alain
              </h2>
              <h1 className="font-cinzel text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider gold-gradient-text drop-shadow-sm">
                NOTAIRE
              </h1>
            </div>

            {/* Phrase pivot KYANOT : préparez en ligne, ne venez que pour signer */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-navy-900/80 border border-emerald-500/30 text-left shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-400/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">
                    Innovation de l'Étude — Portail KYANOT
                  </p>
                  <p className="text-white text-base sm:text-lg font-medium leading-snug mt-0.5">
                    Préparez votre dossier en ligne.{' '}
                    <span className="text-gold-300 underline decoration-gold-400/50 underline-offset-4">
                      Ne venez à l'Étude que pour signer.
                    </span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                    Téléversez vos pièces justificatives, payez les frais de pré-instruction par Mobile
                    Money (Orange, Wave, MTN, Moov). Nos clercs qualifient l'acte avant votre venue
                    solennelle.
                  </p>
                </div>
              </div>
            </div>

            {/* Alignement Boutons CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                className="w-full sm:w-auto kyanot-btn font-semibold px-6 py-4 rounded-lg text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                href="#kyanot"
              >
                <FolderCheck className="w-5 h-5 text-emerald-300" />
                <span>Lancer ma formalité en ligne (KYANOT)</span>
              </a>
              <button
                className="w-full sm:w-auto gold-btn font-semibold px-6 py-4 rounded-lg text-sm sm:text-base whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                onClick={onOpenRdvModal}
              >
                <span>Prendre RDV classique</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Indicateurs de réassurance rapide avec KYANOT */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gold-500/20 max-w-xl mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-gold-400 font-cinzel font-bold text-xl sm:text-2xl">100%</p>
                <p className="text-xs text-slate-400">Force probante &amp; authenticité d'État</p>
              </div>
              <div>
                <p className="text-emerald-300 font-cinzel font-bold text-xl sm:text-2xl">0 Visite</p>
                <p className="text-xs text-slate-400">Pré-instruction &amp; dépôt des pièces à distance</p>
              </div>
              <div>
                <p className="text-gold-400 font-cinzel font-bold text-xl sm:text-2xl">1 Seule</p>
                <p className="text-xs text-slate-400">Signature solennelle à l'Étude (Bd. VGE)</p>
              </div>
            </div>
          </div>

          {/* Colonne Visuel 3D Rubik's Cube Notaire Pur (taille réduite et équilibrée) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[360px] aspect-square flex items-center justify-center mx-auto">
              <iframe
                src="/assets/aistudio/rubik_s_cube_3d_ma_tre_koffi_yassoua_alain__1__9088cd99.html"
                title="Rubik's Cube 3D Notaire - Maître KOFFI Yassoua Alain"
                className="w-full h-full border-0 block bg-transparent"
                loading="eager"
                allow="accelerometer; gyroscope"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
