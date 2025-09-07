-- Enable RLS on existing tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON profiles FOR DELETE USING (auth.uid() = id);

-- Modules policies (public read, admin write)
CREATE POLICY "modules_select_all" ON modules FOR SELECT USING (is_active = true);
CREATE POLICY "modules_admin_all" ON modules FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'admin'
  )
);

-- User progress policies
CREATE POLICY "user_progress_select_own" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_progress_insert_own" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_progress_update_own" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "user_progress_delete_own" ON user_progress FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "comments_select_all" ON comments FOR SELECT USING (true);
CREATE POLICY "comments_insert_own" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_update_own" ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "comments_delete_own" ON comments FOR DELETE USING (auth.uid() = user_id);

-- WhatsApp subscriptions policies
CREATE POLICY "whatsapp_select_own" ON whatsapp_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "whatsapp_insert_own" ON whatsapp_subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "whatsapp_update_own" ON whatsapp_subscriptions FOR UPDATE USING (auth.uid() = user_id);
