import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Package, Sparkles } from 'lucide-react';

export default function SetupProducts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const ottProducts = [
    // Individual Plans
    { title: 'Netflix Premium', price: 70, description: 'Monthly subscription to Netflix streaming service', category: 'OTT Subscription', plan_type: 'monthly' },
    { title: 'Private Screen', price: 110, description: 'Private streaming screen access', category: 'OTT Subscription', plan_type: 'monthly' },
    { title: 'Netflix Deluxe', price: 140, description: '30-day premium Netflix access', category: 'OTT Subscription', plan_type: '30-day' },
    { title: 'Hotstar Premium', price: 55, description: 'Monthly Hotstar Premium subscription', category: 'OTT Subscription', plan_type: 'monthly' },
    { title: 'Amazon Prime', price: 49, description: 'Monthly Amazon Prime Video subscription', category: 'OTT Subscription', plan_type: 'monthly' },
    { title: 'Sony LIV', price: 45, description: 'Monthly Sony LIV subscription', category: 'OTT Subscription', plan_type: 'monthly' },
    { title: 'ZEE5', price: 45, description: 'Monthly ZEE5 subscription', category: 'OTT Subscription', plan_type: 'monthly' },
    { title: 'YouTube Premium', price: 50, description: 'Monthly YouTube Premium - No 12 month limit with invite', category: 'OTT Subscription', plan_type: 'monthly', features: ['No 12 month limit', 'Invite included'] },
    { title: 'Perplexity AI', price: 299, description: 'Yearly Perplexity AI subscription', category: 'AI Tools', plan_type: 'yearly' },
    { title: 'Crunchyroll', price: 45, description: 'Monthly Crunchyroll anime streaming', category: 'OTT Subscription', plan_type: 'monthly' },
    { title: 'Hoichoi', price: 45, description: 'Monthly Hoichoi Bengali content subscription', category: 'OTT Subscription', plan_type: 'monthly' },
    { title: 'Canva Pro', price: 199, description: 'Yearly Canva Pro design subscription', category: 'Design Tools', plan_type: 'yearly' },
    { title: 'Surfshark VPN', price: 499, description: 'Yearly Surfshark VPN subscription', category: 'VPN & Security', plan_type: 'yearly' },
    { title: 'Gemini 2TB Storage', price: 399, description: 'Yearly 2TB cloud storage on email', category: 'Cloud Storage', plan_type: 'yearly' },
    { title: 'YouTube Premium APK', price: 99, description: 'Unlimited YouTube Premium APK', category: 'OTT Subscription', plan_type: 'unlimited' },
    { title: 'YouTube Premium Original', price: 50, description: 'Monthly original YouTube Premium subscription', category: 'OTT Subscription', plan_type: 'monthly' },
    
    // Combo Plans
    { 
      title: 'Combo 1: Triple Bundle', 
      price: 149, 
      description: 'Netflix + Amazon Prime + Hotstar - Best value combo for entertainment lovers!', 
      category: 'OTT Combo', 
      plan_type: 'monthly',
      features: ['Netflix Streaming', 'Amazon Prime Video', 'Hotstar Sports & Shows', 'Save ₹25 monthly'],
      is_featured: true
    },
    { 
      title: 'ALL OTT Combo 2 - Best Seller! 🔥', 
      price: 199, 
      description: 'Ultimate entertainment package! Netflix 4K + Hotstar 4K + Prime + ZEE5 + Sony LIV 4K', 
      category: 'OTT Combo', 
      plan_type: 'monthly',
      features: ['Netflix 4K Quality', 'Hotstar 4K Sports', 'Amazon Prime Video', 'ZEE5 Shows', 'Sony LIV 4K', 'Save ₹70+ monthly'],
      is_featured: true
    },
  ];

  const handleSetupProducts = async () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Insert all products
      const productsToInsert = ottProducts.map(product => ({
        ...product,
        seller_id: user.id,
        status: 'active',
        condition: 'new',
        location: 'India',
        contact_info: {
          note: 'Get details from Phone No., Aadhaar, Address, Alt No.',
          verification: 'Say scammers bye ✅'
        },
        specifications: {
          warranty: '100% WARRANTY 💯',
          duration: 'Month will concede 28 DAYS',
          availability: 'Other OTT available too! 💫'
        }
      }));

      const { error } = await supabase
        .from('products')
        .insert(productsToInsert);

      if (error) throw error;

      toast({
        title: "Success! 🎉",
        description: `Added ${ottProducts.length} OTT subscription plans to your marketplace`,
      });

      // Redirect to home to see the products
      setTimeout(() => navigate('/'), 1500);
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <Card className="glass-effect max-w-md">
          <CardHeader>
            <CardTitle>Please Sign Up First</CardTitle>
            <CardDescription>You need to create an account to set up products</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/auth')} className="w-full gradient-primary">
              Go to Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="glass-effect border-border/20 shadow-glow">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center shadow-glow animate-pulse-glow">
                <Package className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gradient">
              Setup OTT Products
            </CardTitle>
            <CardDescription className="text-base">
              Add all September 2025 OTT subscription plans to your marketplace
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                What will be added:
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ 16 Individual OTT subscriptions (Netflix, Prime, Hotstar, etc.)</li>
                <li>✅ 2 Premium combo bundles with savings</li>
                <li>✅ Design tools (Canva Pro)</li>
                <li>✅ VPN & Security (Surfshark)</li>
                <li>✅ Cloud storage (Gemini 2TB)</li>
                <li>✅ AI tools (Perplexity)</li>
                <li>✅ All plans with 100% warranty guarantee</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
              <p className="text-sm text-center font-medium">
                <span className="text-lg">🐕</span> ALL PLANS COME WITH 100% WARRANTY 💯
                <br />
                <span className="text-muted-foreground text-xs">Month will concede 28 DAYS</span>
              </p>
            </div>

            <Button 
              onClick={handleSetupProducts}
              disabled={loading}
              className="w-full gradient-primary shadow-glow text-lg py-6"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Adding products...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Add All OTT Products Now
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              This will add {ottProducts.length} products to your seller account
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}