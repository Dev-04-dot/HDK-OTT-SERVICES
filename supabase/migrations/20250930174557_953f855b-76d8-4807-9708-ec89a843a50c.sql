-- Fix the search path issue in set_admin_user function
CREATE OR REPLACE FUNCTION public.set_admin_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'admin@demo.com' THEN
    UPDATE public.profiles 
    SET is_admin = true 
    WHERE user_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;