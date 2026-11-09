import { FormaliteKey } from '../types';

export interface FormaliteInfo {
  key: FormaliteKey;
  icon: string;
  badge?: string;
  title: string;
  shortDesc: string;
  feeAmount: number;
  feeLabel: string;
  requiredDocs: string[];
  features: string[];
}

export const FORMALITES_DATA: Record<FormaliteKey, FormaliteInfo> = {
  immobilier: {
    key: 'immobilier',
    icon: '🏠',
    badge: 'Formalité phare',
    title: 'Immobilier & Foncier (Vente / Acquisition / ACD)',
    shortDesc: 'Vérification ACD, achat de parcelle, vente de villa, anti-double vente.',
    feeAmount: 35000,
    feeLabel: 'Pré-instruction : 35 000 FCFA',
    requiredDocs: [
      "Copie CNI / Passeport valide de l'acquéreur et du vendeur",
      "Copie de l'Arrêté d'ACD ou Titre Foncier (TF) / CMP",
      "Plan de bornage contradictoire ou extrait topographique visé",
      "Promesse ou protocole de vente signé (le cas échéant)"
    ],
    features: [
      'Contrôle anti-double vente',
      'Vérification Livre Foncier & Ministère',
      'Sécurisation du compte séquestre notarié'
    ]
  },
  societe: {
    key: 'societe',
    icon: '🏢',
    title: 'Constitution de Société (SARL / SAS / SA)',
    shortDesc: 'Création SARL, SAS, SA selon normes OHADA.',
    feeAmount: 30000,
    feeLabel: 'Pré-instruction : 30 000 FCFA',
    requiredDocs: [
      "Pièces d'identité des associés et du gérant (CNI/Passeport)",
      'Projet de dénomination sociale et sigle',
      'Justificatif de domiciliation / contrat de bail du siège social',
      'Déclaration de souscription et versement du capital'
    ],
    features: [
      'Statuts conformes OHADA révisé',
      'Dépôt au greffe du Tribunal de Commerce',
      'Immatriculation RCCM & IDU'
    ]
  },
  procuration: {
    key: 'procuration',
    icon: '✍️',
    title: 'Procuration Authentique Notariée',
    shortDesc: 'Donner mandat légal pour agir en votre nom.',
    feeAmount: 20000,
    feeLabel: 'Pré-instruction : 20 000 FCFA',
    requiredDocs: [
      'CNI ou passeport du mandant (personne qui donne pouvoir)',
      'CNI ou passeport du mandataire (personne qui reçoit pouvoir)',
      'Motif détaillé et étendue exacte des pouvoirs conférés',
      'Justificatifs de biens ou comptes visés par le mandat'
    ],
    features: [
      'Force probante devant banques et administrations',
      'Mandat spécial ou général certifié',
      'Dépôt à distance pour la diaspora'
    ]
  },
  succession: {
    key: 'succession',
    icon: '📜',
    title: 'Règlement de Succession & Partage',
    shortDesc: 'Notoriété, inventaire des biens, partage légal.',
    feeAmount: 40000,
    feeLabel: 'Pré-instruction : 40 000 FCFA',
    requiredDocs: [
      'Extrait d’acte de décès original du défunt',
      'Livret de famille et extraits de naissance des héritiers',
      'Inventaire des titres fonciers, comptes bancaires et véhicules',
      'Certificat d’hérédité ou jugement d’investiture (le cas échéant)'
    ],
    features: [
      'Acte de notoriété après décès',
      'Déclaration de succession fiscale',
      'Partage équitable et préservation de la paix familiale'
    ]
  },
  donation: {
    key: 'donation',
    icon: '🎁',
    title: 'Donation entre Vifs',
    shortDesc: 'Transmission de biens de votre vivant en règle.',
    feeAmount: 35000,
    feeLabel: 'Pré-instruction : 35 000 FCFA',
    requiredDocs: [
      'CNI du donateur et du/des donataires bénéficiaires',
      'Titres de propriété originaux (ACD, CMP) des biens cédés',
      'Preuve du lien de parenté (actes d’état civil)',
      'État hypothécaire récent délivré par la conservation foncière'
    ],
    features: [
      'Réserve d’usufruit ou pleine propriété',
      'Sécurisation irrévocable de la donation',
      'Purge des droits fiscaux'
    ]
  },
  famille: {
    key: 'famille',
    icon: '👪',
    title: 'Contrat de Mariage & Actes de Famille',
    shortDesc: 'Contrats de mariage, régimes, reconnaissances.',
    feeAmount: 25000,
    feeLabel: 'Pré-instruction : 25 000 FCFA',
    requiredDocs: [
      'Extraits d’acte de naissance des futurs époux datant de moins de 3 mois',
      'Copies des pièces d’identité CNI / Passeport',
      'Choix du régime matrimonial (séparation de biens ou communauté)',
      'Inventaire des apports respectifs des futurs conjoints'
    ],
    features: [
      'Certificat notarié pour l’Officier d’État Civil (Mairie)',
      'Protection du patrimoine familial et des conjoints',
      'Conseil sur mesure avant le mariage'
    ]
  },
  autre: {
    key: 'autre',
    icon: '📑',
    title: 'Autre Formalité Notariale Spécifique',
    shortDesc: 'Bail commercial, nantissement, cession de créance, certification.',
    feeAmount: 25000,
    feeLabel: 'Pré-instruction : 25 000 FCFA',
    requiredDocs: [
      'Pièce d’identité officielle en cours de validité',
      'Exposé succinct des motifs et pièces justificatives associées',
      'Tout contrat ou avant-projet préalable existant'
    ],
    features: [
      'Étude préalable personnalisée par nos clercs',
      'Assistance juridique dédiée',
      'Délai de traitement garanti sous 48h'
    ]
  }
};

export const SERVICES_EXPERTISE = {
  famille: {
    title: "Droit de la Famille & Successions — Préserver l'harmonie entre les générations",
    text: "Qu'il s'agisse de choisir votre régime matrimonial, de rédiger un testament incontestable, d'organiser une donation de votre vivant ou de régler une succession avec équité, Maître KOFFI Yassoua Alain veille à protéger vos proches et à prévenir tout litige familial."
  },
  immobilier: {
    title: "Immobilier & Patrimoine — Sécuriser chaque mètre carré en Côte d'Ivoire",
    text: "Face à la multiplication des fraudes foncières sur Internet, l'intervention du Notaire est obligatoire et salvatrice : vérification préalable de l'ACD et de l'état foncier, rédaction de l'acte authentique de vente, sécurisation des fonds et publication officielle."
  },
  affaires: {
    title: "Droit des Affaires & Sociétés — Accompagner les entrepreneurs et investisseurs",
    text: "Constitution rapide de sociétés (SARL, SA, SAS selon les normes OHADA), rédaction de pactes d'associés, cessions de parts sociales, baux à usage professionnel et authentification de vos accords stratégiques."
  }
};
