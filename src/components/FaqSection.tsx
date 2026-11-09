import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Dois-je me déplacer plusieurs fois à l'Étude notariale ?",
    answer:
      "Non ! C'est tout l'avantage du service KYANOT : vous réalisez le choix de votre démarche, le téléversement de vos pièces d'identité et le règlement des frais de pré-instruction en ligne. Vous ne venez à l'Étude (Boulevard VGE à Abidjan) que pour le rendez-vous solennel de signature lorsque le dossier est entièrement instruit."
  },
  {
    question: "Comment s'effectue le paiement par Mobile Money ?",
    answer:
      "Le paiement se fait directement depuis votre téléphone via les opérateurs de référence en Côte d'Ivoire : Orange Money, Wave CI, MTN Mobile Money et Moov Money. Vous recevez instantanément un justificatif officiel par SMS et e-mail."
  },
  {
    question: "Quelles sont les pièces requises pour mon dossier ?",
    answer:
      "La liste exacte dépend de la formalité choisie (ex : pièce d'identité CNI/Passeport, extrait d'acte de naissance, titre foncier ACD ou projet de statuts). Notre formulaire KYANOT vous guide pas à pas pour déposer chaque document au bon format."
  },
  {
    question: "Qui examine et rédige les actes notariés ?",
    answer:
      "Les clercs et juristes assermentés de l'Étude de Maître Koffi Yassoua Alain reçoivent, vérifient l'authenticité de vos pièces et procèdent aux réquisitions d'usage avant que Maître KOFFI ne reçoive personnellement les parties pour la lecture solennelle et la signature."
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 lg:py-20 border-t border-gold-500/15 bg-navy-950" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
            Questions Fréquentes
          </span>
          <h3 className="font-serif text-3xl gold-gradient-text font-semibold">
            Tout comprendre avant de commencer
          </h3>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-navy-900 border border-gold-500/20 p-5 cursor-pointer transition-all hover:border-gold-400/50"
                onClick={() => toggle(idx)}
              >
                <div className="flex items-center justify-between font-serif text-white font-semibold text-base sm:text-lg">
                  <span>{faq.question}</span>
                  <span className="text-gold-400 text-xl font-bold ml-4 shrink-0 transition-transform duration-300">
                    {isOpen ? <Minus className="w-5 h-5 text-gold-300" /> : <Plus className="w-5 h-5 text-gold-400" />}
                  </span>
                </div>
                {isOpen && (
                  <p className="text-sm text-slate-300 mt-3 pt-3 border-t border-white/5 leading-relaxed animate-fadeIn">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
