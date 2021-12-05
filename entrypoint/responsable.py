import json
from flask import request, Blueprint, jsonify

from database import DATABASE_FILE
from database.responsable import Responsable
from database.sql_conection_manager import SqlConnectionManager

responsable_entries = Blueprint('Responsable', __name__)


@responsable_entries.route('/listResponsable/', methods=['GET'])
def list_responsables():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
         f"SELECT * FROM {Responsable.table_name}")
    result = connector.fetchall()
    return jsonify(result)

@responsable_entries.route('/listResponsablesNames/', methods=['GET'])
def list_responsable_noms():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
         f"SELECT (id ||'_'|| nom || '_' || prenom) as nom_responsable FROM {Responsable.table_name}")
    result = connector.fetchall()
    return jsonify(result)

@responsable_entries.route('/login/<login>', methods=['GET'])
def verifier_login(login):
    identifiant, mot_de_passe = login.split("&")
    id = identifiant.split("_")[0]

    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
         f"SELECT est_admin FROM {Responsable.table_name} WHERE id = ? AND mot_de_passe = ?", (id, mot_de_passe,))
    result = connector.fetchall()
    return jsonify(result)

@responsable_entries.route('/ajouterResponsable', methods=['POST'])
def ajouter_responsable():
    connector = SqlConnectionManager(DATABASE_FILE)

    record = json.loads(request.data)

    record.pop("id")

    connector.insert_into_data_base(Responsable.table_name, record)
    return {}

@responsable_entries.route('/getResponsableNom/<nom_responsable>', methods=['GET'])
def get_responsable_by_nom(nom_responsable):
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
        f"SELECT * FROM {Responsable.table_name} WHERE nom like :nom_responsable ", {'nom_responsable': f"%{nom_responsable}%"})
    result = connector.fetchall()
    return jsonify(result)

@responsable_entries.route('/deleteResponsable/<id>', methods=['DELETE'])
def delete_responsable(id):
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(f"DELETE FROM {Responsable.table_name} WHERE id=?", (id,))
    return list_responsables()


@responsable_entries.route('/getResponsableId/<idResponsable>', methods=['GET'])
def get_responsable_by_id(idResponsable):
    connector = SqlConnectionManager(DATABASE_FILE)

    connector.execute(
        f"SELECT * FROM {Responsable.table_name} WHERE id=?", (idResponsable,) )
    result = connector.fetchall()
    return jsonify(result)

@responsable_entries.route('/updateResponsable', methods=['PUT'])
def update_responsable():
    connector = SqlConnectionManager(DATABASE_FILE)
    record = json.loads(request.data)

    id_responsable = {"id": record.pop("id")}

    connector.update_into_data_base(Responsable.table_name, id_responsable, record)

    return {}
