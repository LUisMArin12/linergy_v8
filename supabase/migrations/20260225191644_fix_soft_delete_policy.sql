/*
  # Fix soft delete policy for fallas

  1. Changes
    - Update the UPDATE policy to allow setting deleted_at
    - Change USING clause to allow updating any record (not just non-deleted ones)
    - Keep WITH CHECK permissive to allow soft deletes
  
  2. Security
    - Authenticated users can update any falla record
    - This allows soft deletes (setting deleted_at) to work correctly
*/

-- Drop existing update policy
DROP POLICY IF EXISTS "Authenticated users can update fallas" ON fallas;

-- Create new update policy that allows soft deletes
CREATE POLICY "Authenticated users can update fallas"
  ON fallas
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
