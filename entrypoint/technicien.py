import json

from flask import request, Blueprint, jsonify

from database import DATABASE_FILE
from database.sql_conection_manager import SqlConnectionManager
from database.technicien import Technicien

technicien_entries = Blueprint('Technicien', __name__)


@technicien_entries.route('/listTechniciens/', methods=['GET'])
def list_techniciens():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
        f"SELECT numero_tech, prenom, nom, nb_voiture FROM {Technicien.table_name}")
    result = connector.fetchall()

    return jsonify(result)


@technicien_entries.route('/deleteTechnicien/<num>', methods=['DELETE'])
def delete_technicien(num):
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(f"DELETE FROM {Technicien.table_name} WHERE numero_tech=?", (num,))
    return {}


@technicien_entries.route('/updateTechnicien', methods=['PUT'])
def update_technicien():
    record = json.loads(request.data)
    num = record.pop('numero_tech')
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.update_into_data_base(Technicien.table_name,{'numero_tech': num}, record)

    return jsonify(record)


@technicien_entries.route('/ajouterTechnicien', methods=['POST'])
def ajouter_technicien():
    record = json.loads(request.data)
    num = record.pop('numero_tech')
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.insert_into_data_base(Technicien.table_name, record)

    return {}


@technicien_entries.route('/getTechnicienNum/<num>', methods=['GET'])
def get_technicien_by_num(num):
    connector = SqlConnectionManager(DATABASE_FILE)
    result = connector.select_into_data_base(Technicien.table_name, {"numero_tech": num}, ["numero_tech", "prenom", "nom", "nb_voiture"])

    return jsonify(result)


@technicien_entries.route('/getTechnicienNom/<nom>', methods=['GET'])
def get_technicien_by_nom(nom):
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
        f"SELECT numero_tech, prenom, nom, nb_voiture FROM {Technicien.table_name} WHERE nom LIKE ?", (f"%{nom}%", ))
    result = connector.fetchall()

    return jsonify(result)

@technicien_entries.route('/listTechniciensInterventions/', methods=['GET'])
def list_tech_noms():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
         f"SELECT (numero_tech ||'_'|| nom || '_' || prenom) as technicien FROM {Technicien.table_name}")
    result = connector.fetchall()
    return jsonify(result)