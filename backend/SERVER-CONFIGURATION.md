# CCI Department Guidance System - Backend Server Configuration

## 🎯 Overview

Production-ready Express.js backend server with enhanced security, scalability, and monitoring capabilities.

## 🏗️ Architecture

```
backend/
├── src/
│   ├── server.js              # Main server file (✨ ENHANCED)
│   ├── config/
│   │   └── supabase.js        # Database configuration
│   ├── controllers/           # Business logic
│   │   ├── assessmentController.js
│   │   ├── departmentController.js
│   │   ├── feedbackController.js
│   │   ├── authController.js
│   │   └── adminController.js
│   ├── middleware/            # Express middleware
│   │   ├── errorHandler.js
│   │   ├── validator.js
│   │   └── auth.js
│   ├── routes/                # API endpoints
│   │   ├── departments.js
│   │   ├── assessments.js
│   │   ├── feedback.js
│   │   ├── auth.js
│   │   └── admin.js
│   └── utils/                 # Helper functions
├── .env                       # Environment variables
├── .env.example              # Environment template
└── package.json              # Dependencies
```

## 🔧 Enhanced Features

### 1. **Advanced CORS Configuration**
- ✅ Dynamic origin validation
- ✅ Wildcard pattern support (`*.vercel.app`, `*.railway.app`)
- ✅ Development mode auto-allows localhost
- ✅ Credential support for cookies
- ✅ Preflight caching (24 hours)

```javascript
// Supports:
- http://localhost:3000
- http://localhost:5173
- https://cci-department-guidance.vercel.app
- https://cci-*.vercel.app (preview deployments)
- https://*.railway.app
```

### 2. **Enhanced Security Headers**
- ✅ X-Frame-Options (clickjacking protection)
- ✅ X-Content-Type-Options (MIME sniffing prevention)
- ✅ X-XSS-Protection (XSS attack prevention)
- ✅ Referrer-Policy (privacy protection)
- ✅ Content-Security-Policy (production only)

### 3. **Request Logging & Tracing**
- ✅ Unique request ID for each request
- ✅ Response time tracking
- ✅ Automatic error logging
- ✅ Development vs production log levels

```
✅ [1234567890-abc123] GET /api/departments - 200 (45ms)
❌ [1234567890-xyz789] POST /api/assessments - 400 (120ms)
```

### 4. **Built-in Rate Limiting**
- ✅ IP-based request tracking
- ✅ 100 requests per 15 minutes per IP
- ✅ Automatic cleanup of old records
- ✅ 429 status with retry-after header
- ✅ Production-only (disabled in development)

### 5. **Enhanced Health Check**
- ✅ Database connectivity status
- ✅ Server uptime tracking
- ✅ Memory usage monitoring
- ✅ Node.js version reporting
- ✅ 503 status on service unavailability

**Example Response:**
```json
{
  "success": true,
  "message": "CCI Department Guidance API is healthy",
  "timestamp": "2024-12-01T10:30:00.000Z",
  "environment": "production",
  "uptime": "45 minutes",
  "database": {
    "status": "Connected",
    "provider": "Supabase"
  },
  "memory": {
    "used": "45MB",
    "total": "128MB"
  },
  "nodeVersion": "v18.17.0"
}
```

### 6. **Comprehensive API Documentation**
- ✅ Auto-generated endpoint list at `/api`
- ✅ Method, path, and description for each endpoint
- ✅ Grouped by resource (departments, assessments, etc.)
- ✅ Contact information

### 7. **Graceful Shutdown**
- ✅ SIGTERM and SIGINT signal handling
- ✅ Proper connection closing
- ✅ 30-second timeout before force exit
- ✅ Cleanup of resources

### 8. **Error Handling**
- ✅ Async error wrapper
- ✅ Custom AppError class
- ✅ Supabase error handling
- ✅ JWT error handling
- ✅ Stack traces in development only

### 9. **JSON Validation**
- ✅ Strict JSON parsing
- ✅ Invalid JSON rejection with 400 status
- ✅ 10MB body size limit
- ✅ 1000 parameter limit

### 10. **Serverless Support**
- ✅ Vercel serverless detection
- ✅ AWS Lambda support
- ✅ No server start in serverless mode
- ✅ Export for serverless platforms

## 📋 API Endpoints

### Core Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/` | Root information | Public |
| GET | `/api` | API documentation | Public |
| GET | `/api/health` | Health check | Public |

### Department Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/departments` | List all departments | Public |
| GET | `/api/departments/:code` | Get department details | Public |
| GET | `/api/departments/compare` | Compare departments | Public |

