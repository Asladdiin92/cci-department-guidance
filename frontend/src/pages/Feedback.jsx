import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Rating,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress,
  Stack,
  Chip
} from '@mui/material';
import { Send, CheckCircle } from '@mui/icons-material';

function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    student_id: '',
    category: 'general',
    rating: 0,
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to submit feedback');

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        student_id: '',
        category: 'general',
        rating: 0,
        subject: '',
        message: ''
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'general', label: 'General Feedback' },
    { value: 'assessment', label: 'Assessment Experience' },
    { value: 'results', label: 'Results & Recommendations' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'suggestion', label: 'Suggestion' }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" gutterBottom fontWeight={700} color="primary.main">
          Send Us Your Feedback
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Help us improve the CCI Department Guidance System. Your feedback is valuable to us!
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} icon={<CheckCircle />}>
          Thank you for your feedback! We'll review it and use it to improve our system.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Personal Information */}
            <TextField
              label="Full Name"
              value={formData.name}
              onChange={handleChange('name')}
              required
              fullWidth
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                required
                fullWidth
              />
              <TextField
                label="Student ID (Optional)"
                value={formData.student_id}
                onChange={handleChange('student_id')}
                fullWidth
              />
            </Stack>

            {/* Category */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Feedback Category</FormLabel>
              <RadioGroup
                value={formData.category}
                onChange={handleChange('category')}
                row
              >
                {categories.map((cat) => (
                  <FormControlLabel
                    key={cat.value}
                    value={cat.value}
                    control={<Radio />}
                    label={cat.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {/* Rating */}
            <Box>
              <Typography component="legend" gutterBottom>
                Overall Experience Rating
              </Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
                size="large"
              />
            </Box>

            {/* Subject */}
            <TextField
              label="Subject"
              value={formData.subject}
              onChange={handleChange('subject')}
              required
              fullWidth
            />

            {/* Message */}
            <TextField
              label="Your Feedback"
              value={formData.message}
              onChange={handleChange('message')}
              required
              multiline
              rows={6}
              fullWidth
              placeholder="Please share your thoughts, suggestions, or report any issues..."
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Send />}
              sx={{ py: 1.5 }}
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* Info Section */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Your feedback helps us improve the guidance system for all students. 
          We typically respond within 2-3 business days.
        </Typography>
      </Box>
    </Container>
  );
}

export default Feedback;
