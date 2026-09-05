/**
 * Jest Test Setup
 * Runs before all tests
 */

require('dotenv').config();

// Increase timeout for database operations
jest.setTimeout(30000);

// Suppress console logs during tests (optional)
if (process.env.SUPPRESS_LOGS === 'true') {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  };
}

// Global test utilities
global.testUtils = {
  generateTestStudent: () => ({
    student_id: `TEST/${Date.now()}`,
    student_name: 'Test Student',
    student_email: `test${Date.now()}@haramaya.edu.et`
  })
};
