/**
 * Request Validation Middleware
 * Validates request data using Joi schemas with XSS protection
 */

const Joi = require('joi');
const validator = require('validator');
const xss = require('xss');
const { AppError } = require('./errorHandler');

/**
 * Sanitize string input to prevent XSS attacks
 */
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  
  // Remove any HTML tags and escape special characters
  let sanitized = xss(str, {
    whiteList: {}, // No HTML tags allowed
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script', 'style']
  });
  
  // Trim whitespace
  sanitized = validator.trim(sanitized);
  
  // Escape special characters
  sanitized = validator.escape(sanitized);
  
  return sanitized;
};

/**
 * Recursively sanitize object values
 */
const sanitizeObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return typeof obj === 'string' ? sanitizeString(obj) : obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  const sanitized = {};
  for (const key in obj) {
    sanitized[key] = sanitizeObject(obj[key]);
  }
  return sanitized;
};

/**
 * Validate request against Joi schema
 */
const validate = (schema) => {
  return (req, res, next) => {
    const validationOptions = {
      abortEarly: false, // Return all errors
      allowUnknown: true, // Allow unknown keys (will be stripped)
      stripUnknown: true // Remove unknown keys
    };

    const { error, value } = schema.validate(req.body, validationOptions);

    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      
      return next(new AppError('Validation error', 400, {
        fields: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      }));
    }

    // Sanitize validated data to prevent XSS
    req.body = sanitizeObject(value);
    next();
  };
};

/**
 * Common validation schemas
 */
const schemas = {
  // Assessment schemas
  startAssessment: Joi.object({
    student_id: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.empty': 'Student ID is required',
        'string.min': 'Student ID must be at least 3 characters',
        'string.max': 'Student ID must not exceed 50 characters',
        'any.required': 'Student ID is required'
      }),
    student_name: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .pattern(/^[a-zA-Z\s\-'.]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Student name must contain only letters, spaces, hyphens, apostrophes, and periods',
        'string.min': 'Student name must be at least 2 characters',
        'string.max': 'Student name must not exceed 100 characters',
        'string.empty': 'Student name is required',
        'any.required': 'Student name is required'
      }),
    student_email: Joi.string()
      .trim()
      .email({ tlds: { allow: false } })
      .max(255)
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'string.max': 'Email must not exceed 255 characters',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
      })
  }),

  saveResponse: Joi.object({
    question_id: Joi.string().uuid().required(),
    option_id: Joi.string().uuid().required()
  }),

  submitAssessment: Joi.object({
    // No body required, assessment ID from params
  }),

  // Feedback schema
  submitFeedback: Joi.object({
    assessment_id: Joi.string().uuid().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string()
      .trim()
      .max(1000)
      .optional()
      .allow('', null)
      .messages({
        'string.max': 'Comment must not exceed 1000 characters'
      }),
    helpful: Joi.boolean().optional(),
    would_recommend: Joi.boolean().optional()
  }),

  // Admin schemas
  adminLogin: Joi.object({
    username: Joi.string()
      .trim()
      .alphanum()
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.alphanum': 'Username must contain only alphanumeric characters',
        'string.min': 'Username must be at least 3 characters',
        'string.max': 'Username must not exceed 50 characters'
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters'
      })
  }),

  updateQuestion: Joi.object({
    text: Joi.string()
      .trim()
      .min(10)
      .max(500)
      .optional()
      .messages({
        'string.min': 'Question text must be at least 10 characters',
        'string.max': 'Question text must not exceed 500 characters'
      }),
    category: Joi.string()
      .valid('interests', 'skills', 'learning_style', 'career_goals', 'problem_solving')
      .optional(),
    difficulty: Joi.string()
      .valid('EASY', 'MEDIUM', 'HARD')
      .optional(),
    is_active: Joi.boolean().optional()
  })
};

/**
 * Validate UUID parameter
 */
const validateUUID = (paramName = 'id') => {
  return (req, res, next) => {
    const value = req.params[paramName];
    const schema = Joi.string().uuid();
    
    const { error } = schema.validate(value);
    
    if (error) {
      return next(new AppError(`Invalid ${paramName} format`, 400));
    }
    
    next();
  };
};

module.exports = {
  validate,
  schemas,
  validateUUID,
  sanitizeString,
  sanitizeObject
};
