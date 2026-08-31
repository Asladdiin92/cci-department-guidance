/**
 * Assessment Routes
 * Endpoints for assessment lifecycle management
 */

const express = require('express');
const router = express.Router();
const {
  startAssessment,
  saveResponse,
  submitAssessment,
  getResults,
  getProgress
} = require('../controllers/assessmentController');
const { validate, schemas, validateUUID } = require('../middleware/validator');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @route   POST /api/assessments/start
 * @desc    Start a new assessment
 * @access  Public
 */
router.post(
  '/start',
  validate(schemas.startAssessment),
  asyncHandler(startAssessment)
);

/**
 * @route   POST /api/assessments/:id/responses
 * @desc    Save a single response to an assessment
 * @access  Public
 */
router.post(
  '/:id/responses',
  validateUUID('id'),
  validate(schemas.saveResponse),
  asyncHandler(saveResponse)
);

/**
 * @route   POST /api/assessments/:id/submit
 * @desc    Submit assessment and calculate results
 * @access  Public
 */
router.post(
  '/:id/submit',
  validateUUID('id'),
  asyncHandler(submitAssessment)
);

/**
 * @route   GET /api/assessments/:id/results
 * @desc    Get assessment results
 * @access  Public
 */
router.get(
  '/:id/results',
  validateUUID('id'),
  asyncHandler(getResults)
);

/**
 * @route   GET /api/assessments/:id/progress
 * @desc    Get assessment progress
 * @access  Public
 */
router.get(
  '/:id/progress',
  validateUUID('id'),
  asyncHandler(getProgress)
);

module.exports = router;
