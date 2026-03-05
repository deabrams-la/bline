# 🌻 B-Line — Brianna's Village

A support app for Brianna's cancer treatment journey. Built with React + Firebase.

---

## 🚀 DEPLOYMENT GUIDE (Step by Step)

### Step 1: Create a GitHub Repository

1. Go to **github.com** and sign in
2. Click the **+** icon in the top-right → **New repository**
3. Name it: `bline`
4. Leave it as **Public** (this is fine — the code is safe to share)
5. **Do NOT** check "Add a README" — leave it empty
6. Click **Create repository**
7. You'll see a page with setup instructions — **keep this tab open**, you'll need the URL

### Step 2: Upload the Code to GitHub

The easiest way (no terminal needed):

1. On your new repository page, you'll see a link that says **"uploading an existing file"** — click it
2. Drag and drop ALL the files from the `bline` folder I gave you
3. **Important**: You need to maintain the folder structure. The easiest way:
   - Download the ZIP I provide
   - Extract it on your computer
   - Go to your GitHub repo → Click **"Add file"** → **"Upload files"**
   - Drag the entire contents of the extracted folder into the upload area
4. Click **"Commit changes"**

### Step 3: Deploy on Vercel

1. Go to **vercel.com** and sign in (use your GitHub account)
2. Click **"Add New..."** → **"Project"**
3. You'll see your `bline` repo listed — click **"Import"**
4. Under **"Framework Preset"**, select **Vite**
5. Click **"Deploy"**
6. Wait ~60 seconds for it to build
7. 🎉 **You'll get a live URL** like `bline-abc123.vercel.app`

### Step 4: Share with the Village!

Send that URL to your family and friends. On iPhone, they can:
1. Open the link in Safari
2. Tap the Share button (square with arrow)
3. Tap **"Add to Home Screen"**
4. It appears as an app icon! 📱

---

## 👤 How Users Work

- First visit: Everyone enters their name (stored in their browser)
- **Dan** or **Brianna** (as admin names) get admin controls:
  - Post pinned updates
  - Toggle "I'm Resting" mode
  - Complete chemo rounds
  - Access the admin panel
- Everyone else can send wishes, recommend media, and share advice

## 🔄 Making Changes Later

1. Edit the code in your GitHub repo (or ask Claude to make changes)
2. Vercel automatically redeploys when you push changes
3. Everyone sees the update immediately — no app store needed

## 📁 Project Structure

```
bline/
├── index.html          ← Entry HTML with PWA meta tags
├── package.json        ← Dependencies
├── vite.config.js      ← Build config
├── public/
│   ├── favicon.svg     ← 🌻 icon
│   └── manifest.json   ← PWA manifest (add to home screen)
└── src/
    ├── main.jsx        ← React entry point
    ├── App.jsx         ← Main app (all UI + logic)
    ├── firebase.js     ← Firebase config + auth
    └── hooks.js        ← Database hooks
```
