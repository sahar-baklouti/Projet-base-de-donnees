from flask import Flask
from flask_cors import CORS

import reset_base
from entrypoint.client import client_entries
from entrypoint.intervention import intervention_entries
from entrypoint.technicien import technicien_entries
from entrypoint.voiture import voiture_entries
from entrypoint.commune import commune_entries
from entrypoint.responsable import responsable_entries
from entrypoint.forfait import forfait_entries

app = Flask(__name__)
CORS(app)

app.register_blueprint(responsable_entries)
app.register_blueprint(voiture_entries)
app.register_blueprint(client_entries)
app.register_blueprint(intervention_entries)
app.register_blueprint(technicien_entries)
app.register_blueprint(commune_entries)
app.register_blueprint(forfait_entries)

if __name__ == '__main__':
    reset_base.reset_database()
    app.run(debug=True)
