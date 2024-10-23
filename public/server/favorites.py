from flask import Flask, request, jsonify
from flask_cors import CORS  # 导入 CORS
import csv
import os

app = Flask(__name__)
CORS(app, resources={r"/save-favorites": {"origins": "http://localhost:3000"}})  # 只允許來自 React 的請求

# 根路由，返回一条简单消息
@app.route('/')
def home():
    return "Welcome to the Flask API!"

@app.route('/save-favorites', methods=['POST'])
def save_favorites():
    favorites = request.json.get('favorites', [])
    app.logger.info(f"Received favorites: {favorites}")

    # 确定 CSV 文件路径（与 favorites.py 同级目录）
    csv_file_path = os.path.join(os.path.dirname(__file__), 'favorites.csv')
    app.logger.info(f"Saving to CSV file at: {csv_file_path}")

    try:
        with open(csv_file_path, mode='w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['id', 'category', 'image', 'title', 'date', 'location'])  # 添加表头
            for favorite in favorites:
                writer.writerow([
                    favorite.get('id', ''),
                    favorite.get('category', ''),
                    favorite.get('image', ''),
                    favorite.get('title', ''),
                    favorite.get('date', ''),
                    favorite.get('location', '')
                ])
        app.logger.info("Favorites saved successfully.")
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        app.logger.error(f"Error saving favorites: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    # 确保 CSV 文件存在
    csv_file_path = os.path.join(os.path.dirname(__file__), 'favorites.csv')
    if not os.path.exists(csv_file_path):
        with open(csv_file_path, mode='w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['id', 'category', 'image', 'title', 'date', 'location'])  # 添加表头
    app.run(port=5000, debug=True)