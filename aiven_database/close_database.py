from IdentityTables import *
from database_connection import connection

try:
  cursor = connection.cursor()
  cursor.execute("""DROP TABLE IF EXISTS AspNetUserClaims""")
  cursor.execute("""DROP TABLE IF EXISTS AspNetUsers""")
  cursor.execute("""DROP TABLE IF EXISTS Users""")
  print(cursor.fetchall())
finally:
  connection.close()