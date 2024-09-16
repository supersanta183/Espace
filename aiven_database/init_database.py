from IdentityTables import *
from userTables import *
from database_connection import connection

try:
  cursor = connection.cursor()
  cursor.execute(create_AspNetUsers_table_query)
  cursor.execute(create_AspNetUserClaim_table_query)
  cursor.execute(create_user_table_query)
finally:
  connection.close()