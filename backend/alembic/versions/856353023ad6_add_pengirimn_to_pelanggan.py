"""add pengirimn to pelanggan

Revision ID: 856353023ad6
Revises: 368755e50f1e
Create Date: 2026-11-13 09:32:28.414744

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '856353023ad6'
down_revision: Union[str, Sequence[str], None] = '368755e50f1e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column("pelanggan", sa.Column("pengirimn", sa.String(), nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("pelanggan", "pengirimn")
