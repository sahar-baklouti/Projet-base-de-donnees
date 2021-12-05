from .sql_conection_manager import SqlConnectionManager
from .table_creation_interface import TableCreationInterface
import datetime


class Voiture(TableCreationInterface):
    table_name: str = "Voiture"

    @staticmethod
    def init_table(connector: SqlConnectionManager):
        voiture1 = {"matricule": "F-AB-456-CA-69", "marque": "toyota", "date_arriver": datetime.datetime.now().strftime("%Y-%m-%d"),
                    "type": "diesel", "annee_fabrication": "1994", "km": "250235"}
        voiture2 = {"matricule": "F-AC-789-FB-69", "marque": "bmw", "date_arriver": datetime.datetime.now().strftime("%Y-%m-%d"),
                    "type": "hybride", "annee_fabrication": "2005", "km": "145745"}
        connector.insert_into_data_base(Voiture.table_name, voiture1)
        connector.insert_into_data_base(Voiture.table_name, voiture2)

    @staticmethod
    def create_table(connector: SqlConnectionManager):
        connector.execute(
            f"CREATE TABLE {Voiture.table_name} (matricule VARCHAR(16), marque VARCHAR(50), "
            f"date_arriver  DATE CHECK(date_arriver IS strftime('%Y-%m-%d', date_arriver)), type  VARCHAR(35), "
            f"annee_fabrication  DATE"
            f", km INTEGER, PRIMARY KEY (matricule))")
