import json

from flask import request, Blueprint, jsonify

from database import DATABASE_FILE
from database.sql_conection_manager import SqlConnectionManager
from database.voiture import Voiture

voiture_entries = Blueprint('Voiture', __name__)


@voiture_entries.route('/listVoitures/', methods=['GET'])
def list_voitures():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
        f"SELECT matricule, type, marque,annee_fabrication, km as kilometrage, date_arriver as date_entree FROM {Voiture.table_name}")
    result = connector.fetchall()
    return jsonify(result)


@voiture_entries.route('/deleteVoiture/<matricule>', methods=['DELETE'])
def delete_voiture(matricule):
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(f"DELETE FROM {Voiture.table_name} WHERE matricule=?", (matricule,))
    return {}


@voiture_entries.route('/getVoitureMatricule/<matricule>', methods=['GET'])
def get_voiture_by_matricule(matricule):
    connector = SqlConnectionManager(DATABASE_FILE)
    result = connector.select_into_data_base(Voiture.table_name, {"matricule": matricule},
                                             ["matricule", "type", "marque", "annee_fabrication", "km as kilometrage",
                                              "date_arriver as date_entree"])
    return jsonify(result)


@voiture_entries.route('/updateVoiture', methods=['PUT'])
def update_voiture():
    record = json.loads(request.data)
    matricule = record.pop('matricule')
    connector = SqlConnectionManager(DATABASE_FILE)
    record["km"] = record.pop("kilometrage")
    record["date_arriver"] = record.pop("date_entree")
    connector.update_into_data_base(Voiture.table_name,{'matricule': matricule}, record)

    return {}


@voiture_entries.route('/ajouterVoiture', methods=['POST'])
def ajouter_voiture():
    record = json.loads(request.data)
    connector = SqlConnectionManager(DATABASE_FILE)

    record["km"] = record.pop("kilometrage")
    record["date_arriver"] = record.pop("date_entree")

    connector.insert_into_data_base(Voiture.table_name, record)

    return {}


@voiture_entries.route('/getVoitureMatriculeRecherche/<matricule>', methods=['GET'])
def get_voiture_by_matricule_recherche(matricule):
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
        f"SELECT matricule, type, marque,annee_fabrication, km as kilometrage,"
        f" date_arriver as date_entree FROM {Voiture.table_name} WHERE matricule LIKE ?", (f"%{matricule}%",))
    result = connector.fetchall()
    return jsonify(result)


@voiture_entries.route('/getVoituresNumber/', methods=['GET'])
def voitures_number():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
        f"SELECT count(matricule)  FROM {Voiture.table_name}")
    result = connector.fetchone()
    return jsonify(result)

@voiture_entries.route('/listVoituresInterventions/', methods=['GET'])
def list_voiture_noms():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
         f"SELECT matricule FROM {Voiture.table_name}")
    result = connector.fetchall()
    return jsonify(result)