CREATE TYPE user_role AS ENUM ('manager', 'operator');

-- CREATE TABLE IF NOT EXISTS users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(255) NOT NULL UNIQUE,
--     password_hash VARCHAR(255) NOT NULL,
--     role user_role NOT NULL,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- Create test users
-- Note: Replace these password hashes with proper hashed values
INSERT INTO users (id, username, hashed_password, role_id, role) VALUES
    (1, 'manager', '$2b$12$LQV3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY.HHKOEHs4BWwq', 1, 'manager'),  -- password: manager123
    (2, 'operator', '$2b$12$LQV3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY.HHKOEHs4BWwq', 2, 'operator'); -- password: operator123