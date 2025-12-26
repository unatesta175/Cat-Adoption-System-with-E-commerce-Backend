# 🚀 Purrfect Match - Backend (Server)

Express.js REST API backend for the Purrfect Match cat adoption platform.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

```bash
npm install
```

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/catadoption
   PORT=5001
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   ```

### Development

```bash
npm run dev
```

The server will start on `http://localhost:5001` with auto-reload enabled.

### Production

```bash
npm start
```

## 📁 Project Structure

```
server/
├── config/
│   └── db.js              # MongoDB connection configuration
├── middleware/
│   ├── auth.js            # JWT authentication middleware
│   └── upload.js          # File upload middleware (Multer)
├── models/
│   ├── User.js            # User model
│   ├── Cat.js             # Cat model
│   ├── Product.js         # Product model
│   ├── Order.js           # Order model
│   └── Adoption.js        # Adoption model
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── cats.js            # Cat management routes
│   ├── products.js        # Product management routes
│   ├── orders.js          # Order processing routes
│   ├── adoptions.js       # Adoption processing routes
│   └── recommendations.js # Recommendation routes
├── seed/
│   ├── seedAdmin.js       # Admin user seeding
│   ├── seedUsers.js       # Demo users seeding
│   ├── seedCats.js        # Sample cats seeding
│   └── seedProducts.js    # Sample products seeding
├── services/
│   └── recommendationService.js # Recommendation algorithm
├── scripts/
│   ├── resetDB.js         # Database reset script
│   └── seedDB.js          # Database seeding script
├── uploads/               # Uploaded images directory
├── server.js              # Main server file
└── package.json
```

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **Multer** - File upload handling
- **express-validator** - Request validation
- **CORS** - Cross-origin resource sharing

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/preferences` - Update user preferences (protected)

### Cats (`/api/cats`)
- `GET /api/cats` - Get all cats
- `GET /api/cats/:id` - Get cat by ID
- `POST /api/cats` - Create cat (admin only)
- `PUT /api/cats/:id` - Update cat (admin only)
- `DELETE /api/cats/:id` - Delete cat (admin only)

### Products (`/api/products`)
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders (`/api/orders`)
- `POST /api/orders/create-payment-intent` - Create Stripe payment intent (protected)
- `POST /api/orders` - Create order after payment (protected)
- `GET /api/orders/my-orders` - Get user's orders (protected)
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Adoptions (`/api/adoptions`)
- `POST /api/adoptions/create-payment-intent` - Create adoption payment intent (protected)
- `POST /api/adoptions/purchase` - Complete adoption (protected)
- `GET /api/adoptions/my-requests` - Get user's adoption requests (protected)
- `GET /api/adoptions` - Get all adoption requests (admin only)
- `PUT /api/adoptions/:id/status` - Update adoption status (admin only)

### Recommendations (`/api/recommendations`)
- `GET /api/recommendations` - Get personalized cat recommendations (protected)

### Health Check
- `GET /api/health` - Server health check

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User registers/logs in via `/api/auth/login`
2. Server returns a JWT token
3. Client includes token in `Authorization` header: `Bearer <token>`
4. Protected routes verify token via `protect` middleware

### Middleware

- **`protect`** - Verifies JWT token and attaches user to request
- **`admin`** - Ensures user has admin role (must be used after `protect`)

## 💳 Payment Processing

Stripe integration for secure payments:

1. Create payment intent via `/api/orders/create-payment-intent`
2. Client confirms payment with Stripe.js
3. Create order via `/api/orders` with payment intent ID

**Test Mode**: Use Stripe test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## 🗄️ Database Models

### User
- Authentication credentials
- User preferences
- Role (user/admin)

### Cat
- Basic info (name, breed, age, gender)
- Description and traits
- Adoption fee
- Image
- Adoption status

### Product
- Name, description, price
- Category, stock
- Image
- Active status

### Order
- User reference
- Order items
- Total amount
- Payment intent ID
- Shipping address
- Order status

### Adoption
- User reference
- Cat reference
- Payment intent ID
- Adoption status
- Timestamps

## 🌱 Database Seeding

The server automatically seeds the database on startup with:
- Admin user account
- Demo user accounts
- Sample cats with images
- Sample products with images

### Manual Seeding

```bash
# Reset and seed database
npm run db:fresh

# Seed only (if database is empty)
npm run db:seed

# Reset only
npm run db:reset
```

## 📤 File Uploads

- Uploaded images are stored in `server/uploads/`
- Supported formats: JPG, PNG
- Files are served statically at `/uploads/:filename`
- Admin can upload cat and product images

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `PORT` | Server port | No | 5001 |
| `NODE_ENV` | Environment | No | development |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `STRIPE_SECRET_KEY` | Stripe secret key | No | - |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | No | - |

### MongoDB Setup

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/catadoption
```

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/catadoption
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm run db:reset` | Reset the database |
| `npm run db:seed` | Seed the database |
| `npm run db:fresh` | Reset and seed the database |

## 🐛 Troubleshooting

### MongoDB Connection Issues

- **Local MongoDB**: Ensure service is running
  ```bash
  # Windows
  net start MongoDB
  
  # Check connection
  mongosh
  ```

- **MongoDB Atlas**: 
  - Verify connection string format
  - Check IP whitelist in Atlas dashboard
  - Ensure database user has proper permissions

### Port Already in Use

Change `PORT` in `.env` to another port (e.g., `5002`)

### Permission Denied Error (Windows)

- Server is configured to use `localhost` binding
- Try a different port if issues persist
- Run terminal as Administrator if needed

### JWT Secret Error

Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🔒 Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use strong JWT secrets in production
- ✅ Validate all user inputs
- ✅ Use HTTPS in production
- ✅ Implement rate limiting
- ✅ Sanitize file uploads
- ✅ Use environment-specific configurations

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)

---

**Part of the Purrfect Match Platform** 🐱

