from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '51b60b07d2cb'
down_revision = '4b881a2662b0'  # alembic will set this automatically when you create the revision; keep whatever was generated
branch_labels = None
depends_on = None

def upgrade():
    op.execute("""
    INSERT INTO roles (id, name)
    VALUES
      (0, 'manager'),
      (1, 'operator')
    ON CONFLICT (name) DO NOTHING;
    """)
    op.execute("""
    INSERT INTO users (id, username, hashed_password, role_id)
    VALUES
      (0, 'manager', '$2b$12$an97umZ8kY/AgP61XYWDP.8nMF.2LvmVngcyhCBIRDWr9xKOEW7mq', 0),
      (1, 'operator', '$2b$12$pEf.YfG3byBvMj41FN7HhuP/OqfdLW6sjHNvnzRTVAbxQcY7bEWji', 1)
    ON CONFLICT (username) DO NOTHING;
    """)

def downgrade():
    op.execute("""
    DELETE FROM users WHERE username IN ('manager', 'operator');
    """)