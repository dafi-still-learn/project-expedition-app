# FILE TEMPAT MENENTUKAN FITUR APA SAJA YANG DIBERIKAN JIKA ROLE TERSEBUT ADMIN ATAU USER

def check_role(role):
    if role == 'admin':
        return True
    elif role == 'user':
        return False
    else:
        return None


