# from flask import Flask, request, jsonify


import pandas as pd
import numpy as np
import pickle
import warnings
warnings.filterwarnings("ignore")
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error
import pandas as pd


# app = Flask(__name__)
# from flask_cors import CORS
# CORS(app)


# avg_total_runs_made_last_1_matches, avg_total_runs_made_last_2_matches, avg_total_runs_made_last_5_matches, avg_total_runs_made_last_10_matches, avg_total_runs_made_last_15_matches, avg_total_balls_faced_last_1_matches, avg_total_balls_faced_last_2_matches, avg_total_balls_faced_last_5_matches, avg_total_balls_faced_last_10_matches, avg_total_balls_faced_last_15_matches, avg_total_sixes_last_1_matches, avg_total_sixes_last_2_matches, avg_total_sixes_last_5_matches, avg_total_sixes_last_10_matches, avg_total_sixes_last_15_matches, avg_total_fours_last_1_matches, avg_total_fours_last_2_matches, avg_total_fours_last_5_matches, avg_total_fours_last_10_matches, avg_total_fours_last_15_matches, avg_total_runs_points_last_1_matches, avg_total_runs_points_last_2_matches, avg_total_runs_points_last_5_matches, avg_total_runs_points_last_10_matches, avg_total_runs_points_last_15_matches, avg_run_6_points_last_1_matches, avg_run_6_points_last_2_matches, avg_run_6_points_last_5_matches, avg_run_6_points_last_10_matches, avg_run_6_points_last_15_matches, avg_run_bonus_points_last_1_matches, avg_run_bonus_points_last_2_matches, avg_run_bonus_points_last_5_matches, avg_run_bonus_points_last_10_matches, avg_run_bonus_points_last_15_matches, avg_strike_rate_last_1_matches, avg_strike_rate_last_2_matches, avg_strike_rate_last_5_matches, avg_strike_rate_last_10_matches, avg_strike_rate_last_15_matches, avg_strike_rate_points_last_1_matches, avg_strike_rate_points_last_2_matches, avg_strike_rate_points_last_5_matches



# avg_total_runs_given_last_1_matches, avg_total_runs_given_last_2_matches, avg_total_runs_given_last_5_matches, avg_total_runs_given_last_10_matches, avg_total_runs_given_last_15_matches, avg_total_balls_bowled_last_1_matches, avg_total_balls_bowled_last_2_matches, avg_total_balls_bowled_last_5_matches, avg_total_balls_bowled_last_10_matches, avg_total_balls_bowled_last_15_matches, avg_total_extras_last_1_matches, avg_total_extras_last_2_matches, avg_total_extras_last_5_matches, avg_total_extras_last_10_matches, avg_total_extras_last_15_matches, avg_total_wickets_last_1_matches, avg_total_wickets_last_2_matches, avg_total_wickets_last_5_matches, avg_total_wickets_last_10_matches, avg_total_wickets_last_15_matches, avg_lbw_wickets_last_1_matches, avg_lbw_wickets_last_2_matches, avg_lbw_wickets_last_5_matches, avg_lbw_wickets_last_10_matches, avg_lbw_wickets_last_15_matches, avg_bowled_wickets_last_1_matches, avg_bowled_wickets_last_2_matches, avg_bowled_wickets_last_5_matches, avg_bowled_wickets_last_10_matches, avg_bowled_wickets_last_15_matches, avg_maidens_last_1_matches, avg_maidens_last_2_matches, avg_maidens_last_5_matches, avg_maidens_last_10_matches, avg_maidens_last_15_matches, avg_economy_rate_last_1_matches, avg_economy_rate_last_2_matches, avg_economy_rate_last_5_matches, avg_economy_rate_last_10_matches, avg_economy_rate_last_15_matches, avg_total_wickets_points_last_1_matches, avg_total_wickets_points_last_2_matches


