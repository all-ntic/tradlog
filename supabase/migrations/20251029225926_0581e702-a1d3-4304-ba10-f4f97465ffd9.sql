-- Fix RLS policies for security issues

-- 1. Fix eglise_members table - restrict full PII access to admins/moderators only
DROP POLICY IF EXISTS "Users can view members of their church" ON eglise_members;

CREATE POLICY "Only admins and moderators can view member details"
ON eglise_members FOR SELECT
USING (
  (church_id = get_user_church(auth.uid())) AND 
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role))
);

-- 2. Fix eglise_event_participants table - restrict contact details to admins/moderators
DROP POLICY IF EXISTS "Users can view participants of their church events" ON eglise_event_participants;

CREATE POLICY "Only admins and moderators can view participant details"
ON eglise_event_participants FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM eglise_events 
    WHERE eglise_events.id = eglise_event_participants.event_id 
    AND eglise_events.church_id = get_user_church(auth.uid())
  ) AND (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'moderator'::app_role)
  )
);

-- 3. Fix chatbot_rate_limits table - restrict to service role only (edge functions)
-- This table should not be accessible via the API, only via edge functions with service role
DROP POLICY IF EXISTS "Edge functions can manage rate limits" ON chatbot_rate_limits;

-- No RLS policy needed - service role bypasses RLS, and we don't want client access at all
-- RLS is enabled but with no policies means no client access, only service role