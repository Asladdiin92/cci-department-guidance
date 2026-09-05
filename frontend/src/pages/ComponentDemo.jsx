/**
 * Component Demo Page
 * Showcases all atomic components in various states
 * Used for visual testing and design system documentation
 */

import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Alert,
  Chip,
  LinearProgress,
  CircularProgress,
  Skeleton,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Switch,
  Checkbox,
  Radio,
  FormControlLabel,
  RadioGroup,
  Stack,
  Avatar,
  Badge,
  Tabs,
  Tab,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const ComponentDemo = () => {
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('a');

  const handleLoadingToggle = () => {
    setLoading(!loading);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 800, color: 'primary.main' }}>
          CCI Design System
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Component Library & Visual Language
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
          This page showcases all atomic components in various states. Use this as a reference for
          consistent UI implementation across the application.
        </Typography>
      </Box>

      {/* ============================================ */}
      {/* BUTTONS SECTION */}
      {/* ============================================ */}
      <Section title="Buttons" subtitle="Various button styles, sizes, and states">
        <Stack spacing={4}>
          {/* Contained Buttons */}
          <Box>
            <Typography variant="h6" gutterBottom>Contained Buttons</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button variant="contained" size="small">Small</Button>
              <Button variant="contained" size="medium">Medium</Button>
              <Button variant="contained" size="large">Large</Button>
              <Button variant="contained" color="secondary">Secondary</Button>
              <Button variant="contained" color="success">Success</Button>
              <Button variant="contained" color="error">Error</Button>
              <Button variant="contained" disabled>Disabled</Button>
              <Button variant="contained" startIcon={<AddIcon />}>With Icon</Button>
            </Stack>
          </Box>

          {/* Outlined Buttons */}
          <Box>
            <Typography variant="h6" gutterBottom>Outlined Buttons</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button variant="outlined" size="small">Small</Button>
              <Button variant="outlined" size="medium">Medium</Button>
              <Button variant="outlined" size="large">Large</Button>
              <Button variant="outlined" color="secondary">Secondary</Button>
              <Button variant="outlined" color="success">Success</Button>
              <Button variant="outlined" color="error">Error</Button>
              <Button variant="outlined" disabled>Disabled</Button>
              <Button variant="outlined" startIcon={<EditIcon />}>With Icon</Button>
            </Stack>
          </Box>

          {/* Text Buttons */}
          <Box>
            <Typography variant="h6" gutterBottom>Text Buttons</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button variant="text" size="small">Small</Button>
              <Button variant="text" size="medium">Medium</Button>
              <Button variant="text" size="large">Large</Button>
              <Button variant="text" color="secondary">Secondary</Button>
              <Button variant="text" disabled>Disabled</Button>
            </Stack>
          </Box>

          {/* Icon Buttons */}
          <Box>
            <Typography variant="h6" gutterBottom>Icon Buttons</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
              <IconButton color="primary" size="small"><FavoriteIcon fontSize="small" /></IconButton>
              <IconButton color="primary"><FavoriteIcon /></IconButton>
              <IconButton color="primary" size="large"><FavoriteIcon fontSize="large" /></IconButton>
              <IconButton color="secondary"><SettingsIcon /></IconButton>
              <IconButton color="success"><CheckCircleIcon /></IconButton>
              <IconButton color="error"><DeleteIcon /></IconButton>
              <IconButton disabled><SettingsIcon /></IconButton>
              <Tooltip title="Notifications">
                <IconButton color="primary">
                  <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          {/* Loading Buttons */}
          <Box>
            <Typography variant="h6" gutterBottom>Loading States</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="contained" onClick={handleLoadingToggle}>
                Toggle Loading
              </Button>
              {loading && (
                <>
                  <Button variant="contained" disabled>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Loading...
                  </Button>
                  <Button variant="outlined" disabled>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Processing
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        </Stack>
      </Section>

      {/* ============================================ */}
      {/* INPUT FIELDS SECTION */}
      {/* ============================================ */}
      <Section title="Input Fields" subtitle="Text fields with various states">
        <Stack spacing={4}>
          {/* Standard Inputs */}
          <Box>
            <Typography variant="h6" gutterBottom>Standard Inputs</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Default Input" placeholder="Enter text..." />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="With Helper Text" helperText="This is helper text" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Required Field" required />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Disabled Input" disabled value="Disabled value" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Error State" error helperText="This field has an error" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Success State" color="success" helperText="Input is valid" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Multiline" multiline rows={4} placeholder="Enter multiple lines..." />
              </Grid>
            </Grid>
          </Box>

          {/* Input Sizes */}
          <Box>
            <Typography variant="h6" gutterBottom>Input Sizes</Typography>
            <Stack spacing={2}>
              <TextField fullWidth label="Small Input" size="small" />
              <TextField fullWidth label="Medium Input (Default)" size="medium" />
            </Stack>
          </Box>
        </Stack>
      </Section>

      {/* ============================================ */}
      {/* CARDS SECTION */}
      {/* ============================================ */}
      <Section title="Cards" subtitle="Card components with various content">
        <Grid container spacing={3}>
          {/* Basic Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Basic Card
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is a simple card with title and description. Cards are used to group related
                  content and actions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Stat Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Students
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                  1,247
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  +12% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Info Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ border: 2, borderColor: 'primary.main' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <InfoIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Featured Content
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Highlighted card with border and icon
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Interactive Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ transition: 'all 0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: 10 } }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Interactive Card
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Hover over this card to see the lift effect
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip label="Tag 1" color="primary" size="small" />
                  <Chip label="Tag 2" color="secondary" size="small" />
                  <Chip label="Tag 3" variant="outlined" size="small" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Card with Actions */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Card with Actions
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Cards can include action buttons
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button variant="contained" size="small">Primary</Button>
                  <Button variant="outlined" size="small">Secondary</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Section>

      {/* ============================================ */}
      {/* ALERTS & FEEDBACK */}
      {/* ============================================ */}
      <Section title="Alerts & Feedback" subtitle="Status messages and notifications">
        <Stack spacing={2}>
          <Alert severity="success" icon={<CheckCircleIcon />}>
            <strong>Success!</strong> Your changes have been saved successfully.
          </Alert>
          <Alert severity="info" icon={<InfoIcon />}>
            <strong>Information:</strong> This is an informational message.
          </Alert>
          <Alert severity="warning" icon={<WarningIcon />}>
            <strong>Warning:</strong> Please review this before proceeding.
          </Alert>
          <Alert severity="error" icon={<ErrorIcon />}>
            <strong>Error:</strong> Something went wrong. Please try again.
          </Alert>
          <Alert severity="success" variant="outlined">
            Outlined success alert
          </Alert>
          <Alert severity="info" variant="filled">
            Filled info alert
          </Alert>
        </Stack>
      </Section>

      {/* ============================================ */}
      {/* CHIPS & BADGES */}
      {/* ============================================ */}
      <Section title="Chips & Badges" subtitle="Tags and status indicators">
        <Stack spacing={4}>
          <Box>
            <Typography variant="h6" gutterBottom>Chips</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label="Default" />
              <Chip label="Primary" color="primary" />
              <Chip label="Secondary" color="secondary" />
              <Chip label="Success" color="success" />
              <Chip label="Error" color="error" />
              <Chip label="Warning" color="warning" />
              <Chip label="Outlined" variant="outlined" />
              <Chip label="Clickable" onClick={() => alert('Clicked!')} />
              <Chip label="Deletable" onDelete={() => alert('Deleted!')} />
              <Chip label="With Avatar" avatar={<Avatar>A</Avatar>} />
              <Chip label="Small" size="small" />
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>Badges</Typography>
            <Stack direction="row" spacing={4} alignItems="center">
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon color="action" />
              </Badge>
              <Badge badgeContent={10} color="secondary">
                <NotificationsIcon color="action" />
              </Badge>
              <Badge badgeContent={99} color="error">
                <NotificationsIcon color="action" />
              </Badge>
              <Badge variant="dot" color="success">
                <NotificationsIcon color="action" />
              </Badge>
              <Badge badgeContent="NEW" color="primary">
                <Typography>Item</Typography>
              </Badge>
            </Stack>
          </Box>
        </Stack>
      </Section>

      {/* ============================================ */}
      {/* PROGRESS INDICATORS */}
      {/* ============================================ */}
      <Section title="Progress Indicators" subtitle="Loading states and progress bars">
        <Stack spacing={4}>
          <Box>
            <Typography variant="h6" gutterBottom>Linear Progress</Typography>
            <Stack spacing={2}>
              <LinearProgress />
              <LinearProgress variant="determinate" value={30} />
              <LinearProgress variant="determinate" value={60} color="secondary" />
              <LinearProgress variant="determinate" value={90} color="success" />
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>Circular Progress</Typography>
            <Stack direction="row" spacing={4} alignItems="center">
              <CircularProgress />
              <CircularProgress color="secondary" />
              <CircularProgress variant="determinate" value={30} />
              <CircularProgress variant="determinate" value={60} color="success" />
              <CircularProgress variant="determinate" value={90} color="error" />
              <CircularProgress size={60} thickness={6} />
            </Stack>
          </Box>
        </Stack>
      </Section>

      {/* ============================================ */}
      {/* SKELETON LOADERS */}
      {/* ============================================ */}
      <Section title="Skeleton Loaders" subtitle="Loading placeholders for better perceived performance">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Stack spacing={1}>
                  <Skeleton variant="text" width="60%" height={32} />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="rectangular" height={118} sx={{ mt: 2 }} />
                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Skeleton variant="rounded" width={80} height={32} />
                    <Skeleton variant="rounded" width={80} height={32} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Skeleton variant="circular" width={60} height={60} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="60%" />
                  </Box>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1}>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="70%" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Section>

      {/* ============================================ */}
      {/* FORM CONTROLS */}
      {/* ============================================ */}
      <Section title="Form Controls" subtitle="Checkboxes, radios, and switches">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Checkboxes</Typography>
            <Stack>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Checked" />
              <FormControlLabel control={<Checkbox />} label="Unchecked" />
              <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
              <FormControlLabel control={<Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />} />} label="Custom Icon" />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Radio Buttons</Typography>
            <RadioGroup value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
              <FormControlLabel value="a" control={<Radio />} label="Option A" />
              <FormControlLabel value="b" control={<Radio />} label="Option B" />
              <FormControlLabel value="c" control={<Radio />} label="Option C" />
              <FormControlLabel value="d" control={<Radio />} label="Disabled" disabled />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Switches</Typography>
            <Stack>
              <FormControlLabel control={<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />} label="Default" />
              <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Secondary" />
              <FormControlLabel control={<Switch defaultChecked color="success" />} label="Success" />
              <FormControlLabel control={<Switch disabled />} label="Disabled" />
            </Stack>
          </Grid>
        </Grid>
      </Section>

      {/* ============================================ */}
      {/* TABS */}
      {/* ============================================ */}
      <Section title="Tabs" subtitle="Navigation tabs">
        <Box>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Tab One" />
            <Tab label="Tab Two" />
            <Tab label="Tab Three" />
            <Tab label="Disabled" disabled />
          </Tabs>
          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography>Content for tab {tabValue + 1}</Typography>
          </Paper>
        </Box>
      </Section>

      {/* ============================================ */}
      {/* TYPOGRAPHY */}
      {/* ============================================ */}
      <Section title="Typography" subtitle="Text styles and hierarchy">
        <Stack spacing={2}>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="h6">Heading 6</Typography>
          <Typography variant="subtitle1">Subtitle 1 - Used for section subheadings</Typography>
          <Typography variant="subtitle2">Subtitle 2 - Used for smaller section subheadings</Typography>
          <Typography variant="body1">
            Body 1 - Regular body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography variant="body2">
            Body 2 - Smaller body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography variant="caption">Caption text - Used for small labels and timestamps</Typography>
          <Typography variant="overline">Overline Text</Typography>
        </Stack>
      </Section>
    </Container>
  );
};

// Section wrapper component
const Section = ({ title, subtitle, children }) => (
  <Box sx={{ mb: 8 }}>
    <Box sx={{ mb: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
    <Paper sx={{ p: 4, borderRadius: 2 }}>
      {children}
    </Paper>
  </Box>
);

export default ComponentDemo;
