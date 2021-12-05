from .sql_conection_manager import SqlConnectionManager
from .table_creation_interface import TableCreationInterface


class Commune(TableCreationInterface):
    @staticmethod
    def init_table(connector: SqlConnectionManager):
        commune1 = {"nom_commune": "lyon", "nombre_client": 5}
        commune2 = {"nom_commune": "venissieux"}

        connector.insert_into_data_base(Commune.table_name, commune1)
        connector.insert_into_data_base(Commune.table_name, commune2)

    table_name: str = "Commune"

    @staticmethod
    def create_table(connector: SqlConnectionManager):
        connector.execute(
            f"CREATE TABLE {Commune.table_name} (nom_commune VARCHAR(50), nombre_client INTEGER DEFAULT 0, PRIMARY KEY (nom_commune))")

        Commune.init_table(connector)

    @classmethod
    def check_insert(cls, connector: SqlConnectionManager, commune_name: str):
        connector.execute(f"INSERT OR IGNORE INTO {Commune.table_name} (nom_commune) VALUES (?)", (commune_name,))
