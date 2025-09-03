import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Package, Wrench, Warehouse, Settings } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Truck,
      title: "Transport & Logistique",
      description: "Poids lourds, remorques spécialisées et services de transit complets pour tous vos besoins logistiques.",
      features: ["Poids lourds", "Remorques", "Transit", "Livraison express"]
    },
    {
      icon: Package,
      title: "Distribution de Matériaux",
      description: "Fourniture et livraison de matériaux de construction : ciment, gravats, sable de qualité premium.",
      features: ["Ciment certifié", "Gravats", "Sable", "Livraison chantier"]
    },
    {
      icon: Wrench,
      title: "Acier & Fer à Béton",
      description: "Barres d'armature standards et sur mesure avec livraison directe sur vos chantiers.",
      features: ["Barres standard", "Sur mesure", "Livraison chantier", "Conseils techniques"]
    },
    {
      icon: Warehouse,
      title: "Stockage & Manutention",
      description: "Solutions de stockage sécurisé et manutention professionnelle pour gros volumes et charges lourdes.",
      features: ["Gros volumes", "Charges lourdes", "Stockage sécurisé", "Manutention"]
    },
    {
      icon: Settings,
      title: "Solutions Sur Mesure",
      description: "Contrats cadre personnalisés et gestion de projets spéciaux adaptés à vos besoins spécifiques.",
      features: ["Contrats cadre", "Projets spéciaux", "Solutions personnalisées", "Accompagnement"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nos <span className="text-primary">Services</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des solutions logistiques complètes pour répondre à tous vos besoins en matériaux de construction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-tradlog transition-all duration-300 group">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-tradlog"
            asChild
          >
            <a href="#contact">Demander un devis personnalisé</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;