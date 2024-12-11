from sklearn.model_selection import train_test_split
from SHAP import *
from model import player_name_to_identifier, PlayerPointsModel
import pickle
# api_key = "AIzaSyDHdzlQyG6k0uHLvcsElnldJYZr7Ut-Tjc"
api_key = "AIzaSyCHRmQlM-0NnatRV-umtgANQFBdAMifyoU"


player_role_df = pd.read_csv('player_role.csv')
player_role ={}

for index, row in player_role_df.iterrows():
    player_role[row['name']] = row['role']

# with open( "players_dfs.pkl" , 'rb') as f:
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

with open( "player_dict.pkl" , 'rb') as f:
    get_latest_stats = pickle.load(f)

cols_to_drop = ['Unnamed: 0', 'player_id', 'match_id', 'team', 'total_runs_made',
       'total_balls_faced', 'total_runs_given', 'total_balls_bowled',
       'total_extras', 'total_wickets', 'lbw_wickets', 'bowled_wickets',
       'maidens', 'catches', 'runouts', 'stadium', 'dates', 'date_playing',
       'league', 'match_type', 'gender', 'total_runs_points', 'run_6_points',
       'run_bonus_points', 'strike_rate', 'strike_rate_points',
       'total_bat_points', 'economy_rate', 'total_wickets_points',
       'lbw_bowled_bonus_points', 'wicket_bonus_points', 'economy_rate_points',
       'maiden_overs_points', 'total_bowl_points', 'catch_points',
       'catch_bonus_points', 'run_outs_points', 'total_fielding_points']



def get_response_for_all_players(player_name_list):#hume call krna hai
    # players_name = player_name_list
    response_list = []
    weight_file ="trained_model2.pkl"
    playerpointsmodel = PlayerPointsModel(weight_file = weight_file)
    shap_analyser = SHAPAnalyzer(playerpointsmodel.model)
    for player_name in player_name_list:
        print(player_name)
        print(player_name['name'])
        id = player_name_to_identifier[player_name['name']]
        print(id)
        dummy = pd.DataFrame(np.zeros((1,169)))
        if id in get_latest_stats.keys() :
            latest_stats = get_latest_stats[id]
            for col in cols_to_drop:
                if col in latest_stats.columns:
                    latest_stats = latest_stats.drop(columns=[col])
        else :
            latest_stats = dummy

        # latest_stats = get_latest_stats.setdefault([id]
        # print(latest_stats)
        top_features_str = shap_analyser.generate_top_features( X = latest_stats, role = player_role[player_name['name']] )
        print(top_features_str)
        response = shap_analyser.explain_features(top_features_str)
        response_list.append([player_name['name'],response])

    return response_list
