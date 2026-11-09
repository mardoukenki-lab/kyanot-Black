/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ExpertiseSection } from './components/ExpertiseSection';
import { KyanotSection } from './components/KyanotSection';
import { ParcoursSection } from './components/ParcoursSection';
import { ManifesteSection } from './components/ManifesteSection';
import { ComparisonSection } from './components/ComparisonSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { KyanotModal } from './components/KyanotModal';
import { RdvModal } from './components/RdvModal';
import { ClercBackofficeModal } from './components/ClercBackofficeModal';
import { Toast } from './components/Toast';
import { FormaliteKey, DossierRecord } from './types';
import { realtimeSync } from './services/realtimeSync';

export default function App() {
  const [selectedFormalite, setSelectedFormalite] = useState<FormaliteKey>('immobilier');
  const [prefillData, setPrefillData] = useState<any>(null);

  // Modals state
  const [isKyanotModalOpen, setIsKyanotModalOpen] = useState(false);
  const [isRdvModalOpen, setIsRdvModalOpen] = useState(false);
  const [isClercModalOpen, setIsClercModalOpen] = useState(false);

  // State
  const [allDossiers, setAllDossiers] = useState<DossierRecord[]>([]);
  const [activeDossier, setActiveDossier] = useState<DossierRecord | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimeout, setToastTimeout] = useState<any>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimeout) clearTimeout(toastTimeout);
    const timeout = setTimeout(() => {
      setToastMessage(null);
    }, 4800);
    setToastTimeout(timeout);
  };

  useEffect(() => {
    const list = realtimeSync.getDossiers();
    setAllDossiers(list);
    setActiveDossier(realtimeSync.getActiveDossier());

    const unsubscribe = realtimeSync.subscribe((event) => {
      const refreshedList = realtimeSync.getDossiers();
      setAllDossiers(refreshedList);
      setActiveDossier(realtimeSync.getActiveDossier());

      if (event.type === 'STATUS_ADVANCED' && event.payload) {
        showToast(
          `Dossier ${event.payload.id} : Étape validée par l'Étude de Me KOFFI !`
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLaunchKyanotModal = (formaliteKey: FormaliteKey = 'immobilier', prefill?: any) => {
    setSelectedFormalite(formaliteKey);
    if (prefill) {
      setPrefillData(prefill);
    }
    setIsKyanotModalOpen(true);
  };

  const handleDossierCreated = (dossierId: string) => {
    const refreshed = realtimeSync.getDossiers();
    setAllDossiers(refreshed);
    const created = refreshed.find((d) => d.id === dossierId);
    if (created) {
      setActiveDossier(created);
    }
  };

  const handleSelectDossier = (id: string) => {
    realtimeSync.setActiveDossierId(id);
    const found = allDossiers.find((d) => d.id === id);
    if (found) {
      setActiveDossier(found);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#040914] text-[#f8fafc]">
      {/* Header */}
      <Header
        onOpenKyanotModal={(key) => handleLaunchKyanotModal((key as FormaliteKey) || 'immobilier')}
        onOpenRdvModal={() => setIsRdvModalOpen(true)}
        onOpenClercModal={() => setIsClercModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        <Hero
          onOpenKyanotModal={() => handleLaunchKyanotModal('immobilier')}
          onOpenRdvModal={() => setIsRdvModalOpen(true)}
        />

        <ExpertiseSection
          onSelectFormalite={(key) => setSelectedFormalite(key as FormaliteKey)}
          onOpenRdvModal={() => setIsRdvModalOpen(true)}
        />

        <KyanotSection
          selectedFormalite={selectedFormalite}
          onSelectFormalite={(key) => setSelectedFormalite(key)}
          onLaunchKyanotModal={handleLaunchKyanotModal}
        />

        <ParcoursSection />

        <ManifesteSection
          onOpenKyanot={() => {
            const el = document.getElementById('depot') || document.getElementById('kyanot');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <ComparisonSection />

        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onShowToast={showToast} />

      {/* Modals */}
      <KyanotModal
        isOpen={isKyanotModalOpen}
        onClose={() => setIsKyanotModalOpen(false)}
        defaultFormaliteKey={selectedFormalite}
        prefillData={prefillData}
        onDossierCreated={handleDossierCreated}
        onShowToast={showToast}
      />

      <RdvModal
        isOpen={isRdvModalOpen}
        onClose={() => setIsRdvModalOpen(false)}
        onShowToast={showToast}
      />

      <ClercBackofficeModal
        isOpen={isClercModalOpen}
        onClose={() => setIsClercModalOpen(false)}
        dossiers={allDossiers}
        activeDossierId={activeDossier?.id || ''}
        onSelectDossier={handleSelectDossier}
        onShowToast={showToast}
      />

      {/* Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
