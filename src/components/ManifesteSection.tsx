import React from 'react';
import {
  GlobeLock,
  ShieldAlert,
  Rocket,
  Smartphone,
  ArrowRight
} from 'lucide-react';

interface ManifesteSectionProps {
  onOpenKyanot: () => void;
}

export const ManifesteSection: React.FC<ManifesteSectionProps> = ({ onOpenKyanot }) => {
  return (
    <section className="py-16 lg:py-24 relative border-t border-gold-500/15 bg-navy-900/40" id="vision">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête du Manifeste */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold">
            Tradition Notariale &amp; Révolution Numérique
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl gold-gradient-text leading-tight">
            À l'heure d'Internet, tout s'accélère.
            <br />
            Mais seule l'authenticité protège durablement.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Un contrat téléchargé sur le web ou un accord conclu sur les réseaux sociaux ne remplacera
            jamais la sécurité du sceau de l'État. L'Étude de <strong>Me KOFFI Yassoua Alain</strong> jette
            un pont solide entre les générations.
          </p>
        </div>

        {/* Volet : Nouvelle Génération, Entrepreneurs & Diaspora */}
        <div className="max-w-4xl mx-auto">
          <div className="luxury-card stitched-border rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-medium tracking-wider uppercase">
                  Nouvelle Génération, Entrepreneurs &amp; Diaspora
                </span>
                <GlobeLock className="w-8 h-8 text-emerald-400" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white leading-snug">
                À l'ère des faux profils et des arnaques en ligne, KYANOT est votre pare-feu juridique.
              </h3>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Sur Internet, tout semble instantané : on achète un terrain via une annonce Facebook, on
                télécharge des statuts gratuits, on conclut un partenariat WhatsApp. Mais{' '}
                <strong>le virtuel comporte d'immenses pièges</strong> : doubles ventes foncières, faux
                documents, associés fantômes ou contrats sans valeur.
              </p>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Avec KYANOT et l'authentification notariale, ce n'est pas ralentir vos projets : c'est les{' '}
                <strong>blinder juridiquement</strong>. Nous vérifions l'origine exacte des titres
                fonciers (ACD), certifions l'identité réelle des signataires et donnons force exécutoire à
                vos contrats d'affaires, avec la réactivité connectée de votre quotidien.
              </p>

              <ul className="space-y-3 pt-2 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zéro arnaque foncière :</strong> vérification stricte au Livre Foncier et au
                    Ministère avant le moindre versement.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Rocket className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Startups &amp; PME solides :</strong> des statuts sur mesure qui rassurent vos
                    banques et investisseurs internationaux.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pré-étude digitale KYANOT :</strong> téléversez vos pièces, payez par Mobile
                    Money et suivez tout à distance.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gold-500/20 flex items-center justify-between">
              <span className="font-serif italic text-emerald-300 text-sm">
                « La vitesse du digital, la certitude de la Loi. »
              </span>
              <button
                className="text-xs uppercase tracking-wider text-emerald-300 hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
                onClick={onOpenKyanot}
              >
                <span>Lancer sur KYANOT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
