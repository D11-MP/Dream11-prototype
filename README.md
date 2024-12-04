# Dream Team11 Prediction Platform

## Overview

The Dream Team11 Prediction Platform is a web application that leverages AI to assist users in predicting and creating their ideal Dream11 fantasy team for cricket matches. The platform uses a combination of **Next.js** for the frontend and **Flask** for the backend to integrate a Machine Learning (ML) model, providing personalized recommendations based on match data, player statistics, and real-time news. The platform is designed with a user-friendly interface to facilitate easy interaction and customization of fantasy teams.

This application has been developed to serve as a part of the **Inter IIT Mid Prep Problem Statement** by **Dream11**.

---

## Features

### 1. **Admin Page for CSV Upload**
   - Admin users can upload a CSV file that contains match data, player details, and match specifics (such as date, format, and teams).
   - The CSV format is the primary source of match and player information, which drives the display of teams and match details on the platform.

### 2. **User Authentication**
   - The platform uses **NextAuth.js** for user authentication, allowing users to sign up and log in to access personalized features.
   - After successful authentication, users can navigate through the website and interact with the features.

### 3. **Home Page**
   - Once logged in, users are redirected to the **home page**, where they can start interacting with the platform.
   - The home page displays various matches and player details derived from the uploaded CSV.

### 4. **News Section**
   - A dynamic **news section** pulls the latest cricket news and updates related to players and matches.
   - This helps users stay updated and make informed decisions while selecting players for their Dream11 teams.

### 5. **Poll Section**
   - Users can participate in polls related to upcoming matches or player performances, adding an interactive element to the platform.

### 6. **Match Notification Settings**
   - Users can enable or disable match notifications through the **settings page**.
   - By default, match notifications are enabled, ensuring users never miss a match.

### 7. **AI Chatbot ("Dream")**
   - A built-in **AI chatbot** (named "Dream") assists users in navigating the website and provides recommendations for creating customized teams.
   - The chatbot is always accessible at the bottom right corner of the website, ensuring users can get help whenever needed.

### 8. **Match Page and Player Lineup**
   - Clicking on a match redirects users to the **teams page**:
     - **Pitch Condition Analysis**: A modal shows a message from the website’s mascot, commenting on the pitch conditions and suggesting the ideal types of bowlers to pick for the match.
     - **Team Lineups**: Users can see the lineup of players for both teams, with player names and images fetched from the uploaded CSV file.

### 9. **Team Building Paths**
   - **Beginner Path**: This path is for new users who may not have extensive knowledge about cricket.
     - **AI-Generated Team**: Users can opt for an AI-generated team based on the prediction model.
     - **Predicted Winning Team**: Users can predict the winning team between two teams, and the system will automatically generate a team based on the majority players in the predicted Dream11.
   
   - **Advanced Path**: This is for experienced users who wish to customize their team.
     - **Country-based Player Selection**: Users can specify the number of players from each country.
     - **Role-based Player Restrictions**: Users can define the number of batsmen, bowlers, all-rounders, and wicketkeepers they want in their final lineup.
     - **Lockin/Lockout Feature**: Users can lock in or lock out up to 3 players from the given list of 22 players.
     - **Player Stats**: Clicking on a player will display their detailed stats, including graphical and statistical data, and performances in recent 10 matches.

### 10. **AI-Generated Team Selection**
   - When users are ready, they can click on "Generate Team." The **ML model** running on the backend processes the input and generates the final 11 players.
   - The prediction takes into account user preferences (such as player roles and country selections) along with AI-based suggestions.
   - After a brief wait (2-3 seconds), the final team is displayed, along with an AI-generated explanation for why each player was selected.

---

## Folder Structure
```
├── README.md                   <- Project overview and usage instructions


├── docs                        <- Documentation and project demo
│   └── video_demo              <- Walk-through video, covering setup, UI, and functionality


├── src                         


├── data                        <- Data folder with all stages of data
│   ├── processed               <- Finalized datasets ready for modeling and generated training datasets
│   └── raw                     <- Original data as downloaded
│       ├── cricksheet          <- Raw data from Cricksheet
│       └── additional          <- GenAI Augmented data



├── data_processing             <- Scripts to process data
│   ├── data_download.py        <- Download all project data using this script. All raw data sources are processed here before further use.
│   └── feature_engineering.py  <- Handles all data manipulation and feature engineering for the project.
│   └── SHAP_controller.py      <- Runner code for SHAP explanations.
│   └── SHAP.py                 <- Contains the SHAP class.



├── model                       <- Modeling scripts for training and prediction
│   ├── teampointsmodel.py      <- Predicts Dream Team total points.
│   └── playerpointsmodel.py    <- Predicts individual points for each player (Product UI).
│   └── playerpointsmodel2.py   <- Predicts individual points for each player (Model UI).



├── model_artifacts             <- Storage for trained models
│                             (Includes pre-trained model for Product UI and generated model weight files from Model UI)



├── rest                        <- Contains functions for miscellaneous requirements for Product UI.

└── UI                          <- All files related to the user interface 
```


