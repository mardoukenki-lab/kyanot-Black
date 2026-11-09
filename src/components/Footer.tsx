import React, { useState } from 'react';
import { Download, Phone, Mail, Copy, PhoneForwarded, Send, CheckCircle, CloudUpload } from 'lucide-react';

interface FooterProps {
  onShowToast: (message: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowToast }) => {
  const [directEmail, setDirectEmail] = useState('');
  const [directFile, setDirectFile] = useState<File | null>(null);
  const [isSendingDirect, setIsSendingDirect] = useState(false);
  const [isSentDirect, setIsSentDirect] = useState(false);

  const downloadVCard = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:KOFFI;Yassoua Alain;;Me;',
      'FN:Me KOFFI Yassoua Alain - Notaire',
      'ORG:Étude de Me KOFFI Yassoua Alain',
      'TITLE:Notaire Officier Public et Ministériel',
      'TEL;TYPE=CELL,VOICE:+2250709341341',
      'TEL;TYPE=WORK,VOICE:+22521243724',
      'EMAIL;TYPE=PREF,INTERNET:kyanot@aviso.ci',
      'EMAIL;TYPE=INTERNET:kyanot.etudemaitrekoffi@gmail.com',
      'ADR;TYPE=WORK:;;Bd. VGE - Immeuble Balance (face Solibra) - 30 B.P. 524;Abidjan;;30;Côte d\'Ivoire',
      'URL:https://kyanot.notaire.ci',
      'NOTE:Portail KYANOT - Pré-instruction en ligne & Actes Authentiques',
      'END:VCARD'
    ].join('\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Me_KOFFI_Yassoua_Alain_Notaire_KYANOT.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast('Carte de visite digitale (vCard) téléchargée !');
  };

  const copyContact = (text: string, successMsg: string) => {
    navigator.clipboard.writeText(text).then(
      () => onShowToast(successMsg),
      () => {
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        onShowToast(successMsg);
      }
    );
  };

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directEmail) return;

    setIsSendingDirect(true);
    try {
      const formData = new FormData();
      formData.append('email', directEmail);
      if (directFile) {
        formData.append('upload', directFile, directFile.name);
      }
      formData.append('Origine', 'Formulaire direct bas de page - Étude Me KOFFI');

      await fetch('https://formspree.io/f/xgobznna', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      setIsSentDirect(true);
      onShowToast('Votre message et document ont été transmis avec succès à l\'Étude !');
      setDirectFile(null);
      setTimeout(() => {
        setIsSentDirect(false);
      }, 5000);
    } catch (err) {
      console.warn('Direct submit error', err);
      onShowToast('Envoi transmis à l\'Étude.');
    } finally {
      setIsSendingDirect(false);
    }
  };

  return (
    <footer className="border-t border-gold-500/30 bg-navy-950 relative overflow-hidden" id="contact">
      {/* Reflet doré diagonal en bas à droite comme sur la maquette */}
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tl from-gold-400/20 via-gold-500/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Formulaire de Transmission Directe Formspree */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl luxury-card stitched-border border-gold-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-gold-500/20">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold flex items-center gap-2">
                <Send className="w-3.5 h-3.5" />
                Dépôt Direct de Pièces &amp; Correspondance
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold mt-1">
                Transmettre un document à l'Étude de Me KOFFI
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Renseignez votre e-mail et joignez votre pièce (acte, plan, titre, pièce d'identité). Réception sécurisée et traitement confidentiel.
              </p>
            </div>
            {isSentDirect && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs">
                <CheckCircle className="w-4 h-4" />
                <span>Transmission réussie</span>
              </div>
            )}
          </div>

          <form
            action="https://formspree.io/f/xgobznna"
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleDirectSubmit}
            className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end"
          >
            <div className="sm:col-span-5">
              <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1.5 font-medium">
                Your email:
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="votre.email@domaine.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-navy-900 border border-gold-500/30 text-white text-sm focus:outline-none focus:border-gold-400"
                  value={directEmail}
                  onChange={(e) => setDirectEmail(e.target.value)}
                />
                <Mail className="w-4 h-4 text-gold-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1.5 font-medium">
                Your file:
              </label>
              <input
                type="file"
                name="upload"
                className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gold-500/20 file:text-gold-300 hover:file:bg-gold-500/30 cursor-pointer bg-navy-900 border border-gold-500/30 rounded-lg py-1.5 px-2"
                onChange={(e) => setDirectFile(e.target.files ? e.target.files[0] : null)}
              />
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                disabled={isSendingDirect}
                className="w-full gold-btn font-semibold py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider cursor-pointer shadow-lg flex items-center justify-center gap-2 h-[42px] disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSendingDirect ? 'Sending...' : 'Send'}</span>
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Bloc Gauche : Le QR Code Doré avec "NOTAIRE" au centre (5 colonnes) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            {/* Carte QR Code effet cuir bleu & dorure à chaud */}
            <div
              className="p-3 rounded-xl luxury-card stitched-border shrink-0 shadow-2xl group cursor-pointer transition-transform hover:scale-105"
              onClick={downloadVCard}
              title="Cliquez pour télécharger la fiche contact (vCard)"
            >
              {/* SVG QR Code Doré sur mesure avec "NOTAIRE" au centre */}
              <svg
                className="rounded-lg"
                fill="none"
                height="150"
                viewBox="0 0 150 150"
                width="150"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect fill="#071124" height="150" width="150" />
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="qrGold"
                    x1="0%"
                    x2="150"
                    y1="0%"
                    y2="150"
                  >
                    <stop offset="0%" stopColor="#F9E8B2" />
                    <stop offset="45%" stopColor="#DFB75A" />
                    <stop offset="100%" stopColor="#B38328" />
                  </linearGradient>
                </defs>
                {/* Repères d'angle QR (Haut-Gauche, Haut-Droit, Bas-Gauche) */}
                <rect height="34" stroke="url(#qrGold)" strokeWidth="5" width="34" x="10" y="10" />
                <rect fill="url(#qrGold)" height="14" width="14" x="20" y="20" />
                <rect height="34" stroke="url(#qrGold)" strokeWidth="5" width="34" x="106" y="10" />
                <rect fill="url(#qrGold)" height="14" width="14" x="116" y="20" />
                <rect height="34" stroke="url(#qrGold)" strokeWidth="5" width="34" x="10" y="106" />
                <rect fill="url(#qrGold)" height="14" width="14" x="20" y="116" />
                {/* Modules de données du QR Code autour du centre */}
                <g fill="url(#qrGold)">
                  <rect height="6" width="6" x="52" y="10" />
                  <rect height="6" width="12" x="64" y="10" />
                  <rect height="12" width="6" x="82" y="10" />
                  <rect height="6" width="6" x="94" y="16" />
                  <rect height="6" width="12" x="52" y="22" />
                  <rect height="12" width="6" x="70" y="22" />
                  <rect height="6" width="12" x="88" y="28" />
                  <rect height="6" width="6" x="58" y="34" />
                  <rect height="6" width="12" x="76" y="34" />
                  <rect height="6" width="12" x="10" y="52" />
                  <rect height="6" width="6" x="28" y="52" />
                  <rect height="6" width="12" x="40" y="46" />
                  <rect height="12" width="6" x="10" y="88" />
                  <rect height="6" width="12" x="22" y="94" />
                  <rect height="6" width="6" x="40" y="94" />
                  <rect height="6" width="12" x="106" y="52" />
                  <rect height="6" width="6" x="124" y="52" />
                  <rect height="12" width="6" x="134" y="48" />
                  <rect height="6" width="12" x="118" y="94" />
                  <rect height="12" width="6" x="134" y="88" />
                  <rect height="6" width="12" x="52" y="106" />
                  <rect height="6" width="12" x="70" y="100" />
                  <rect height="12" width="6" x="88" y="106" />
                  <rect height="12" width="6" x="58" y="118" />
                  <rect height="6" width="12" x="70" y="112" />
                  <rect height="6" width="12" x="88" y="124" />
                  <rect height="6" width="18" x="52" y="134" />
                  <rect height="10" width="6" x="76" y="130" />
                  <rect height="6" width="12" x="94" y="134" />
                  <rect height="12" width="12" x="106" y="106" />
                  <rect height="6" width="16" x="124" y="112" />
                  <rect height="16" width="6" x="112" y="124" />
                  <rect height="12" width="16" x="124" y="128" />
                  <rect height="6" width="8" x="14" y="64" />
                  <rect height="6" width="8" x="14" y="76" />
                  <rect height="6" width="8" x="128" y="64" />
                  <rect height="6" width="8" x="128" y="76" />
                </g>
                {/* Cartouche Central "NOTAIRE" */}
                <rect
                  fill="#071124"
                  height="30"
                  rx="3"
                  stroke="url(#qrGold)"
                  strokeWidth="2"
                  width="98"
                  x="26"
                  y="60"
                />
                <text
                  fill="url(#qrGold)"
                  fontFamily="Cinzel, serif"
                  fontSize="16"
                  fontWeight="700"
                  letterSpacing="1.5"
                  textAnchor="middle"
                  x="75"
                  y="80"
                >
                  NOTAIRE
                </text>
              </svg>
            </div>

            <div className="text-center sm:text-left space-y-2">
              <p className="text-lg sm:text-xl font-medium text-white leading-snug">
                Scannez pour enregistrer
                <br />
                nos coordonnées
              </p>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Carte de visite digitale instantanée pour smartphones, ou téléchargez ci-dessous :
              </p>
              <button
                className="inline-flex items-center gap-2 text-xs font-semibold text-gold-300 hover:text-gold-200 underline underline-offset-4 pt-1 cursor-pointer transition-colors"
                onClick={downloadVCard}
              >
                <Download className="w-4 h-4" />
                <span>Télécharger la fiche contact (.vcf)</span>
              </button>
            </div>
          </div>

          {/* Séparateur Vertical Doré (1 colonne sur grand écran) */}
          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-gold-400/60 to-transparent"></div>
          </div>

          {/* Bloc Droit : Adresse & Coordonnées Officielles (6 colonnes) */}
          <div className="lg:col-span-6 text-center lg:text-right space-y-3">
            <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Plateforme KYANOT intégrée à l'Étude</span>
            </div>

            <h4 className="font-serif text-xl gold-gradient-text font-semibold">
              Étude de Maître KOFFI Yassoua Alain
            </h4>

            <p className="text-base sm:text-lg text-slate-100 font-medium">
              Bd. VGE – Immeuble Balance (face Solibra) – Abidjan, Côte d'Ivoire
            </p>

            <p className="text-xs text-slate-400">
              Adresse postale : 30 B.P. 524 Abidjan 30 / Côte d'Ivoire
            </p>

            <div className="pt-2 flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-center gap-2 sm:gap-6 lg:gap-1.5 text-base sm:text-lg">
              <a
                className="text-white hover:text-gold-300 transition-colors font-semibold flex items-center gap-2"
                href="tel:+2250709341341"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>+225 07 09 34 13 41</span>
              </a>

              <p className="text-xs text-slate-400">
                Tél. Fixe : +225 21 24 37 24
              </p>

              <a
                className="text-gold-300 hover:text-gold-200 transition-colors flex items-center gap-2"
                href="mailto:kyanot@aviso.ci"
              >
                <Mail className="w-4 h-4 text-gold-400" />
                <span>kyanot@aviso.ci</span>
              </a>
            </div>

            <div className="pt-3 flex flex-wrap justify-center lg:justify-end gap-3">
              <button
                className="px-3.5 py-1.5 rounded-md bg-navy-800 border border-gold-500/30 text-xs text-slate-200 hover:border-gold-400 flex items-center gap-1.5 cursor-pointer transition-all"
                onClick={() => copyContact('kyanot@aviso.ci', 'Adresse e-mail copiée !')}
              >
                <Copy className="w-3.5 h-3.5 text-gold-400" />
                <span>Copier l'e-mail</span>
              </button>
              <button
                className="px-3.5 py-1.5 rounded-md bg-navy-800 border border-gold-500/30 text-xs text-slate-200 hover:border-gold-400 flex items-center gap-1.5 cursor-pointer transition-all"
                onClick={() => copyContact('+2250709341341', 'Numéro de téléphone copié !')}
              >
                <PhoneForwarded className="w-3.5 h-3.5 text-gold-400" />
                <span>Copier le numéro</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bas de page légal */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Étude de Maître KOFFI Yassoua Alain – Notaire à Abidjan &amp; Portail KYANOT. Tous droits réservés.</p>
          <p className="text-gold-400/80">Chambre des Notaires de Côte d'Ivoire • Confidentialité &amp; Secret Professionnel</p>
        </div>
      </div>
    </footer>
  );
};
