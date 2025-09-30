-- Drop existing constraint if it exists
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_seller_id_fkey;

-- Add proper foreign key constraint from products.seller_id to profiles.user_id
ALTER TABLE public.products
ADD CONSTRAINT products_seller_id_fkey 
FOREIGN KEY (seller_id) 
REFERENCES public.profiles(user_id) 
ON DELETE SET NULL;

-- Also add foreign keys for other tables that need them
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_buyer_id_fkey;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_seller_id_fkey;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_product_id_fkey;

ALTER TABLE public.orders
ADD CONSTRAINT orders_buyer_id_fkey 
FOREIGN KEY (buyer_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;

ALTER TABLE public.orders
ADD CONSTRAINT orders_seller_id_fkey 
FOREIGN KEY (seller_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;

ALTER TABLE public.orders
ADD CONSTRAINT orders_product_id_fkey 
FOREIGN KEY (product_id) 
REFERENCES public.products(id) 
ON DELETE CASCADE;

-- Add foreign keys for favorites
ALTER TABLE public.favorites DROP CONSTRAINT IF EXISTS favorites_user_id_fkey;
ALTER TABLE public.favorites DROP CONSTRAINT IF EXISTS favorites_product_id_fkey;

ALTER TABLE public.favorites
ADD CONSTRAINT favorites_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;

ALTER TABLE public.favorites
ADD CONSTRAINT favorites_product_id_fkey 
FOREIGN KEY (product_id) 
REFERENCES public.products(id) 
ON DELETE CASCADE;

-- Add foreign keys for reviews
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_reviewer_id_fkey;
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_reviewed_user_id_fkey;
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_order_id_fkey;

ALTER TABLE public.reviews
ADD CONSTRAINT reviews_reviewer_id_fkey 
FOREIGN KEY (reviewer_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;

ALTER TABLE public.reviews
ADD CONSTRAINT reviews_reviewed_user_id_fkey 
FOREIGN KEY (reviewed_user_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;

ALTER TABLE public.reviews
ADD CONSTRAINT reviews_order_id_fkey 
FOREIGN KEY (order_id) 
REFERENCES public.orders(id) 
ON DELETE SET NULL;