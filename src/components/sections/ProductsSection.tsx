import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Blocks, Wrench, Mountain } from "lucide-react";
import materialsImage from "@/assets/materials-warehouse.jpg";
import steelImage from "@/assets/steel-materials.jpg";

const ProductsSection = () => {
  const products = [
    {
      icon: Package,
      title: "Ciment Limak",
      description: "Ciment de haute qualité en sacs de 50 kg, conforme aux normes internationales pour tous vos projets de construction.",
      specs: ["Sac de 50 kg", "Norme internationale", "Haute résistance", "Livraison rapide"],
      image: materialsImage,
      popular: true
    },
    {
      icon: Mountain,
      title: "Granulats & Sable",
      description: "Sable fin, graviers et granulats de différentes granulométries pour béton, remblais et finitions.",
      specs: ["Différentes granulométries", "Sable fin", "Graviers", "Qualité contrôlée"],
      image: materialsImage,
      popular: false
    },
    {
      icon: Wrench,
      title: "Fer à Béton & Acier",
      description: "Barres d'armature et acier de construction, disponibles en différents diamètres selon vos besoins.",
      specs: ["Tous diamètres", "Acier certifié", "Barres standards", "Sur mesure"],
      image: steelImage,
      popular: true
    },
    {
      icon: Blocks,
      title: "Blocs & Plaques",
      description: "Blocs de construction et plaques préfabriquées pour accélérer vos chantiers et garantir la qualité.",
      specs: ["Blocs standards", "Plaques préfab", "Dimensions variées", "Installation rapide"],
      image: materialsImage,
      popular: false
    }
  ];

  return (
    <section id="produits" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nos <span className="text-primary">Produits</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une gamme complète de matériaux de construction de qualité supérieure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Card key={index} className="overflow-hidden hover:shadow-tradlog transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  {product.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-white">Populaire</Badge>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground mb-3">Spécifications :</h4>
                    {product.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="text-sm text-muted-foreground">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Besoin d'informations sur nos produits ou d'un devis personnalisé ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:shadow-tradlog transition-all"
            >
              Demander un devis
            </a>
            <a 
              href="https://wa.me/225700080833" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
            >
              Contacter par WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;