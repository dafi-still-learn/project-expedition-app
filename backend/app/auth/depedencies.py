# FILE TEMPAT MENENTUKAN FITUR APA SAJA YANG DIBERIKAN JIKA ROLE TERSEBUT ADMIN ATAU USER

def require_admin(role):
    if role == 'admin':
        return True
    else:
        return False


def require_user(role):
    if role == 'user':
        return True
    else:
        return False


def get_current_user():
    check_user = check_current_role()
