-- xFans Platform Database Schema
-- This SQL sets up the complete database structure for the xFans platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========== PROFILES TABLE ==========
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT NOT NULL CHECK (role IN ('fan', 'creator')),
  is_verified BOOLEAN DEFAULT FALSE,
  is_over_18 BOOLEAN DEFAULT FALSE,
  wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
  profile_url TEXT GENERATED ALWAYS AS (
    'https://xfans.com/creator/' || username
  ) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- ========== PROFILE LINKS TABLE ==========
CREATE TABLE IF NOT EXISTS profile_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  link_token TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4()::TEXT,
  link_url TEXT GENERATED ALWAYS AS (
    'https://xfans.com/p/' || link_token
  ) STORED,
  clicks_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profile_links_creator_id ON profile_links(creator_id);
CREATE INDEX IF NOT EXISTS idx_profile_links_link_token ON profile_links(link_token);

-- ========== CONTENT TABLE ==========
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  preview_url TEXT,
  thumbnail_url TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  caption TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  is_free BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  unlocks_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_creator_id ON content(creator_id);
CREATE INDEX IF NOT EXISTS idx_content_created_at ON content(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_price ON content(price);

-- ========== PURCHASES TABLE ==========
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fan_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_purchases_fan_id ON purchases(fan_id);
CREATE INDEX IF NOT EXISTS idx_purchases_content_id ON purchases(content_id);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON purchases(created_at DESC);

-- ========== MESSAGES TABLE ==========
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  text TEXT,
  content_id UUID REFERENCES content(id) ON DELETE SET NULL,
  is_locked BOOLEAN DEFAULT FALSE,
  price DECIMAL(10, 2),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(
  GREATEST(sender_id, receiver_id),
  LEAST(sender_id, receiver_id)
);

-- ========== TRANSACTIONS TABLE ==========
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'purchase', 'earning', 'tip')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  description TEXT,
  related_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);

-- ========== NOTIFICATIONS TABLE ==========
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('earning', 'message', 'unlock', 'follow', 'tip')),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  related_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- ========== FOLLOWS TABLE ==========
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CONSTRAINT no_self_follow CHECK (follower_id != following_id)
);

CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);

-- ========== LIKES TABLE ==========
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_content_id ON likes(content_id);

-- ========== ROW LEVEL SECURITY (RLS) ==========

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- PROFILES RLS
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- PROFILE LINKS RLS
CREATE POLICY "Profile links are viewable by everyone"
  ON profile_links FOR SELECT
  USING (true);

CREATE POLICY "Creators can create their own profile links"
  ON profile_links FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = creator_id
    AND user_id = auth.uid()
  ));

CREATE POLICY "Creators can delete their own profile links"
  ON profile_links FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = creator_id
    AND user_id = auth.uid()
  ));

-- CONTENT RLS
CREATE POLICY "Content is viewable by everyone"
  ON content FOR SELECT
  USING (true);

CREATE POLICY "Creators can create content"
  ON content FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = creator_id
    AND user_id = auth.uid()
    AND role = 'creator'
  ));

CREATE POLICY "Creators can update their own content"
  ON content FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = creator_id
    AND user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = creator_id
    AND user_id = auth.uid()
  ));

CREATE POLICY "Creators can delete their own content"
  ON content FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = creator_id
    AND user_id = auth.uid()
  ));

-- PURCHASES RLS
CREATE POLICY "Users can view their own purchases"
  ON purchases FOR SELECT
  USING (fan_id = (SELECT id FROM profiles WHERE user_id = auth.uid()) OR
         content_id IN (SELECT id FROM content WHERE creator_id = (SELECT id FROM profiles WHERE user_id = auth.uid())));

CREATE POLICY "Fans can create purchases"
  ON purchases FOR INSERT
  WITH CHECK (fan_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- MESSAGES RLS
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  USING (sender_id = (SELECT id FROM profiles WHERE user_id = auth.uid()) OR
         receiver_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (sender_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own messages"
  ON messages FOR UPDATE
  USING (sender_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- TRANSACTIONS RLS
CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  USING (user_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can create transactions"
  ON transactions FOR INSERT
  WITH CHECK (user_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- NOTIFICATIONS RLS
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (user_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (user_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- FOLLOWS RLS
CREATE POLICY "Follows are viewable by everyone"
  ON follows FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own follows"
  ON follows FOR INSERT
  WITH CHECK (follower_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own follows"
  ON follows FOR DELETE
  USING (follower_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- LIKES RLS
CREATE POLICY "Likes are viewable by everyone"
  ON likes FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own likes"
  ON likes FOR INSERT
  WITH CHECK (user_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own likes"
  ON likes FOR DELETE
  USING (user_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- ========== VIEWS FOR CONVENIENCE ==========

-- Conversations view - get last message with each person
CREATE OR REPLACE VIEW user_conversations AS
SELECT DISTINCT ON (participant_id)
  CASE 
    WHEN sender_id = profile_id THEN receiver_id
    ELSE sender_id
  END as participant_id,
  profile_id,
  id as last_message_id,
  sender_id,
  receiver_id,
  text,
  created_at,
  is_read
FROM messages
JOIN (SELECT id as profile_id FROM profiles WHERE user_id = auth.uid()) auth_profile ON true
WHERE (sender_id = auth_profile.profile_id OR receiver_id = auth_profile.profile_id)
ORDER BY participant_id, created_at DESC;

-- Creator earnings view
CREATE OR REPLACE VIEW creator_earnings AS
SELECT
  creator_id,
  COALESCE(SUM(CASE WHEN type = 'earning' AND status = 'completed' THEN amount ELSE 0 END), 0) as total_earnings,
  COALESCE(SUM(CASE WHEN type = 'withdrawal' AND status = 'completed' THEN amount ELSE 0 END), 0) as total_withdrawals,
  COALESCE(SUM(CASE WHEN type = 'earning' AND status = 'completed' THEN amount ELSE 0 END), 0) -
  COALESCE(SUM(CASE WHEN type = 'withdrawal' AND status = 'completed' THEN amount ELSE 0 END), 0) as net_balance
FROM transactions
JOIN content ON content.creator_id = transactions.user_id
GROUP BY creator_id;
