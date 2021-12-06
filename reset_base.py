# Press the green button in the gutter to run the script.
import os

from database import DATABASE_FILE
from database.client import Client
from database.commune import Commune
from database.forfait import Forfait
from database.intervention import Intervention
from database.technicien import Technicien
from database.trigger import Trigger
from database.voiture import Voiture
from database.responsable import Responsable
from database.sql_conection_manager import SqlConnectionManager


def reset_database():
    #os.remove(f"database/{DATABASE_FILE}")

    connector = SqlConnectionManager(DATABASE_FILE)
    Voiture.create_table(connector)
    Commune.create_table(connector)
    Responsable.create_table(connector)
    Client.create_table(connector)
    Technicien.create_table(connector)
    Forfait.create_table(connector)
    Intervention.create_table(connector)
    Trigger.create_table(connector)

    #Commune.init_table(connector)
    Responsable.init_table(connector)
    Voiture.init_table(connector)
    Client.init_table(connector)
    Technicien.init_table(connector)
    Intervention.init_table(connector)
