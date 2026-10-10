from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from os import path

print(path.exists('../auth/keys/private_key.pem'))
print('tes ini dari keys.py')
def generate_key():
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )

    public_key = private_key.public_key()

    return {
        'public_key': public_key,
        'private_key': private_key
    }

def save_key_to_file(private_key, public_key):
    private_key_path = "../auth/keys/private_key.pem"
    public_key_path = "../auth/keys/public_key.pem"

    with open(private_key_path, 'wb') as f:
        f.write(private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.NoEncryption()
        ))

    with open(public_key_path, 'wb') as f:
        f.write(public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ))
        
data_key = generate_key()
save_key_to_file(data_key['private_key'], data_key['public_key'])