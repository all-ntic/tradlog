import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
}

const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const { data, error } = await supabase
          .from("faqs")
          .select("*")
          .order("display_order", { ascending: true });

        if (error) throw error;
        setFaqs(data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des FAQs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const filteredFaqs = faqs.filter(
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

  if (isLoading) {
    return (
      <section id="faq" className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Chargement des questions...</p>
          </div>
        </div>
      </section>
    );
  }

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