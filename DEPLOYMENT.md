# Deployment Guide - Egytrans HR Chatbot

Complete step-by-step guide to deploy the Egytrans HR Bot to production.

## 📋 Pre-Deployment Checklist

**Admin Setup:**
- [ ] Changed default admin password from settings panel
- [ ] Uploaded all HR documents (policies, leave rules, salary info)
- [ ] Added all employees with their IDs and PINs
- [ ] Tested login with a test employee account
- [ ] Asked 10+ test questions and verified responses

**Quality Assurance:**
- [ ] No broken links or UI issues
- [ ] All documents are searchable and relevant
- [ ] Employee login works smoothly
- [ ] Admin panel fully functional
- [ ] Responsive on mobile devices

---

## 🚀 Deployment Steps

### Step 1: Prepare Local Environment

```bash
# Navigate to project folder
cd egytrans-hr-bot

# Create .env.local with your API key
echo 'VITE_ANTHROPIC_KEY=sk-ant-api03-YOUR-KEY-HERE' > .env.local

# Install dependencies (if not done)
npm install

# Test locally
npm run dev
```

Visit `http://localhost:5173` and verify everything works.

### Step 2: Push to GitHub

```bash
# Configure git (if needed)
git config --global user.email "your-email@egytrans.com"
git config --global user.name "Your Name"

# Stage all changes
git add .

# Commit
git commit -m "HR Bot: Ready for production - includes all policies and employees"

# Add remote (first time only)
git remote add origin https://github.com/YOUR_USERNAME/egytrans-hr-bot.git

# Push to main branch
git push -u origin main
```

✅ Code is now on GitHub!

### Step 3: Deploy on Vercel

