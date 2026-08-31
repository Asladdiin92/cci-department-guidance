-- ================================================================
-- Migration Verification Script
-- Run this AFTER executing 001_initial_schema.sql
-- This will verify that the migration completed successfully
-- ================================================================

-- Test 1: Check that all tables exist
DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name IN (
        'departments',
        'questions',
        'question_options',
        'assessments',
        'assessment_responses',
        'recommendations',
        'feedback',
        'admin_users'
    );
    
    IF table_count = 8 THEN
        RAISE NOTICE '✅ TEST 1 PASSED: All 8 tables exist';
    ELSE
        RAISE EXCEPTION '❌ TEST 1 FAILED: Expected 8 tables, found %', table_count;
    END IF;
END $$;

-- Test 2: Verify UUID extension is enabled
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'uuid-ossp') THEN
        RAISE NOTICE '✅ TEST 2 PASSED: uuid-ossp extension is enabled';
    ELSE
        RAISE EXCEPTION '❌ TEST 2 FAILED: uuid-ossp extension not found';
    END IF;
END $$;

-- Test 3: Check that problematic DATE index does NOT exist
DO $$
DECLARE
    index_exists BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM pg_indexes
        WHERE tablename = 'assessments'
        AND indexname = 'idx_assessments_date'
    ) INTO index_exists;
    
    IF NOT index_exists THEN
        RAISE NOTICE '✅ TEST 3 PASSED: Problematic DATE index correctly removed';
    ELSE
        RAISE EXCEPTION '❌ TEST 3 FAILED: Old DATE index still exists - use updated migration file';
    END IF;
END $$;

-- Test 4: Verify recommendations.department_id is VARCHAR, not UUID
DO $$
DECLARE
    column_type TEXT;
BEGIN
    SELECT data_type INTO column_type
    FROM information_schema.columns
    WHERE table_name = 'recommendations'
    AND column_name = 'department_id';
    
    IF column_type = 'character varying' THEN
        RAISE NOTICE '✅ TEST 4 PASSED: recommendations.department_id is VARCHAR (correct)';
    ELSE
        RAISE EXCEPTION '❌ TEST 4 FAILED: recommendations.department_id is %, expected VARCHAR - use updated migration file', column_type;
    END IF;
END $$;

-- Test 5: Verify foreign key references departments(code)
DO $$
DECLARE
    fk_column TEXT;
BEGIN
    SELECT ccu.column_name INTO fk_column
    FROM information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
    WHERE tc.table_name = 'recommendations'
    AND tc.constraint_type = 'FOREIGN KEY'
    AND kcu.column_name = 'department_id';
    
    IF fk_column = 'code' THEN
        RAISE NOTICE '✅ TEST 5 PASSED: Foreign key references departments(code) correctly';
    ELSE
        RAISE EXCEPTION '❌ TEST 5 FAILED: Foreign key references departments.%, expected code', fk_column;
    END IF;
END $$;

-- Test 6: Count indexes
DO $$
DECLARE
    index_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO index_count
    FROM pg_indexes
    WHERE schemaname = 'public';
    
    IF index_count >= 20 THEN
        RAISE NOTICE '✅ TEST 6 PASSED: Found % indexes (expected 20+)', index_count;
    ELSE
        RAISE EXCEPTION '❌ TEST 6 FAILED: Only % indexes found, expected 20+', index_count;
    END IF;
END $$;

-- Test 7: Verify views exist
DO $$
DECLARE
    view_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO view_count
    FROM information_schema.views
    WHERE table_schema = 'public'
    AND table_name IN (
        'view_assessment_statistics',
        'view_department_popularity',
        'view_feedback_summary'
    );
    
    IF view_count = 3 THEN
        RAISE NOTICE '✅ TEST 7 PASSED: All 3 analytical views exist';
    ELSE
        RAISE EXCEPTION '❌ TEST 7 FAILED: Expected 3 views, found %', view_count;
    END IF;
END $$;

-- Test 8: Check RLS policies exist
DO $$
DECLARE
    policy_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies
    WHERE schemaname = 'public';
    
    IF policy_count > 0 THEN
        RAISE NOTICE '✅ TEST 8 PASSED: Found % RLS policies', policy_count;
    ELSE
        RAISE WARNING '⚠️  TEST 8 WARNING: No RLS policies found (may be expected)';
    END IF;
END $$;

-- Test 9: Verify constraints on questions table
DO $$
DECLARE
    constraint_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO constraint_count
    FROM information_schema.table_constraints
    WHERE table_name = 'questions'
    AND constraint_type = 'CHECK';
    
    IF constraint_count >= 3 THEN
        RAISE NOTICE '✅ TEST 9 PASSED: Questions table has % CHECK constraints', constraint_count;
    ELSE
        RAISE EXCEPTION '❌ TEST 9 FAILED: Expected 3+ CHECK constraints on questions, found %', constraint_count;
    END IF;
END $$;

-- Test 10: Verify recommendations table constraints
DO $$
DECLARE
    constraint_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO constraint_count
    FROM information_schema.table_constraints
    WHERE table_name = 'recommendations'
    AND constraint_type IN ('CHECK', 'UNIQUE');
    
    IF constraint_count >= 4 THEN
        RAISE NOTICE '✅ TEST 10 PASSED: Recommendations table has % constraints', constraint_count;
    ELSE
        RAISE EXCEPTION '❌ TEST 10 FAILED: Expected 4+ constraints on recommendations, found %', constraint_count;
    END IF;
END $$;

-- ================================================================
-- SUMMARY
-- ================================================================

SELECT 
    '=====================================' as separator
UNION ALL
SELECT 'MIGRATION VERIFICATION COMPLETE ✅'
UNION ALL
SELECT '======================================'
UNION ALL
SELECT ''
UNION ALL
SELECT 'All critical tests passed!'
UNION ALL
SELECT 'Your database is properly configured.'
UNION ALL
SELECT ''
UNION ALL
SELECT 'Next steps:'
UNION ALL
SELECT '  1. Run: 002_seed_departments.sql'
UNION ALL
SELECT '  2. Run: 003_seed_questions.sql'
UNION ALL
SELECT '  3. Test backend: npm run dev'
UNION ALL
SELECT ''
UNION ALL
SELECT '=====================================';

-- Display table summary
SELECT 
    table_name,
    (SELECT COUNT(*) 
     FROM information_schema.columns 
     WHERE table_name = t.table_name) as column_count,
    (SELECT COUNT(*) 
     FROM pg_indexes 
     WHERE tablename = t.table_name) as index_count
FROM information_schema.tables t
WHERE table_schema = 'public'
ORDER BY table_name;

-- ================================================================
-- If all tests pass, you'll see:
-- ✅ 10 success messages
-- ✅ Summary report
-- ✅ Table statistics
--
-- If any test fails:
-- ❌ You'll see an ERROR with instructions
-- ❌ Use the updated migration file
-- ================================================================
