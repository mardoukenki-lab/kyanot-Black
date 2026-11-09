export type FormaliteKey =
  | 'immobilier'
  | 'societe'
  | 'procuration'
  | 'succession'
  | 'donation'
  | 'famille'
  | 'autre';

export type DossierStatus =
  | 'pieces_deposees'
  | 'instruction_en_cours'
  | 'minute_prete'
  | 'pret_pour_signature'
  | 'acte_authentifie';

export interface DossierDocument {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  status: 'conforme' | 'en_verification' | 'a_completer';
}

export interface ClercNote {
  id: string;
  author: string;
  role: string;
  timestamp: string;
  message: string;
  stageBadge?: string;
}

export interface DossierRecord {
  id: string; // e.g. ETU-2026-8942
  formaliteKey: FormaliteKey;
  formaliteTitle: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  fee?: number;
  status: DossierStatus;
  currentStepIndex: number; // 0: Pièces déposées, 1: Examen clercs, 2: Rédaction minute, 3: Signature solennelle
  details: {
    immoOperationType?: string;
    immoLocation?: string;
    immoRefAcd?: string;
    immoPrice?: string;
    notes?: string;
  };
  documents: DossierDocument[];
  timeline: ClercNote[];
  createdAt: string;
  lastUpdatedAt: string;
  scheduledSigningDate?: string;
}

export interface AppointmentRecord {
  id: string;
  clientName: string;
  phone: string;
  mode: 'cabinet' | 'visio';
  domaine: string;
  summary: string;
  date: string;
  timeSlot: string;
  status: 'confirme' | 'en_attente';
  createdAt: string;
}

export interface RealtimeSyncEvent {
  type: 'DOSSIER_CREATED' | 'DOSSIER_UPDATED' | 'STATUS_ADVANCED' | 'NOTE_ADDED' | 'RDV_CREATED';
  dossierId?: string;
  payload: any;
  timestamp: number;
}
