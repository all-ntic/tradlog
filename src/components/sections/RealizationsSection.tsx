import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, CheckCircle, Calendar, MapPin } from "lucide-react";
import truckImage from "@/assets/truck-delivery.jpg";
import materialsImage from "@/assets/materials-warehouse.jpg";
import steelImage from "@/assets/steel-materials.jpg";

const RealizationsSection = () => {
  const projects = [
    {
      title: "Construction Résidentielle Cocody",
      location: "Cocody, Abidjan",
      description: "Livraison de 500 sacs de ciment et 10 tonnes d'acier pour un projet résidentiel de 20 logements.",
      problem: "Délai serré et accès difficile au chantier",
      solution: "Livraisons fractionnées avec camions adaptés",
      result: "Projet livré en avance, client satisfait",
      image: truckImage,
      duration: "3 semaines",
      status: "Terminé"
    },
    {
      title: "Infrastructure Routière Yamoussoukro", 
      location: "Yamoussoukro",
      description: "Fourniture de granulats et transport de matériel lourd pour rénovation d'axes routiers.",
      problem: "Volumes importants et coordination multi-sites",
      solution: "Planification logistique avec rotations optimisées",
      result: "0 retard, économies transport de 15%",
      image: materialsImage,
      duration: "2 mois",
      status: "Terminé"
    },
    {
      title: "Complexe Commercial Grand-Bassam",
      location: "Grand-Bassam",
      description: "Distribution complète de matériaux pour centre commercial : ciment, acier, granulats.",
      problem: "Diversité des matériaux et contraintes temporelles",
      solution: "Solutions intégrées avec stockage intermédiaire",
      result: "Projet dans les délais, relation client pérennisée",
      image: steelImage,
      duration: "6 semaines", 
      status: "En cours"
    }
  ];

  return (
    <section id="realisations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nos <span className="text-primary">Réalisations</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez comment nous avons accompagné nos clients dans leurs projets
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-tradlog transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute top-4 left-4">
                  <Badge className={project.status === "Terminé" ? "bg-green-600" : "bg-blue-600"}>
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-2">
                  {project.title}
                </h3>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="mr-4">{project.location}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{project.duration}</span>
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-red-600">Problème :</span>
                    <p className="text-muted-foreground mt-1">{project.problem}</p>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-blue-600">Solution :</span>
                    <p className="text-muted-foreground mt-1">{project.solution}</p>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-green-600">Résultat :</span>
                      <p className="text-muted-foreground">{project.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Votre projet mérite la même attention
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Chaque projet est unique. Nous analysons vos besoins pour vous proposer 
            des solutions logistiques sur mesure, adaptées à vos contraintes et objectifs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-tradlog"
              asChild
            >
              <a href="#contact">Parler de mon projet</a>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              asChild
            >
              <a 
                href="https://wa.me/225700080833?text=Bonjour%20TRADLOG,%20j'aimerais%20discuter%20de%20mon%20projet."
                target="_blank" 
                rel="noopener noreferrer"
              >
                Discuter sur WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealizationsSection;