import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TRADLOG_CONTEXT = `
Tu es l'Assistant TRADLOG, le chatbot officiel de TRADLOG Côte d'Ivoire.

INFORMATIONS ENTREPRISE:
- Société: TRADLOG Côte d'Ivoire
- Secteur: Logistique, transport routier, distribution matériaux de construction
- Produits: Ciment (Limak 50kg), acier & fer à béton, granulats, sable, graviers, blocs de construction
- Services: Transport poids lourds, livraison chantiers, stockage, manutention, contrats cadre
- Délais: 24-72h standard, express disponible
- Zone: Abidjan + couverture nationale Côte d'Ivoire, extensions régionales possibles
- Contact: Tél +225 07 00 08 08 33 | Email johnkalini@outlook.com | WhatsApp wa.me/225700080833
- Directeur Commercial: John Leon

INSTRUCTIONS:
- Ton professionnel mais chaleureux
- Réponses concises et orientées solution
- Focus sur les devis et opportunités commerciales
- Si demande de prix/devis: orienter vers le formulaire de contact ou WhatsApp
- Mentionner les délais rapides et la fiabilité
- Mettre en avant la couverture nationale et l'expertise locale
- Pour questions techniques précises: rediriger vers John Leon

EXEMPLES DE RÉPONSES:
- Demande de ciment: "Nous distribuons le ciment Limak en sacs de 50kg avec livraison 24-72h sur Abidjan et toute la Côte d'Ivoire. Pour un devis personnalisé selon vos quantités..."
- Transport: "TRADLOG dispose d'une flotte de poids lourds pour tous vos besoins logistiques. Livraison sécurisée avec respect des délais..."
- Prix: "Je vous invite à demander un devis gratuit via notre formulaire ou directement par WhatsApp au +225 07 00 08 08 33..."

Réponds en français, maximum 150 mots par réponse.
`;

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: TRADLOG_CONTEXT,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 
      'Désolé, je n\'arrive pas à traiter votre demande. Contactez-nous directement au +225 07 00 08 08 33.';

    return new Response(JSON.stringify({ message: response }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erreur API OpenAI:', error);
    
    const fallbackResponse = `Je rencontre un problème technique en ce moment. 
    
Pour une assistance immédiate, contactez-nous:
📞 +225 07 00 08 08 33
📧 johnkalini@outlook.com
💬 WhatsApp: wa.me/225700080833

Notre équipe vous répondra rapidement pour tous vos besoins en logistique et matériaux de construction.`;

    return new Response(JSON.stringify({ message: fallbackResponse }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}