import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add,
  Edit,
  Delete,
  Refresh,
  Storage
} from '@mui/icons-material';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const TABLES = [
  { value: 'departments', label: 'Departments' },
  { value: 'questions', label: 'Questions' },
  { value: 'question_options', label: 'Question Options' },
  { value: 'assessments', label: 'Assessments' },
  { value: 'assessment_responses', label: 'Assessment Responses' },
  { value: 'recommendations', label: 'Recommendations' },
  { value: 'feedback', label: 'Feedback' }
];

function DatabaseManager() {
  const theme = useTheme();
  const [selectedTable, setSelectedTable] = useState('departments');
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editDialog, setEditDialog] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (selectedTable) {
      loadTableData();
    }
  }, [selectedTable]);

  const loadTableData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/admin/database/${selectedTable}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        setTableData(data.data.rows || []);
        
        // Generate columns from first row
        if (data.data.rows && data.data.rows.length > 0) {
          const firstRow = data.data.rows[0];
          const cols = Object.keys(firstRow).map(key => ({
            field: key,
            headerName: key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            width: 150,
            editable: key !== 'id'
          }));
          
          // Add actions column
          cols.push({
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => (
              <Box>
                <IconButton size="small" onClick={() => handleEdit(params.row)}>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDeleteClick(params.row.id)}>
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            )
          });
          
          setColumns(cols);
        } else {
          setColumns([]);
        }
      }
    } catch (error) {
      console.error('Error loading table data:', error);
      setError('Failed to load table data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    setEditRow(row);
    setEditDialog(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteDialog(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/database/${selectedTable}/${editRow.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editRow)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update');
      }
      
      setEditDialog(false);
      setEditRow(null);
      loadTableData();
    } catch (error) {
      console.error('Error updating:', error);
      setError('Failed to update row');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/database/${selectedTable}/${deleteId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete');
      }
      
      setDeleteDialog(false);
      setDeleteId(null);
      loadTableData();
    } catch (error) {
      console.error('Error deleting:', error);
      setError('Failed to delete row');
    }
  };

  return (
    <Box>
      <Paper elevation={0} sx={{
        p: 3,
        mb: 3,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha('#2e7d32', 0.05)} 0%, ${alpha('#f57c00', 0.03)} 100%)`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha('#2e7d32', 0.15)}`,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Storage sx={{ color: '#2e7d32' }} />
            <Typography variant="h5" fontWeight={700}>
              Database Manager
            </Typography>
          </Box>
          <Button
            startIcon={<Refresh />}
            onClick={loadTableData}
            variant="outlined"
            sx={{
              borderColor: '#2e7d32',
              color: '#2e7d32',
              '&:hover': {
                borderColor: '#2e7d32',
                bgcolor: alpha('#2e7d32', 0.08)
              }
            }}
          >
            Refresh
          </Button>
        </Box>

        <FormControl fullWidth>
          <InputLabel>Select Table</InputLabel>
          <Select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            label="Select Table"
          >
            {TABLES.map(table => (
              <MenuItem key={table.value} value={table.value}>
                {table.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Paper elevation={0} sx={{
        height: 600,
        borderRadius: 4,
        overflow: 'hidden',
        border: `1px solid ${alpha('#2e7d32', 0.15)}`,
      }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderColor: alpha('#2e7d32', 0.1)
            },
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: alpha('#2e7d32', 0.05),
              borderColor: alpha('#2e7d32', 0.15)
            }
          }}
        />
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          {editRow && Object.keys(editRow).map(key => (
            key !== 'id' && (
              <TextField
                key={key}
                fullWidth
                label={key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                value={editRow[key] || ''}
                onChange={(e) => setEditRow({ ...editRow, [key]: e.target.value })}
                sx={{ mt: 2 }}
                multiline={key.includes('text') || key.includes('description')}
                rows={key.includes('text') || key.includes('description') ? 3 : 1}
              />
            )
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this row?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DatabaseManager;
