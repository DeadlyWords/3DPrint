import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Impressum() {
  return (
    <>
      <Navbar />
      <main className="px-8 py-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Impressum</h1>
        <p>
          <strong>DruckBar</strong>
        </p>
        <p>Inhaber: [Ihr Name]</p>
        <p>[Straße und Hausnummer]</p>
        <p>95028 Hof, Deutschland</p>
        <p>E-Mail: info@druckbar.de</p>
        <p>Telefon: [Ihre Telefonnummer]</p>
        <p>Umsatzsteuer-ID: [falls vorhanden]</p>
        <br />
        <p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: [Ihr Name]</p>
      </main>
      <Footer />
    </>
  );
}
