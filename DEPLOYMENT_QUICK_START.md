# ⚡ Quick Start: Deploy to Render

## 🚀 Fastest Way (15 minutes)

### 1. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Allow access from anywhere (Network Access)
5. Get connection string

### 2. Deploy to Render

1. Go to [render.com/new](https://dashboard.render.com/web/new)
2. Connect GitHub repository
3. Configure:
   - **Name**: `purrfect-match-api`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your-atlas-connection-string
   JWT_SECRET=generate-random-string
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Click **Create Web Service**

### 3. Update Frontend

1. Go to Vercel Dashboard
2. Update `VITE_API_URL` to your Render URL
3. Redeploy frontend

### 4. Done! 🎉

Your backend is live at: `https://your-service.onrender.com`

## 📝 Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Random string | Generate with Node.js |
| `FRONTEND_URL` | Your Vercel URL | `https://app.vercel.app` |
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `10000` (Render default) |

## 🔑 Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📚 Full Guide

See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for detailed instructions.

