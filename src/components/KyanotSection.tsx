import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { FormaliteKey } from '../types';
import { FORMALITES_DATA } from '../data/formalites';

interface KyanotSectionProps {
  selectedFormalite: FormaliteKey;
  onSelectFormalite: (key: FormaliteKey) => void;
  onLaunchKyanotModal: (formaliteKey: FormaliteKey, prefillData?: any) => void;
}

export const KyanotSection: React.FC<KyanotSectionProps> = ({
  selectedFormalite,
  onSelectFormalite,
  onLaunchKyanotModal
}) => {
  const [immoOperationType, setImmoOperationType] = useState('acquisition_acd');
  const [immoLocation, setImmoLocation] = useState('Cocody, Abidjan');
  const [immoRefAcd, setImmoRefAcd] = useState('');
  const [immoPrice, setImmoPrice] = useState('35 000 000 FCFA');
  const [phone, setPhone] = useState('+225 07 ');

  const currentFormaliteInfo = FORMALITES_DATA[selectedFormalite] || FORMALITES_DATA.immobilier;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLaunchKyanotModal(selectedFormalite, {
      immoOperationType,
      immoLocation,
      immoRefAcd,
      immoPrice,
      phone
    });
  };

  const handleCardClick = (key: FormaliteKey) => {
    onSelectFormalite(key);
    // Smooth scroll to form on mobile
    if (window.innerWidth < 1024) {
      const formEl = document.getElementById('kyanotFastForm');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      className="py-16 lg:py-24 relative border-t border-emerald-500/25 bg-gradient-to-b from-navy-950 via-emerald_brand-900/30 to-navy-950"
      id="kyanot"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête KYANOT */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/40 text-emerald-300 text-xs uppercase tracking-widest font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>KYANOT — Service Officiel de l'Étude</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Votre formalité notariée en <span className="emerald-gradient-text">quelques clics</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Grâce à la plateforme KYANOT, l'Étude Maître Koffi Yassoua Alain simplifie vos démarches.
            Vous transmettez vos justificatifs, réglez vos frais de pré-instruction par Mobile Money,
            et nous préparons l'acte définitif.
          </p>
        </div>

        {/* Grille interactive KYANOT : Sélecteur rapide + Grille des 6 démarches */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Colonne Gauche : Formulaire de sélection directe (KYANOT) */}
          <div className="lg:col-span-5 kyanot-card stitched-border-emerald rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
                  Portail Interactif
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold">
                  Commencer en 30 secondes
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center font-serif font-bold text-lg shadow-inner">
                K
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              Indiquez votre démarche juridique pour afficher la liste instantanée des pièces requises
              et le montant indicatif des frais de pré-instruction :
            </p>

            <form className="space-y-4" id="kyanotFastForm" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1.5"
                  htmlFor="formaliteSelect"
                >
                  Formalité notariale sélectionnée
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl bg-navy-950/90 border border-emerald-500/40 text-white text-sm focus:outline-none focus:border-emerald-300 shadow-inner"
                  id="formaliteSelect"
                  value={selectedFormalite}
                  onChange={(e) => onSelectFormalite(e.target.value as FormaliteKey)}
                >
                  <option value="immobilier">🏡 Vente Immobilière &amp; Sécurisation ACD (Recommandé)</option>
                  <option value="societe">🏢 Constitution de société (SARL, SAS, SA)</option>
                  <option value="procuration">✍️ Procuration authentique</option>
                  <option value="succession">📜 Règlement de succession</option>
                  <option value="donation">🎁 Donation entre vifs</option>
                  <option value="famille">👪 Contrat de mariage / Acte de famille</option>
                  <option value="autre">📑 Autre formalité notariale</option>
                </select>
              </div>

              {/* Champs spécifiques immobilier si sélectionné */}
              {selectedFormalite === 'immobilier' && (
                <div
                  className="space-y-3 p-3.5 rounded-xl bg-navy-950/80 border border-emerald-500/30 animate-fadeIn"
                  id="immoFieldsContainer"
                >
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-emerald-300 font-medium mb-1">
                      Type d'opération immobilière
                    </label>
                    <select
                      className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-emerald-500/30 text-white text-xs focus:outline-none focus:border-emerald-300"
                      id="immoOperationType"
                      value={immoOperationType}
                      onChange={(e) => setImmoOperationType(e.target.value)}
                    >
                      <option value="acquisition_acd">
                        Sécurisation d'acquisition de terrain avec ACD définitif
                      </option>
                      <option value="vente_bati">
                        Vente / Achat de bien bâti (Villa, Immeuble, Duplex)
                      </option>
                      <option value="verification_titre">
                        Vérification préalable de titre foncier &amp; anti-double vente
                      </option>
                      <option value="promesse_vente">
                        Rédaction de promesse synallagmatique de vente
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-emerald-300 font-medium mb-1">
                        Localisation du bien (Commune / Ville)
                      </label>
                      <input
                        className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-emerald-500/30 text-white text-xs focus:outline-none focus:border-emerald-300"
                        id="immoLocation"
                        placeholder="Ex: Cocody Angré, Bingerville..."
                        type="text"
                        value={immoLocation}
                        onChange={(e) => setImmoLocation(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-emerald-300 font-medium mb-1">
                        N° Arrêté ACD / Réf. Titre Foncier
                      </label>
                      <input
                        className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-emerald-500/30 text-white text-xs focus:outline-none focus:border-emerald-300"
                        id="immoRefAcd"
                        placeholder="Ex: ACD N° 2023-XXXX / TF N°..."
                        type="text"
                        value={immoRefAcd}
                        onChange={(e) => setImmoRefAcd(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-emerald-300 font-medium mb-1">
                      Prix de transaction estimé (FCFA)
                    </label>
                    <input
                      className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-emerald-500/30 text-white text-xs focus:outline-none focus:border-emerald-300"
                      id="immoPrice"
                      placeholder="Ex: 25 000 000 FCFA"
                      type="text"
                      value={immoPrice}
                      onChange={(e) => setImmoPrice(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Dynamic summary box */}
              <div
                className="p-3.5 rounded-xl bg-navy-950/90 border border-emerald-500/30 text-xs text-slate-300 space-y-2 shadow-inner"
                id="formaliteDynamicBox"
              >
                <div className="flex items-center justify-between text-emerald-300 font-semibold border-b border-white/5 pb-1.5">
                  <span className="flex items-center gap-1.5" id="dynFormaliteTitle">
                    <span className="text-base">{currentFormaliteInfo.icon}</span>
                    <span>{currentFormaliteInfo.title}</span>
                  </span>
                  <span
                    className="text-gold-300 font-serif font-bold text-xs"
                    id="dynFormaliteFee"
                  >
                    {currentFormaliteInfo.feeLabel}
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 space-y-1.5 pt-1">
                  <p className="font-medium text-emerald-200">
                    Pièces requises pour l'instruction préalable :
                  </p>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {currentFormaliteInfo.requiredDocs.map((doc, idx) => (
                      <li key={idx} className="leading-tight">
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                  {currentFormaliteInfo.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-medium"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1.5">
                  Votre numéro WhatsApp / Mobile Money (Côte d'Ivoire ou Diaspora)
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-navy-950/90 border border-emerald-500/40 text-white text-sm focus:outline-none focus:border-emerald-300 font-mono"
                  id="kyanotTel"
                  placeholder="+225 07..."
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="pt-1">
                <button
                  className="w-full kyanot-btn font-semibold py-3.5 rounded-xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  type="submit"
                >
                  <span>
                    {selectedFormalite === 'immobilier'
                      ? 'Constituer mon dossier foncier & ACD'
                      : `Constituer mon dossier ${currentFormaliteInfo.title}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

          </div>

          {/* Colonne Droite : Grille des 6 Formalités du service KYANOT */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-serif text-2xl text-white font-semibold">
                Choisissez directement votre démarche
              </h4>
              <span className="text-xs text-emerald-300 font-medium hidden sm:inline">
                6 formalités disponibles
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Formalité 1: Immobilier */}
              <div
                className={`p-4 rounded-xl transition-all cursor-pointer group shadow-lg relative ${
                  selectedFormalite === 'immobilier'
                    ? 'bg-gradient-to-br from-emerald_brand-900/60 to-navy-900 border-2 border-emerald-300 ring-2 ring-emerald-400/30'
                    : 'bg-navy-900/80 border border-gold-500/20 hover:border-emerald-400'
                }`}
                onClick={() => handleCardClick('immobilier')}
              >
                <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-emerald-400 text-navy-950 font-bold text-[10px] uppercase tracking-wider shadow">
                  Formalité phare
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                    🏠
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-serif text-white group-hover:text-gold-300 font-semibold text-base">
                        Immobilier &amp; Terrain (ACD)
                      </h5>
                    </div>
                    <p className="text-xs text-slate-300">
                      Vérification ACD, achat de parcelle, vente de villa, anti-double vente.
                    </p>
                    <span className="text-[11px] text-emerald-400 font-semibold inline-flex items-center gap-1 pt-1">
                      Pré-instruire ce dossier ACD →
                    </span>
                  </div>
                </div>
              </div>

              {/* Formalité 2: Société */}
              <div
                className={`p-4 rounded-xl transition-all cursor-pointer group shadow-md ${
                  selectedFormalite === 'societe'
                    ? 'bg-gradient-to-br from-emerald_brand-900/60 to-navy-900 border-2 border-emerald-300 ring-2 ring-emerald-400/30'
                    : 'bg-navy-900/80 border border-gold-500/20 hover:border-emerald-400'
                }`}
                onClick={() => handleCardClick('societe')}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                    🏢
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-serif text-white group-hover:text-gold-300 font-semibold text-base">
                      Constitution de Société
                    </h5>
                    <p className="text-xs text-slate-300">
                      Création SARL, SAS, SA selon normes OHADA.
                    </p>
                    <span className="text-[11px] text-emerald-400 font-semibold inline-flex items-center gap-1 pt-1">
                      Pré-instruire ce dossier →
                    </span>
                  </div>
                </div>
              </div>

              {/* Formalité 3: Procuration */}
              <div
                className={`p-4 rounded-xl transition-all cursor-pointer group shadow-md ${
                  selectedFormalite === 'procuration'
                    ? 'bg-gradient-to-br from-emerald_brand-900/60 to-navy-900 border-2 border-emerald-300 ring-2 ring-emerald-400/30'
                    : 'bg-navy-900/80 border border-gold-500/20 hover:border-emerald-400'
                }`}
                onClick={() => handleCardClick('procuration')}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                    ✍️
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-serif text-white group-hover:text-gold-300 font-semibold text-base">
                      Procuration
                    </h5>
                    <p className="text-xs text-slate-300">
                      Donner mandat légal pour agir en votre nom.
                    </p>
                    <span className="text-[11px] text-emerald-400 font-semibold inline-flex items-center gap-1 pt-1">
                      Pré-instruire ce dossier →
                    </span>
                  </div>
                </div>
              </div>

              {/* Formalité 4: Succession */}
              <div
                className={`p-4 rounded-xl transition-all cursor-pointer group shadow-md ${
                  selectedFormalite === 'succession'
                    ? 'bg-gradient-to-br from-emerald_brand-900/60 to-navy-900 border-2 border-emerald-300 ring-2 ring-emerald-400/30'
                    : 'bg-navy-900/80 border border-gold-500/20 hover:border-emerald-400'
                }`}
                onClick={() => handleCardClick('succession')}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                    📜
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-serif text-white group-hover:text-gold-300 font-semibold text-base">
                      Succession
                    </h5>
                    <p className="text-xs text-slate-300">
                      Notoriété, inventaire des biens, partage légal.
                    </p>
                    <span className="text-[11px] text-emerald-400 font-semibold inline-flex items-center gap-1 pt-1">
                      Pré-instruire ce dossier →
                    </span>
                  </div>
                </div>
              </div>

              {/* Formalité 5: Donation */}
              <div
                className={`p-4 rounded-xl transition-all cursor-pointer group shadow-md ${
                  selectedFormalite === 'donation'
                    ? 'bg-gradient-to-br from-emerald_brand-900/60 to-navy-900 border-2 border-emerald-300 ring-2 ring-emerald-400/30'
                    : 'bg-navy-900/80 border border-gold-500/20 hover:border-emerald-400'
                }`}
                onClick={() => handleCardClick('donation')}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                    🎁
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-serif text-white group-hover:text-gold-300 font-semibold text-base">
                      Donation
                    </h5>
                    <p className="text-xs text-slate-300">
                      Transmission de biens de votre vivant en règle.
                    </p>
                    <span className="text-[11px] text-emerald-400 font-semibold inline-flex items-center gap-1 pt-1">
                      Pré-instruire ce dossier →
                    </span>
                  </div>
                </div>
              </div>

              {/* Formalité 6: Actes de Famille */}
              <div
                className={`p-4 rounded-xl transition-all cursor-pointer group shadow-md ${
                  selectedFormalite === 'famille'
                    ? 'bg-gradient-to-br from-emerald_brand-900/60 to-navy-900 border-2 border-emerald-300 ring-2 ring-emerald-400/30'
                    : 'bg-navy-900/80 border border-gold-500/20 hover:border-emerald-400'
                }`}
                onClick={() => handleCardClick('famille')}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                    👪
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-serif text-white group-hover:text-gold-300 font-semibold text-base">
                      Actes de Famille
                    </h5>
                    <p className="text-xs text-slate-300">
                      Contrats de mariage, régimes, reconnaissances.
                    </p>
                    <span className="text-[11px] text-emerald-400 font-semibold inline-flex items-center gap-1 pt-1">
                      Pré-instruire ce dossier →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-navy-950/60 border border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Votre besoin n'apparaît pas ici ?</span>
              <button
                className="text-gold-300 hover:text-white underline underline-offset-2 font-medium cursor-pointer"
                onClick={() => onLaunchKyanotModal('autre')}
              >
                Soumettre un dossier spécifique
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
