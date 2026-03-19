# Quick Start Guide

Get your HR Bot running in 5 minutes!

## Option 1: Run Locally (For Testing)

### 1. Get Prerequisites
- Node.js installed ([nodejs.org](https://nodejs.org))
- Claude API key from [console.anthropic.com](https://console.anthropic.com)

### 2. Setup
```bash
# Clone or navigate to project
cd egytrans-hr-bot

# Install packages
npm install

# Create .env.local file with:
VITE_ANTHROPIC_KEY=sk-ant-api03-your-key-here
```

### 3. Run
```bash
npm run dev
```

Visit: http://localhost:5173

**Test Login:**
- Mode: 👤 موظف (Employee)
- ID: admin
- PIN: admin

Then use Admin panel to add real employees.

---

## Option 2: Deploy Live (2 minutes)

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Select your GitHub repo
4. Add Environment Variable: `VITE_ANTHROPIC_KEY`
5. Click Deploy

✅ **Done!** Your app is live.

---

## First-Time Admin Setup (Important!)

1. **Login to Admin**
   - Click "⚙️ أدمن" (Admin)
   - User: `egytrans_admin`
   - Pass: `EgyHR@2025`

2. **Change Password** (CRITICAL!)
   - Go to "الإعدادات" (Settings)
   - Change password
   - Click Save

3. **Add Your Employees**
   - Go to "الموظفون" (Employees)
   - Click "＋ إضافة موظف"
   - Add employee ID, name, PIN
   - Save

4. **Upload HR Documents**
   - Go to "رفع الملفات" (Upload Files)
   - Click "＋ رفع مستند جديد"
   - Paste HR policy text
   - Save

5. **Test It!**
   - Logout
   - Login as an employee
   - Ask a question in Arabic/English

---

## 10 Sample Questions for Testing

1. "كم يوم إجازة سنوية لي؟" (How many annual leave days?)
2. "ما سياسة الإجازة المرضية؟" (What's the sick leave policy?)
3. "امتى موعد الراتب؟" (When is payday?)
4. "ما البدلات المتاحة؟" (What allowances available?)
5. "ازاي أطلب شهادة راتب؟" (How to request salary certificate?)
6. "What is the insurance coverage?" (English test)
7. "How many vacation days do I get?" (English test)
8. "ما هي إجراءات الترقية؟" (Promotion procedures?)
9. "عاوز أغيب يوم إجازة، أعمل ايه؟" (I want to take a leave day, what do I do?)
10. "كم تاني يوم إجازة متبقي لي؟" (How many days left this year?)

---

## Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| "API key not configured" | Add VITE_ANTHROPIC_KEY to .env.local or Vercel settings |
| "Can't see my documents" | Upload them in Admin → Upload Files tab |
| "Responses are slow" | First call takes 5-10s • Subsequent are faster |
| "Forgot admin password" | Edit .env or code to reset defaults |
| "Employee login fails" | Check ID/PIN in Admin → Employees panel |

---

## File Structure

```
egytrans-hr-bot/
├── src/
│   ├── App.jsx          ← Main component (2000 lines)
│   └── main.jsx         ← Entry point
├── package.json         ← Dependencies
├── vite.config.js       ← Build config
├── index.html           ← HTML shell
├── .env.local           ← Your API key (don't commit!)
├── README.md            ← Full documentation
├── DEPLOYMENT.md        ← Deployment guide
└── QUICKSTART.md        ← This file
```

---

## Next Steps

1. **✅ Test locally or deploy** - See above options
2. **⚙️ Setup admin & employees** - Follow admin setup above
3. **📤 Upload HR policies** - Add your documents
4. **🧪 Test 10 questions** - Use sample questions above
5. **👥 Share with employees** - Send them the link + credentials
6. **📞 Gather feedback** - Improve and update

---

## Support Resources

- **React Questions:** [react.dev](https://react.dev)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Claude API:** [anthropic.com/docs](https://anthropic.com/docs)
- **Vite Guide:** [vitejs.dev](https://vitejs.dev)

---

**Ready? Start with Option 1 or 2 above!** 🚀
