const { getClient } = require('../config/supabase');

// Allowed tables to manage
const ALLOWED_TABLES = [
  'departments',
  'questions',
  'question_options',
  'assessments',
  'assessment_responses',
  'recommendations',
  'feedback'
];

/**
 * Get all rows from a table
 */
const getTableData = async (req, res) => {
  try {
    const { table } = req.params;
    
    // Validate table name
    if (!ALLOWED_TABLES.includes(table)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid table name'
      });
    }

    const supabase = getClient(true); // Use service role for admin operations
    
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching ${table}:`, error);
      return res.status(500).json({
        success: false,
        message: `Failed to fetch ${table}`,
        error: error.message
      });
    }

    res.json({
      success: true,
      data: {
        table,
        rows: data || [],
        count: data?.length || 0
      }
    });
  } catch (error) {
    console.error('Database fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Update a row in a table
 */
const updateTableRow = async (req, res) => {
  try {
    const { table, id } = req.params;
    const updates = req.body;
    
    // Validate table name
    if (!ALLOWED_TABLES.includes(table)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid table name'
      });
    }

    // Remove id from updates if present
    delete updates.id;
    
    const supabase = getClient(true); // Use service role for admin operations
    
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      console.error(`Error updating ${table}:`, error);
      return res.status(500).json({
        success: false,
        message: `Failed to update ${table}`,
        error: error.message
      });
    }

    res.json({
      success: true,
      data: data?.[0] || null,
      message: 'Row updated successfully'
    });
  } catch (error) {
    console.error('Database update error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Delete a row from a table
 */
const deleteTableRow = async (req, res) => {
  try {
    const { table, id } = req.params;
    
    // Validate table name
    if (!ALLOWED_TABLES.includes(table)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid table name'
      });
    }
    
    const supabase = getClient(true); // Use service role for admin operations
    
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting from ${table}:`, error);
      return res.status(500).json({
        success: false,
        message: `Failed to delete from ${table}`,
        error: error.message
      });
    }

    res.json({
      success: true,
      message: 'Row deleted successfully'
    });
  } catch (error) {
    console.error('Database delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Insert a new row into a table
 */
const insertTableRow = async (req, res) => {
  try {
    const { table } = req.params;
    const newRow = req.body;
    
    // Validate table name
    if (!ALLOWED_TABLES.includes(table)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid table name'
      });
    }
    
    const supabase = getClient(true); // Use service role for admin operations
    
    const { data, error } = await supabase
      .from(table)
      .insert([newRow])
      .select();

    if (error) {
      console.error(`Error inserting into ${table}:`, error);
      return res.status(500).json({
        success: false,
        message: `Failed to insert into ${table}`,
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      data: data?.[0] || null,
      message: 'Row inserted successfully'
    });
  } catch (error) {
    console.error('Database insert error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  getTableData,
  updateTableRow,
  deleteTableRow,
  insertTableRow
};
