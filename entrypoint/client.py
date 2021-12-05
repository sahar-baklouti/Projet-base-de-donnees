import json
from flask import request, Blueprint, jsonify

from database import DATABASE_FILE
from database.client import Client
from database.commune import Commune
from database.responsable import Responsable
from database.sql_conection_manager import SqlConnectionManager

client_entries = Blueprint('Client', __name__)


@client_entries.route('/listClients/', methods=['GET'])
def list_clients():
    connector = SqlConnectionManager(DATABASE_FILE)

    connector.execute(
        "SELECT client.numero_client as num, client.nom, client.prenom, client.nom_commune as adresse, "
        f"(r.id ||'_'|| r.nom || '_' || r.prenom) as responsable FROM {Client.table_name} as client "
        f"INNER JOIN {Responsable.table_name} as r "
        f"WHERE client.id_admin=r.id ")
    result = connector.fetchall()
    return jsonify(result)


@client_entries.route('/deleteClient/<num>', methods=['DELETE'])
def delete_client(num):
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(f"DELETE FROM {Client.table_name} WHERE numero_client=?", (num,))
    return list_clients()


@client_entries.route('/updateClient', methods=['PUT'])
def update_client():
    connector = SqlConnectionManager(DATABASE_FILE)
    record = json.loads(request.data)
    record["nom_commune"] = record.pop("adresse")
    record["id_admin"] = record.pop("responsable")
    num = {"numero_client": record.pop("num")}

    connector.update_into_data_base(Client.table_name, num, record)

    return {}


@client_entries.route('/ajouterClient', methods=['POST'])
def ajouter_client():
    connector = SqlConnectionManager(DATABASE_FILE)

    record = json.loads(request.data)

    record.pop("num")
    record["nom_commune"] = record.pop("adresse")
    record["id_admin"] = record.pop("responsable")

    #Commune.check_insert(connector, record["nom_commune"])

    connector.insert_into_data_base(Client.table_name, record)

    return {}


@client_entries.route('/getClientNum/<num>', methods=['GET'])
def get_client_by_num(num):
    connector = SqlConnectionManager(DATABASE_FILE)

    connector.execute(
        "SELECT client.numero_client as num, client.nom, client.prenom, client.nom_commune as adresse, "
        f"(r.id ||'_'|| r.nom || '_' || r.prenom) as responsable FROM {Client.table_name} as client "
        f"INNER JOIN {Responsable.table_name} as r "
        f"WHERE client.id_admin=r.id AND numero_client = {num} ")
    result = connector.fetchall()
    return jsonify(result)


@client_entries.route('/getClientNom/<nom_client>', methods=['GET'])
def get_client_by_nom(nom_client):
    connector = SqlConnectionManager(DATABASE_FILE)

    connector.execute(
        "SELECT client.numero_client as num, client.nom, client.prenom, client.nom_commune as adresse, "
        f"(r.id ||'_'|| r.nom || '_' || r.prenom) as responsable FROM {Client.table_name} as client "
        f"INNER JOIN {Responsable.table_name} as r "
        f"WHERE client.id_admin=r.id AND client.nom like :nom_client ",{'nom_client': f"%{nom_client}%"})
    result = connector.fetchall()
    return jsonify(result)


@client_entries.route('/getClientsNumber/', methods=['GET'])
def clients_number():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
        f"SELECT count(numero_client)  FROM {Client.table_name}")
    result = connector.fetchone()
    return jsonify(result)

@client_entries.route('/listClientsInterventions/', methods=['GET'])
def list_client_noms():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
         f"SELECT (numero_client ||'_'|| nom || '_' || prenom) as client FROM {Client.table_name}")
    result = connector.fetchall()
    return jsonify(result)