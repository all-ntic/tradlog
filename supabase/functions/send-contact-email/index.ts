import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, company, email, phone, subject, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact email for:", name);

    // Construire le contenu de l'email
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Nouveau message de contact - TRADLOG</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Nom :</strong> ${name}</p>
          ${company ? `<p><strong>Entreprise :</strong> ${company}</p>` : ''}
          ${email ? `<p><strong>Email :</strong> ${email}</p>` : ''}
          <p><strong>Téléphone :</strong> ${phone}</p>
          ${subject ? `<p><strong>Sujet :</strong> ${subject}</p>` : ''}
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Message :</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Ce message a été envoyé depuis le formulaire de contact du site TRADLOG Côte d'Ivoire.</p>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "TRADLOG Contact <onboarding@resend.dev>",
      to: ["all.ntic225@gmail.com"],
      subject: `Nouveau contact TRADLOG${subject ? ` - ${subject}` : ''} - ${name}`,
      html: emailContent,
      replyTo: email || undefined,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
