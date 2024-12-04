import numpy as np
import pandas as pd
import shap
import google.generativeai as genai

# api_key = "AIzaSyBa3LsgajgJgGGgALixx1eC107ks7qZHJY"
api_key = "AIzaSyDHdzlQyG6k0uHLvcsElnldJYZr7Ut-Tjc"


bat_cols= ["avg_total_runs_made_last_1_matches", "avg_total_runs_made_last_2_matches", "avg_total_runs_made_last_5_matches", "avg_total_runs_made_last_10_matches", "avg_total_runs_made_last_15_matches", "avg_total_balls_faced_last_1_matches", "avg_total_balls_faced_last_2_matches", "avg_total_balls_faced_last_5_matches", "avg_total_balls_faced_last_10_matches", "avg_total_balls_faced_last_15_matches", "avg_total_sixes_last_1_matches", "avg_total_sixes_last_2_matches", "avg_total_sixes_last_5_matches", "avg_total_sixes_last_10_matches", "avg_total_sixes_last_15_matches", "avg_total_fours_last_1_matches", "avg_total_fours_last_2_matches", "avg_total_fours_last_5_matches", "avg_total_fours_last_10_matches", "avg_total_fours_last_15_matches", "avg_total_runs_points_last_1_matches", "avg_total_runs_points_last_2_matches", "avg_total_runs_points_last_5_matches", "avg_total_runs_points_last_10_matches", "avg_total_runs_points_last_15_matches", "avg_run_6_points_last_1_matches", "avg_run_6_points_last_2_matches", "avg_run_6_points_last_5_matches", "avg_run_6_points_last_10_matches", "avg_run_6_points_last_15_matches", "avg_run_bonus_points_last_1_matches", "avg_run_bonus_points_last_2_matches", "avg_run_bonus_points_last_5_matches", "avg_run_bonus_points_last_10_matches", "avg_run_bonus_points_last_15_matches", "avg_strike_rate_last_1_matches", "avg_strike_rate_last_2_matches", "avg_strike_rate_last_5_matches", "avg_strike_rate_last_10_matches", "avg_strike_rate_last_15_matches", "avg_strike_rate_points_last_1_matches", "avg_strike_rate_points_last_2_matches", "avg_strike_rate_points_last_5_matches", "avg_strike_rate_points_last_10_matches", "avg_strike_rate_points_last_15_matches", "avg_total_bat_points_last_1_matches", "avg_total_bat_points_last_2_matches", "avg_total_bat_points_last_5_matches", "avg_total_bat_points_last_10_matches", "avg_total_bat_points_last_15_matches", "Consistency_batting", "total_runs_made_cumulative", "total_sixes_cumulative", "total_fours_cumulative"]


ball_cols= "avg_total_runs_given_last_1_matches", "avg_total_runs_given_last_2_matches", "avg_total_runs_given_last_5_matches", "avg_total_runs_given_last_10_matches", "avg_total_runs_given_last_15_matches", "avg_total_balls_bowled_last_1_matches", "avg_total_balls_bowled_last_2_matches", "avg_total_balls_bowled_last_5_matches", "avg_total_balls_bowled_last_10_matches", "avg_total_balls_bowled_last_15_matches", "avg_total_extras_last_1_matches", "avg_total_extras_last_2_matches", "avg_total_extras_last_5_matches", "avg_total_extras_last_10_matches", "avg_total_extras_last_15_matches", "avg_total_wickets_last_1_matches", "avg_total_wickets_last_2_matches", "avg_total_wickets_last_5_matches", "avg_total_wickets_last_10_matches", "avg_total_wickets_last_15_matches", "avg_lbw_wickets_last_1_matches", "avg_lbw_wickets_last_2_matches", "avg_lbw_wickets_last_5_matches", "avg_lbw_wickets_last_10_matches", "avg_lbw_wickets_last_15_matches", "avg_bowled_wickets_last_1_matches", "avg_bowled_wickets_last_2_matches", "avg_bowled_wickets_last_5_matches", "avg_bowled_wickets_last_10_matches", "avg_bowled_wickets_last_15_matches", "avg_maidens_last_1_matches", "avg_maidens_last_2_matches", "avg_maidens_last_5_matches", "avg_maidens_last_10_matches", "avg_maidens_last_15_matches", "avg_economy_rate_last_1_matches", "avg_economy_rate_last_2_matches", "avg_economy_rate_last_5_matches", "avg_economy_rate_last_10_matches", "avg_economy_rate_last_15_matches", "avg_total_wickets_points_last_1_matches", "avg_total_wickets_points_last_2_matches", "avg_total_wickets_points_last_5_matches", "avg_total_wickets_points_last_10_matches", "avg_total_wickets_points_last_15_matches", "avg_lbw_bowled_bonus_points_last_1_matches", "avg_lbw_bowled_bonus_points_last_2_matches", "avg_lbw_bowled_bonus_points_last_5_matches", "avg_lbw_bowled_bonus_points_last_10_matches", "avg_lbw_bowled_bonus_points_last_15_matches", "avg_wicket_bonus_points_last_1_matches", "avg_wicket_bonus_points_last_2_matches", "avg_wicket_bonus_points_last_5_matches", "avg_wicket_bonus_points_last_10_matches", "avg_wicket_bonus_points_last_15_matches", "avg_economy_rate_points_last_1_matches", "avg_economy_rate_points_last_2_matches", "avg_economy_rate_points_last_5_matches", "avg_economy_rate_points_last_10_matches", "avg_economy_rate_points_last_15_matches", "avg_maiden_overs_points_last_1_matches", "avg_maiden_overs_points_last_2_matches", "avg_maiden_overs_points_last_5_matches", "avg_maiden_overs_points_last_10_matches", "avg_maiden_overs_points_last_15_matches", "avg_total_bowl_points_last_1_matches", "avg_total_bowl_points_last_2_matches", "avg_total_bowl_points_last_5_matches", "avg_total_bowl_points_last_10_matches", "avg_total_bowl_points_last_15_matches", "total_wickets_taken_cumulative", "total_balls_bowled_cumulative", "total_runs_given_cumulative"








