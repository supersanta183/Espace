import pymysql
import os
from dotenv import load_dotenv


load_dotenv()

# Retrieve environment variables
db_host = os.getenv('DB_HOST')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_name = os.getenv('DB_NAME')
db_port = os.getenv('DB_PORT')

timeout = 10
connection = pymysql.connect(
  charset="utf8mb4",
  connect_timeout=timeout,
  cursorclass=pymysql.cursors.DictCursor,
  db=db_name,
  host=db_host,
  password=db_password,
  read_timeout=timeout,
  port=int(db_port),
  user=db_user,
  write_timeout=timeout,
)