## Tech Stack

- **Frontend**: 
  - **Next.js**: A React framework used for building the interactive UI, handling routing, and server-side rendering.
  - **Tailwind CSS**: For responsive and clean UI design.
  - **React**: Core library for building the user interface components.

- **Backend**:
  - **Flask**: A lightweight Python web framework for handling API requests and integrating with the ML model.
  - **Python (ML model)**: The backend hosts the AI model, which is responsible for predicting the Dream11 team based on the data input from the frontend.

- **Database**:
 The platform uses **MongoDB** as its database to store:

  - **User Information**: User authentication details, preferences, and settings are securely stored for personalized experiences.
  - **Chat History**: Interaction logs with the AI chatbot ("Dream") are saved, enabling continuity in conversations and allowing users to revisit past suggestions and recommendations.
- **External APIs**:
  - **Cricket News API**: To fetch the latest cricket news.
---

## Installation & Setup
The product UI and ModelUI cannot be run at the same time on a SAME machine. Kindly use two different machines to run them at the same time. 

## Product UI:
### Prerequisites

Before you start, ensure that you have the following installed on your local machine:

- **Node.js** (>= 14.x)
- **Python** (>= 3.7)
- **pip** (Python package manager)
- **Flask**
- **Virtual Environment (for Python)**

### Frontend Setup (Next.js)

1. Clone the repository:
   ```bash
   git clone https://github.com/D11-MP/Dream11-prototype
   cd Dream11-prototype
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

### Backend Setup (Flask)

1. Navigate to the backend folder:
   ```bash
   cd ..
   ```

2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python runner.py
   ```

   The backend will be available at `http://localhost:5000`.

### Integration Between Frontend and Backend

- The Next.js frontend communicates with the Flask backend using RESTful APIs for fetching data and interacting with the machine learning model.
- The backend processes user input, runs predictions using the trained AI model, and returns the results to the frontend.


## Model UI:

The Model-UI is used to run the model between a start and end date for both- Training and Testing for the Dream-11 players and provide the downloadable csv along with the metric visualized using graphs

### Prerequisites
 1. NodeJS should be installed in your local system(Download from [here](https://nodejs.org/en/download/package-manager))
 2. You should have a Account in WanDB for visalizing the graphs and must get a API key. [Click here](https://wandb.ai)
 3. Python must be installed and it's path must be set up in your local system. Download it from [here](https://www.python.org/downloads/)
 4. Set up a .env folder in the same directory as __main__.py. Follow the .env.sample file there


### How to start the Flask Server(this where the model runs)
 1. Create and Start a virtual enviroment in inside the directory where __main__.py exists. follow the below in the terminal
```
python -m venv venv
```
```
venv/Scripts/activate
```
 2.  Set the requriements.txt file by this - 
```
python -m pip install requirements.txt
``` 
 3. Start the Flask server by running the below code in same directory as __main__.py where the virtual enviroment is running(make sure the port 5000 on your localhost is free) 
```
pip __main__.py
```
Now the server is running on localhost:5000

```markdown
## How to Run the UI Locally

1. **Navigate to the Frontend Directory**  
   Open a terminal and navigate to the `frontend` directory.  

2. **Install Dependencies**  
   Run the following command to install all the necessary dependencies:  
   ```bash
   npm install
   ```

3. **Start the Development Server**  
   After the dependencies are installed, run:  
   ```bash
   npm run dev
   ```  

4. **Access the UI**  
   - The UI will start on `localhost:3000`.  
   - Ensure that port 3000 is free; otherwise, the application will start on a different port (e.g., 3001).  
   - Check the terminal output to confirm the port being used.  



### User Flow
 Enter the start and end date for the training and testing and click on generate. This will take you to the next page where it takes time to generate the response in the server. 

---

## Usage

1. **Login**: Users can log in or sign up using the NextAuth.js authentication system.
2. **Upload CSV**: The admin can upload a CSV file containing the match data. The file should follow the predefined format.
3. **Navigate to Matches**: After login, users can view available matches, along with player lineups, and interact with the platform’s features.
4. **Build Your Dream11 Team**: Users can create their team by following the beginner or advanced paths, using AI suggestions, or customizing based on their preferences.
5. **Generate Team**: When ready, click the "Generate Team" button to get the final playing 11, which includes AI-generated reasons for each player’s selection.

---

## Future Enhancements

- **User Profile**: Add the ability for users to save their Dream11 teams and preferences.
- **Real-time Match Updates**: Integrate real-time match data, such as live scores and player performance.
- **Social Sharing**: Allow users to share their Dream11 teams on social media platforms.
- **Mobile App**: Create a mobile application version of the platform for iOS and Android.

---
