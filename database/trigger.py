from .client import Client
from .commune import Commune
from .intervention import Intervention
from .sql_conection_manager import SqlConnectionManager
from .table_creation_interface import TableCreationInterface
from .technicien import Technicien
from .voiture import Voiture


class Trigger(TableCreationInterface):
    table_name: str = ""

    @staticmethod
    def init_table(connector: SqlConnectionManager):
        pass

    @staticmethod
    def create_table(connector: SqlConnectionManager):
        connector.execute(f"CREATE TRIGGER increment_value_on_insert AFTER DELETE ON {Intervention.table_name} "
                          f"FOR EACH ROW BEGIN "
                          f"UPDATE {Technicien.table_name} SET nb_voiture = nb_voiture+1 WHERE old.numero_tech = numero_tech;"
                          f"UPDATE {Commune.table_name} SET nombre_client = nombre_client + 1 WHERE "
                          f"(SELECT cm.nom_commune FROM {Client.table_name} as cm WHERE cm.numero_client=old.numero_client) = nom_commune; END")

        connector.execute(f"CREATE TRIGGER delete_voiture AFTER DELETE ON {Intervention.table_name} "
                          f"FOR EACH ROW BEGIN "
                          f"DELETE FROM {Voiture.table_name} WHERE old.matricule = matricule; END")

        # connector.execute(f"CREATE TRIGGER update_client AFTER UPDATE ON {Client.table_name} "
        #                   f"FOR EACH ROW BEGIN "
        #                   f"UPDATE {Commune.table_name} SET nombre_client = nombre_client - 1 WHERE nom_commune=old.nom_commune;"
        #                   f"INSERT INTO {Commune.table_name} (nom_commune) VALUES (new.nom_commune) ON CONFLICT(nom_commune) DO UPDATE SET nombre_client = nombre_client + 1 ; END")
