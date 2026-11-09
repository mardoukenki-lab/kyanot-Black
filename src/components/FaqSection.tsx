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
      "Non ! La transmission et l'examen préalable de vos documents s'effectuent directement en ligne. Vous ne vous déplacez à notre cabinet (Boulevard VGE, Immeuble Balance à Abidjan) que pour le rendez-vous solennel de lecture et de signature, une fois votre dossier entièrement qualifié et rédigé."
  },
  {
    question: "Comment mes pièces et informations personnelles sont-elles protégées ?",
    answer:
      "Toutes vos pièces justificatives sont traitées sous le sceau strict du secret professionnel notarial et de la déontologie légale de la Chambre des Notaires. Vos données et actes restent strictement confidentiels."
  },
  {
    question: "Quelles sont les pièces requises pour mon dossier ?",
    answer:
      "La liste exacte dépend de la formalité choisie (ex : pièce d'identité CNI/Passeport, arrêté d'ACD, extrait topographique ou statuts de société). Notre formulaire en ligne vous indique avec précision les documents nécessaires à joindre."
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
