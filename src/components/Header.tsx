import React, { useState } from 'react';
import { CloudUpload, Calendar, Menu, X, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenKyanotModal: (formaliteKey?: string) => void;
  onOpenRdvModal: () => void;
  onOpenClercModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenKyanotModal,
  onOpenRdvModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#050814]/95 border-b border-gold-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Gauche : Orange Squircle + Titre Notaire (identique à la capture) */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-950/40 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-base sm:text-lg tracking-wider text-white uppercase leading-tight font-sans">
                KYANOT
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-widest text-[#f0b4c2] font-semibold uppercase leading-tight">
                ÉTUDE ME KOFFI YASSOUA ALAIN
              </span>
            </div>
          </a>

          {/* Navigation Centrale (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium tracking-wide text-slate-200">
            <a className="hover:text-gold-300 transition-colors" href="#vision">
              L'Étude &amp; Vision
            </a>
            <a className="hover:text-gold-300 transition-colors" href="#expertise">
              Expertises
            </a>
            <a className="hover:text-gold-300 transition-colors" href="#parcours">
              Comment ça marche
            </a>
            <a className="hover:text-gold-300 transition-colors" href="#contact">
              Accès &amp; Contact
            </a>
          </nav>

          {/* Boutons d'Action Droite (Desktop) : DÉPÔT EN LIGNE (Vert) & Prendre RDV (Orange) */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              className="px-4 lg:px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-emerald-950/30 transition-all hover:scale-105 cursor-pointer"
              onClick={() => onOpenKyanotModal()}
            >
              <CloudUpload className="w-4 h-4 text-emerald-100" />
              <span>DÉPÔT EN LIGNE</span>
            </button>
            <button
              className="px-4 lg:px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-semibold text-xs tracking-wider flex items-center gap-2 shadow-lg shadow-orange-950/30 transition-all hover:scale-105 cursor-pointer"
              onClick={onOpenRdvModal}
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Prendre RDV</span>
            </button>
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
            Comment ça marche
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
            Accès &amp; Contact
          </a>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <button
              className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenKyanotModal();
              }}
            >
              <CloudUpload className="w-4 h-4 text-emerald-100" />
              <span>DÉPÔT EN LIGNE</span>
            </button>
            <button
              className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRdvModal();
              }}
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Prendre RDV</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
