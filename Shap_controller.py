from sklearn.model_selection import train_test_split
from SHAP import *
from model import player_name_to_identifier, PlayerPointsModel
import pickle
api_key = "AIzaSyC_vDuBg6FBefSWjkhHlM-JrUOHoiKdNDo"

# with open( "player_df.pkl" , 'rb') as f:
#   player_df_temp= pickle.load(f)
# get_latest_stats = {}
# ids = player_df_temp['player_id'].unique()
# cols_to_drop = ['Unnamed: 0', 'player_id', 'match_id', 'team', 'total_runs_made',
#        'total_balls_faced', 'total_runs_given', 'total_balls_bowled',
#        'total_extras', 'total_wickets', 'lbw_wickets', 'bowled_wickets',
#        'maidens', 'catches', 'runouts', 'stadium', 'dates', 'date_playing',
#        'league', 'match_type', 'gender', 'total_runs_points', 'run_6_points',
#        'run_bonus_points', 'strike_rate', 'strike_rate_points',
#        'total_bat_points', 'economy_rate', 'total_wickets_points',
#        'lbw_bowled_bonus_points', 'wicket_bonus_points', 'economy_rate_points',
#        'maiden_overs_points', 'total_bowl_points', 'catch_points',
#        'catch_bonus_points', 'run_outs_points', 'total_fielding_points']
# for id in ids:
#     player_df = player_df_temp[player_df_temp['player_id'] == id]
#     for col in cols_to_drop:
#         if col in player_df.columns:
#             player_df = player_df.drop(columns=[col])
#     get_latest_stats[id] = player_df

with open( "get_latest_stats.pkl" , 'rb') as f:
    get_latest_stats = pickle.load(f)



def get_response_for_all_players(player_name_list):#hume call krna hai

    response_list = []
    weight_file =""
    playerpointsmodel = PlayerPointsModel(weight_file = weight_file)
    shap_analyser = SHAPAnalyzer(playerpointsmodel)
    for player_name in player_name_list:
        id = player_name_to_identifier[player_name]
        latest_stats = get_latest_stats[id]
        top_features_str = shap_analyser.generate_top_features( X = latest_stats )
        response = shap_analyser.explain_features(top_features_str)
        response_list.append(response)

    return response_list
