/**
 * Department Controller
 * Handles department information retrieval
 */

const { supabase } = require('../config/supabase');
const { successResponse, errorResponse } = require('../utils/response');
const { AppError } = require('../middleware/errorHandler');

/**
 * Get all departments
 * GET /api/departments
 */
const getAllDepartments = async (req, res, next) => {
  try {
    const { data: departments, error } = await supabase
      .from('departments')
      .select(`
        code,
        name,
        description,
        strengths,
        career_paths,
        industry_demand,
        color,
        icon,
        created_at
      `)
      .order('name', { ascending: true });

    if (error) {
      throw new AppError('Failed to fetch departments', 500, { dbError: error.message });
    }

    return successResponse(res, {
      departments: departments || [],
      total: departments?.length || 0
    }, 'Departments retrieved successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * Get single department by code
 * GET /api/departments/:code
 */
const getDepartmentByCode = async (req, res, next) => {
  try {
    const { code } = req.params;

    const { data: department, error } = await supabase
      .from('departments')
      .select(`
        code,
        name,
        description,
        strengths,
        curriculum,
        career_paths,
        industry_demand,
        color,
        icon,
        created_at
      `)
      .eq('code', code.toUpperCase())
      .single();

    if (error || !department) {
      throw new AppError('Department not found', 404);
    }

    // Get recommendation statistics for this department
    const { count: recommendationCount } = await supabase
      .from('recommendations')
      .select('*', { count: 'exact', head: true })
      .eq('department_id', department.code)
      .eq('rank', 1); // Count as top recommendation

    department.statistics = {
      top_recommendations: recommendationCount || 0
    };

    return successResponse(res, department, 'Department details retrieved successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * Get department curriculum
 * GET /api/departments/:code/curriculum
 */
const getDepartmentCurriculum = async (req, res, next) => {
  try {
    const { code } = req.params;

    const { data: department, error } = await supabase
      .from('departments')
      .select('code, name, curriculum')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !department) {
      throw new AppError('Department not found', 404);
    }

    return successResponse(res, {
      department_code: department.code,
      department_name: department.name,
      curriculum: department.curriculum || {}
    }, 'Curriculum retrieved successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * Compare multiple departments
 * POST /api/departments/compare
 */
const compareDepartments = async (req, res, next) => {
  try {
    const { department_codes } = req.body;

    if (!Array.isArray(department_codes) || department_codes.length < 2) {
      throw new AppError('Please provide at least 2 department codes to compare', 400);
    }

    if (department_codes.length > 6) {
      throw new AppError('Maximum 6 departments can be compared at once', 400);
    }

    const codes = department_codes.map(code => code.toUpperCase());

    const { data: departments, error } = await supabase
      .from('departments')
      .select(`
        code,
        name,
        description,
        strengths,
        career_paths,
        industry_demand,
        color
      `)
      .in('code', codes);

    if (error) {
      throw new AppError('Failed to fetch departments', 500);
    }

    if (!departments || departments.length === 0) {
      throw new AppError('No departments found with provided codes', 404);
    }

    return successResponse(res, {
      departments,
      comparison_count: departments.length
    }, 'Department comparison retrieved successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * Search departments
 * GET /api/departments/search?q=query
 */
const searchDepartments = async (req, res, next) => {
  try {
    const { q: query } = req.query;

    if (!query || query.trim().length < 2) {
      throw new AppError('Search query must be at least 2 characters', 400);
    }

    const searchTerm = `%${query.toLowerCase()}%`;

    const { data: departments, error } = await supabase
      .from('departments')
      .select(`
        code,
        name,
        description,
        strengths,
        career_paths,
        color,
        icon
      `)
      .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`);

    if (error) {
      throw new AppError('Search failed', 500);
    }

    return successResponse(res, {
      results: departments || [],
      count: departments?.length || 0,
      query: query
    }, 'Search completed successfully');

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentByCode,
  getDepartmentCurriculum,
  compareDepartments,
  searchDepartments
};
