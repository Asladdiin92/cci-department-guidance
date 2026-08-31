# CCI Department Guidance System - Backend

**Professional REST API for Haramaya University CCI Department Assessment & Recommendation System**

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Supabase account with project created
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` with your Supabase credentials:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   JWT_SECRET=generate-with-crypto
   ```

3. **Set up database:**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Execute the migration files in order:
     1. `database/migrations/001_initial_schema.sql`
     2. `database/seeds/002_seed_departments.sql`
     3. `database/seeds/003_seed_questions.sql`

4. **Start development server:**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:3000`

### Verify Installation

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "CCI Department Guidance API is running",
  "database": "Connected"
}
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   └── supabase.js   # Supabase client setup
│   ├── controllers/      # Business logic
│   │   ├── assessmentController.js
│   │   └── departmentController.js
│   ├── routes/           # API routes
│   │   ├── assessments.js
│   │   ├── departments.js
│   │   └── feedback.js
│   ├── middleware/       # Custom middleware
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── utils/           # Utility functions
│   │   ├── response.js
│   │   └── scoring.js
│   └── server.js        # Express app entry point
├── database/
│   ├── migrations/      # Database schema migrations
│   ├── seeds/          # Seed data
│   └── DATABASE-SCHEMA.md
├── .env.example        # Environment variables template
├── package.json
└── README.md
```

---

## 🎯 API Endpoints

### Health Check
- `GET /api/health` - Check server and database status
- `GET /api` - API information

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:code` - Get single department
- `GET /api/departments/:code/curriculum` - Get curriculum
- `GET /api/departments/search?q=query` - Search departments
- `POST /api/departments/compare` - Compare departments

### Assessments
- `POST /api/assessments/start` - Start new assessment
- `POST /api/assessments/:id/responses` - Save response
- `POST /api/assessments/:id/submit` - Submit assessment
- `GET /api/assessments/:id/results` - Get results
- `GET /api/assessments/:id/progress` - Get progress

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback/stats` - Get statistics

**📖 Full documentation:** See [API-DOCUMENTATION.md](./API-DOCUMENTATION.md)

---

## 🔧 Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Database:** PostgreSQL (via Supabase)
- **Validation:** Joi
- **Authentication:** JWT (bcryptjs)
- **ORM:** Supabase Client (@supabase/supabase-js)

---

## 🗄️ Database Schema

### Core Tables
1. **departments** - 6 CCI departments with full details
2. **questions** - 20 assessment questions
3. **question_options** - 120 options (6 per question) with JSONB scoring
4. **assessments** - Student assessment sessions
5. **assessment_responses** - Individual question responses
6. **recommendations** - Calculated department matches
7. **feedback** - User feedback (1-5 rating)
8. **admin_users** - Admin authentication

### Key Features
- UUID primary keys for scalability
- JSONB for flexible data (curriculum, scores)
- 20+ indexes for query optimization
- RLS (Row Level Security) policies
- Automated triggers for timestamps

**📊 Full schema:** See [DATABASE-SCHEMA.md](./database/DATABASE-SCHEMA.md)

---

## 🧮 Scoring Algorithm

The recommendation engine uses a sophisticated scoring system:

1. **Score Accumulation:** Each option has scores (0-3) for all 6 departments
2. **Calculation:** Total scores aggregated across 20 questions
3. **Ranking:** Departments ranked 1-6 by total score
4. **Match Percentage:** `(score / max_possible) × 100`
5. **Confidence Levels:**
   - HIGH: >20% difference between top 2
   - MEDIUM: 10-20% difference
   - LOW: <10% difference

**Implementation:** `src/utils/scoring.js`

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 3000) |
| `NODE_ENV` | Environment mode | No (default: development) |
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Public anon key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (admin) | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `CORS_ORIGIN` | Allowed origins | No |

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🧪 Testing

### Manual Testing with curl

**Start Assessment:**
```bash
curl -X POST http://localhost:3000/api/assessments/start \
  -H "Content-Type: application/json" \
  -d '{"student_name":"Test Student"}'
```

**Get All Departments:**
```bash
curl http://localhost:3000/api/departments
```

**Get Single Department:**
```bash
curl http://localhost:3000/api/departments/CS
```

### Testing Tools
- Postman
- Thunder Client (VS Code extension)
- REST Client (VS Code extension)

---

## 🚦 Development Workflow

### Run Development Server
```bash
npm run dev
```
- Auto-restarts on file changes (nodemon)
- Logs all requests
- Detailed error stack traces

### Run Production Server
```bash
npm start
```
- No auto-restart
- Minimal logging
- Production error handling

---

## 🛡️ Error Handling

All errors return standardized format:

```json
{
  "success": false,
  "error": "Error message",
  "details": { ... }
}
```

### Error Types
- **400** - Bad Request (validation)
- **404** - Not Found
- **500** - Internal Server Error

### Custom Error Class
```javascript
const { AppError } = require('./middleware/errorHandler');
throw new AppError('Message', 400, { details });
```

---

## 📝 Available Scripts

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests (not implemented yet)
```

---

## 🔄 Migration Guide

### Execute Migrations

**Option 1: Supabase Dashboard**
1. Go to SQL Editor
2. Copy content from migration file
3. Click "Run"

**Option 2: Supabase CLI**
```bash
supabase db push
```

**Option 3: Direct psql**
```bash
psql postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres \
  -f database/migrations/001_initial_schema.sql
```

### Rollback (if needed)
See `database/migrations/README.md` for rollback procedures.

---

## 🤝 Contributing

### Code Style
- Use CommonJS (`require`/`module.exports`)
- Follow existing folder structure
- Add JSDoc comments to functions
- Validate all inputs with Joi
- Use async/await (not callbacks)

### Adding New Endpoints
1. Create controller in `src/controllers/`
2. Add route in `src/routes/`
3. Register route in `src/server.js`
4. Document in `API-DOCUMENTATION.md`

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Joi Validation](https://joi.dev/api/)
- [PostgreSQL JSONB](https://www.postgresql.org/docs/current/datatype-json.html)

---

## 📄 License

MIT License - Haramaya University, CCI Department

---

## 👨‍💻 Author

**Asladin Abdukedir**  
Haramaya University - College of Computing and Informatics

---

## 🐛 Troubleshooting

### Database Connection Failed
- Verify Supabase credentials in `.env`
- Check if Supabase project is active
- Ensure migrations are executed

### Port Already in Use
```bash
# Change PORT in .env or kill process
npx kill-port 3000
```

### CORS Errors
- Add frontend URL to `CORS_ORIGIN` in `.env`
- Example: `CORS_ORIGIN=http://localhost:5173,http://localhost:3000`

### Validation Errors
- Check request body matches Joi schema
- Review API documentation for required fields
- Ensure UUIDs are valid format

---

**Last Updated:** August 31, 2026  
**Status:** Day 1 Complete ✅  
**Next:** Day 2 - Frontend-Backend Integration
