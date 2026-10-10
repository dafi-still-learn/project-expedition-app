# TEMPAT UNTUK MELAKUKAN SECURITY DARI SETIAP PROSES TOKEN, JWT, VERIFY REFRESH TOKEN
from argon2 import PasswordHasher
import jwt
from time import time

ph = PasswordHasher()

# pasangang key jangan di otak atik
def make_access_token(private_key, user_id):
    payload = {
        'sub': user_id,
        'type': 'access',
        'iat': time(),
        'exp': time() + 900
    }

    access_token = jwt.encode(
        payload,
        private_key,
        algorithm="RS256"
    )

    return access_token


def make_refresh_token(private_key, user_id):
    payload = {
        'sub': user_id,
        'type': 'refresh',
        'iat': time(),
        'exp': time() + 60 * 60 * 24 * 30
    }

    refresh_token = jwt.encode(
        payload,
        private_key,
        algorithm="RS256"
    )

    return refresh_token


def hash_password(password: str):
    return ph.hash(password)

# fungsi ini mengecek apakah password yang dimasukkan sama dengan password yang di hash dari database
def verify_password(password: str, hashed_password: str):
    try:
        return ph.verify(hashed_password, password)
    except Exception as e: 
        print(f"Password verification failed: {e}")
        return False
