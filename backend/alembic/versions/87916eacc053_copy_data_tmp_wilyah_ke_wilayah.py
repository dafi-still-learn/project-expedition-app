"""copy data tmp_wilyah ke wilayah

Revision ID: 87916eacc053
Revises: 4b3cc62a740b
Create Date: 2026-11-14 01:54:51.360885

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '87916eacc053'
down_revision: Union[str, Sequence[str], None] = '4b3cc62a740b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""INSERT INTO wilayah (
        kode_wilayah,
        nama_wilayah,
        type_wilayah,
        lat_wilayah,
        long_wilayah,
        status_wilayah,
        geom
        )
        SELECT
            kode_wilayah,
            nama_wilayah,
            type_wilayah,
            lat_wilayah,
            long_wilayah,
            status_wilayah,
            geom
        FROM tmp_wilayah
    """)


def downgrade() -> None:
    op.execute("DELETE FROM wilayah WHERE id IN (SELECT id FROM tmp_wilayah)")
