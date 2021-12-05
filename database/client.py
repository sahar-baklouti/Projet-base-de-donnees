from .sql_conection_manager import SqlConnectionManager
from .table_creation_interface import TableCreationInterface
from .commune import Commune
from .responsable import Responsable

class Client(TableCreationInterface):

    @staticmethod
    def init_table(connector: SqlConnectionManager):
        client1 = {"nom": "Marie", "prenom": "Pierre", "nom_commune": "lyon", "id_admin": "1"}
        client2 = {"nom": "Pascal", "prenom": "George", "nom_commune": "venissieux", "id_admin": "2"}

        connector.insert_into_data_base(Client.table_name, client1)
        connector.insert_into_data_base(Client.table_name, client2)

    table_name: str = "Client"

    @staticmethod
    def create_table(connector: SqlConnectionManager):
        connector.execute(
            f"CREATE TABLE {Client.table_name} (numero_client INTEGER PRIMARY KEY AUTOINCREMENT, nom VARCHAR(35), "
            f"prenom VARCHAR(35), nom_commune  VARCHAR(50), id_admin INTEGER, "
            f"FOREIGN KEY (nom_commune) REFERENCES {Commune.table_name}(nom_commune),"
            f"FOREIGN KEY (id_admin) REFERENCES {Responsable.table_name}(id)"
            f")")
