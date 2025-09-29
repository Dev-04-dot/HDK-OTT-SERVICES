import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Eye, ShoppingCart, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    description?: string;
    price: number;
    category: string;
    image_url?: string;
    view_count: number;
    is_featured: boolean;
    condition?: string;
    seller?: {
      username?: string;
      avatar_url?: string;
      rating?: number;
      is_verified?: boolean;
    };
    created_at: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const isLiked = isInWishlist(product.id);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: `/product/${product.id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/product/${product.id}`);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard",
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 glass-effect border-border/20 overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="aspect-square bg-muted relative">
            {product.image_url ? (
              <>
                <img
                  src={product.image_url}
                  alt={product.title}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-card animate-pulse" />
                )}
              </>
            ) : (
              <div className="w-full h-full gradient-card flex items-center justify-center">
                <span className="text-4xl text-muted-foreground">📦</span>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.is_featured && (
                <Badge variant="destructive" className="text-xs">
                  Featured
                </Badge>
              )}
              {product.condition && (
                <Badge variant="secondary" className="text-xs capitalize">
                  {product.condition.replace('_', ' ')}
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="secondary"
                className="w-8 h-8 p-0 glass-effect"
                onClick={handleLike}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-primary text-primary' : ''}`} />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="w-8 h-8 p-0 glass-effect"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* View Count */}
            <div className="absolute bottom-2 left-2 flex items-center space-x-1 glass-effect px-2 py-1 rounded">
              <Eye className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{product.view_count}</span>
            </div>
          </div>

          <CardContent className="p-4">
            {/* Category */}
            <Badge variant="outline" className="mb-2 text-xs">
              {product.category}
            </Badge>

            {/* Title */}
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>

            {/* Description */}
            {product.description && (
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Price */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="gradient-primary shadow-glow"
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>

            {/* Seller Info */}
            {product.seller && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={product.seller.avatar_url} />
                    <AvatarFallback className="text-xs">
                      {product.seller.username?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground truncate">
                    {product.seller.username || 'Anonymous'}
                  </span>
                  {product.seller.is_verified && (
                    <Badge variant="secondary" className="text-xs h-4">
                      ✓
                    </Badge>
                  )}
                </div>
                
                {product.seller.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">
                      {product.seller.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </div>
      </Link>
    </Card>
  );
}