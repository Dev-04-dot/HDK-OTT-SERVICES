import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import paymentQR from '@/assets/payment-qr.jpg';
import { MessageCircle, Copy, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState(false);
  const upiId = "adwaitkeshari290@oksbi";

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast({
      title: "UPI ID copied",
      description: "UPI ID has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (!transactionId.trim()) {
      toast({
        title: "Transaction ID required",
        description: "Please enter your transaction ID before sharing",
        variant: "destructive",
      });
      return;
    }

    const message = `Hi! I have completed the payment for my order.\n\nOrder Total: $${cartTotal.toFixed(2)}\nTransaction ID: ${transactionId}\n\nPlease verify and confirm my order.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Opening WhatsApp",
      description: "Share your transaction ID with the seller",
    });
  };

  const handleOrderComplete = () => {
    if (!transactionId.trim()) {
      toast({
        title: "Transaction ID required",
        description: "Please enter your transaction ID",
        variant: "destructive",
      });
      return;
    }

    clearCart();
    toast({
      title: "Order placed successfully!",
      description: "You will receive a confirmation once payment is verified",
    });
    navigate('/');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment QR Code */}
          <div>
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Pay via UPI</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <img
                    src={paymentQR}
                    alt="Payment QR Code"
                    className="w-full h-auto"
                  />
                </div>

                <div className="space-y-2">
                  <Label>UPI ID</Label>
                  <div className="flex gap-2">
                    <Input value={upiId} readOnly className="font-mono" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyUPI}
                    >
                      {copied ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="font-medium">Payment Instructions:</p>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>Scan the QR code with any UPI app</li>
                    <li>Or copy the UPI ID and make payment</li>
                    <li>Enter transaction ID below</li>
                    <li>Share via WhatsApp for verification</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Transaction */}
          <div className="space-y-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.title} x {item.quantity}
                      </span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-xl text-primary">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transactionId">
                    Transaction ID / UTR Number *
                  </Label>
                  <Input
                    id="transactionId"
                    placeholder="Enter your transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    You will receive this after completing the payment
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full gradient-primary shadow-glow"
                    size="lg"
                    onClick={handleWhatsAppShare}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Share on WhatsApp
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={handleOrderComplete}
                  >
                    Complete Order
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  Your order will be processed after payment verification
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
