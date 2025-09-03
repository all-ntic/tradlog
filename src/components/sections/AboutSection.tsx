import { Card } from "@/components/ui/card";
import { Shield, Clock, MapPin, Award } from "lucide-react";

const AboutSection = () => {
  const strengths = [
    {
      icon: Shield,
      title: "Fiabilité",
      description: "Expertise éprouvée et équipements de qualité"
    },
    {
      icon: Clock,
      title: "Réactivité",
      description: "Réponse rapide et service client dédié"
    },
    {
      icon: Award,
      title: "Respect des délais",
      description: "Engagement ferme sur les plannings convenus"
    },
    {
      icon: MapPin,
      title: "Couverture nationale",
      description: "Présence sur tout le territoire ivoirien"
    }
  ];

  return (
    <section id="apropos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            À propos de <span className="text-primary">TRADLOG</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Votre partenaire logistique de confiance en Côte d'Ivoire
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              <strong>TRADLOG</strong> est une entreprise ivoirienne spécialisée en logistique et distribution 
              de matériaux pour le BTP. Nous allions expertise locale et réactivité pour 
              accompagner vos projets en toute sécurité.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Depuis notre création, nous nous engageons à fournir des solutions logistiques 
              innovantes et des matériaux de construction de qualité supérieure, tout en 
              respectant les normes les plus strictes de l'industrie.
            </p>
          </div>

          {/* Strengths Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {strengths.map((strength, index) => {
              const Icon = strength.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-tradlog transition-all duration-300 border-l-4 border-l-primary">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-foreground">
                    {strength.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {strength.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;