from .sql_conection_manager import SqlConnectionManager
from .table_creation_interface import TableCreationInterface


class Forfait(TableCreationInterface):
    table_name: str = "Forfait"

    @staticmethod
    def init_table(connector: SqlConnectionManager):
        forfait1 = {"type_forfait": "forfaitaire"}
        forfait2 = {"type_forfait": "sur mersure"}

        connector.insert_into_data_base(Forfait.table_name, forfait1)
        connector.insert_into_data_base(Forfait.table_name, forfait2)

    @staticmethod
    def create_table(connector: SqlConnectionManager):
        connector.execute(
            f"CREATE TABLE {Forfait.table_name} (id_forfait INTEGER PRIMARY KEY AUTOINCREMENT, type_forfait VARCHAR(20))")

        Forfait.init_table(connector)
