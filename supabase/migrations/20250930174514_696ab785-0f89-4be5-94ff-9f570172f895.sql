-- Create trigger to automatically set admin status for admin@demo.com
CREATE OR REPLACE FUNCTION public.set_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'admin@demo.com' THEN
    UPDATE public.profiles 
    SET is_admin = true 
    WHERE user_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created_set_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_set_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.set_admin_user();