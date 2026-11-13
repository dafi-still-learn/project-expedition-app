"""wrong format for jumlah in paket, and there different between with table pelanggan

Revision ID: f0c3d060fd49
Revises: 856353023ad6
Create Date: 2026-11-13 23:10:55.641348

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f0c3d060fd49'
down_revision: Union[str, Sequence[str], None] = '856353023ad6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
