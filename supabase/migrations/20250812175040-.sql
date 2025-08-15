-- Add status column to profiles table for approval workflow
ALTER TABLE public.profiles 
ADD COLUMN status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- Update existing medical practitioners to pending status
UPDATE public.profiles 
SET status = 'pending' 
WHERE role = 'medical_practitioner';

-- Set patients to approved by default
UPDATE public.profiles 
SET status = 'approved' 
WHERE role = 'patient';

-- Update the handle_new_user function to set appropriate status
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, role, first_name, last_name, status)
  VALUES (
    NEW.id, 
    COALESCE((NEW.raw_user_meta_data ->> 'role')::public.user_role, 'patient'),
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    CASE 
      WHEN COALESCE((NEW.raw_user_meta_data ->> 'role')::public.user_role, 'patient') = 'medical_practitioner' 
      THEN 'pending'
      ELSE 'approved'
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create admin role and table for admin management
CREATE TABLE public.admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on admins table
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Only admins can access admin table
CREATE POLICY "Only admins can access admin table" ON public.admins
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid()
  )
);

-- Allow admins to view all profiles for approval
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid()
  )
);

-- Allow admins to update profile status
CREATE POLICY "Admins can update profile status" ON public.profiles
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid()
  )
);

-- Insert a default admin (you'll need to replace this with actual admin user ID after creating admin account)
-- INSERT INTO public.admins (user_id) VALUES ('admin-user-id-here');