### Assessment Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/assessments/start` | Start new assessment | Public |
| POST | `/api/assessments/:id/responses` | Save response | Public |
| POST | `/api/assessments/:id/submit` | Submit assessment | Public |
| GET | `/api/assessments/:id/results` | Get results | Public |
| GET | `/api/assessments/:id/progress` | Get progress | Public |

### Feedback Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/feedback` | Submit feedback | Public |
| GET | `/api/feedback` | List feedback | Admin |

### Auth Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/login` | Admin login | Public |
| GET | `/api/auth/verify` | Verify token | Token |

### Admin Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/admin/stats` | Dashboard stats | Admin |
| GET | `/api/admin/analytics` | Analytics data | Admin |
| GET | `/api/admin/submissions` | Student submissions | Admin |

## 🔐 Environment Variables

### Required Variables

```bash
# Server
PORT=3000
NODE_ENV=development

# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Security
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:5173,https://yourdomain.com
```

### Optional Variables

```bash
# API
API_VERSION=v1
API_PREFIX=/api

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

## 🚀 Deployment

### Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Server starts on http://localhost:3000
```

### Production

```bash
# Set environment
export NODE_ENV=production

# Start production server
npm start
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Vercel

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

### Railway

1. Connect GitHub repository
2. Railway auto-detects Node.js
3. Set environment variables
4. Deploy

## 🧪 Testing

### Health Check

```bash
curl http://localhost:3000/api/health
```

### API Documentation

```bash
curl http://localhost:3000/api
```

### Test Endpoint

```bash
curl http://localhost:3000/api/departments
```

### Load Testing

```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:3000/api/health

# Using autocannon
npx autocannon -c 10 -d 10 http://localhost:3000/api/health
```

## 📊 Monitoring

### Logs

```bash
# Development - verbose logging
npm run dev

# Production - error logging only
NODE_ENV=production npm start
```

### Performance Metrics

Check `/api/health` endpoint for:
- Server uptime
- Memory usage
- Database status
- Response times (via request logging)

### Error Tracking

Errors are logged with:
- Request ID
- Path and method
- Status code
- Stack trace (development only)

## 🔒 Security Best Practices

### 1. **Environment Variables**
- ✅ Never commit `.env` to version control
- ✅ Use `.env.example` as template
- ✅ Rotate secrets regularly
- ✅ Use strong JWT secrets (32+ characters)

### 2. **CORS Configuration**
- ✅ Whitelist specific origins
- ✅ Never use `origin: '*'` in production
- ✅ Review allowed origins regularly

### 3. **Rate Limiting**
- ✅ Enabled in production
- ✅ Adjust limits based on usage
- ✅ Consider using Redis for distributed systems

### 4. **Input Validation**
- ✅ All inputs validated before processing
- ✅ XSS protection via `xss` package
- ✅ SQL injection prevention via Supabase parameterized queries

### 5. **Error Handling**
- ✅ Never expose internal errors to clients
- ✅ Log all errors for debugging
- ✅ Use generic error messages in production

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Mac/Linux

# Kill process
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # Mac/Linux
```

### Database Connection Failed

1. Check Supabase URL and keys in `.env`
2. Verify network connectivity
3. Check Supabase service status
4. Review RLS policies in Supabase

### CORS Errors

1. Add frontend URL to `CORS_ORIGIN`
2. Check origin validation logic
3. Enable credentials if using cookies
4. Test with curl (no CORS)

### Memory Issues

1. Check `/api/health` for memory usage
2. Restart server if memory is high
3. Investigate memory leaks with profiler
4. Consider increasing Node.js memory limit

## 📝 Changelog

### Version 2.0.0 (Current)
- ✅ Enhanced CORS with wildcard support
- ✅ Security headers middleware
- ✅ Request ID tracking
- ✅ Advanced logging
- ✅ Built-in rate limiting
- ✅ Enhanced health check
- ✅ Graceful shutdown
- ✅ Serverless support
- ✅ Comprehensive API docs

### Version 1.0.0
- Initial release
- Basic CORS
- Simple logging
- Database connection
- Route mounting

## 🤝 Contributing

1. Follow existing code structure
2. Add comments for complex logic
3. Test all changes locally
4. Update documentation
5. Follow security best practices

## 📞 Support

- **Email:** cci@haramaya.edu.et
- **Website:** https://www.haramaya.edu.et
- **Documentation:** `/api` endpoint

---

**Last Updated:** December 2024  
**Version:** 2.0.0  
**Author:** Asladin Abdukedir
