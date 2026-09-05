const express = require('express');
const router = express.Router();
const {
  getTableData,
  updateTableRow,
  deleteTableRow,
  insertTableRow
} = require('../controllers/databaseController');
const { asyncHandler } = require('../middleware/errorHandler');

// GET /api/admin/database/:table - Get all rows from a table
router.get('/:table', asyncHandler(getTableData));

// PUT /api/admin/database/:table/:id - Update a row
router.put('/:table/:id', asyncHandler(updateTableRow));

// DELETE /api/admin/database/:table/:id - Delete a row
router.delete('/:table/:id', asyncHandler(deleteTableRow));

// POST /api/admin/database/:table - Insert a new row
router.post('/:table', asyncHandler(insertTableRow));

module.exports = router;
