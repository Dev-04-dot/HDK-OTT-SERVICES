# OTT Marketplace - Digital Subscription Platform

> A modern, full-stack e-commerce marketplace for digital subscriptions and OTT platform access, built with React, TypeScript, and Lovable Cloud (Supabase).

[![Lovable](https://img.shields.io/badge/Built%20with-Lovable-ff69b4)](https://lovable.dev)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Database Connection Guide](#database-connection-guide)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

OTT Marketplace is a comprehensive digital marketplace platform designed for buying and selling subscription-based services, primarily focusing on OTT (Over-The-Top) streaming platforms like Netflix, Prime Video, Disney+ Hotstar, and more.

### Key Highlights

- 🎯 **Multi-vendor Support**: Users can both buy and sell subscriptions
- 🔐 **Secure Authentication**: Built-in user authentication with role-based access
- 💳 **Order Management**: Complete order tracking and management system
- ⭐ **Reviews & Ratings**: Built-in review system for sellers
- 📱 **Responsive Design**: Mobile-first, fully responsive UI
- 🎨 **Modern UI/UX**: Built with shadcn/ui and Tailwind CSS
- 🚀 **Real-time Updates**: Powered by Lovable Cloud backend

---

## ✨ Features

### For Buyers
- Browse extensive catalog of OTT subscriptions
- Advanced search and filtering
- Shopping cart with persistent state
- Wishlist/Favorites functionality
- Secure checkout process
- Order history and tracking
- Seller reviews and ratings

### For Sellers
- Seller dashboard for product management
- Add, edit, and delete products
- Order management and fulfillment
- View sales analytics
- Manage contact information

### For Admins
- Complete admin dashboard
- User management
- Category management
- Product moderation
- System analytics and reporting

---

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **Lucide React** - Icon library
- **React Query** - Data fetching and caching

### Backend (Lovable Cloud)
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database
- **Row Level Security (RLS)** - Database security
- **Supabase Auth** - Authentication
- **Supabase Storage** - File storage (ready to use)

### State Management
- **React Context API** - Global state (Auth, Cart)
- **TanStack Query** - Server state management

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **bun** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Environment Setup**

The `.env` file is automatically configured with your Lovable Cloud credentials:

```env
VITE_SUPABASE_PROJECT_ID="qauezbnxpftstfubctaf"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-key"
VITE_SUPABASE_URL="https://qauezbnxpftstfubctaf.supabase.co"
```

⚠️ **Note**: Never commit `.env` files with sensitive credentials to public repositories.

4. **Start the development server**
```bash
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

---

## 🗄️ Database Connection Guide

### Method 1: Using Lovable Cloud Interface (Recommended)

1. Open your Lovable project
2. Click on **Cloud** in the top navigation
3. Access **Database**, **Tables**, **Users**, **Logs**, and **Security** sections

### Method 2: Direct Database Connection (Advanced)

#### Connection Details

```
Host: db.qauezbnxpftstfubctaf.supabase.co
Port: 5432
Database: postgres
User: postgres
SSL Mode: require
```

#### Using pgAdmin (GUI Tool)

**Step 1: Download and Install pgAdmin**
- Visit [pgAdmin.org](https://www.pgadmin.org/download/)
- Download for your operating system (Windows/Mac/Linux)
- Install following the setup wizard

**Step 2: Add New Server**
1. Open pgAdmin
2. Right-click **Servers** → **Register** → **Server**
3. In the **General** tab:
   - **Name**: OTT Marketplace Database
4. In the **Connection** tab:
   - **Host name/address**: `db.qauezbnxpftstfubctaf.supabase.co`
   - **Port**: `5432`
   - **Maintenance database**: `postgres`
   - **Username**: `postgres`
   - **Password**: [Get from Lovable Cloud → Settings → Database Connection]
   - **Save password**: ✓ (optional)
5. In the **SSL** tab:
   - **SSL mode**: Require
6. Click **Save**

**Step 3: Browse Your Data**
- Expand **Servers** → **OTT Marketplace Database**
- Navigate to **Databases** → **postgres** → **Schemas** → **public** → **Tables**
- Right-click any table → **View/Edit Data** → **All Rows**

#### Using DBeaver (GUI Tool)

**Step 1: Install DBeaver**
- Visit [DBeaver.io](https://dbeaver.io/download/)
- Download Community Edition (free)
- Install the application

**Step 2: Create New Connection**
1. Click **Database** → **New Database Connection**
2. Select **PostgreSQL** → **Next**
3. Enter connection details:
   - **Host**: `db.qauezbnxpftstfubctaf.supabase.co`
   - **Port**: `5432`
   - **Database**: `postgres`
   - **Username**: `postgres`
   - **Password**: [From Lovable Cloud settings]
4. Click **Test Connection**
5. If prompted, download PostgreSQL driver
6. Click **Finish**

**Step 3: Query Your Database**
- Right-click connection → **SQL Editor** → **New SQL Script**
- Run queries like:
```sql
SELECT * FROM products LIMIT 10;
SELECT * FROM profiles;
SELECT * FROM orders;
```

#### Using TablePlus (GUI Tool - Mac/Windows)

**Step 1: Install TablePlus**
- Visit [TablePlus.com](https://tableplus.com/)
- Download and install

**Step 2: Create Connection**
1. Click **Create a new connection**
2. Select **PostgreSQL**
3. Fill in details:
   - **Name**: OTT Marketplace
   - **Host**: `db.qauezbnxpftstfubctaf.supabase.co`
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: [From Lovable Cloud]
   - **Database**: `postgres`
   - **SSL**: Require
4. Click **Test** → **Connect**

#### Using Supabase CLI

**Step 1: Install CLI**
```bash
npm install -g supabase
```

**Step 2: Link Project**
```bash
supabase link --project-ref qauezbnxpftstfubctaf
```

**Step 3: Run Commands**
```bash
# View database status
supabase db dump

# Run migrations
supabase db push

# View logs
supabase functions logs
```

#### Using psql (Command Line)

```bash
psql "postgresql://postgres:[PASSWORD]@db.qauezbnxpftstfubctaf.supabase.co:5432/postgres?sslmode=require"
```

Replace `[PASSWORD]` with your database password from Lovable Cloud.

### Getting Your Database Password

1. Open your Lovable project
2. Go to **Cloud** → **Settings** → **API Keys**
3. Find **Database Password** or **Service Role Key**
4. Copy and use in your connection tool

⚠️ **Security Warning**: Never share your database password or commit it to version control.

---

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── CategoryGrid.tsx
│   │   ├── ProductCard.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/           # React Context providers
│   │   └── CartContext.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.tsx
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── integrations/       # External service integrations
│   │   └── supabase/
│   │       ├── client.ts   # Supabase client
│   │       └── types.ts    # Auto-generated types
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Auth.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── SellerDashboard.tsx
│   │   ├── SetupProducts.tsx
│   │   └── Wishlist.tsx
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles & design tokens
├── supabase/
│   ├── migrations/         # Database migrations
│   └── config.toml         # Supabase configuration
├── public/                 # Static assets
├── .env                    # Environment variables (auto-generated)
├── package.json            # Dependencies
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## 🔐 Authentication

### Setting Up Admin Access

**First-Time Setup**:
1. Navigate to `/auth`
2. **Sign up** (not sign in) with:
   - Email: `admin@demo.com`
   - Password: `admin123`
3. The system will automatically grant admin privileges
4. You can now access `/admin` dashboard

### User Roles

- **Admin**: Full system access, user management, product moderation
- **Seller**: Can list and manage products, view orders
- **Buyer**: Can browse, purchase, and review products

### Protected Routes

```typescript
// Example from App.tsx
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

---

## 🗃️ Database Schema

### Core Tables

#### `profiles`
User profile information
```sql
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- username (text)
- full_name (text)
- avatar_url (text)
- bio (text)
- phone (text)
- location (text)
- is_verified (boolean)
- is_admin (boolean)
- rating (numeric)
- total_reviews (integer)
- social_links (jsonb)
```

#### `products`
Product listings
```sql
- id (uuid, primary key)
- seller_id (uuid, references profiles)
- title (text)
- description (text)
- category (text)
- subcategory (text)
- price (numeric)
- condition (text)
- status (text: active/sold/inactive)
- image_url (text)
- gallery_urls (text[])
- features (jsonb)
- specifications (jsonb)
- contact_info (jsonb)
- location (text)
- view_count (integer)
- is_featured (boolean)
```

#### `orders`
Purchase orders
```sql
- id (uuid, primary key)
- buyer_id (uuid)
- seller_id (uuid)
- product_id (uuid)
- total_amount (numeric)
- status (text: pending/confirmed/completed/cancelled)
- shipping_address (jsonb)
- notes (text)
```

#### `reviews`
User reviews and ratings
```sql
- id (uuid, primary key)
- reviewer_id (uuid)
- reviewed_user_id (uuid)
- order_id (uuid)
- rating (integer: 1-5)
- comment (text)
```

#### `categories`
Product categories
```sql
- id (uuid, primary key)
- name (text)
- slug (text)
- description (text)
- icon (text)
- parent_id (uuid, self-reference)
- sort_order (integer)
- is_active (boolean)
```

#### `favorites`
User wishlist/favorites
```sql
- id (uuid, primary key)
- user_id (uuid)
- product_id (uuid)
```

### Row Level Security (RLS)

All tables have RLS enabled with policies:
- Users can view their own data
- Users can create/update their own records
- Admins have full access
- Public read access for products and categories

---

## 🔌 API Documentation

### Using Supabase Client

```typescript
import { supabase } from "@/integrations/supabase/client";

// Fetch products
const { data: products, error } = await supabase
  .from('products')
  .select('*')
  .eq('status', 'active');

// Create order
const { data: order, error } = await supabase
  .from('orders')
  .insert({
    buyer_id: user.id,
    product_id: productId,
    total_amount: price
  });

// Update profile
const { error } = await supabase
  .from('profiles')
  .update({ full_name: 'New Name' })
  .eq('user_id', user.id);
```

### Authentication

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
  options: {
    data: {
      full_name: 'John Doe',
      username: 'johndoe'
    }
  }
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Sign out
await supabase.auth.signOut();
```

---

## 🚀 Deployment

### Deploying to Lovable

1. Open your project in Lovable
2. Click **Share** → **Publish**
3. Your app is now live!

### Custom Domain

1. Go to **Project Settings** → **Domains**
2. Click **Connect Domain**
3. Follow DNS configuration steps
4. [Learn more](https://docs.lovable.dev/features/custom-domain)

### Environment Variables for Production

Lovable automatically manages environment variables. No additional configuration needed!

---

## 🔒 Security

### Best Practices Implemented

✅ Row Level Security (RLS) on all tables
✅ Authentication required for sensitive operations
✅ SQL injection prevention through Supabase client
✅ XSS protection through React
✅ HTTPS enforced on production
✅ Password hashing handled by Supabase Auth
✅ CORS configured properly

### Security Checklist

- [ ] Never commit `.env` files
- [ ] Use strong passwords for admin accounts
- [ ] Regularly update dependencies
- [ ] Review RLS policies periodically
- [ ] Monitor database logs for suspicious activity
- [ ] Enable 2FA for admin accounts (if available)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use semantic HTML
- Write meaningful commit messages
- Add comments for complex logic
- Test before submitting PR
- Follow existing code style

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Invalid login credentials"
- **Solution**: Make sure to **sign up** first with admin credentials, not sign in

**Issue**: Can't see products after adding them
- **Solution**: Check RLS policies and authentication status

**Issue**: Build errors
- **Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Issue**: Database connection failed
- **Solution**: Verify your `.env` file has correct credentials and restart dev server

---

## 📚 Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

## 📧 Support

For questions or issues:
- Open an issue in this repository
- Contact: [Your Contact Info]
- Join our [Discord Community](#)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Powered by [Supabase](https://supabase.com)

---

## 🎯 Roadmap

- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Social media login
- [ ] Automated refund system

---

**Made with ❤️ using Lovable**

Project URL: [https://lovable.dev/projects/736e031d-d6b3-4416-a17c-87c542c3a46e](https://lovable.dev/projects/736e031d-d6b3-4416-a17c-87c542c3a46e)
