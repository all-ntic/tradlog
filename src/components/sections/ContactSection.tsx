import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('tradlog_contacts')
        .insert([
          {
            name: formData.name.trim(),
            company: formData.company.trim() || null,
            email: formData.email.trim() || null,
            phone: formData.phone.trim(),
            subject: formData.subject || null,
            message: formData.message.trim(),
            status: 'new'
          }
        ]);

      if (error) throw error;

      toast({
        title: "✅ Message envoyé avec succès",
        description: "Votre message a bien été envoyé. Un conseiller TRADLOG vous recontactera sous peu.",
      });

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer ou nous contacter par WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Contactez <span className="text-primary">TRADLOG</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Prêt à démarrer votre projet ? Contactez-nous pour un devis personnalisé
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6 hover:shadow-tradlog transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
                  <p className="text-muted-foreground">+225 07 00 08 08 33</p>
                  <p className="text-sm text-muted-foreground">Lun-Ven: 8h-18h</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-tradlog transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <p className="text-muted-foreground">johnkalini@outlook.com</p>
                  <p className="text-sm text-muted-foreground">Réponse sous 24h</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-tradlog transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Adresse</h3>
                  <p className="text-muted-foreground">Abidjan, Côte d'Ivoire</p>
                  <p className="text-sm text-muted-foreground">Couverture nationale</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-green-50 hover:shadow-tradlog transition-all duration-300">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">WhatsApp Direct</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Réponse immédiate par WhatsApp
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700 w-full"
                  asChild
                >
                  <a 
                    href="https://wa.me/225700080833?text=Bonjour%20TRADLOG,%20je%20souhaite%20un%20devis."
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Écrire sur WhatsApp
                  </a>
                </Button>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Société</Label>
                    <Input 
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                      placeholder="+225 XX XX XX XX XX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email (facultatif)</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Objet du message</Label>
                  <Select 
                    value={formData.subject} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez l'objet de votre demande" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Devis">Devis</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                      <SelectItem value="Livraison">Livraison</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    placeholder="Décrivez votre projet et vos besoins..."
                    rows={6}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-tradlog flex-1"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white flex-1"
                    asChild
                  >
                    <a 
                      href="https://wa.me/225700080833"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      WhatsApp Direct
                    </a>
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;