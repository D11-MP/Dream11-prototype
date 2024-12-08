from flask import Flask, request, jsonify

from model import product_ui
from Shap_controller import get_response_for_all_players
import pandas as pd 


app = Flask(__name__)
from flask_cors import CORS
CORS(app)



@app.route("/predict", methods=["GET"])
def predict():
    pickle_file = "trained_model.pkl"
    latest_stats_file = "latest_stats.pkl"

    product_ui(pickle_file, latest_stats_file )
    return jsonify({"status": "success"})





@app.route("/shap", methods=["POST"])
def shap():
    print("hi")
    data = request.get_json()
    if 'intermediate' in data:
        player_name_list = data['intermediate']
        print(player_name_list["current"])
        response_list = get_response_for_all_players(player_name_list=player_name_list["current"])
        return jsonify({"data" : response_list}), 200
    else:
        return jsonify({'status': 'error', 'message': 'intermediate not provided'}), 400





if __name__ == "__main__":
    app.run(debug=True)