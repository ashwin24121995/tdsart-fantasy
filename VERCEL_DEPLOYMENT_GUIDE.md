# 🚀 Vercel Deployment Guide - TDSART Fantasy

## Why Deploy to Vercel?

**Problem**: Manus hosting injects `manuscdn.com` scripts that Google Ads flags as malicious, causing your ads to be disapproved.

**Solution**: Deploy to Vercel where you have full control—no unwanted script injections, no manuscdn.com references.

---

## Prerequisites

1. **GitHub Account** - Create one at https://github.com if you don't have it
2. **Vercel Account** - Sign up at https://vercel.com (use GitHub to sign in)
3. **Domain Access** - You'll need to update DNS for tdsartfantasy.com

---

## Step 1: Download Project Code

1. Go to Manus dashboard → Code panel
2. Click "Download All Files" button
3. Extract the ZIP file to your computer

---

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `tdsart-fantasy`
3. Keep it **Private** (recommended)
4. Click "Create repository"
5. Follow instructions to push existing code:

```bash
cd /path/to/extracted/project
git init
git add .
git commit -m "Initial commit - migrating from Manus"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tdsart-fantasy.git
git push -u origin main
```

---

## Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `tdsart-fantasy` repository
4. **Framework Preset**: Select "Other" (custom setup)
5. **Root Directory**: Leave as `.` (root)
6. **Build Command**: `pnpm install && pnpm build`
7. **Output Directory**: `client/dist`
8. **Install Command**: `pnpm install`

Click "Deploy" - Vercel will build and deploy your site.

---

## Step 4: Configure Environment Variables

After deployment, go to your Vercel project → Settings → Environment Variables.

Add these variables (get values from Manus dashboard → Settings → Secrets):

### Required Variables

```
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-jwt-secret-here
CRICKET_API_KEY=1a822521-d7e0-46ff-98d3-3e51020863f3
```

### App Configuration

```
VITE_APP_TITLE=TDSART Fantasy
VITE_APP_LOGO=/favicon.png
```

### Analytics (Optional - if you want to keep Umami)

```
VITE_ANALYTICS_ENDPOINT=https://your-umami-instance.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

**Important**: After adding environment variables, click "Redeploy" to apply them.

---

## Step 5: Update Domain DNS

### Option A: Use Vercel Domain (Easiest)

Vercel gives you a free domain like `tdsart-fantasy.vercel.app`. You can use this temporarily to test.

### Option B: Use Your Custom Domain (tdsartfantasy.com)

1. Go to Vercel project → Settings → Domains
2. Add `tdsartfantasy.com` and `www.tdsartfantasy.com`
3. Vercel will show you DNS records to add
4. Go to your domain registrar (where you bought tdsartfantasy.com)
5. Update DNS records:

**For tdsartfantasy.com (root domain):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)

**For www.tdsartfantasy.com:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

6. Wait 5-60 minutes for DNS propagation
7. Vercel will automatically provision SSL certificate

---

## Step 6: Verify No manuscdn.com References

After deployment completes:

1. Visit your Vercel URL (e.g., `https://tdsart-fantasy.vercel.app`)
2. Open browser DevTools (F12) → Network tab
3. Reload the page
4. Search for "manuscdn" in the Network tab
5. **Confirm**: No requests to manuscdn.com should appear ✅

Alternative verification:

```bash
curl -s https://tdsart-fantasy.vercel.app | grep -i "manuscdn"
```

Should return **nothing** (empty result).

---

## Step 7: Appeal Google Ads

Once deployed and verified:

1. Go to Google Ads → Policy Manager
2. Find your disapproved ads
3. Click "Appeal" or "Request Review"
4. Select reason: **"Made changes to comply with policy"**
5. Message:

> "We have removed all manuscdn.com references from our website by migrating to a new hosting provider (Vercel). The site now loads zero scripts from manuscdn.com. Please re-scan our domain and approve our ads."

6. Include your new Vercel URL if DNS hasn't propagated yet
7. Submit appeal

**Timeline**: Google typically reviews appeals within 1-3 business days.

---

## Troubleshooting

### Build Fails on Vercel

**Error**: "Cannot find module..."

**Fix**: Make sure all dependencies are in `package.json`. Run locally:

```bash
pnpm install
pnpm build
```

If it works locally, it should work on Vercel.

### Environment Variables Not Working

**Symptoms**: Database connection fails, features broken

**Fix**:
1. Double-check all env vars are set in Vercel dashboard
2. Click "Redeploy" after adding/changing env vars
3. Check Vercel deployment logs for specific errors

### Database Connection Issues

**Error**: "ECONNREFUSED" or "Access denied"

**Fix**:
1. Make sure `DATABASE_URL` is correct
2. Check if your database allows connections from Vercel IPs
3. For TiDB/PlanetScale: Enable public access or add Vercel IPs to allowlist

### Domain Not Working

**Symptoms**: tdsartfantasy.com shows old Manus site or error

**Fix**:
1. Wait longer (DNS can take up to 48 hours, usually 1-2 hours)
2. Check DNS propagation: https://dnschecker.org
3. Verify DNS records match Vercel's instructions exactly

---

## Cost Comparison

### Manus
- ✅ Easy to use
- ❌ Injects manuscdn.com scripts (Google Ads issue)
- ❌ Less control over deployment

### Vercel
- ✅ **FREE** for hobby projects (your use case)
- ✅ Full control, no script injections
- ✅ Automatic SSL certificates
- ✅ Global CDN (faster worldwide)
- ✅ Automatic deployments on git push
- ✅ Preview deployments for testing

**Recommendation**: Use Vercel. It's free, faster, and solves your Google Ads issue.

---

## Maintenance

### Updating Your Site

1. Make changes locally or on GitHub
2. Commit and push to `main` branch:

```bash
git add .
git commit -m "Update homepage"
git push
```

3. Vercel automatically deploys within 1-2 minutes ✅

### Rollback to Previous Version

1. Go to Vercel dashboard → Deployments
2. Find the working deployment
3. Click "..." → "Promote to Production"

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Discord**: https://vercel.com/discord
- **GitHub Issues**: Create issues in your repo for tracking

---

## Next Steps After Deployment

1. ✅ Verify no manuscdn.com references
2. ✅ Test all features (login, team creation, contests)
3. ✅ Appeal Google Ads with new clean site
4. ✅ Monitor Google Ads approval (1-3 days)
5. ✅ Start running ads once approved!

---

**Questions?** Feel free to ask for help with any step of this process.
