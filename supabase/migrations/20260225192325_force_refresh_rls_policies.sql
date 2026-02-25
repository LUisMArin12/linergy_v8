/*
  # Force refresh RLS policies for fallas table

  1. Problem
    - RLS policies may be cached causing permission issues
    - Users cannot soft delete fallas despite correct policies
  
  2. Solution
    - Disable RLS temporarily
    - Drop all policies
    - Recreate policies with fresh configuration
    - Re-enable RLS
  
  3. Security
    - Same security model as before
    - Authenticated users have full CRUD access
    - Non-deleted fallas are visible via SELECT
*/

-- Disable RLS temporarily
ALTER TABLE fallas DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "authenticated_select_fallas" ON fallas;
DROP POLICY IF EXISTS "authenticated_insert_fallas" ON fallas;
DROP POLICY IF EXISTS "authenticated_update_fallas" ON fallas;
DROP POLICY IF EXISTS "authenticated_delete_fallas" ON fallas;
DROP POLICY IF EXISTS "service_role_all_fallas" ON fallas;

-- Re-enable RLS
ALTER TABLE fallas ENABLE ROW LEVEL SECURITY;

-- Recreate SELECT policy: Show non-deleted fallas
CREATE POLICY "fallas_select_policy"
  ON fallas
  FOR SELECT
  TO authenticated
  USING (deleted_at IS NULL);

-- Recreate INSERT policy: Allow creating fallas
CREATE POLICY "fallas_insert_policy"
  ON fallas
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Recreate UPDATE policy: Allow updating any field including deleted_at
CREATE POLICY "fallas_update_policy"
  ON fallas
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Recreate DELETE policy: Allow hard deletes
CREATE POLICY "fallas_delete_policy"
  ON fallas
  FOR DELETE
  TO authenticated
  USING (true);

-- Service role policy: Full access
CREATE POLICY "fallas_service_role_policy"
  ON fallas
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
