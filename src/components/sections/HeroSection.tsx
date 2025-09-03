import { Button } from "@/components/ui/button";
import { Truck, Phone } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <div className="p-4 rounded-full bg-primary/20 backdrop-blur-sm">
              <Truck className="h-16 w-16 text-primary" />
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">TRADLOG</span>
            <br />
            <span className="text-primary">Côte d'Ivoire</span>
          </h1>
          
          {/* Slogan */}
          <p className="text-2xl md:text-3xl font-semibold mb-4 text-gray-100">
            Votre partenaire logistique et matériaux de construction
          </p>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Transport routier, distribution de ciment, acier et granulats – rapidité et fiabilité garanties
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-tradlog text-lg px-8 py-4 h-auto"
              asChild
            >
              <a href="#contact" className="flex items-center gap-2">
                Demander un devis
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4 h-auto"
              asChild
            >
              <a 
                href="https://wa.me/225700080833" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Nous écrire sur WhatsApp
              </a>
            </Button>
          </div>
          
          {/* Key Points */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Fiabilité",
              "Réactivité", 
              "Respect des délais",
              "Couverture nationale"
            ].map((point, index) => (
              <div key={index} className="text-center">
                <div className="w-2 h-2 bg-primary rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;