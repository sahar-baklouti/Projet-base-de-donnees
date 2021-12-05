import os
import sqlite3
from typing import Dict, List


def dict_factory(cursor: sqlite3.Cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


class SqlConnectionManager:
    cursor: sqlite3.Cursor

    def __init__(self, data_base: str):
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        db_path = os.path.join(BASE_DIR, data_base)
        self.sqliteConnection = sqlite3.connect(db_path)
        self.sqliteConnection.row_factory = dict_factory
        self.cursor = self.sqliteConnection.cursor()

    def __del__(self):
        self.cursor.close()
        self.sqliteConnection.commit()
        self.sqliteConnection.close()

    def execute(self, *args, **kwargs):
        return self.cursor.execute(*args, **kwargs)

    def fetchone(self):
        return self.cursor.fetchone()

    def fetchall(self):
        return self.cursor.fetchall()

    def insert_into_data_base(self, table_name: str, data: Dict[str, any]) -> bool:
        if not data:
            return False

        data_value = [data[key] for key in data]
        wrap_string = "(" + ", ".join(["?" for key in data]) + ")"
        columns = "(" + ",".join([key for key in data]) + ")"

        preformat_sql = f"INSERT INTO {table_name} {columns} VALUES {wrap_string}"
        self.cursor.execute(preformat_sql, data_value)

        return True

    def update_into_data_base(self, table_name: str, constraint: Dict[str, any], data: Dict[str, any]) -> bool:
        if not data:
            return False

        data_value = [data[key] for key in data]
        wrap_string = " , ".join([f"{key}= ?" for key in data])

        constraint_wrap = " AND ".join([f"{key}= ?" for key in constraint])
        constraints_value = [value for _, value in constraint.items()]

        preformat_sql = f"UPDATE {table_name} SET {wrap_string} WHERE {constraint_wrap}"
        self.cursor.execute(preformat_sql, data_value + constraints_value)

        return True

    def select_into_data_base(self, table_name: str, constraint: Dict[str, any], selection: List[str]) -> List:
        if not selection:
            return []

        wrap_string = " , ".join(selection)

        constraint_wrap = " AND ".join([f"{key}= ?" for key in constraint])
        constraints_value = [value for _, value in constraint.items()]

        preformat_sql = f"SELECT {wrap_string} FROM {table_name} WHERE {constraint_wrap}"
        self.cursor.execute(preformat_sql, constraints_value)

        return self.cursor.fetchall()

    def select_like_into_data_base(self, table_name: str, constraint: Dict[str, any], selection: List[str]) -> List:
        if not selection:
            return []

        wrap_string = " , ".join(selection)

        constraint_wrap = " AND ".join([f"{key} LIKE ?" for key in constraint])
        constraints_value = [f"%{value}%" for _, value in constraint.items()]

        preformat_sql = f"SELECT {wrap_string} FROM {table_name} WHERE {constraint_wrap}"
        self.cursor.execute(preformat_sql, constraints_value)

        return self.cursor.fetchall()

    @property
    def rowcount(self):
        return self.cursor.rowcount


if __name__ == "__main__":
    print(SqlConnectionManager("repair_garage.sqlite3"))
