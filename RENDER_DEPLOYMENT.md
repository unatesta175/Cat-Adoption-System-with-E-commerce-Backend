# 🚀 Deploy Server to Render

Complete guide to deploy your Express.js backend server to Render.

## 📋 Prerequisites

- Render account ([sign up here](https://render.com))
- GitHub account with your code pushed
- MongoDB Atlas account (free tier available)

## 🗄️ Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new **Free** cluster (M0)
4. Choose a cloud provider and region (closest to your users)

### 1.2 Configure Database Access

1. Go to **Database Access** → **Add New Database User**
2. Create a user with username and password
3. Set privileges to **Read and write to any database**
4. **Save the password** - you'll need it for the connection string

### 1.3 Configure Network Access

1. Go to **Network Access** → **Add IP Address**
2. Click **Allow Access from Anywhere** (for Render)
   - Or add Render's IP ranges if you prefer
3. Click **Confirm**

### 1.4 Get Connection String

1. Go to **Database** → **Connect**
2. Choose **Connect your application**
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `catadoption` (or your preferred database name)
6. **Save this connection string** - you'll need it for Render

Example format:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/catadoption?retryWrites=true&w=majority
```

## 🚀 Step 2: Deploy to Render

### Method 1: Using Render Dashboard (Recommended)

#### 2.1 Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Select the repository containing your project

#### 2.2 Configure Service Settings

**Basic Settings:**
- **Name**: `purrfect-match-api` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main` (or your main branch)
- **Root Directory**: `server` (important!)
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Plan:**
- Select **Free** plan (or paid if you need more resources)

#### 2.3 Set Environment Variables

Click **Advanced** → **Add Environment Variable** and add:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Required |
| `PORT` | `10000` | Render sets this automatically, but include it |
| `MONGODB_URI` | Your Atlas connection string | From Step 1.4 |
| `JWT_SECRET` | Generate a random string | See below |
| `FRONTEND_URL` | Your Vercel URL | e.g., `https://your-app.vercel.app` |
| `STRIPE_SECRET_KEY` | Your Stripe key | Optional |
| `STRIPE_PUBLISHABLE_KEY` | Your Stripe key | Optional |

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### 2.4 Deploy

1. Click **Create Web Service**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Build your application
   - Start the server
3. Wait for deployment to complete (2-5 minutes)

### Method 2: Using Render Blueprint (render.yaml)

If you have `render.yaml` in your repository:

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Blueprint**
3. Connect your GitHub repository
4. Render will detect `render.yaml` and create the service
5. Set environment variables in the dashboard (they won't sync automatically)

## ✅ Step 3: Verify Deployment

### 3.1 Check Deployment Status

1. Go to your service in Render Dashboard
2. Check the **Logs** tab for any errors
3. Look for: `✅ Server ready!`

### 3.2 Test Health Endpoint

Open your browser and visit:
```
https://your-service-name.onrender.com/api/health
```

You should see:
```json
{
  "message": "Server is running",
  "status": "OK"
}
```

### 3.3 Test API Endpoints

Try accessing other endpoints:
- `GET /api/cats` - Should return list of cats
- `GET /api/products` - Should return list of products

## 🔧 Step 4: Configure Frontend

### 4.1 Update Vercel Environment Variable

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Update `VITE_API_URL` to your Render service URL:
   ```
   https://your-service-name.onrender.com
   ```
4. **Redeploy** your Vercel frontend

### 4.2 Update Render CORS

1. Go to Render Dashboard → Your Service → **Environment**
2. Add/Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. **Redeploy** your Render service

## 📁 Step 5: File Uploads (Optional)

### Using Render Persistent Disk

For file uploads to persist across deployments:

1. Go to your Render service → **Settings**
2. Scroll to **Persistent Disk**
3. Click **Add Persistent Disk**
4. Set mount path: `/opt/render/project/src/server/uploads`
5. Set size: 1GB (or as needed)
6. Save and redeploy

**Note**: Update your code to use the persistent disk path if needed.

### Alternative: Cloud Storage

For production, consider using:
- AWS S3
- Cloudinary
- Google Cloud Storage

## 🐛 Troubleshooting

### Deployment Fails

**Check Build Logs:**
1. Go to Render Dashboard → Your Service → **Logs**
2. Look for error messages
3. Common issues:
   - Missing dependencies in `package.json`
   - Wrong build/start commands
   - Missing environment variables

**Common Fixes:**
- Ensure `package.json` has `"start": "node server.js"`
- Verify all dependencies are listed (not just devDependencies)
- Check Node.js version compatibility

### MongoDB Connection Fails

**Symptoms:**
- Error: `MongoServerError: bad auth`
- Error: `MongoNetworkError`

**Solutions:**
1. Verify `MONGODB_URI` is set correctly in Render
2. Check MongoDB Atlas Network Access allows Render IPs
3. Ensure database user password is correct
4. Verify connection string format: `mongodb+srv://...`

### CORS Errors

**Symptoms:**
- Frontend can't make API requests
- Browser console shows CORS errors

**Solutions:**
1. Set `FRONTEND_URL` in Render environment variables
2. Ensure frontend URL matches exactly (no trailing slash)
3. Redeploy both frontend and backend after changes

### Service Sleeps (Free Tier)

**Symptoms:**
- First request after inactivity is slow
- Service appears down

**Solutions:**
- This is normal on Render free tier
- First request after sleep takes ~30 seconds
- Consider upgrading to paid plan for always-on service

### Images Not Loading

**Symptoms:**
- Images return 404
- Uploaded images disappear after redeploy

**Solutions:**
1. Use Render Persistent Disk for uploads directory
2. Or migrate to cloud storage (S3, Cloudinary)
3. Ensure uploads directory exists and is writable

## 📊 Monitoring

### View Logs

1. Go to Render Dashboard → Your Service → **Logs**
2. View real-time logs
3. Download logs for analysis

### Health Checks

Render automatically monitors:
- Service availability
- Response times
- Error rates

Set up custom health checks:
- Endpoint: `/api/health`
- Expected response: `200 OK`

## 🔄 Automatic Deployments

Render automatically deploys when you:
- Push to the connected branch (usually `main`)
- Merge pull requests (if configured)

**Disable auto-deploy:**
1. Go to Service → **Settings**
2. Toggle **Auto-Deploy** off

## 🔐 Security Best Practices

1. **Never commit `.env` files** - Use Render environment variables
2. **Use strong JWT secrets** - Generate with crypto.randomBytes
3. **Rotate secrets regularly** - Especially if exposed
4. **Limit CORS origins** - Only allow your frontend domain
5. **Use HTTPS** - Render provides SSL automatically
6. **Keep dependencies updated** - Regularly update npm packages

## 📈 Scaling

### Upgrade Plan

1. Go to Service → **Settings** → **Plan**
2. Choose a paid plan for:
   - Always-on service (no sleep)
   - More resources
   - Better performance

### Performance Tips

- Enable gzip compression
- Use CDN for static assets
- Optimize database queries
- Implement caching where appropriate

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

## ✅ Post-Deployment Checklist

- [ ] Service deployed successfully
- [ ] Health endpoint responds
- [ ] MongoDB connected
- [ ] Environment variables set
- [ ] CORS configured for frontend
- [ ] Frontend updated with backend URL
- [ ] Test API endpoints
- [ ] Test authentication flow
- [ ] Test file uploads (if applicable)
- [ ] Monitor logs for errors

---

**Your backend is now live on Render!** 🎉

Next: Update your Vercel frontend to use the Render backend URL.

