import { useState } from "react";
import { PageType, Captain } from "@/app/types/bleach";
import { captains } from "@/app/data/captainsData";
import { Navigation } from "@/app/components/Navigation";
import { HomePage } from "@/app/components/HomePage";
import { PersonagensPage } from "@/app/components/PersonagensPage";
import { AssistirPage } from "@/app/components/AssistirPage";
import { CaptainModal } from "@/app/components/CaptainModal";

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<PageType>("home");
  const [selectedCaptain, setSelectedCaptain] =
    useState<Captain | null>(null);

  const handleCaptainSelect = (captain: Captain) => {
    setSelectedCaptain(captain);
  };

  const handleCloseModal = () => {
    setSelectedCaptain(null);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <main className="pt-16">
        {currentPage === "home" && <HomePage />}
        {currentPage === "personagens" && (
          <PersonagensPage
            captains={captains}
            onCaptainSelect={handleCaptainSelect}
          />
        )}
        {currentPage === "assistir" && <AssistirPage />}
      </main>

      <CaptainModal
        captain={selectedCaptain}
        isOpen={!!selectedCaptain}
        onClose={handleCloseModal}
      />
    </div>
  );
}