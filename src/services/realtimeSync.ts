import { DossierRecord, AppointmentRecord, RealtimeSyncEvent, FormaliteKey, ClercNote } from '../types';
import { FORMALITES_DATA } from '../data/formalites';

const DOSSIERS_STORAGE_KEY = 'etude_koffi_dossiers_v2';
const ACTIVE_DOSSIER_ID_KEY = 'etude_koffi_active_dossier_id';
const APPOINTMENTS_STORAGE_KEY = 'etude_koffi_appointments_v2';
const CHANNEL_NAME = 'etude_koffi_realtime_network';

// Showcase initial dossier for the notary office
const INITIAL_DOSSIER: DossierRecord = {
  id: 'ETU-2026-8942',
  formaliteKey: 'immobilier',
  formaliteTitle: 'Immobilier & Foncier (Vente / Acquisition / ACD)',
  clientName: 'M. Kouassi Jean-Philippe',
  clientPhone: '+225 07 09 88 44 21',
  clientEmail: 'kouassi.jp@invest.ci',
  status: 'instruction_en_cours',
  currentStepIndex: 1, // 0: Pièces déposées, 1: Examen clercs, 2: Rédaction minute, 3: Signature solennelle
  details: {
    immoOperationType: "Sécurisation d'acquisition de terrain avec ACD définitif",
    immoLocation: 'Cocody Angré 8ème Tranche, Abidjan',
    immoRefAcd: 'ACD N° 2023-04812 / TF N° 204.119',
    immoPrice: '45 000 000 FCFA',
    notes: "Vérification domaniale avant signature de l'acte authentique."
  },
  documents: [
    {
      id: 'doc-1',
      name: 'CNI_Acquereur_Kouassi.pdf',
      size: '2.4 Mo',
      type: 'application/pdf',
      uploadedAt: 'Il y a 3 heures',
      status: 'conforme'
    },
    {
      id: 'doc-2',
      name: 'Arrete_Ministeriel_ACD_2023.pdf',
      size: '4.8 Mo',
      type: 'application/pdf',
      uploadedAt: 'Il y a 3 heures',
      status: 'conforme'
    },
    {
      id: 'doc-3',
      name: 'Extrait_Topographique_Geometre_Expert.pdf',
      size: '3.1 Mo',
      type: 'application/pdf',
      uploadedAt: 'Il y a 2 heures',
      status: 'en_verification'
    }
  ],
  timeline: [
    {
      id: 'note-1',
      author: 'Secrétariat de l’Étude',
      role: 'Greffe Notarial',
      timestamp: 'Aujourd’hui à 08:30',
      message: 'Dossier foncier enregistré avec succès. 3 documents téléversés et transmis aux clercs.',
      stageBadge: 'Dépôt validé'
    },
    {
      id: 'note-2',
      author: 'Me Alain KOFFI & Clercs',
      role: 'Étude Notariale',
      timestamp: 'Aujourd’hui à 10:15',
      message: 'Instruction juridique en cours. Réquisitions transmises à la Conservation Foncière pour contrôle anti-double vente.',
      stageBadge: 'Instruction active'
    }
  ],
  createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  lastUpdatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  scheduledSigningDate: 'Prochainement à l’Étude (Bd. VGE, Abidjan)'
};

