# 🛠️ UI/UX Tool Setup Guide
**CCI Department Guidance System**

## Installation Commands

Run these commands in your terminal to install the required tools:

```bash
# Navigate to frontend directory
cd frontend

# Install all tools at once
npm install lucide-react framer-motion react-hook-form zod @hookform/resolvers

# Or install individually if the above times out
npm install lucide-react
npm install framer-motion
npm install react-hook-form zod @hookform/resolvers

# For accessibility testing (dev dependency)
npm install --save-dev @axe-core/react
```

---

## Tool Overview & Bundle Sizes

| Tool | Size | Purpose |
|------|------|---------|
| **lucide-react** | ~50KB | Modern icon library (tree-shakeable) |
| **framer-motion** | ~50KB | Animation library for React |
| **react-hook-form** | ~9KB | Form state management |
| **zod** | ~13KB | Schema validation |
| **@hookform/resolvers** | ~2KB | Bridge between react-hook-form and zod |
| **@axe-core/react** | Dev only | Accessibility testing |

**Total Production Bundle Impact:** ~124KB (minified + gzipped: ~40KB)

---

## 1. Lucide Icons Setup

### Why Lucide?
- ✅ Consistent stroke width (2px)
- ✅ Tree-shakeable (only import what you use)
- ✅ Modern, clean design
- ✅ 1000+ icons available

### Basic Usage:
```javascript
import { Heart, Star, Zap, TrendingUp } from 'lucide-react';

function MyComponent() {
  return (
    <div>
      <Heart size={24} color="#ff0000" />
      <Star size={32} fill="gold" stroke="gold" />
      <Zap className="icon-class" strokeWidth={2.5} />
    </div>
  );
}
```

### Common Icons for Your App:
```javascript
// Navigation & Actions
import { Home, Menu, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

// Features & Content
import { GraduationCap, BookOpen, TrendingUp, Target, CheckCircle2, AlertCircle } from 'lucide-react';

// User & Profile
import { User, Mail, Phone, Calendar, Clock } from 'lucide-react';

// Departments & Careers
import { Laptop, Database, BarChart3, Shield, Globe, Briefcase } from 'lucide-react';
```

---

## 2. Framer Motion Setup

### Why Framer Motion?
- ✅ Declarative animations
- ✅ Spring physics animations
- ✅ Gesture support (drag, hover, tap)
- ✅ Page transitions

### Basic Usage:
```javascript
import { motion, AnimatePresence } from 'framer-motion';

// Simple fade-in animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Hover animation
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>

// Page transitions
<AnimatePresence mode="wait">
  <motion.div
    key={currentPage}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
  >
    {content}
  </motion.div>
</AnimatePresence>
```

### Animation Presets for Your App:
```javascript
// Fade in from bottom
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Scale in
export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 200 }
};

// Stagger children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

---

## 3. React Hook Form + Zod Setup

### Why React Hook Form + Zod?
- ✅ Best performance (minimal re-renders)
- ✅ Type-safe validation with Zod
- ✅ Easy error handling
- ✅ Less boilerplate code

### Basic Usage:
```javascript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define schema
const studentSchema = z.object({
  student_id: z.string()
    .min(1, 'Student ID is required')
    .regex(/^[A-Za-z0-9\/\-]+$/, 'Invalid ID format'),
  student_name: z.string()
    .min(3, 'Name must be at least 3 characters'),
  student_email: z.string()
    .email('Invalid email format')
});

