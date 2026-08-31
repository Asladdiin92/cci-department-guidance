const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Supabase Admin Client using Service Role Key
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Admin Analytics Aggregate Route
app.get('/api/admin/analytics', async (req, res) => {
  try {
    const { data: totalAssessments, count: totalCount } = await supabaseAdmin
      .from('assessments')
      .select('*', { count: 'exact', head: true });

    const { data: topRecommendations } = await supabaseAdmin
      .from('recommendations')
      .select('score, rank, departments(name, code)')
      .eq('rank', 1);

    res.json({
      totalStudents: totalCount || 0,
      topChoices: topRecommendations
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});