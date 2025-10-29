import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  company?: string;
  email?: string;
  phone: string;
  subject?: string;
  message: string;
}

// HTML escape function to prevent XSS
const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
};

// Get client IP for rate limiting
const getClientIP = (req: Request): string => {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
         req.headers.get("x-real-ip") || 
         "unknown";
};

// Rate limiting check (3 requests per hour per IP)
const checkRateLimit = async (identifier: string): Promise<boolean> => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  
  // Clean up old entries
  await supabase
    .from('chatbot_rate_limits')
    .delete()
    .lt('window_start', oneHourAgo);
  
  // Check current rate
  const { data, error } = await supabase
    .from('chatbot_rate_limits')
    .select('request_count')
    .eq('identifier', identifier)
    .gte('window_start', oneHourAgo)
    .maybeSingle();
  
  if (error) {
    console.error('Rate limit check error:', error);
    return true; // Allow on error to not block legitimate users
  }
  
  if (data && data.request_count >= 3) {
    return false; // Rate limit exceeded
  }
  
  // Increment or create rate limit entry
  if (data) {
    await supabase
      .from('chatbot_rate_limits')
      .update({ request_count: data.request_count + 1 })
      .eq('identifier', identifier)
      .gte('window_start', oneHourAgo);
  } else {
    await supabase
      .from('chatbot_rate_limits')
      .insert({ identifier, request_count: 1, window_start: new Date().toISOString() });
  }
  
  return true;
};

// Input validation
const validateInput = (data: ContactEmailRequest): { valid: boolean; error?: string } => {
  if (!data.name || typeof data.name !== 'string') {
    return { valid: false, error: 'Le nom est requis' };
  }
  if (data.name.trim().length === 0 || data.name.length > 100) {
    return { valid: false, error: 'Le nom doit contenir entre 1 et 100 caractères' };
  }
  
  if (data.company && data.company.length > 100) {
    return { valid: false, error: 'Le nom de société ne peut dépasser 100 caractères' };
  }
  
  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email) || data.email.length > 255) {
      return { valid: false, error: 'Email invalide' };
    }
  }
  
  if (!data.phone || typeof data.phone !== 'string') {
    return { valid: false, error: 'Le téléphone est requis' };
  }
  if (data.phone.trim().length < 8 || data.phone.length > 20) {
    return { valid: false, error: 'Le téléphone doit contenir entre 8 et 20 caractères' };
  }
  
  if (data.subject && data.subject.length > 200) {
    return { valid: false, error: 'Le sujet ne peut dépasser 200 caractères' };
  }
  
  if (!data.message || typeof data.message !== 'string') {
    return { valid: false, error: 'Le message est requis' };
  }
  if (data.message.trim().length === 0 || data.message.length > 2000) {
    return { valid: false, error: 'Le message doit contenir entre 1 et 2000 caractères' };
  }
  
  return { valid: true };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIP = getClientIP(req);
    const rateLimitOk = await checkRateLimit(clientIP);
    
    if (!rateLimitOk) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Trop de tentatives. Veuillez réessayer dans une heure.' 
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const requestData: ContactEmailRequest = await req.json();
    
    // Validate input
    const validation = validateInput(requestData);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ success: false, error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, company, email, phone, subject, message } = requestData;

    console.log("Sending contact email - form submitted");

    // Escape all user inputs to prevent XSS
    const safeName = escapeHtml(name.trim());
    const safeCompany = company ? escapeHtml(company.trim()) : '';
    const safeEmail = email ? escapeHtml(email.trim()) : '';
    const safePhone = escapeHtml(phone.trim());
    const safeSubject = subject ? escapeHtml(subject.trim()) : '';
    const safeMessage = escapeHtml(message.trim());

    // Construire le contenu de l'email avec des données échappées
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Nouveau message de contact - TRADLOG</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Nom :</strong> ${safeName}</p>
          ${safeCompany ? `<p><strong>Entreprise :</strong> ${safeCompany}</p>` : ''}
          ${safeEmail ? `<p><strong>Email :</strong> ${safeEmail}</p>` : ''}
          <p><strong>Téléphone :</strong> ${safePhone}</p>
          ${safeSubject ? `<p><strong>Sujet :</strong> ${safeSubject}</p>` : ''}
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Message :</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Ce message a été envoyé depuis le formulaire de contact du site TRADLOG Côte d'Ivoire.</p>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "TRADLOG Contact <onboarding@resend.dev>",
      to: ["all.ntic225@gmail.com"],
      subject: `Nouveau contact TRADLOG${safeSubject ? ` - ${safeSubject}` : ''} - ${safeName}`,
      html: emailContent,
      replyTo: email?.trim() || undefined,
    });

    console.log("Email sent successfully");

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    // Return generic error message to client, detailed error is logged
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard ou nous contacter par WhatsApp.' 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
