import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Politique de Confidentialité
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Assistant Chatbot</h2>
              <p className="text-muted-foreground mb-4">
                Notre assistant chatbot TRADLOG est conçu pour vous aider avec vos questions sur la logistique 
                et les matériaux de construction. Voici comment nous traitons vos données :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Messages :</strong> Vos messages sont traités de manière confidentielle et ne sont 
                  utilisés que pour répondre à vos questions.
                </li>
                <li>
                  <strong>Conservation :</strong> Les conversations ne sont pas stockées de manière permanente 
                  sur nos serveurs.
                </li>
                <li>
                  <strong>Sécurité :</strong> Nous appliquons des mesures de sécurité strictes incluant la 
                  limitation du taux de requêtes et la validation des entrées.
                </li>
                <li>
                  <strong>IA :</strong> Vos messages sont traités par OpenAI selon leur politique de confidentialité.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Informations de Contact</h2>
              <p className="text-muted-foreground mb-4">
                Lorsque vous demandez un devis ou nous contactez :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Nous collectons uniquement les informations nécessaires à votre demande</li>
                <li>Vos données sont utilisées pour traiter votre demande et améliorer nos services</li>
                <li>Nous ne partageons pas vos informations avec des tiers sans votre consentement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Vos Droits</h2>
              <p className="text-muted-foreground mb-4">
                Vous avez le droit de :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Demander l'accès à vos données personnelles</li>
                <li>Demander la correction de données inexactes</li>
                <li>Demander la suppression de vos données</li>
                <li>Vous opposer au traitement de vos données</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p className="text-muted-foreground">
                Pour toute question concernant cette politique de confidentialité ou vos données personnelles, 
                contactez-nous :
              </p>
              <div className="mt-4 space-y-2 text-muted-foreground">
                <p>📞 <strong>Téléphone :</strong> +225 07 00 08 08 33</p>
                <p>📧 <strong>Email :</strong> johnkalini@outlook.com</p>
                <p>💬 <strong>WhatsApp :</strong> wa.me/225700080833</p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-muted-foreground">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;