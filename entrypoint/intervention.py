import json
from flask import request, Blueprint, jsonify

from database import DATABASE_FILE
from database.client import Client
from database.forfait import Forfait
from database.intervention import Intervention
from database.sql_conection_manager import SqlConnectionManager
from database.technicien import Technicien
from database.voiture import Voiture

intervention_entries = Blueprint('Intervention', __name__)


@intervention_entries.route('/listInterventions/', methods=['GET'])
def list_interventions():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
        "SELECT (cm.numero_client || '_' || cm.nom || '_' || cm.prenom) as client, v.matricule as voiture, "
        f"(t.numero_tech ||'_'|| t.nom || '_' || t.prenom) as technicien, f.type_forfait as forfait FROM {Intervention.table_name} as inter "
        f"INNER JOIN {Client.table_name} as cm "
        f"INNER JOIN {Technicien.table_name} as t "
        f"INNER JOIN {Forfait.table_name} as f "
        f"INNER JOIN {Voiture.table_name} as v "
        f"WHERE inter.numero_tech=t.numero_tech AND inter.matricule=v.matricule AND inter.numero_client=cm.numero_client"
        f" AND inter.id_forfait=f.id_forfait")

    return jsonify(connector.fetchall())


@intervention_entries.route('/ajouterIntervention', methods=['POST'])
def ajouter_intervention():
    record = json.loads(request.data)
    connector = SqlConnectionManager(DATABASE_FILE)

    nom_forfait = record.pop("forfait")
    res = connector.select_into_data_base(Forfait.table_name, {"type_forfait": nom_forfait}, ["id_forfait"])
    id_forfait = res[0]["id_forfait"]

    record["numero_client"] = record.pop("client").split("_")[0]
    record["numero_tech"] = record.pop("technicien").split("_")[0]
    record["id_forfait"] = id_forfait

    connector.insert_into_data_base(Intervention.table_name, record)

    return {}


@intervention_entries.route('/deleteIntervention/<intervention>', methods=['DELETE'])
def delete_intervention(intervention):
    client, matricule, technicien, _ = intervention.split("&")
    client_num = client.split("_")[0]
    tech_num = technicien.split("_")[0]

    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(f"DELETE FROM {Intervention.table_name} WHERE numero_client=? AND numero_tech=? AND matricule=?",
                      (client_num, tech_num, matricule))
    return {}


@intervention_entries.route('/getInterventionNomTechnicien/<nomTechnicien>', methods=['GET'])
def get_intervention_by_nom_technicien(nomTechnicien):
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
        "SELECT (cm.numero_client || '_' || cm.nom || '_' || cm.prenom) as client, v.matricule as voiture, "
        f"(t.numero_tech ||'_'|| t.nom || '_' || t.prenom) as technicien, f.type_forfait as forfait FROM {Intervention.table_name} as inter "
        f"INNER JOIN {Client.table_name} as cm "
        f"INNER JOIN {Technicien.table_name} as t "
        f"INNER JOIN {Forfait.table_name} as f "
        f"INNER JOIN {Voiture.table_name} as v "
        f"WHERE inter.numero_tech=t.numero_tech AND inter.matricule=v.matricule AND inter.numero_client=cm.numero_client"
        f" AND inter.id_forfait=f.id_forfait AND t.nom LIKE ?", (f"%{nomTechnicien}%",))

    return jsonify(connector.fetchall())


@intervention_entries.route('/getInterventionsNumber/', methods=['GET'])
def interventions_number():
    connector = SqlConnectionManager(DATABASE_FILE)
    connector.execute(
        f"SELECT count(*)  FROM {Intervention.table_name}")
    result = connector.fetchone()
    return jsonify(result)
