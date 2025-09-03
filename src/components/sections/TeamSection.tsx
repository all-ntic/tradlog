import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle } from "lucide-react";

const TeamSection = () => {
  return (
    <section id="equipe" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Notre <span className="text-primary">Équipe</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une équipe experte à votre service pour tous vos projets logistiques
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center hover:shadow-tradlog transition-all duration-300">
            <div className="w-32 h-32 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold text-white">JL</span>
            </div>
            
            <h3 className="text-3xl font-bold mb-2 text-foreground">John Leon</h3>
            <p className="text-xl text-primary font-semibold mb-6">Directeur Commercial</p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Expert en logistique avec plus de 10 ans d'expérience dans le secteur du BTP en Côte d'Ivoire. 
              John supervise toutes les opérations commerciales et garantit la satisfaction client.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-semibold">+225 07 00 08 08 33</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>johnkalini@outlook.com</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-tradlog"
                asChild
              >
                <a href="tel:+225700080833">
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler John
                </a>
              </Button>
              
              <Button 
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                asChild
              >
                <a 
                  href="https://wa.me/225700080833"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Direct
                </a>
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Besoin d'un conseil personnalisé ou d'un devis sur mesure ?
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-tradlog"
            asChild
          >
            <a href="#contact">Prendre contact avec notre équipe</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;