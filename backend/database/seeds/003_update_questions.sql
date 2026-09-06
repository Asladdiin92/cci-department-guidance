-- ================================================================
-- CCI Department Guidance System - UPDATE Assessment Questions
-- Version: 2.0 (Update existing questions with corrected scores)
-- Date: September 1, 2026
-- Description: Update 2 questions with corrected scoring weights
-- ================================================================

-- ================================================================
-- UPDATE QUESTION 12 (Internship preference) - Option 5
-- More ISC-specific: cataloging and digitizing
-- ================================================================

UPDATE question_options
SET scores = '{"CS": 0, "SWE": 0, "IT": 0, "IS": 1, "ISC": 3, "STAT": 0}'::jsonb
WHERE text = 'Digitizing, cataloging, and improving access to institutional records or learning resources'
  AND question_id IN (
    SELECT id FROM questions WHERE text LIKE '%internship%'
  );

-- ================================================================
-- UPDATE QUESTION 16 (Skill strength) - Option 2
-- CS also has strong programming (16 lessons with coding)
-- ================================================================

UPDATE question_options
SET scores = '{"CS": 2, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}'::jsonb
WHERE text = 'Programming, coding, and software development'
  AND question_id IN (
    SELECT id FROM questions WHERE text LIKE '%skill area%strongest%'
  );

-- ================================================================
-- Verification: Show updated options
-- ================================================================

SELECT 
    q.order_index as question_num,
    LEFT(q.text, 50) || '...' as question,
    LEFT(qo.text, 50) || '...' as option,
    qo.scores->'CS' as CS,
    qo.scores->'SWE' as SWE,
    qo.scores->'IT' as IT,
    qo.scores->'IS' as IS,
    qo.scores->'ISC' as ISC,
    qo.scores->'STAT' as STAT
FROM questions q
JOIN question_options qo ON q.id = qo.question_id
WHERE q.order_index IN (12, 16)
  AND (
    qo.text LIKE '%cataloging%'
    OR qo.text LIKE '%Programming, coding%'
  )
ORDER BY q.order_index, qo.order_index;

-- ================================================================
-- Success message
-- ================================================================

DO $$
BEGIN
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Assessment Questions Updated Successfully!';
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Question 12, Option 5: ISC scoring increased';
    RAISE NOTICE 'Question 16, Option 2: CS scoring increased';
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Updated: 2 questions with corrected weights';
    RAISE NOTICE '==================================================';
END $$;