// Use in component
function StudentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(studentSchema)
  });

  const onSubmit = async (data) => {
    await submitToAPI(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('student_id')} />
      {errors.student_id && <span>{errors.student_id.message}</span>}
      
      <input {...register('student_name')} />
      {errors.student_name && <span>{errors.student_name.message}</span>}
      
      <input {...register('student_email')} type="email" />
      {errors.student_email && <span>{errors.student_email.message}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

### Advanced Validation Patterns:
```javascript
// Conditional validation
const assessmentSchema = z.object({
  question1: z.string().min(1, 'Required'),
  question2: z.string().min(1, 'Required'),
  // ... all 20 questions
});

// Custom validation
const emailSchema = z.string()
  .email()
  .refine(
    (email) => email.endsWith('@haramaya.edu.et'),
    'Must use university email'
  );

// Optional fields
const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  would_recommend: z.boolean()
});
```

---

## 4. Axe-core Accessibility Testing

### Why Axe-core?
- ✅ Industry standard accessibility testing
- ✅ Catches WCAG violations automatically
- ✅ Detailed error reports
- ✅ Dev-only (zero production impact)

### Option A: Browser Extension (Recommended)
1. Install "axe DevTools" from Chrome Web Store
2. Open DevTools → axe DevTools tab
3. Click "Scan All of My Page"
4. Fix violations shown

### Option B: React Integration (Development Only)
```javascript
// src/index.jsx or src/main.jsx
if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}

// Reports to console during development
```

### Common Issues to Fix:
```javascript
// ❌ Bad: Button without accessible label
<button onClick={handleClick}>
  <SearchIcon />
</button>

// ✅ Good: Button with aria-label
<button onClick={handleClick} aria-label="Search">
  <SearchIcon />
</button>

// ❌ Bad: Image without alt text
<img src="logo.png" />

// ✅ Good: Image with alt text
<img src="logo.png" alt="University Logo" />

// ❌ Bad: Form without labels
<input type="text" placeholder="Name" />

// ✅ Good: Form with labels
<label htmlFor="name">Name</label>
<input id="name" type="text" placeholder="Enter your name" />
```

---

## Integration Checklist

After installation, integrate each tool:

### Day 1: Design Foundation
- [ ] Create `frontend/src/theme/tokens.js` with design tokens
- [ ] Update `frontend/src/theme.js` to use tokens
- [ ] Create animation presets in `frontend/src/utils/animations.js`

### Day 2: Icons Migration
- [ ] Replace Material-UI icons with Lucide in Hero.jsx
- [ ] Update Navbar icons
- [ ] Update Department cards icons

### Day 3: Animation Integration
- [ ] Add page transition animations
- [ ] Add card hover animations in Departments.jsx
- [ ] Add question transitions in Assessment.jsx
- [ ] Add success animation on submission

### Day 4: Form Enhancement
- [ ] Refactor Assessment student form to use React Hook Form + Zod
- [ ] Add better validation messages
- [ ] Add real-time field validation

### Day 5: Accessibility Audit
- [ ] Run axe DevTools on all pages
- [ ] Fix all critical/serious violations
- [ ] Add ARIA labels where needed
- [ ] Test keyboard navigation

---

## Verification Steps

After installation, verify each tool:

```bash
# Check if packages are installed
npm list lucide-react framer-motion react-hook-form zod

# Check bundle size impact
npm run build
# Check dist/assets/*.js file sizes

# Run dev server to test
npm run dev
```

### Test Each Tool:

1. **Lucide Icons Test:**
```javascript
// Create test-icons.jsx
import { Heart } from 'lucide-react';
export default () => <Heart size={48} color="red" />;
```

2. **Framer Motion Test:**
```javascript
// Create test-animation.jsx
import { motion } from 'framer-motion';
export default () => (
  <motion.div
    animate={{ x: [0, 100, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    Animated Box
  </motion.div>
);
```

3. **React Hook Form Test:**
```javascript
// Create test-form.jsx
import { useForm } from 'react-hook-form';
export default () => {
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register('test')} />
      <button>Submit</button>
    </form>
  );
};
```

---

## Troubleshooting

### Issue: npm install hangs
**Solution:** Clear npm cache and retry
```bash
npm cache clean --force
npm install
```

### Issue: Build size increased significantly
**Solution:** Check if tree-shaking is working
```bash
# In vite.config.js, ensure:
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-ui': ['framer-motion', 'lucide-react']
      }
    }
  }
}
```

### Issue: TypeScript errors with Zod
**Solution:** Install type definitions
```bash
npm install --save-dev @types/node
```

---

## Next Steps

Once all tools are installed:

1. ✅ Read tool documentation
2. ✅ Create design tokens file
3. ✅ Set up animation presets
4. ✅ Start Day 1 of UI/UX transformation
5. ✅ Run accessibility audit

**Ready to begin? Start with Day 1 of the 7-Day Plan!**
