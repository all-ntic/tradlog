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