import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * NepaliTechHub Homepage
 * Displays latest Nepal technology news with contact functionality
 */
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with logo and tagline */}
      <Header />

      {/* Main content - News section */}
      <main className="flex-1">
        <NewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating contact button and modal */}
      <ContactSection />
    </div>
  );
};

export default Index;
