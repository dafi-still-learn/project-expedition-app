# dijalankan ketika server akan dijalankan ynag mana berfungsi untuk meload data private key dan public key

from cryptography.hazmat.primitives import serialization
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

PRIVATE_KEY_PATH = BASE_DIR / "auth" / "keys" / "private_key.pem"
PUBLIC_KEY_PATH = BASE_DIR / "auth" / "keys" / "public_key.pem"


def load_private_key():
    with open(PRIVATE_KEY_PATH, 'rb') as f:
        return serialization.load_pem_private_key(
            f.read(),
            password=None
        )


def load_public_key():
    with open(PUBLIC_KEY_PATH, 'rd') as f:
        return serialization.load_pem_public_key(
            f.read(),
        )

private_key = load_private_key()
public_key = load_public_key()