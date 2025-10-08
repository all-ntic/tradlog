import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Quelles zones couvrez-vous ?",
      answer: "Nous couvrons principalement Abidjan et les grandes villes de Côte d'Ivoire. Des extensions régionales sont possibles selon la nature et l'ampleur du projet."
    },
    {
      question: "Quels sont vos délais de livraison ?",
      answer: "Nos délais standards sont de 24 à 72h selon la distance et le volume. Nous proposons également un service express pour les urgences."
    },
    {
      question: "Livrez-vous directement sur chantier ?",
      answer: "Oui, nous livrons directement sur vos chantiers. Nos camions sont équipés de hayons et grues si nécessaire pour faciliter le déchargement."
    },
    {
      question: "Quel est le minimum de commande ?",
      answer: "Le minimum dépend du produit commandé. Nous recommandons l'optimisation par palettes pour une meilleure rentabilité transport."
    },
    {
      question: "Vos matériaux respectent-ils les normes qualité ?",
      answer: "Absolument. Notre ciment, acier et granulats sont conformes aux normes internationales et certifiés par les organismes compétents."
    },
    {
      question: "Proposez-vous des contrats long terme ?",
      answer: "Oui, nous établissons des contrats cadre avec tarifs négociés et SLA (Service Level Agreement) pour nos clients réguliers."
    },
    {
      question: "Peut-on organiser des livraisons phasées ?",
      answer: "Tout à fait. Nous adaptons nos livraisons selon le calendrier de votre chantier pour optimiser le stockage et la rotation des matériaux."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les virements bancaires et Mobile Money Pro. Des conditions de paiement peuvent être négociées pour les gros volumes."
    },
    {
      question: "Êtes-vous assurés pour le transport ?",
      answer: "Oui, notre responsabilité transport est incluse. Une assurance tous risques est disponible en option pour les marchandises de haute valeur."
    },
    {
      question: "Comment obtenir un devis rapide ?",
      answer: "Vous pouvez utiliser notre formulaire de contact, nous écrire sur WhatsApp au +225 07 00 08 08 33, ou nous appeler directement. Réponse garantie sous 24h."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Questions <span className="text-primary">Fréquentes</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Retrouvez les réponses aux questions les plus courantes sur nos services
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 hover:shadow-tradlog transition-all duration-300"
              >
                <AccordionTrigger className="text-left hover:text-primary">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:shadow-tradlog transition-all"
            >
              Nous contacter
            </a>
            <a 
              href="https://wa.me/225700080833?text=Bonjour%20TRADLOG,%20j'ai%20une%20question%20:%20"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
            >
              Poser une question sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;