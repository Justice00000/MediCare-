-- Add current authenticated user as admin
INSERT INTO public.admins (user_id) 
VALUES ('7df0b261-77ae-45da-a9cb-e49820a466f8')
ON CONFLICT (user_id) DO NOTHING;