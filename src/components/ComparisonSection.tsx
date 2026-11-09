import React from 'react';
import { FileWarning, Award } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 border-t border-gold-500/15" id="pourquoi-authentifier">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="luxury-card rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl gold-gradient-text font-semibold">
              Simple document téléchargé sur Internet vs. Acte Authentique Notarié
            </h3>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Pourquoi la signature officielle du Notaire reste irremplaçable pour sécuriser vos
              investissements en Côte d'Ivoire et à l'international.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colonne Risques du Sous-seing privé / Internet */}
            <div className="rounded-xl bg-navy-950/70 border border-red-500/20 p-6 space-y-4 shadow-inner">
              <div className="flex items-center gap-3 text-red-300 font-semibold">
                <FileWarning className="w-6 h-6 text-red-400" />
                <h4 className="font-medium text-base sm:text-lg">
                  Accord sous seing privé ou modèle téléchargé
                </h4>
              </div>

              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>
                    <strong>Date et identité contestables :</strong> une partie peut nier sa signature
                    ou prétendre ne pas avoir compris son engagement.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>
                    <strong>Inefficace pour l'immobilier :</strong> en Côte d'Ivoire, toute transaction
                    foncière non passée devant Notaire est frappée de nullité absolue.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>
                    <strong>Risque de perte irrémédiable :</strong> si l'original papier ou le fichier
                    PDF est perdu, détruit ou piraté, vous perdez votre droit.
                  </span>
                </li>
              </ul>
            </div>

            {/* Colonne Force de l'Acte Notarié */}
            <div className="rounded-xl bg-gold-500/10 border border-gold-400/40 p-6 space-y-4 shadow-lg">
              <div className="flex items-center gap-3 text-gold-300 font-semibold">
                <Award className="w-6 h-6 text-gold-400" />
                <h4 className="font-medium text-base sm:text-lg">
                  Acte Authentique signé chez Me KOFFI Yassoua Alain
                </h4>
              </div>

              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="text-gold-400 font-bold shrink-0">✓</span>
                  <span>
                    <strong>Force probante maximale :</strong> l'acte fait foi de sa date, de son
                    contenu et de l'identité des signataires devant tous les tribunaux.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-gold-400 font-bold shrink-0">✓</span>
                  <span>
                    <strong>Force exécutoire immédiate :</strong> il a la même valeur qu'un jugement
                    définitif, sans avoir besoin d'engager un procès.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-gold-400 font-bold shrink-0">✓</span>
                  <span>
                    <strong>Archivage officiel garanti :</strong> l'original (la minute) est conservé
                    perpétuellement ; des copies certifiées peuvent vous être délivrées à vie.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
