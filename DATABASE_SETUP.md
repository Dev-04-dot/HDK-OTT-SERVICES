# 🗄️ Database Connection Setup Guide

Complete guide to connecting to your OTT Marketplace database using various tools.

---

## 📋 Table of Contents

- [Connection Information](#connection-information)
- [Method 1: pgAdmin (Recommended for Beginners)](#method-1-pgadmin)
- [Method 2: DBeaver (Cross-Platform)](#method-2-dbeaver)
- [Method 3: TablePlus (Mac/Windows)](#method-3-tableplus)
- [Method 4: Supabase CLI](#method-4-supabase-cli)
- [Method 5: psql Command Line](#method-5-psql-command-line)
- [Common Issues & Solutions](#common-issues--solutions)

---

## 🔑 Connection Information

Your database credentials:

```
Host:     db.qauezbnxpftstfubctaf.supabase.co
Port:     5432
Database: postgres
User:     postgres
SSL Mode: require (mandatory)
```

**Getting Your Password:**
1. Open your Lovable project
2. Go to **Cloud** → **Settings** → **API Keys**
3. Look for **Database Password** or **Service Role Key**
4. Copy this password for use in connection tools

⚠️ **IMPORTANT**: Keep your database password secure. Never commit it to version control or share it publicly.

---

## Method 1: pgAdmin

**Best for**: Windows/Mac/Linux users who want a powerful GUI tool

### Step 1: Download & Install

1. Visit [https://www.pgadmin.org/download/](https://www.pgadmin.org/download/)
2. Choose your operating system:
   - **Windows**: Download `.exe` installer
   - **Mac**: Download `.dmg` file
   - **Linux**: Use package manager or download `.deb`/`.rpm`
3. Run the installer and follow the setup wizard
4. Launch pgAdmin 4

### Step 2: Register New Server

1. **Open pgAdmin** - You'll see the main dashboard
2. In the left sidebar, **right-click** on "Servers"
3. Select **Register** → **Server**
4. A dialog window will open with multiple tabs

### Step 3: Configure General Settings

In the **General** tab:
- **Name**: `OTT Marketplace Database` (or any name you prefer)

### Step 4: Configure Connection

Switch to the **Connection** tab and enter:

| Field | Value |
|-------|-------|
| Host name/address | `db.qauezbnxpftstfubctaf.supabase.co` |
| Port | `5432` |
| Maintenance database | `postgres` |
| Username | `postgres` |
| Password | [Your password from Lovable Cloud] |
| Save password? | ✓ Check this box (recommended) |

### Step 5: Configure SSL

Switch to the **SSL** tab:
- **SSL mode**: Select `Require` from dropdown

### Step 6: Save & Connect

1. Click the **Save** button at bottom
2. pgAdmin will attempt to connect
3. If successful, you'll see your server in the left sidebar

### Step 7: Browse Your Data

1. Expand **Servers** → **OTT Marketplace Database**
2. Expand **Databases** → **postgres**
3. Expand **Schemas** → **public**
4. Expand **Tables** - you'll see all your tables:
   - `products`
   - `profiles`
   - `orders`
   - `reviews`
   - `categories`
   - `favorites`

### Step 8: View Table Data

To view data in any table:
1. **Right-click** on the table (e.g., `products`)
2. Select **View/Edit Data** → **All Rows**
3. Data will appear in a spreadsheet-like view
4. You can sort, filter, and edit data here

### Step 9: Run Custom Queries

To run SQL queries:
1. Right-click your database → **Query Tool**
2. Type your SQL query:
```sql
-- Get all active products
SELECT * FROM products WHERE status = 'active';

-- Get user profiles
SELECT username, full_name, rating FROM profiles;

-- Get recent orders
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;
```
3. Press **F5** or click the ▶️ Play button to execute

---

## Method 2: DBeaver

**Best for**: Users who want a free, feature-rich, cross-platform tool

### Step 1: Download & Install

1. Visit [https://dbeaver.io/download/](https://dbeaver.io/download/)
2. Download **Community Edition** (free)
   - Available for Windows, Mac, Linux
3. Install following the wizard
4. Launch DBeaver

### Step 2: Create New Connection

1. Click **Database** in the top menu
2. Select **New Database Connection**
3. Or click the **🔌 Plug icon** in the toolbar

### Step 3: Select Database Type

1. In the connection wizard, find and select **PostgreSQL**
2. Click **Next**

### Step 4: Enter Connection Details

On the **Main** tab, fill in:

| Field | Value |
|-------|-------|
| Host | `db.qauezbnxpftstfubctaf.supabase.co` |
| Port | `5432` |
| Database | `postgres` |
| Username | `postgres` |
| Password | [Your password from Lovable Cloud] |
| Save password locally | ✓ Check this |

### Step 5: Configure SSL

1. Click on the **SSL** tab
2. Check **Use SSL**
3. SSL Mode: Select **require**

### Step 6: Test Connection

1. Click **Test Connection** button at bottom
2. If this is your first time:
   - DBeaver will prompt to download PostgreSQL driver
   - Click **Download** and wait
3. Should see "Connected" message
4. Click **Finish**

### Step 7: Navigate Your Database

In the **Database Navigator** (left panel):
1. Expand your connection
2. Expand **Databases** → **postgres**
3. Expand **Schemas** → **public**
4. Expand **Tables**

### Step 8: View & Edit Data

To view table contents:
1. **Right-click** any table
2. Select **View Data**
3. Data opens in a tab with:
   - Sortable columns
   - Filters
   - Inline editing
   - Export options

### Step 9: Execute SQL Queries

1. Click **SQL Editor** → **New SQL Script** (or press Ctrl+])
2. Write your query:
```sql
-- Find products by category
SELECT title, price, category 
FROM products 
WHERE category = 'Streaming Services';

-- Get top-rated sellers
SELECT p.username, p.rating, p.total_reviews
FROM profiles p
ORDER BY p.rating DESC
LIMIT 10;
```
3. Press **Ctrl+Enter** to execute
4. Results appear below the editor

---

## Method 3: TablePlus

**Best for**: Mac/Windows users who want a beautiful, modern UI

### Step 1: Download & Install

1. Visit [https://tableplus.com/](https://tableplus.com/)
2. Download for your platform (Mac/Windows/Linux)
3. Install the application
4. Open TablePlus

**Note**: TablePlus has a free tier with limitations. Consider purchasing if you use it regularly.

### Step 2: Create New Connection

1. Press **⌘+N** (Mac) or **Ctrl+N** (Windows)
2. Or click the **+** button at bottom left
3. Select **PostgreSQL** from the list

### Step 3: Fill Connection Details

A connection form appears. Fill in:

| Field | Value |
|-------|-------|
| Name | `OTT Marketplace` |
| Host | `db.qauezbnxpftstfubctaf.supabase.co` |
| Port | `5432` |
| User | `postgres` |
| Password | [Your password from Lovable Cloud] |
| Database | `postgres` |
| SSL | Check **Use SSL** |

### Step 4: Test & Connect

1. Click **Test** at the bottom
2. Should show "Connection successful"
3. Click **Connect**

### Step 5: Browse Tables

1. In the left sidebar, expand **public** schema
2. You'll see all tables listed
3. Click any table to view its data
4. Use the **Search** bar at top to filter

### Step 6: Query Data

1. Press **⌘+T** (Mac) or **Ctrl+T** (Windows) for new query tab
2. Write SQL:
```sql
-- Get order statistics
SELECT 
  status,
  COUNT(*) as count,
  SUM(total_amount) as total
FROM orders
GROUP BY status;
```
3. Press **⌘+R** (Mac) or **Ctrl+R** (Windows) to run

---

## Method 4: Supabase CLI

**Best for**: Developers who prefer command-line tools

### Step 1: Install Supabase CLI

**Using npm** (recommended):
```bash
npm install -g supabase
```

**Using Homebrew** (Mac):
```bash
brew install supabase/tap/supabase
```

**Using Scoop** (Windows):
```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Step 2: Login to Supabase

```bash
supabase login
```

This will open a browser for authentication.

### Step 3: Link Your Project

```bash
supabase link --project-ref qauezbnxpftstfubctaf
```

When prompted for database password, enter your password from Lovable Cloud.

### Step 4: Useful Commands

**View database information:**
```bash
supabase db dump
```

**Apply migrations:**
```bash
supabase db push
```

**View database logs:**
```bash
supabase db logs
```

**Create new migration:**
```bash
supabase migration new migration_name
```

**View project status:**
```bash
supabase status
```

---

## Method 5: psql Command Line

**Best for**: Advanced users comfortable with terminal

### Step 1: Install psql

**Mac (using Homebrew):**
```bash
brew install postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt-get install postgresql-client
```

**Windows:**
Download from [PostgreSQL.org](https://www.postgresql.org/download/windows/)

### Step 2: Connect to Database

```bash
psql "postgresql://postgres:[YOUR_PASSWORD]@db.qauezbnxpftstfubctaf.supabase.co:5432/postgres?sslmode=require"
```

Replace `[YOUR_PASSWORD]` with your actual database password.

### Step 3: Common psql Commands

Once connected, you can use:

```sql
-- List all tables
\dt

-- Describe a table structure
\d products

-- List all schemas
\dn

-- List all databases
\l

-- View table data
SELECT * FROM products LIMIT 10;

-- Exit psql
\q
```

### Step 4: Create a Connection Alias

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
alias ottdb='psql "postgresql://postgres:[YOUR_PASSWORD]@db.qauezbnxpftstfubctaf.supabase.co:5432/postgres?sslmode=require"'
```

Now you can connect with just:
```bash
ottdb
```

---

## 🚨 Common Issues & Solutions

### Issue 1: "Connection refused" or "Could not connect"

**Solutions:**
- ✅ Check your internet connection
- ✅ Verify the host is exactly: `db.qauezbnxpftstfubctaf.supabase.co`
- ✅ Ensure port is `5432`
- ✅ Confirm SSL is enabled/required

### Issue 2: "Authentication failed" or "Password incorrect"

**Solutions:**
- ✅ Go to Lovable Cloud → Settings → API Keys
- ✅ Copy the **Database Password** or **Service Role Key**
- ✅ Make sure there are no extra spaces when pasting
- ✅ Try resetting the password in Lovable Cloud settings

### Issue 3: "SSL connection required"

**Solution:**
- ✅ Ensure SSL mode is set to **require** in your connection settings
- ✅ For psql, use `?sslmode=require` in connection string

### Issue 4: "Role 'postgres' does not exist"

**Solution:**
- ✅ Check that username is exactly `postgres` (lowercase)
- ✅ Not `Postgres` or `POSTGRES`

### Issue 5: Tables are empty or missing

**Solutions:**
- ✅ Make sure you're looking in the **public** schema
- ✅ Run the setup script at `/setup-products` if products are missing
- ✅ Check if you're connected to the right database (should be `postgres`)

### Issue 6: Can't edit data in pgAdmin/DBeaver

**Cause:** Row Level Security (RLS) policies prevent direct edits

**Solutions:**
- ✅ Use the application UI to modify data
- ✅ Or temporarily disable RLS (not recommended for production):
```sql
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
-- Do your edits
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
```

---

## 🔒 Security Best Practices

1. **Never commit passwords** to Git repositories
2. **Use environment variables** for sensitive data
3. **Don't share database credentials** publicly
4. **Use read-only connections** when you don't need write access
5. **Regularly rotate passwords** for production databases
6. **Monitor database logs** for suspicious activity
7. **Use VPN** if accessing from public networks

---

## 📚 Next Steps

After connecting successfully:

1. **Explore the schema** - Understand table relationships
2. **Run sample queries** - Get familiar with the data
3. **Check RLS policies** - Understand security rules
4. **Review indexes** - See query optimization
5. **Monitor performance** - Watch slow queries
6. **Create backups** - Use `pg_dump` for backups

---

## 🆘 Still Need Help?

If you're still having trouble:

1. **Check Lovable Cloud status** - Ensure services are running
2. **Review connection logs** - Look for specific error messages
3. **Try a different tool** - Some tools handle SSL differently
4. **Contact support** - Reach out with specific error messages

---

**Happy querying! 🎉**
