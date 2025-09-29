import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Package, ShoppingBag, DollarSign, TrendingUp, AlertCircle, CheckCircle, XCircle, Key, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

const DEMO_ADMIN_EMAIL = 'admin@demo.com';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0, totalRevenue: 0 });
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.email === DEMO_ADMIN_EMAIL;

  useEffect(() => {
    if (user && isAdmin) {
      fetchDashboardData();
      const channel = supabase.channel('admin-updates').on('postgres_changes', { event: '*', schema: 'public' }, () => fetchDashboardData()).subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [user, isAdmin]);

  const fetchDashboardData = async () => {
    try {
      const [profilesCount, productsCount, ordersCount, ordersData, productsData] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('total_amount').eq('status', 'completed'),
        supabase.from('products').select('*, profiles!products_seller_id_fkey(username)').order('created_at', { ascending: false }).limit(10)
      ]);

      setStats({
        totalUsers: profilesCount.count || 0,
        totalProducts: productsCount.count || 0,
        totalOrders: ordersCount.count || 0,
        totalRevenue: (ordersData.data || []).reduce((sum: number, o: any) => sum + Number(o.total_amount || 0), 0)
      });
      setRecentProducts(productsData.data || []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleProductAction = async (productId: string, action: 'approve' | 'delete') => {
    try {
      if (action === 'delete') {
        await supabase.from('products').delete().eq('id', productId);
        toast({ title: "Product deleted" });
      } else {
        await supabase.from('products').update({ status: 'active' }).eq('id', productId);
        toast({ title: "Product approved" });
      }
      fetchDashboardData();
    } catch (error) {
      toast({ title: "Error", description: "Action failed", variant: "destructive" });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Key className="w-5 h-5" />Admin Access Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Demo Credentials</AlertTitle>
                <AlertDescription>
                  <div className="font-mono text-sm mt-2">
                    <div>Email: {DEMO_ADMIN_EMAIL}</div>
                    <div>Password: admin123</div>
                  </div>
                </AlertDescription>
              </Alert>
              <Button className="w-full gradient-primary" onClick={() => navigate('/auth')}>Go to Sign In</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.totalUsers}</div></CardContent>
          </Card>
          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.totalProducts}</div></CardContent>
          </Card>
          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.totalOrders}</div></CardContent>
          </Card>
          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div></CardContent>
          </Card>
        </div>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <div className="text-center py-8">Loading...</div> : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded">{product.image_url ? <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" /> : '📦'}</div>
                          <div><p className="font-medium">{product.title}</p><p className="text-xs text-muted-foreground">{product.category}</p></div>
                        </div>
                      </TableCell>
                      <TableCell>{product.profiles?.username || 'Anonymous'}</TableCell>
                      <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                      <TableCell><Badge variant={product.status === 'active' ? 'default' : 'secondary'}>{product.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {product.status !== 'active' && <Button size="sm" variant="ghost" onClick={() => handleProductAction(product.id, 'approve')}><CheckCircle className="w-4 h-4" /></Button>}
                          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleProductAction(product.id, 'delete')}><XCircle className="w-4 h-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
