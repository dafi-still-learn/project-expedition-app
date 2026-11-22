"""convert paket tanggal columns to timestamp

Revision ID: 2b8a1c4d5e6f
Revises: 87916eacc053
Create Date: 2026-11-22 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2b8a1c4d5e6f'
down_revision: Union[str, Sequence[str], None] = '87916eacc053'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column(
        "paket",
        "tanggal_pengiriman",
        existing_type=sa.String(),
        type_=sa.TIMESTAMP(),
        existing_nullable=True,
        postgresql_using="tanggal_pengiriman::timestamp",
    )
    op.alter_column(
        "paket",
        "tanggal_sampai",
        existing_type=sa.String(),
        type_=sa.TIMESTAMP(),
        existing_nullable=True,
        postgresql_using="tanggal_sampai::timestamp",
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.alter_column(
        "paket",
        "tanggal_sampai",
        existing_type=sa.TIMESTAMP(),
        type_=sa.String(),
        existing_nullable=True,
    )
    op.alter_column(
        "paket",
        "tanggal_pengiriman",
        existing_type=sa.TIMESTAMP(),
        type_=sa.String(),
        existing_nullable=True,
    )