class RealtimeSyncManager {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<(event: RealtimeSyncEvent) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        if ('BroadcastChannel' in window) {
          this.channel = new BroadcastChannel(CHANNEL_NAME);
          this.channel.onmessage = (e) => {
            if (e.data) {
              this.notifyListeners(e.data);
            }
          };
        }
      } catch (err) {
        console.warn('BroadcastChannel non supporté, repli sur localStorage', err);
      }

      window.addEventListener('storage', (e) => {
        if (e.key === DOSSIERS_STORAGE_KEY || e.key === ACTIVE_DOSSIER_ID_KEY) {
          this.notifyListeners({
            type: 'DOSSIER_UPDATED',
            payload: this.getActiveDossier(),
            timestamp: Date.now()
          });
        }
      });

      // Initialize default storage if empty
      if (!localStorage.getItem(DOSSIERS_STORAGE_KEY)) {
        localStorage.setItem(DOSSIERS_STORAGE_KEY, JSON.stringify([INITIAL_DOSSIER]));
        localStorage.setItem(ACTIVE_DOSSIER_ID_KEY, INITIAL_DOSSIER.id);
      }
    }
  }

  public subscribe(listener: (event: RealtimeSyncEvent) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(event: RealtimeSyncEvent) {
    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.error('Erreur listener realtime:', err);
      }
    });
  }

  private broadcast(event: RealtimeSyncEvent) {
    this.notifyListeners(event);
    if (this.channel) {
      try {
        this.channel.postMessage(event);
      } catch (err) {
        console.warn('Erreur envoi BroadcastChannel', err);
      }
    }
  }

  public getDossiers(): DossierRecord[] {
    if (typeof window === 'undefined') return [INITIAL_DOSSIER];
    try {
      const raw = localStorage.getItem(DOSSIERS_STORAGE_KEY);
      if (!raw) return [INITIAL_DOSSIER];
      return JSON.parse(raw) as DossierRecord[];
    } catch {
      return [INITIAL_DOSSIER];
    }
  }

  public getActiveDossier(): DossierRecord | null {
    const list = this.getDossiers();
    if (list.length === 0) return null;
    const activeId = localStorage.getItem(ACTIVE_DOSSIER_ID_KEY);
    const found = list.find((d) => d.id === activeId);
    return found || list[0] || null;
  }

  public setActiveDossierId(id: string) {
    localStorage.setItem(ACTIVE_DOSSIER_ID_KEY, id);
    this.broadcast({
      type: 'DOSSIER_UPDATED',
      dossierId: id,
      payload: this.getActiveDossier(),
      timestamp: Date.now()
    });
  }

  public createDossier(params: {
    formaliteKey: FormaliteKey;
    clientName: string;
    clientPhone: string;
    clientEmail?: string;
    fileNames?: string[];
    details?: {
      immoOperationType?: string;
      immoLocation?: string;
      immoRefAcd?: string;
      immoPrice?: string;
      notes?: string;
    };
  }): DossierRecord {
    const list = this.getDossiers();
    const formaliteInfo = FORMALITES_DATA[params.formaliteKey] || FORMALITES_DATA.immobilier;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const id = `ETU-${new Date().getFullYear()}-${randomSuffix}`;
    const nowStr = 'À l’instant';

    const uploadedDocs: DossierRecord['documents'] = (params.fileNames && params.fileNames.length > 0
      ? params.fileNames
      : ['Pieces_Identite.pdf', 'Titre_Justificatif_Dossier.pdf']
    ).map((name, idx) => ({
      id: `doc-${Date.now()}-${idx}`,
      name,
      size: `${(Math.random() * 3 + 1.2).toFixed(1)} Mo`,
      type: 'application/pdf',
      uploadedAt: nowStr,
      status: 'conforme'
    }));

    const newRecord: DossierRecord = {
      id,
      formaliteKey: params.formaliteKey,
      formaliteTitle: formaliteInfo.title,
      clientName: params.clientName || 'Demandeur',
      clientPhone: params.clientPhone || '+225 07 ...',
      clientEmail: params.clientEmail || 'client@etude-koffi.ci',
      status: 'instruction_en_cours',
      currentStepIndex: 1, // 0: pieces deposees, 1: instruction clercs, 2: redaction minute, 3: signature
      details: params.details || {},
      documents: uploadedDocs,
      timeline: [
        {
          id: `note-${Date.now()}-1`,
          author: 'Secrétariat de l’Étude',
          role: 'Greffe Notarial',
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          message: `Dossier créé avec succès pour ${formaliteInfo.title}. ${uploadedDocs.length} document(s) téléversé(s) pour instruction.`,
          stageBadge: 'Dossier créé'
        },
        {
          id: `note-${Date.now()}-2`,
          author: 'Me Alain KOFFI & Clercs',
          role: 'Étude Notariale',
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          message: `Dossier affecté pour qualification juridique et vérification des pièces.`,
          stageBadge: 'Instruction en cours'
        }
      ],
      createdAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString()
    };

    const updatedList = [newRecord, ...list];
    localStorage.setItem(DOSSIERS_STORAGE_KEY, JSON.stringify(updatedList));
    localStorage.setItem(ACTIVE_DOSSIER_ID_KEY, newRecord.id);

    this.broadcast({
      type: 'DOSSIER_CREATED',
      dossierId: newRecord.id,
      payload: newRecord,
      timestamp: Date.now()
    });

    return newRecord;
  }

  public advanceDossierStep(dossierId: string, nextStepIndex?: number, clercMessage?: string): DossierRecord | null {
    const list = this.getDossiers();
    const idx = list.findIndex((d) => d.id === dossierId);
    if (idx === -1) return null;

    const current = list[idx];
    const newStep = nextStepIndex !== undefined ? nextStepIndex : Math.min(3, current.currentStepIndex + 1);

    const stepStatusMap: Record<number, DossierRecord['status']> = {
      0: 'pieces_deposees',
      1: 'instruction_en_cours',
      2: 'minute_prete',
      3: 'pret_pour_signature'
    };

    const defaultMessages: Record<number, string> = {
      0: 'Pièces initiales transmises et enregistrées par le secrétariat.',
      1: 'Examen de conformité et réquisitions juridiques en cours par le Clerc notaire.',
      2: 'Contrôle domanial et juridique achevé par le Clerc. Minute approuvée par Me Alain KOFFI.',
      3: 'Minute finalisée avec timbre notarié officiel. Convocations envoyées pour signature solennelle à l’Étude (Bd. VGE).'
    };

    const stageBadges: Record<number, string> = {
      0: 'Pièces reçues',
      1: 'Examen en cours',
      2: 'Minute approuvée',
      3: 'Prêt pour signature'
    };

    const newNote: ClercNote = {
      id: `note-${Date.now()}`,
      author: 'Me Alain KOFFI & Clercs',
      role: 'Étude Notariale',
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      message: clercMessage || defaultMessages[newStep] || 'Mise à jour du statut par l’Étude.',
      stageBadge: stageBadges[newStep]
    };

    const updated: DossierRecord = {
      ...current,
      currentStepIndex: newStep,
      status: stepStatusMap[newStep] || 'instruction_en_cours',
      timeline: [newNote, ...current.timeline],
      lastUpdatedAt: new Date().toISOString()
    };

    list[idx] = updated;
    localStorage.setItem(DOSSIERS_STORAGE_KEY, JSON.stringify(list));

    this.broadcast({
      type: 'STATUS_ADVANCED',
      dossierId: updated.id,
      payload: updated,
      timestamp: Date.now()
    });

    return updated;
  }

  public addClercNote(dossierId: string, author: string, message: string, badge?: string): DossierRecord | null {
    const list = this.getDossiers();
    const idx = list.findIndex((d) => d.id === dossierId);
    if (idx === -1) return null;

    const current = list[idx];
    const newNote: ClercNote = {
      id: `note-${Date.now()}`,
      author: author || 'Étude de Me KOFFI',
      role: 'Clerc Notaire',
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      message,
      stageBadge: badge || 'Observation clerc'
    };

    const updated: DossierRecord = {
      ...current,
      timeline: [newNote, ...current.timeline],
      lastUpdatedAt: new Date().toISOString()
    };

    list[idx] = updated;
    localStorage.setItem(DOSSIERS_STORAGE_KEY, JSON.stringify(list));

    this.broadcast({
      type: 'NOTE_ADDED',
      dossierId: updated.id,
      payload: updated,
      timestamp: Date.now()
    });

    return updated;
  }

  public createAppointment(params: {
    clientName: string;
    phone: string;
    mode: 'cabinet' | 'visio';
    domaine: string;
    summary: string;
  }): AppointmentRecord {
    let list: AppointmentRecord[] = [];
    try {
      const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      if (raw) list = JSON.parse(raw);
    } catch {
      list = [];
    }

    const newAppt: AppointmentRecord = {
      id: `RDV-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: params.clientName,
      phone: params.phone,
      mode: params.mode,
      domaine: params.domaine,
      summary: params.summary,
      date: new Date(Date.now() + 2 * 86400000).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      timeSlot: '10:30 - 11:30',
      status: 'confirme',
      createdAt: new Date().toISOString()
    };

    list.unshift(newAppt);
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(list));

    this.broadcast({
      type: 'RDV_CREATED',
      payload: newAppt,
      timestamp: Date.now()
    });

    return newAppt;
  }

  public getAppointments(): AppointmentRecord[] {
    try {
      const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public resetToDefaultShowcase() {
    localStorage.setItem(DOSSIERS_STORAGE_KEY, JSON.stringify([INITIAL_DOSSIER]));
    localStorage.setItem(ACTIVE_DOSSIER_ID_KEY, INITIAL_DOSSIER.id);
    this.broadcast({
      type: 'DOSSIER_UPDATED',
      dossierId: INITIAL_DOSSIER.id,
      payload: INITIAL_DOSSIER,
      timestamp: Date.now()
    });
  }
}

export const realtimeSync = new RealtimeSyncManager();
