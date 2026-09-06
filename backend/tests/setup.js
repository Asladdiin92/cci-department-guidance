/**
 * Jest Test Setup
 * Global configuration and utilities for all tests
 */

// Set test environment
process.env.NODE_ENV = 'test';

// Global timeout for all tests
jest.setTimeout(30000);

// Suppress console logs in tests (optional)
if (process.env.SILENT_TESTS === 'true') {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}

// Global test utilities
global.testUtils = {
  // Generate random test email
  randomEmail: () => `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@test.com`,
  
  // Generate random student ID
  randomStudentId: () => `TEST-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
  
  // Wait helper
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Clean test data (to be implemented per test)
  cleanupIds: []
};

// Cleanup after all tests
afterAll(async () => {
  // Add global cleanup logic here if needed
  await new Promise(resolve => setTimeout(resolve, 1000));
});
