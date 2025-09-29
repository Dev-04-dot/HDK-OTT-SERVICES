import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Users, TrendingUp, Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { CategoryGrid } from '@/components/CategoryGrid';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured products
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select(`
            id,
            title,
            description,
            price,
            category,
            image_url,
            view_count,
            is_featured,
            condition,
            created_at,
            profiles!products_seller_id_fkey (
              username,
              avatar_url,
              rating,
              is_verified
            )
          `)
          .eq('status', 'active')
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(8);

        if (productsError) throw productsError;

        // Transform the data to match our interface
        const transformedProducts = products?.map(product => ({
          ...product,
          seller: product.profiles
        })) || [];

        setFeaturedProducts(transformedProducts);

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('sort_order');

        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);

      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load products. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 glass-effect border-border/20">
              🎉 Launch Week - 50% Off Premium Listings
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              The Ultimate
              <span className="block text-gradient bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                Premium Marketplace
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Buy and sell premium accounts, digital products, and exclusive services. 
              Join thousands of satisfied customers in the most trusted marketplace.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="bg-white text-black hover:bg-white/90 shadow-glow text-lg px-8 py-4">
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-white/60">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1M+</div>
                <div className="text-sm text-white/60">Products Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-sm text-white/60">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Why Choose PremiumMarket?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We provide the safest, fastest, and most reliable platform for premium digital transactions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "100% Secure",
                description: "Advanced encryption and buyer protection guarantee your safety."
              },
              {
                icon: Zap,
                title: "Instant Delivery",
                description: "Get your products immediately after purchase with automated delivery."
              },
              {
                icon: Users,
                title: "Verified Sellers",
                description: "All sellers are thoroughly vetted and verified for your peace of mind."
              },
              {
                icon: TrendingUp,
                title: "Best Prices",
                description: "Competitive pricing with exclusive deals and bulk discounts."
              }
            ].map((feature, index) => (
              <Card key={index} className="glass-effect border-border/20 hover:shadow-glow transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-glow group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoryGrid categories={categories} />

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gradient mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Hand-picked premium products from verified sellers</p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="hidden sm:flex">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="glass-effect border-border/20">
                  <div className="aspect-square bg-gradient-card animate-pulse" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-gradient-card rounded animate-pulse" />
                    <div className="h-3 bg-gradient-card rounded animate-pulse w-2/3" />
                    <div className="h-6 bg-gradient-card rounded animate-pulse w-1/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link to="/products">
              <Button variant="outline">
                View All Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their premium purchases.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Digital Entrepreneur",
                content: "Amazing platform! Got my Netflix premium account instantly and it's been working perfectly for months.",
                rating: 5
              },
              {
                name: "Mike Chen",
                role: "Content Creator",
                content: "The best marketplace for premium accounts. Great prices, instant delivery, and excellent customer support.",
                rating: 5
              },
              {
                name: "Emily Davis",
                role: "Small Business Owner",
                content: "I've been buying software licenses here for years. Always authentic, always delivered fast.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="glass-effect border-border/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Premium Journey?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join thousands of users who trust PremiumMarket for their digital needs. 
              Start buying and selling today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 shadow-glow">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}