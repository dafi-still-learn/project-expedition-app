"""missing pelanggan columns

Revision ID: 368755e50f1e
Revises: f4f6256b8ef6
Create Date: 2026-11-13 09:19:25.121068

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '368755e50f1e'
down_revision: Union[str, Sequence[str], None] = 'f4f6256b8ef6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("paket", sa.Column(
        'jumlah_paket', sa.Integer(),
        nullable=True
    ))

def downgrade() -> None:
    op.drop_column('paket', 'jumlah_paket')
