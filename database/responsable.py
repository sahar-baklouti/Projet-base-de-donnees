from .sql_conection_manager import SqlConnectionManager
from .table_creation_interface import TableCreationInterface


class Responsable(TableCreationInterface):
    table_name: str = "Responsable"

    @staticmethod
    def init_table(connector: SqlConnectionManager):
        responsable1 = {"nom": "Dupin", "prenom": "Paul", "mot_de_passe": "4569", "est_admin": "1"}
        responsable2 = {"nom": "Creuzet", "prenom": "Victor", "mot_de_passe": "9632", "est_admin": "0"}
        responsable3 = {"nom": "Dupont", "prenom": "Rebecca", "mot_de_passe": "7412", "est_admin": "0"}

        connector.insert_into_data_base(Responsable.table_name, responsable1)
        connector.insert_into_data_base(Responsable.table_name, responsable2)
        connector.insert_into_data_base(Responsable.table_name, responsable3)
    @staticmethod
    def create_table(connector: SqlConnectionManager):
        connector.execute(
            f"CREATE TABLE {Responsable.table_name} (id INTEGER PRIMARY KEY AUTOINCREMENT, nom VARCHAR(35), "
            f"prenom VARCHAR(35), mot_de_passe  INTEGER, est_admin INTEGER) ")
