"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

export default function LegalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"impressum" | "datenschutz">(
    "impressum"
  );

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <footer className="text-center py-6 text-sm text-gray-500">
        <button onClick={toggleModal} className="hover:underline">
          Impressum & Datenschutz
        </button>
      </footer>

      <Dialog open={isOpen} onClose={toggleModal} className="relative z-50">
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-xl relative">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Tab Buttons */}
            <div className="flex space-x-4 border-b mb-4">
              <button
                onClick={() => setActiveTab("impressum")}
                className={`pb-2 ${
                  activeTab === "impressum"
                    ? "border-b-2 border-amber-600 font-semibold text-amber-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Impressum
              </button>
              <button
                onClick={() => setActiveTab("datenschutz")}
                className={`pb-2 ${
                  activeTab === "datenschutz"
                    ? "border-b-2 border-amber-600 font-semibold text-amber-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Datenschutz
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-4 text-sm text-gray-700 text-left max-h-[60vh] overflow-y-auto pr-2">
              {activeTab === "impressum" ? (
                <>
                  <h3 className="text-lg font-semibold">
                    Angaben gemäß § 5 TMG
                  </h3>
                  <p>
                    <strong>DruckBar</strong>
                    <br />
                    Inhaber: Max Mustermann
                    <br />
                    Musterstraße 12
                    <br />
                    95028 Hof
                    <br />
                    Deutschland
                  </p>
                  <p>
                    E-Mail: info@druckbar.de
                    <br />
                    Telefon: +49 123 456789
                  </p>
                  <p>Umsatzsteuer-ID: DE123456789</p>
                  <p>
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
                    <br />
                    Max Mustermann
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">
                    Datenschutzerklärung
                  </h3>
                  <p>
                    Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                    Nachfolgend informieren wir Sie über die Erhebung,
                    Verarbeitung und Nutzung personenbezogener Daten im Rahmen
                    unseres Onlineangebots.
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Kontaktformulare & Datei-Uploads:</strong> Wenn
                      Sie über ein Formular mit uns Kontakt aufnehmen oder
                      Dateien hochladen, werden Ihre Angaben zwecks Bearbeitung
                      und für Rückfragen gespeichert.
                    </li>
                    <li>
                      <strong>Drittanbieter:</strong> Wir verwenden unter
                      Umständen externe Dienste (z. B. für Zahlungsabwicklung
                      oder Dateiübertragung), die personenbezogene Daten
                      verarbeiten können.
                    </li>
                    <li>
                      <strong>Cookies & Analyse:</strong> Diese Website kann
                      Cookies und Analyse-Tools nutzen. Die Verwendung erfolgt
                      nur mit Ihrer Zustimmung.
                    </li>
                  </ul>
                  <p>
                    Sie haben jederzeit das Recht auf Auskunft über die
                    gespeicherten Daten, deren Herkunft, Empfänger und Zweck
                    sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
                  </p>
                </>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
