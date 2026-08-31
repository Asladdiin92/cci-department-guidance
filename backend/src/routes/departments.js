/**
 * Department Routes
 * Endpoints for department information
 */

const express = require('express');
const router = express.Router();
const {
  getAllDepartments,
  getDepartmentByCode,
  getDepartmentCurriculum,
  compareDepartments,
  searchDepartments
} = require('../controllers/departmentController');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @route   GET /api/departments/search
 * @desc    Search departments
 * @access  Public
 */
router.get('/search', asyncHandler(searchDepartments));

/**
 * @route   POST /api/departments/compare
 * @desc    Compare multiple departments
 * @access  Public
 */
router.post('/compare', asyncHandler(compareDepartments));

/**
 * @route   GET /api/departments
 * @desc    Get all departments
 * @access  Public
 */
router.get('/', asyncHandler(getAllDepartments));

/**
 * @route   GET /api/departments/:code
 * @desc    Get single department by code
 * @access  Public
 */
router.get('/:code', asyncHandler(getDepartmentByCode));

/**
 * @route   GET /api/departments/:code/curriculum
 * @desc    Get department curriculum
 * @access  Public
 */
router.get('/:code/curriculum', asyncHandler(getDepartmentCurriculum));

module.exports = router;
