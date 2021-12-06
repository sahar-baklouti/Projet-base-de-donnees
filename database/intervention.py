from .client import Client
from .forfait import Forfait
from .sql_conection_manager import SqlConnectionManager
from .table_creation_interface import TableCreationInterface
from .commune import Commune
from .technicien import Technicien
from .voiture import Voiture


class Intervention(TableCreationInterface):
    table_name: str = "Intervention"

    @staticmethod
    def init_table(connector: SqlConnectionManager):
        intervention1 = {"numero_tech": "1", "matricule": "F-AB-456-CA-69", "numero_client": "1", "id_forfait": "1","commentaire" :"ceci est un commentaire"}
        intervention2 = {"numero_tech": "2", "matricule": "F-AC-789-FB-69", "numero_client": "2", "id_forfait": "2"}

        connector.insert_into_data_base(Intervention.table_name, intervention1)
        connector.insert_into_data_base(Intervention.table_name, intervention2)

    @staticmethod
    def create_table(connector: SqlConnectionManager):
        connector.execute(
            f"CREATE TABLE {Intervention.table_name} (numero_tech INTEGER, matricule VARCHAR(16),"
            f"numero_client INTEGER, id_forfait INTEGER, commentaire VARCHAR(500),"
            f"FOREIGN KEY (numero_tech) REFERENCES {Technicien.table_name}(numero_tech),"
            f"FOREIGN KEY (numero_client) REFERENCES {Client.table_name}(numero_client),"
            f"FOREIGN KEY (matricule) REFERENCES {Voiture.table_name}(matricule),"
            f"FOREIGN KEY (id_forfait) REFERENCES {Forfait.table_name}(id_forfait),"
            f"PRIMARY KEY (numero_tech, matricule, numero_client)"
            f")")