1. **Visit [vercel.com](https://vercel.com)**
   - Sign up or log in with GitHub account

2. **Create New Project**
   - Click "Add New Project"
   - Select your `egytrans-hr-bot` repository
   - Framework: **React** (auto-detected)
   - Root directory: **./** (default)

3. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add variable:
     - Name: `VITE_ANTHROPIC_KEY`
     - Value: `sk-ant-api03-your-actual-key`
   - Click Save

4. **Deploy!**
   - Click the "Deploy" button
   - Wait 1-2 minutes

✅ **Live URL:** Your app will be at `https://egytrans-hr-bot.vercel.app` (or custom domain)

### Step 4: Test Production Build

```bash
# Test building locally
npm run build

# Preview production build
npm run preview
```

Both should work without errors.

---

## 🌐 Custom Domain (Optional but Recommended)

### Connect Domain to Vercel

1. **Go to Vercel Dashboard → Settings → Domains**
2. **Add Domain**
   - Enter: `hr.egytrans.com` (or your preferred domain)
   - Click "Add"
3. **Update DNS at Your Domain Provider**

   If domain is on Namecheap/GoDaddy:
   - Go to DNS Settings
   - Add CNAME record:
     ```
     Name: hr
     Value: cname.vercel-dns.com
     ```
   - Or follow Vercel's exact instructions shown in the panel

4. **SSL Automatically Applied**
   - Vercel adds HTTPS automatically
   - Within 5-10 minutes, your domain works with SSL ✅

---

## 🔐 Security Best Practices

### Before Going Live

1. **Change Admin Password Immediately**
   ```
   ⚠️ DON'T use default: egytrans_admin / EgyHR@2025
   Go to Admin → Settings → Change password
   ```

2. **Limit Access (Optional)**
   - Keep it in your office network if possible
   - Share URL only with authorized employees
   - Consider adding IP whitelisting (contact Vercel support)

3. **Regular Backups**
   - Download employee list periodically
   - Screenshot important documents
   - Export chat history if needed

### Data Privacy

- Data stored in **browser's localStorage** (device-only)
- No data sent to servers except API calls to Claude
- Each employee sees only their own chats
- Admin can see all data in dashboard

---

## 📱 Share with Employees

### Email Template

---

**Subject:** Access Your HR Assistant - نور (Noor)

Dear Team,

We're excited to introduce **نور (Noor)** - your AI-powered HR Assistant! Get instant answers about:
- Leave balances and policies
- Salary and benefits
- Insurance and deductions
- Company procedures

**Access Link:** https://hr.egytrans.com  
(or your Vercel URL)

**Your Login Details:**
- Employee ID: `[INDIVIDUAL ID]`
- PIN: `[INDIVIDUAL PIN]`

**First Time?**
1. Click the link above
2. Select "👤 موظف" (Employee)
3. Enter your ID and PIN
4. Start chatting!

Questions? Contact HR.

---

### Training Session Suggestions

1. **Live Demo** - Show a sample question and answer
2. **How to Use** - Explain Arabic/English support
3. **Common Questions** - Demonstrate 5-10 typical queries
4. **Support Channel** - Provide contact for HR issues bot can't solve

---

## 📊 Monitoring & Maintenance

### Weekly Checks

- [ ] Verify deployment is active
- [ ] Test 2-3 employee logins
- [ ] Ask a test question
- [ ] Check for any error messages

### Monthly Updates

- [ ] Review employee feedback
- [ ] Update policies if needed
- [ ] Add new documents
- [ ] Monitor API usage costs

### Cost Management

**Current Estimated Costs:**
- Vercel Hosting: $0 (free tier)
- Claude API: ~$3-15/month (depends on usage)
- Custom Domain: ~$10/year (optional)
- Supabase DB: $0 (free tier) or $25/month (recommended for production)

**Total: ~$3-40/month**

---

## 🆘 Troubleshooting Deployment

### Bot says "API key not configured"

**Solution:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify `VITE_ANTHROPIC_KEY` is set
3. Redeploy: Click "Deployments" → Three dots on latest → "Redeploy"

### Changes not showing

**Solution:**
1. Wait 30 seconds (Vercel rebuilds might be in progress)
2. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Clear browser cache if still not working

### Performance is slow

**Solution:**
1. First API call is slower (Claude cold start)
2. Subsequent responses are faster
3. Try rephrasing the question if timeout occurs

### Employees can't log in

**Solution:**
1. Double-check employee ID and PIN in admin panel
2. Reset employee credentials from admin panel
3. Verify their company name matches their profile

---

## 🚄 Advanced Deployment Options

### Option A: Upgrade Database to Supabase (Recommended for Production)

```bash
# Install Supabase
npm install @supabase/supabase-js

# Add to .env.local
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_KEY=eyJhbG...
```

**Benefits:**
- ✅ Data persists across sessions
- ✅ Real-time backups
- ✅ Larger storage capacity
- ✅ Better performance

**Cost:** Free tier or $25/month for production

### Option B: WhatsApp Business API Integration

Enable employees to chat via WhatsApp:
1. Create Meta Business account
2. Enable WhatsApp API
3. Set webhook to your Vercel URL
4. Handle incoming messages in backend

**Cost:** Free + $0.024 per chat after 1000/month

### Option C: Odoo HR Integration

Sync employee data automatically:
1. Enable Odoo REST API
2. Create API user in Odoo
3. Set up webhook for employee data updates
4. Auto-populate leave balance and salary

**Cost:** Depends on Odoo plan

---

## 📞 Support & Contacts

- **Vercel Issues:** [vercel.com/support](https://vercel.com/support)
- **Claude API Help:** [anthropic.com/support](https://anthropic.com/support)
- **Domain Issues:** Contact your domain provider
- **Internal:** HR Manager or IT Team

---

## ✅ Congratulations!

Your HR Bot is now live and serving your team! 🎉

**Next Steps:**
1. Monitor for first week
2. Gather employee feedback
3. Update policies as needed
4. Plan for WhatsApp/Odoo integration

---

**Version:** 1.0  
**Last Updated:** March 2025  
**Maintained By:** Egytrans NOSCO IT Team
