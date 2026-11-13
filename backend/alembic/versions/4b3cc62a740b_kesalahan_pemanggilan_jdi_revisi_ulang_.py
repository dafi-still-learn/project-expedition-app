"""kesalahan pemanggilan, jdi revisi ulang pada kolom tabel paket

Revision ID: 4b3cc62a740b
Revises: f0c3d060fd49
Create Date: 2026-11-13 23:25:13.325033

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4b3cc62a740b'
down_revision: Union[str, Sequence[str], None] = 'f0c3d060fd49'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute(
        "ALTER TABLE paket ALTER COLUMN jumlah_paket TYPE INTEGER USING jumlah_paket::integer"
    )


def downgrade() -> None:
   op.execute(
       "ALTER TABLE paket ALTER COLUMN jumlah_paket TYPE NUMERIC(10,2) USING jumlah_paket::numeric(10,2)"
   )
