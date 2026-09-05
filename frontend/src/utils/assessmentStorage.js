/**
 * LocalStorage utilities for Assessment Save/Resume functionality
 * Allows users to continue where they left off
 */

const STORAGE_KEY = 'cci_assessment_progress';

/**
 * Save assessment progress to localStorage
 */
export const saveAssessmentProgress = (data) => {
  try {
    const progressData = {
      ...data,
      savedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
    console.log('✅ Assessment progress saved');
    return true;
  } catch (error) {
    console.error('❌ Failed to save assessment progress:', error);
    return false;
  }
};

/**
 * Load assessment progress from localStorage
 */
export const loadAssessmentProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);

    // Check if data has expired
    if (data.expiresAt && new Date(data.expiresAt) < new Date()) {
      console.log('⏰ Assessment progress expired');
      clearAssessmentProgress();
      return null;
    }

    console.log('✅ Assessment progress loaded');
    return data;
  } catch (error) {
    console.error('❌ Failed to load assessment progress:', error);
    return null;
  }
};

/**
 * Clear assessment progress from localStorage
 */
export const clearAssessmentProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🗑️ Assessment progress cleared');
    return true;
  } catch (error) {
    console.error('❌ Failed to clear assessment progress:', error);
    return false;
  }
};

/**
 * Check if there is saved progress
 */
export const hasSavedProgress = () => {
  const data = loadAssessmentProgress();
  return data !== null;
};

/**
 * Get saved progress timestamp
 */
export const getSavedProgressTime = () => {
  const data = loadAssessmentProgress();
  if (!data || !data.savedAt) return null;
  
  return new Date(data.savedAt);
};

/**
 * Format saved progress time for display
 */
export const formatSavedProgressTime = () => {
  const savedTime = getSavedProgressTime();
  if (!savedTime) return null;

  const now = new Date();
  const diffMs = now - savedTime;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

/**
 * Migrate old assessment data format (if needed)
 */
export const migrateAssessmentData = (data) => {
  // Add migration logic here if storage format changes
  return data;
};
