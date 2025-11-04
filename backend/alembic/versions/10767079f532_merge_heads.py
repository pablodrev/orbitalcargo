"""Merge heads

Revision ID: 10767079f532
Revises: 51b60b07d2cb, c9d83f34bf56
Create Date: 2025-11-04 11:56:05.091564

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '10767079f532'
down_revision: Union[str, Sequence[str], None] = ('51b60b07d2cb', 'c9d83f34bf56')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
