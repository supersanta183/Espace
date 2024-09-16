import pymysql
from database_connection import connection
  
try:
  cursor = connection.cursor()
  #cursor.execute("CREATE TABLE mytest2 (id INTEGER PRIMARY KEY)")
  #cursor.execute("INSERT INTO mytest (id) VALUES (1), (2)")
  #cursor.execute("SELECT * FROM mytest")
  #cursor.execute(create_table_query)
  cursor.execute("SELECT * FROM AspNetUserClaims")
  #cursor.execute("SELECT * FROM Users")
  #cursor.execute("SHOW TABLES")
  print(cursor.fetchall())
finally:
  connection.close()