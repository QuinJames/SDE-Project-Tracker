import ldap, traceback
from configs import BaseConfig

config = BaseConfig()


def authenticate(username, password):
    conn = create_connection()
    if conn is not None:
        try:
            result = True if conn.simple_bind_s(username+config.DOMAIN, password)[0] == 97 else False
            conn.unbind()
            return result
        except Exception, e:
            # print traceback.format_exc()
            return False
    return False


def create_connection():
    try:
        conn = ldap.initialize(config.URL)
        conn.protocol_version = 3
        conn.set_option(ldap.OPT_REFERRALS, 0)
        return conn
    except Exception, e:
        print traceback.format_exc()
        return None


if __name__ == "__main__":
    print authenticate('rram', 'test123!')