class PlayerPointsModel:
    def __init__(self, target_column = "total_points", n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42, weight_file = None):
        """
        Initialize the GradientBoostingModel with specified hyperparameters.

        :param n_estimators: The number of boosting stages (default: 100).
        :param learning_rate: Learning rate shrinks the contribution of each tree (default: 0.1).
        :param max_depth: The maximum depth of the individual regression estimators (default: 3).
        :param random_state: Controls the randomness of the estimator (default: 42).
        """
        self.target_column = target_column
        self.model = GradientBoostingRegressor(
            n_estimators=n_estimators,
            learning_rate=learning_rate,
            max_depth=max_depth,
            random_state=random_state
        )
        if weight_file:
          with open(weight_file, 'rb') as f:
            self.model = pickle.load(f)

    def train(self, train_df, test_size=0.2, random_state=42):
        """
        Train the Gradient Boosting model on the given dataset.

        :param X: The feature DataFrame.
        :param y: The target variable.
        :param test_size: The proportion of data to use for testing (default: 0.2).
        :param random_state: Random seed for train-test split (default: 42).
        :return: A tuple containing the Mean Absolute Error and predictions on the test set.
        """

        # Split the data into features (X) and target (y)
        X = train_df.drop(columns=self.target_column)
        y = train_df[self.target_column]

        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=random_state)

        # Train the model
        self.model.fit(X_train, y_train)

        # Save the trained model to a .pkl file
        with open('trained_model2.pkl', 'wb') as f:
            pickle.dump(self.model, f)

        # Make predictions on the testing set
        y_pred = self.model.predict(X_test)

        # Calculate Mean Absolute Error
        mae = mean_absolute_error(y_test, y_pred)
        print("Mean Absolute Error:", mae)


    def predict(self, test_df):
        """
        Generate predictions for a given dataset.

        :param X: The feature DataFrame.
        :return: Predictions as a NumPy array.
        """
        # Generate predictions using the trained model
        y_pred = self.model.predict(test_df)

        # Convert predictions to a pandas DataFrame
        y_pred_df = pd.DataFrame(y_pred, columns=['Predicted'])

        return y_pred_df





# prompt: create hashmap and populate it with identifier as keys and unique name as values
ppl = pd.read_csv("people.csv")
player_identifier_to_name = {}
player_name_to_identifier = {}
# Assuming 'ppl' DataFrame has columns 'identifier' and 'unique_name'
for index, row in ppl.iterrows():
    identifier = row['identifier']
    unique_name = row['unique_name']
    player_identifier_to_name[identifier] = unique_name
    player_name_to_identifier[unique_name] = identifier



def product_ui(pickle_file, latest_stats_file ):

  playerpointsmodel = PlayerPointsModel(weight_file = pickle_file)
  with open(latest_stats_file, 'rb') as f:
    latest_stats = pickle.load(f)
#   print(latest_stats["ba607b88"].head())
  inp = pd.read_csv("./frontend/uploads/admin/Input_Format.csv")
  inp["Player_id" ] = inp["Player Name"].apply(lambda x : player_name_to_identifier[x])

  inp["Player Score"] = inp["Player_id"].apply(lambda x:
                                               playerpointsmodel.predict(pd.DataFrame([latest_stats.get(x, {})]))
                                               if x in latest_stats else
                                               playerpointsmodel.predict(pd.DataFrame(np.zeros((1,169),dtype = float)))
                                               )  # Assign 0 if key not found

  inp["Player Score" ] = inp["Player Score"].apply(lambda x : x.iloc[0]["Predicted"])
  inp.drop(columns = ["Player_id"] , inplace  = True)
  # inp = inp.sort_values(by = ["Player Score"] , ascending = False)
  # print((inp.iloc[0]["Player Score"].iloc[0]["Predicted"]))
  inp.to_csv("./frontend/uploads/final.csv", index = False)
  



# @app.route("/predict", methods=["GET"])
# def predict():
#   pickle_file = "trained_model2.pkl"
#   latest_stats_file = "latest_stats1.pkl"

#   product_ui(pickle_file, latest_stats_file )
#   return jsonify({"status": "success"})

# if __name__ == "__main__":
#   app.run(debug=True)