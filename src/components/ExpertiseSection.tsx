import React, { useState } from 'react';
import { Users, Home, Scale, ChevronRight, Check } from 'lucide-react';
import { SERVICES_EXPERTISE } from '../data/formalites';

interface ExpertiseSectionProps {
  onSelectFormalite: (key: string) => void;
  onOpenRdvModal: () => void;
}

type ServiceKey = 'famille' | 'immobilier' | 'affaires';

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({
  onSelectFormalite,
  onOpenRdvModal
}) => {
  const [selectedService, setSelectedService] = useState<ServiceKey | null>('immobilier');

  const handleCardClick = (key: ServiceKey) => {
    setSelectedService(key);
  };

  const handlePrefillKyanot = () => {
    if (selectedService === 'immobilier') {
      onSelectFormalite('immobilier');
    } else if (selectedService === 'affaires') {
      onSelectFormalite('societe');
    } else if (selectedService === 'famille') {
      onSelectFormalite('famille');
    }
    const el = document.getElementById('kyanot');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-16" id="expertise">
      {/* BARRE DES 3 DOMAINES D'EXPERTISE */}
      <div className="luxury-card stitched-border rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gold-500/25 gap-6 md:gap-0">
          {/* Domaine 1 */}
          <div
            className={`flex flex-col items-center text-center px-4 py-2 group cursor-pointer transition-all ${
              selectedService === 'famille' ? 'scale-[1.02]' : ''
            }`}
            onClick={() => handleCardClick('famille')}
          >
            <div
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all mb-4 ${
                selectedService === 'famille'
                  ? 'bg-gold-500/30 border-gold-300 text-gold-200 scale-110 shadow-lg'
                  : 'bg-gold-500/10 border-gold-400/30 text-gold-400 group-hover:scale-110 group-hover:bg-gold-500/20'
              }`}
            >
              <Users className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl gold-gradient-text font-semibold mb-2">
              Droit de la Famille &amp;
              <br />
              Successions
            </h3>
            <p className="text-sm text-slate-300 max-w-xs leading-relaxed">
              Contrats de mariage, donations, testaments, règlements successoraux et préservation de la
              paix familiale.
            </p>
            <span className="mt-3 text-xs text-gold-400 flex items-center gap-1 opacity-80 group-hover:opacity-100 font-medium">
              Préparer via KYANOT <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Domaine 2 */}
          <div
            className={`flex flex-col items-center text-center px-4 pt-6 md:pt-2 py-2 group cursor-pointer transition-all ${
              selectedService === 'immobilier' ? 'scale-[1.02]' : ''
            }`}
            onClick={() => handleCardClick('immobilier')}
          >
            <div
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all mb-4 ${
                selectedService === 'immobilier'
                  ? 'bg-gold-500/30 border-gold-300 text-gold-200 scale-110 shadow-lg'
                  : 'bg-gold-500/10 border-gold-400/30 text-gold-400 group-hover:scale-110 group-hover:bg-gold-500/20'
              }`}
            >
              <Home className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl gold-gradient-text font-semibold mb-2">
              Immobilier &amp;
              <br />
              Patrimoine
            </h3>
            <p className="text-sm text-slate-300 max-w-xs leading-relaxed">
              Sécurisation d'achats de terrains (ACD), ventes immobilières, baux, hypothèques et
              gestion patrimoniale.
            </p>
            <span className="mt-3 text-xs text-gold-400 flex items-center gap-1 opacity-80 group-hover:opacity-100 font-medium">
              Préparer via KYANOT <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Domaine 3 */}
          <div
            className={`flex flex-col items-center text-center px-4 pt-6 md:pt-2 py-2 group cursor-pointer transition-all ${
              selectedService === 'affaires' ? 'scale-[1.02]' : ''
            }`}
            onClick={() => handleCardClick('affaires')}
          >
            <div
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all mb-4 ${
                selectedService === 'affaires'
                  ? 'bg-gold-500/30 border-gold-300 text-gold-200 scale-110 shadow-lg'
                  : 'bg-gold-500/10 border-gold-400/30 text-gold-400 group-hover:scale-110 group-hover:bg-gold-500/20'
              }`}
            >
              <Scale className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl gold-gradient-text font-semibold mb-2">
              Droit des Affaires
              <br />
              &amp; Sociétés
            </h3>
            <p className="text-sm text-slate-300 max-w-xs leading-relaxed">
              Création d'entreprises et startups (OHADA), rédaction de statuts, cessions de parts et
              baux commerciaux.
            </p>
            <span className="mt-3 text-xs text-gold-400 flex items-center gap-1 opacity-80 group-hover:opacity-100 font-medium">
              Préparer via KYANOT <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Zone d'affichage dynamique des détails de service */}
        {selectedService && SERVICES_EXPERTISE[selectedService] && (
          <div className="mt-6 pt-6 border-t border-gold-500/20 bg-navy-950/70 rounded-xl p-5 border border-gold-500/15 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg text-gold-300 font-semibold">
                  {SERVICES_EXPERTISE[selectedService].title}
                </h4>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed max-w-3xl">
                  {SERVICES_EXPERTISE[selectedService].text}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold whitespace-nowrap hover:bg-emerald-500/30 transition-all cursor-pointer"
                  onClick={handlePrefillKyanot}
                >
                  Pré-instruire en ligne
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-semibold whitespace-nowrap hover:bg-gold-500/30 transition-all cursor-pointer"
                  onClick={onOpenRdvModal}
                >
                  RDV Cabinet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
