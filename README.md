# Egytrans HR Chatbot (نور)

AI-powered HR Assistant for Egytrans NOSCO Group. Built with React, Vite, and Claude AI.

## Features

✅ **Employee Chat Interface** - Ask HR questions in Arabic/English  
✅ **RAG Knowledge Base** - Search through HR policies and documents  
✅ **Admin Dashboard** - Manage employees, documents, and settings  
✅ **Secure Login** - PIN-based employee access + admin panel  
✅ **Mobile Responsive** - Works on all devices  
✅ **Zero Backend** - Data stored in browser's localStorage  

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Claude API Key
- Go to [console.anthropic.com](https://console.anthropic.com)
- Create an account
- Get your API key from the console

### 3. Create `.env.local`
```bash
VITE_ANTHROPIC_KEY=sk-ant-api03-xxxxxxxxxxxxxxx
```

### 4. Run Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

**Default Credentials:**
- Employee: empId=`EGY-001`, pin=`0000` (add from admin)
- Admin: user=`egytrans_admin`, pass=`EgyHR@2025`

## Deployment to Vercel (Free!)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial HR Bot Setup"
git remote add origin https://github.com/YOUR_USERNAME/egytrans-hr-bot.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Select your GitHub repository
4. Go to **Settings → Environment Variables**
5. Add: `VITE_ANTHROPIC_KEY` = your API key
6. Click **Deploy**

✅ Your app is now live! URL will be shown After deployment

### Step 3: Custom Domain (Optional)

In Vercel Settings → Domains:
- Add your domain (e.g., `hr.egytrans.com`)
- Follow DNS setup instructions
- SSL certificate is automatic ✨

## File Structure

```
egytrans-hr-bot/
├── src/
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── ...
├── package.json         # Dependencies
├── vite.config.js       # Build config
├── index.html           # HTML template
└── .env.local          # API keys (don't commit!)
```

## Data Storage

- **Local Storage** - Data persists in browser (good for demo)
- **Supabase** - For production (optional upgrade)
- **Odoo Integration** - Ready for employee data sync

## Admin Panel Features

### 📂 Upload Files
- Add HR policies, leave regulations, salary sheets
- Text will be chunked for RAG search
- Supports .txt, .doc, .docx

### 👥 Manage Employees
- Add employees with ID and PIN
- Employees use these for login
- Can delete or modify anytime

### ⚙️ Settings
- Change admin username/password
- **⚠️ Change default password before sharing!**

### 🚀 Deployment Guide
- Step-by-step instructions included
- Cost breakdown (~$3-15/month)
- Security checklist

## Environment Variables

```bash
# Required for AI responses
VITE_ANTHROPIC_KEY=sk-ant-api03-xxxxx

# Optional for future upgrades
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_KEY=eyJxx...
```

## Customization

### Change Company Info
Edit `LOGO` and company name in `src/App.jsx`

### Customize Welcome Message
Find `"أهلاً ${emp.name}"` in `EmpApp` component

### Add More Employees
Use Admin Panel → Employees tab → Add

### Change Admin Credentials
Use Admin Panel → Settings tab

## Troubleshooting

### "API key not configured"
- Add `VITE_ANTHROPIC_KEY` to `.env.local`
- Restart dev server: `npm run dev`

### "No documents found"
- Go to Admin → Upload Files
- Add at least one HR document

### Responses are slow
- First API call takes 5-10 seconds (cold start)
- Subsequent calls are faster

### Data disappears after refresh
- Data is in browser localStorage
- Clear cache will reset data
- Consider upgrading to Supabase for persistence

## Production Checklist

- [ ] Change admin password from default
- [ ] Upload all HR policies/documents
- [ ] Add all employees
- [ ] Test employee login with real credentials
- [ ] Test 5-10 questions
- [ ] Deploy to Vercel with API key
- [ ] Get custom domain (optional)
- [ ] Share URL with HR team
- [ ] Share URL with employees with instructions

## Support & Next Steps

1. **Upgrade Storage**: Add Supabase for data persistence
2. **WhatsApp Integration**: Add WhatsApp Business API
3. **Odoo Sync**: Auto-import employee data from Odoo
4. **Analytics**: Track common questions
5. **Multi-language**: Expand beyond Arabic/English

## License

Proprietary - Egytrans NOSCO

---

**Built with ❤️ for Egytrans NOSCO Group**  
Questions? Contact HR Team
