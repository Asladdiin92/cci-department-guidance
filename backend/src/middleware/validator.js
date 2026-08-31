/**
 * Request Validation Middleware
 * Validates request data using Joi schemas
 */

const Joi = require('joi');
const { AppError } = require('./errorHandler');

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

    // Replace req.body with validated and sanitized value
    req.body = value;
    next();
  };
};

/**
 * Common validation schemas
 */
const schemas = {
  // Assessment schemas
  startAssessment: Joi.object({
    student_name: Joi.string().max(100).optional().allow('', null),
    student_email: Joi.string().email().max(255).optional().allow('', null)
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
    comment: Joi.string().max(1000).optional().allow('', null),
    helpful: Joi.boolean().optional(),
    would_recommend: Joi.boolean().optional()
  }),

  // Admin schemas
  adminLogin: Joi.object({
    username: Joi.string().alphanum().min(3).max(50).required(),
    password: Joi.string().min(6).required()
  }),

  updateQuestion: Joi.object({
    text: Joi.string().min(10).max(500).optional(),
    category: Joi.string().valid('interests', 'skills', 'learning_style', 'career_goals', 'problem_solving').optional(),
    difficulty: Joi.string().valid('EASY', 'MEDIUM', 'HARD').optional(),
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
  validateUUID
};
