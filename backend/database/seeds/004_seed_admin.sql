-- ================================================================
-- Seed Admin User
-- Creates default admin account
-- ================================================================

-- Default admin credentials:
-- Username: admin
-- Password: Admin@123 (CHANGE THIS IN PRODUCTION!)
-- Email: admin@haramaya.edu

INSERT INTO admin_users (
    username,
    password_hash,
    email,
    full_name,
    role,
    is_active
) VALUES (
    'admin',
    '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', -- Admin@123
    'admin@haramaya.edu',
    'System Administrator',
    'super_admin',
    true
) ON CONFLICT (username) DO NOTHING;

-- Verification
SELECT 
    username,
    email,
    full_name,
    role,
    is_active,
    created_at
FROM admin_users
WHERE username = 'admin';

-- ================================================================
-- IMPORTANT: Change default password immediately in production!
-- Default credentials:
--   Username: admin
--   Password: Admin@123
-- ================================================================
