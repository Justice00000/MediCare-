-- Drop the problematic admin policies that cause infinite recursion
DROP POLICY IF EXISTS "Only admins can access admin table" ON public.admins;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update profile status" ON public.profiles;

-- Create a security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = user_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create non-recursive admin policies
CREATE POLICY "Admins can access admin table" ON public.admins
FOR ALL USING (public.is_admin());

-- Allow admins to view all profiles using the security definer function
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (public.is_admin());

-- Allow admins to update profile status using the security definer function  
CREATE POLICY "Admins can update profile status" ON public.profiles
FOR UPDATE USING (public.is_admin());