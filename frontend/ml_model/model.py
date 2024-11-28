# from fastapi import FastAPI, UploadFile, File
# import pandas as pd
# import joblib

# # Load the model
# model = joblib.load('classification_model.pkl')

# app = FastAPI()

# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     # Read the uploaded file as a DataFrame
#     df = pd.read_csv(file.file)

#     # Example: Check for required columns
#     if 'player_name' not in df.columns:
#         return {"error": "Input file must have a 'player_name' column"}

#     # Preprocess the input data
#     preprocessed_data = preprocess(df)  # Implement this based on your model

#     # Make predictions
#     predictions = model.predict(preprocessed_data)

#     # Combine predictions with player names for output
#     response = df[['player_name']].copy()
#     response['prediction'] = predictions.tolist()

#     return response.to_dict(orient="records")

# def preprocess(df):
#     """
#     Example preprocessing function.
#     Convert player names into features for the model. Modify based on your model's input format.
#     """
#     # Example: Simple length of player names as a dummy feature
#     return df['player_name'].str.len().values.reshape(-1, 1)


def hello():
    print("hello world")

hello()