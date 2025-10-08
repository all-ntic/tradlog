-- Ajouter la colonne subject pour l'objet du message
ALTER TABLE public.contact_messages 
ADD COLUMN subject text CHECK (subject IN ('Devis', 'Service', 'Livraison', 'Autre'));

-- Rendre l'email nullable (facultatif)
ALTER TABLE public.contact_messages 
ALTER COLUMN email DROP NOT NULL;

-- Ajouter une colonne company pour stocker le nom de l'entreprise
ALTER TABLE public.contact_messages 
ADD COLUMN company text;