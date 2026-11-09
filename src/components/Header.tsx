import React, { useState } from 'react';
import { FileUp, Menu, X, UserCheck } from 'lucide-react';


interface HeaderProps {
  onOpenKyanotModal: (formaliteKey?: string) => void;
  onOpenRdvModal: () => void;
  onOpenClercModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenKyanotModal,
  onOpenRdvModal,
  onOpenClercModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* BARRE DE NAVIGATION */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-navy-950/90 border-b border-gold-500/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Liens Gauche (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium tracking-wide text-slate-200">
              <a className="hover:text-gold-400 transition-colors" href="#vision">
                L'Étude &amp; Vision
              </a>
              <a className="hover:text-gold-400 transition-colors" href="#expertise">
                Expertises
              </a>
              {/* KYANOT mis en valeur dans la nav */}
              <a
                className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-400/30 transition-all hover:border-emerald-300"
                href="#kyanot"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Portail KYANOT</span>
              </a>
              <a className="hover:text-gold-400 transition-colors" href="#parcours">
                Comment ça marche
              </a>
            </nav>

            {/* Logo Central (Balance Dorée + Nom) */}
            <a className="flex flex-col items-center group mx-auto lg:mx-0 text-center" href="#">
              <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-105">
                {/* SVG Balance de la Justice Dorée */}
                <svg
                  className="w-11 h-11 drop-shadow-[0_2px_8px_rgba(201,155,59,0.3)]"
                  fill="none"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#F9E8B2" />
                      <stop offset="50%" stopColor="#C99B3B" />
                      <stop offset="100%" stopColor="#9A6D1B" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M32 8V54M20 54H44M16 58H48"
                    stroke="url(#goldGrad)"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                  <path
                    d="M12 20C20 18 26 16 32 16C38 16 44 18 52 20"
                    stroke="url(#goldGrad)"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                  <circle cx="32" cy="12" fill="url(#goldGrad)" r="3" />
                  {/* Plateau gauche */}
                  <path
                    d="M12 20L6 36H18L12 20Z"
                    stroke="url(#goldGrad)"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path d="M5 36C5 39.5 8 42 12 42C16 42 19 39.5 19 36H5Z" fill="url(#goldGrad)" />
                  {/* Plateau droit */}
                  <path
                    d="M52 20L46 36H58L52 20Z"
                    stroke="url(#goldGrad)"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path d="M45 36C45 39.5 48 42 52 42C56 42 59 39.5 59 36H45Z" fill="url(#goldGrad)" />
                </svg>
              </div>
              <span className="font-serif text-xs sm:text-sm tracking-widest gold-gradient-text font-semibold mt-0.5">
                Me KOFFI Yassoua Alain
              </span>
            </a>

            {/* Liens Droite (Desktop) */}
            <div className="hidden lg:flex items-center space-x-5 text-sm font-medium tracking-wide text-slate-200">
              <button
                className="kyanot-btn font-medium px-4 py-2 rounded-lg text-xs tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
                onClick={() => onOpenKyanotModal()}
              >
                <FileUp className="w-3.5 h-3.5 text-emerald-300" />
                <span>Dépôt en ligne</span>
              </button>
              <button
                className="hover:text-gold-400 transition-colors cursor-pointer"
                onClick={onOpenRdvModal}
              >
                Prendre RDV
              </button>
              <a
                className="px-4 py-2 rounded-md border border-gold-400/50 text-gold-300 hover:bg-gold-500/10 transition-all text-xs tracking-wider uppercase"
                href="#contact"
              >
                Accès &amp; Contact
              </a>
            </div>

            {/* Bouton Menu Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                aria-label="Menu mobile"
                className="p-2 text-gold-400 hover:text-gold-300 focus:outline-none cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile Déroulant */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy-900 border-b border-gold-500/30 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            <a
              className="py-2 font-semibold text-emerald-300 border-b border-white/5 flex items-center gap-2"
              href="#kyanot"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              KYANOT (Pré-instruction en ligne &amp; Mobile Money)
            </a>
            <a
              className="block py-2 text-slate-200 hover:text-gold-400 border-b border-white/5"
              href="#vision"
              onClick={() => setMobileMenuOpen(false)}
            >
              L'Étude &amp; Notre Vision
            </a>
            <a
              className="block py-2 text-slate-200 hover:text-gold-400 border-b border-white/5"
              href="#expertise"
              onClick={() => setMobileMenuOpen(false)}
            >
              Domaines d'Expertise
            </a>
            <a
              className="block py-2 text-slate-200 hover:text-gold-400 border-b border-white/5"
              href="#parcours"
              onClick={() => setMobileMenuOpen(false)}
            >
              Le Parcours en 4 Étapes
            </a>
            <a
              className="block py-2 text-slate-200 hover:text-gold-400 border-b border-white/5"
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
            >
              Questions Fréquentes
            </a>
            <a
              className="block py-2 text-slate-200 hover:text-gold-400"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact &amp; Coordonnées
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <button
                className="w-full kyanot-btn font-semibold py-3 rounded-lg text-center text-sm flex items-center justify-center gap-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenKyanotModal();
                }}
              >
                <FileUp className="w-4 h-4 text-emerald-300" />
                Déposer mon dossier (KYANOT)
              </button>
              <button
                className="w-full gold-btn font-semibold py-3 rounded-lg text-center text-sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRdvModal();
                }}
              >
                Prendre rendez-vous
              </button>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenClercModal();
                }}
                className="text-xs text-gold-300/80 hover:text-gold-200 flex items-center gap-1.5 underline"
              >
                <UserCheck className="w-3.5 h-3.5" />
                Accéder à l'espace clerc de l'Étude (simulation temps réel)
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
