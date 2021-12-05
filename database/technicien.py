from .sql_conection_manager import SqlConnectionManager
from .table_creation_interface import TableCreationInterface


class Technicien(TableCreationInterface):
    table_name: str = "Technicien"

    @staticmethod
    def init_table(connector: SqlConnectionManager):
        technicien1 = {"nom": "noah", "prenom": "graves", "nb_voiture": "0"}
        technicien2 = {"nom": "sarra", "prenom": "alice", "nb_voiture": "0"}

        connector.insert_into_data_base(Technicien.table_name, technicien1)
        connector.insert_into_data_base(Technicien.table_name, technicien2)

    @staticmethod
    def create_table(connector: SqlConnectionManager):
        connector.execute(
            f"CREATE TABLE {Technicien.table_name} (numero_tech INTEGER PRIMARY KEY AUTOINCREMENT, "
            f"nom VARCHAR(35), prenom VARCHAR(35), nb_voiture INTEGER)")
