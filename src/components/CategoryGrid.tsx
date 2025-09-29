import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  productCount?: number;
}

interface CategoryGridProps {
  categories: Category[];
  title?: string;
  showAll?: boolean;
}

export function CategoryGrid({ categories, title = "Browse Categories", showAll = false }: CategoryGridProps) {
  const displayCategories = showAll ? categories : categories.slice(0, 8);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gradient mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover amazing products across all categories. From premium accounts to digital services.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayCategories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group"
            >
              <Card className="h-full glass-effect border-border/20 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardContent className="p-6 text-center space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform animate-float" 
                       style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="text-2xl text-white">
                      {category.icon || '📦'}
                    </span>
                  </div>

                  {/* Category Name */}
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>

                  {/* Description */}
                  {category.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  )}

                  {/* Product Count */}
                  {category.productCount !== undefined && (
                    <Badge variant="secondary" className="text-xs">
                      {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
                    </Badge>
                  )}

                  {/* Hover Effect */}
                  <div className="w-0 group-hover:w-full h-0.5 bg-gradient-primary transition-all duration-300 mx-auto" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {!showAll && categories.length > 8 && (
          <div className="text-center mt-8">
            <Link
              to="/categories"
              className="inline-flex items-center justify-center px-6 py-3 gradient-primary text-white rounded-lg font-medium hover:shadow-glow transition-all duration-300"
            >
              View All Categories
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}