-- Create tradlog_contacts table for TRADLOG contact form
CREATE TABLE public.tradlog_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT,
  phone TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tradlog_contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact messages
CREATE POLICY "Anyone can insert contact messages"
ON public.tradlog_contacts
FOR INSERT
WITH CHECK (true);

-- Only admins can view contact messages (when auth is implemented)
CREATE POLICY "Public read access for now"
ON public.tradlog_contacts
FOR SELECT
USING (true);

-- Create index for better query performance
CREATE INDEX idx_tradlog_contacts_created_at ON public.tradlog_contacts(created_at DESC);
CREATE INDEX idx_tradlog_contacts_status ON public.tradlog_contacts(status);