class SHAPAnalyzer:
    # def configure_genai(self, api_key):
    #     """
    #     Configure the Google Generative AI client with the provided API key.
    #     """
    #     self.api_key = api_key
    #     genai.configure(api_key=api_key)

    def __init__(self, model):
        # Initialize SHAP's JavaScript visualization support
        shap.initjs()
        self.api_key = api_key
        genai.configure(api_key=api_key)
        self.model = model 
        

    
    def generate_top_features(self, X, role, num_features=5 ):
        # print("___________________")
        # print(X)
        """
        Generate the top N features based on SHAP values.

        Args:
            X (pd.DataFrame): Input features.
            model: Trained model to explain.
            num_features (int): Number of top features to return.

        Returns:
            str: A string representation of the top features and their SHAP values.
        """
        # print(self.model)
        explainer = shap.TreeExplainer(self.model)
        shap_values = explainer.shap_values(X)

        # Calculate mean absolute SHAP values
        mean_abs_shap_values = np.abs(shap_values).mean(axis=0)

        # Create a DataFrame for feature importance
        feature_importance = pd.DataFrame({
            'Feature': X.columns,
            'Mean SHAP Value': mean_abs_shap_values
        })
        feat_to_drop = []
        for index, row in feature_importance.iterrows():
          # player_role[row['name']] = row['role']
          if('Bat' in role):
            if(row['Feature'] not in bat_cols):
              feat_to_drop.append(row['Feature'])

          if('bowl' in role):
            if(row['Feature'] not in ball_cols):
              feat_to_drop.append(row['Feature'])
        # feature_importance.drop(columns = feat_to_drop ,inplace = True  )
        feature_importance = feature_importance[~feature_importance['Feature'].isin(feat_to_drop)]

        # Sort and select the top features
        top_features = feature_importance.sort_values(by="Mean SHAP Value", ascending=False).head(num_features)

        return top_features.to_string(index=False)

    def explain_features(self, top_features_str):
        """
        Generate human-readable explanations for the top features using Generative AI.

        Args:
            top_features_str (str): String representation of top features and their SHAP values.

        Returns:
            str: Generated explanation text.
        """
        if not self.api_key:
            raise ValueError("API key for Generative AI is not configured. Please use 'configure_genai' method.")

        # Generate the prompt
        prompt = f"""
        Here are the top {len(top_features_str.splitlines())} features with their SHAP values:

        {top_features_str}

        Can you make an inference about why a particular dream point has been predicted for a particular player based on these features within 20 words?

        Make an inference about why the particular player was chosen given that these were the top features.
        You can understand the features by their names to make them human-readable. 

        Example:
        'Shubman Gill is in brilliant form these days, consistently delivering match-winning performances.
        With an average of 85 fantasy points per match,
        he’s been a valuable asset on the field. In the last 3 games, he’s scored more than 40 runs in each, maintaining a fantastic strike rate of 140.'

        Please focus on the data and the feature values for your analysis, making the explanation cricket-enthusiastic and engaging.The column names should be transformed to their corresponding natural language meanings and not exact column names
        """

        # Generate content using Generative AI
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        print(response.text)
        return response.text

