import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// FAQ data from TRADLOG knowledge base
const faqData: FAQ[] = [
  { id: "1", question: "Quelle est l'activité principale de TRADLOG ?", answer: "TRADLOG est une entreprise ivoirienne spécialisée dans la logistique, le transport et la distribution de matériaux de construction.", category: "produits" },
  { id: "2", question: "Où se situe votre siège ?", answer: "Notre siège est basé à Abidjan, avec des points de livraison dans tout le pays.", category: "support" },
  { id: "3", question: "Quels sont vos produits les plus demandés ?", answer: "Les plus populaires sont le ciment Limak, le fer à béton, le sable, et les granulats.", category: "produits" },
  { id: "4", question: "Proposez-vous des produits importés ?", answer: "Oui, certains aciers et accessoires proviennent de fabricants certifiés internationaux.", category: "produits" },
  { id: "5", question: "Fournissez-vous aux particuliers ?", answer: "Oui, nous travaillons avec particuliers, PME et grandes entreprises du BTP.", category: "produits" },
  { id: "6", question: "Est-il possible de commander à distance ?", answer: "Oui, vous pouvez commander par WhatsApp, email ou téléphone. Le devis et le bon de livraison vous sont envoyés électroniquement.", category: "devis" },
  { id: "7", question: "Comment demander un devis ?", answer: "Via le formulaire sur notre site ou directement par WhatsApp : https://wa.me/2250700080833", category: "devis" },
  { id: "8", question: "Le devis est-il gratuit ?", answer: "Oui, tous nos devis sont gratuits et sans engagement.", category: "devis" },
  { id: "9", question: "Quels sont vos délais moyens de livraison ?", answer: "Entre 24 et 72 heures selon la distance, le volume et le stock.", category: "livraison" },
  { id: "10", question: "Livrez-vous hors d'Abidjan ?", answer: "Oui, nous desservons toutes les régions de Côte d'Ivoire.", category: "livraison" },
  { id: "11", question: "Avez-vous un service de transport indépendant ?", answer: "Oui, nos camions peuvent être loués pour le transport de marchandises diverses, même non TRADLOG.", category: "livraison" },
  { id: "12", question: "Offrez-vous un suivi de livraison ?", answer: "Oui, chaque commande bénéficie d'un numéro de suivi et d'un interlocuteur dédié.", category: "livraison" },
  { id: "13", question: "Quelle est la marque de ciment que vous distribuez ?", answer: "Nous distribuons le Ciment Limak, reconnu pour sa solidité et sa constance de qualité.", category: "produits" },
  { id: "14", question: "Quelle quantité minimale faut-il commander ?", answer: "Aucune contrainte : nous acceptons aussi bien les petites commandes que les volumes de chantier.", category: "devis" },
  { id: "15", question: "Faites-vous des remises pour les gros volumes ?", answer: "Oui, des tarifs dégressifs sont appliqués à partir d'un certain tonnage.", category: "devis" },
  { id: "16", question: "Comment sont stockés vos produits ?", answer: "Nos entrepôts sont secs, ventilés et sécurisés, garantissant la qualité du stockage.", category: "produits" },
  { id: "17", question: "Quels types de clients servez-vous ?", answer: "Particuliers, entrepreneurs BTP, sociétés industrielles, collectivités et projets d'État.", category: "produits" },
  { id: "18", question: "Proposez-vous une assistance technique ?", answer: "Oui, notre équipe peut vous conseiller sur les volumes, choix de matériaux et planification logistique.", category: "support" },
  { id: "19", question: "Peut-on payer à la livraison ?", answer: "Oui, le paiement à la livraison est possible selon les modalités convenues.", category: "devis" },
  { id: "20", question: "Acceptez-vous le paiement mobile ?", answer: "Oui, via Wave, Orange Money, Moov Money, ou virement bancaire.", category: "devis" },
];

const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { name: "Produits & Disponibilité", icon: "📦", key: "produits" },
    { name: "Livraison & Logistique", icon: "🚚", key: "livraison" },
    { name: "Devis & Commandes", icon: "💰", key: "devis" },
    { name: "Assistance & Support", icon: "📞", key: "support" },
  ];

  const groupedFaqs = categories.map((category) => ({
    ...category,
    questions: filteredFaqs.filter((faq) => faq.category === category.key),
  }));

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            FAQ – Questions les plus{" "}
            <span className="text-primary">fréquentes</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur nos produits,
            services et livraisons.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une question…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-border focus:border-primary transition-all shadow-sm hover:shadow-md"
            />
          </div>
        </motion.div>

        {/* FAQ Content */}
        <div className="max-w-5xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg text-muted-foreground">
                Aucune question ne correspond à votre recherche.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Essayez un autre mot-clé.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {groupedFaqs.map(
                (category, categoryIndex) =>
                  category.questions.length > 0 && (
                    <motion.div
                      key={category.key}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    >
                      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                        <span className="text-3xl">{category.icon}</span>
                        <span>{category.name}</span>
                      </h3>

                      <Accordion type="single" collapsible className="space-y-4">
                        {category.questions.map((faq, index) => (
                          <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                          >
                            <AccordionItem
                              value={faq.id}
                              className="border-2 border-border rounded-2xl px-6 bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
                            >
                              <AccordionTrigger className="text-left hover:text-primary py-5 hover:no-underline group">
                                <span className="font-semibold text-base md:text-lg pr-4">
                                  {faq.question}
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-5">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          </motion.div>
                        ))}
                      </Accordion>
                    </motion.div>
                  )
              )}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl font-medium hover:shadow-tradlog hover:scale-105 transition-all duration-300"
            >
              Nous contacter
            </a>
            <a
              href="https://wa.me/225700080833?text=Bonjour%20TRADLOG,%20j'ai%20une%20question%20:%20"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300"
            >
              Poser une question sur WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;