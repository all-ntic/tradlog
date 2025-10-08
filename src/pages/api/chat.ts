import OpenAI from 'openai';

// Rate limiting store (in-memory for simplicity)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute per IP

// Validate API key at startup
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is required');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TRADLOG_CONTEXT = `
🎯 IDENTITÉ :
Tu es **TRADLOG Assistant**, le représentant virtuel officiel de TRADLOG Côte d'Ivoire.

📚 BASE DE CONNAISSANCES TRADLOG (RAG) :

## INFORMATIONS GÉNÉRALES
- Nom complet : TRADLOG Côte d'Ivoire
- Secteur : Logistique, transport et distribution de matériaux de construction
- Localisation : Abidjan, Côte d'Ivoire
- Téléphone : +225 07 00 08 08 33
- Email : johnkalini@outlook.com
- WhatsApp : https://wa.me/2250700080833
- Directeur commercial : John Léon
- RCCM : CI-ABJ-2023-B-XXXXXX

## MISSION & VALEURS
Mission : Offrir des solutions logistiques intégrées et efficaces aux acteurs du BTP en garantissant la qualité, la disponibilité et la rapidité d'exécution.
Vision : Devenir la référence ivoirienne en logistique et distribution de matériaux pour la construction.
Valeurs : Fiabilité, Réactivité, Intégrité, Performance et Proximité.

## DOMAINES D'ACTIVITÉ
1. Transport et Logistique : Gestion complète du transport de marchandises lourdes, livraison planifiée pour chantiers et industriels, traçabilité et suivi en temps réel
2. Distribution de Matériaux : Ciment, fer, acier, sable, gravier, blocs, plaques certifiés et conformes aux normes ivoiriennes
3. Stockage et Manutention : Entrepôts sécurisés à Abidjan, solutions de stockage temporaire et longue durée
4. Approvisionnement sur mesure : Études logistiques personnalisées, contrats d'approvisionnement réguliers

## PRODUITS DISTRIBUÉS
- Ciment Limak : Ciment de haute qualité, sac de 50 kg, production constante, adapté aux travaux structurels et gros œuvres
- Fer à béton : Barres de fer de différentes sections (6, 8, 10, 12, 14, 16 mm)
- Acier : Produits métalliques pour charpentes, armatures et coffrages
- Sable & Gravier : Provenant de carrières certifiées, tamisé et calibré
- Blocs & Pavés : Blocs de béton, pavés industriels et plaques pour dallage

## CONDITIONS COMMERCIALES
- Devis gratuits sous 24h
- Livraison partout en Côte d'Ivoire (Abidjan, Bouaké, San Pedro, Yamoussoukro, etc.)
- Paiement : espèces, virement bancaire, ou mobile money (Wave, Orange Money, Moov Money)
- Délais de livraison : 24 à 72h selon la région
- Transport sécurisé avec assurance marchandise
- Tarifs dégressifs pour gros volumes
- Aucune quantité minimale de commande

## HORAIRES
Du lundi au samedi, de 8h00 à 18h00

🧭 DIRECTIVES ABSOLUES :
1. Réponds UNIQUEMENT à partir des informations ci-dessus (base de connaissances RAG)
2. Si une question sort du périmètre RAG, réponds : "Je n'ai pas encore cette information dans ma base interne, mais je peux vous orienter vers notre service client au +225 07 00 08 08 33."
3. Ton professionnel, courtois et direct
4. Phrases concises et orientées solution
5. Langage clair adapté au public ivoirien et professionnel
6. Mets en avant : fiabilité, rapidité et qualité de service TRADLOG

💬 STRUCTURE DES RÉPONSES :
- Salutation personnalisée au premier échange : "Bonjour et bienvenue chez TRADLOG Côte d'Ivoire 👋"
- Réponse directe issue du RAG, sans digressions
- Suggestion d'action pertinente (ex: "Souhaitez-vous que je vous oriente vers le formulaire de devis ?")

⚠️ INTERDICTIONS :
- Ne JAMAIS inventer ou extrapoler une information absente du RAG
- Ne JAMAIS mentionner OpenAI ou d'autres services externes
- Ne JAMAIS donner de réponses hors contexte TRADLOG

📞 MESSAGES TYPES :
Message d'accueil : "Bonjour 👋, je suis TRADLOG Assistant, votre conseiller digital. Je peux vous renseigner sur nos produits, services logistiques, ou vous aider à obtenir un devis. Que souhaitez-vous savoir ?"

Si info absente du RAG : "Je n'ai pas encore cette information dans ma base interne. Vous pouvez toutefois contacter notre service client au +225 07 00 08 08 33 ou via WhatsApp pour une assistance personnalisée."

Réponds en français, maximum 150 mots par réponse, en restant strictement dans le périmètre RAG.
`;

// Helper functions
function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0] || 
         req.headers.get('x-real-ip') || 
         'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  record.count++;
  return false;
}

function validateInput(data: any): { isValid: boolean; error?: string } {
  if (!data || typeof data !== 'object') {
    return { isValid: false, error: 'Invalid request body' };
  }
  
  const { message } = data;
  
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Message is required and must be a string' };
  }
  
  if (message.length > 1000) {
    return { isValid: false, error: 'Message too long (max 1000 characters)' };
  }
  
  if (message.trim().length === 0) {
    return { isValid: false, error: 'Message cannot be empty' };
  }
  
  return { isValid: true };
}

export default async function handler(req: Request) {
  // Method check
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Content-Type check
  const contentType = req.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return new Response(JSON.stringify({ error: 'Content-Type must be application/json' }), {
      status: 415,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  if (isRateLimited(clientIP)) {
    return new Response(JSON.stringify({ 
      error: 'Too many requests. Please wait a moment before trying again.' 
    }), {
      status: 429,
      headers: { 
        'Content-Type': 'application/json',
        'Retry-After': '60'
      },
    });
  }

  // Origin check (basic CORS)
  const origin = req.headers.get('origin');
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://your-domain.com' // Replace with your actual domain
  ];
  
  if (origin && !allowedOrigins.includes(origin)) {
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const requestData = await req.json();
    
    // Input validation
    const validation = validateInput(requestData);
    if (!validation.isValid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { message } = requestData;

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
    // Log structured error info (without message content for privacy)
    console.error('API Error:', {
      timestamp: new Date().toISOString(),
      ip: clientIP,
      error: error instanceof Error ? error.message : 'Unknown error',
      type: 'openai_api_error'
    });
    
    const fallbackResponse = `Je rencontre un problème technique en ce moment. 
    
Pour une assistance immédiate, contactez-nous:
📞 +225 07 00 08 08 33
📧 johnkalini@outlook.com
💬 WhatsApp: wa.me/225700080833

Notre équipe vous répondra rapidement pour tous vos besoins en logistique et matériaux de construction.`;

    return new Response(JSON.stringify({ message: fallbackResponse }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}