import numpy as np
import pandas as pd
import shap
import google.generativeai as genai

api_key = "AIzaSyC_vDuBg6FBefSWjkhHlM-JrUOHoiKdNDo"

class SHAPAnalyzer:
    def __init__(self):
        # Initialize SHAP's JavaScript visualization support
        shap.initjs()
        

    def configure_genai(self, api_key):
        """
        Configure the Google Generative AI client with the provided API key.
        """
        self.api_key = api_key
        genai.configure(api_key=api_key)

    def generate_top_features(self, X, model, num_features=5):
        """
        Generate the top N features based on SHAP values.

        Args:
            X (pd.DataFrame): Input features.
            model: Trained model to explain.
            num_features (int): Number of top features to return.

        Returns:
            str: A string representation of the top features and their SHAP values.
        """
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(X)

        # Calculate mean absolute SHAP values
        mean_abs_shap_values = np.abs(shap_values).mean(axis=0)

        # Create a DataFrame for feature importance
        feature_importance = pd.DataFrame({
            'Feature': X.columns,
            'Mean SHAP Value': mean_abs_shap_values
        })

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

        Please focus on the data and the feature values for your analysis, making the explanation cricket-enthusiastic and engaging.
        """

        # Generate content using Generative AI
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)

        return response.txt

