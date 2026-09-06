import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import { getDepartments } from '../services/api';

function DepartmentsSimple() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDepartments();
      setDepartments(data);
    } catch (err) {
      console.error('Departments fetch error:', err);
      setError(err.message || 'Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        CCI Departments
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Explore all {departments.length} departments in the College of Computing and Informatics
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {departments.map((dept) => (
          <Grid item xs={12} sm={6} md={4} key={dept.code}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {dept.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {dept.description}
                </Typography>
                <Button
                  component={Link}
                  to={`/departments/${dept.code.toLowerCase()}`}
                  variant="contained"
                  fullWidth
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default DepartmentsSimple;
