import requests
from bs4 import BeautifulSoup
import csv

def extract_movie_info(url):
    # 發送HTTP請求獲取目標網頁的內容
    response = requests.get(url)
    response.encoding = 'utf-8'

    # 使用BeautifulSoup解析HTML內容
    soup = BeautifulSoup(response.text, 'html.parser')

    # 找到包含所有電影資訊的區塊
    movie_list = soup.find('ul', class_='movieList')

    # 如果找不到電影資訊的區塊，則提示並返回空列表
    if not movie_list:
        print(f"未找到電影列表部分：{url}")
        return []

    movies = []

    # 找到每部電影的元素
    for movie in movie_list.find_all('li'):
        # 提取電影標題
        title_element = movie.find('h2')
        if title_element:
            title = title_element.text.strip()
        else:
            title = "未知標題"

        # 提取電影上映日期
        date_element = movie.find('time')
        if date_element:
            release_date = date_element.text.strip()
        else:
            release_date = "未知上映日期"

        # 提取電影圖片的 URL
        img_element = movie.find('img')
        if img_element:
            # 處理相對路徑，去掉 '../'
            img_src = img_element['src'].replace('../', '')
            img_url = "https://www.vscinemas.com.tw/vsweb/" + img_src
        else:
            img_url = "未知圖片"

        # 將電影資訊添加到列表中
        movies.append({
            "title": title,
            "release_date": release_date,
            "img_url": img_url
        })

    return movies

# 打開一個名為movies.csv的文件來寫入資訊
with open("public/movie.csv", "w", encoding="utf-8", newline='') as file:
    # 定義 CSV 寫入器
    writer = csv.DictWriter(file, fieldnames=["id", "category", "image", "title", "date"])

    # 寫入 CSV 標題行
    writer.writeheader()

    # 計數器，從1開始
    movie_id_counter = 1

    # 處理每個頁面的電影資訊
    for page_num in range(1, 3):  # 處理頁面1到頁面2
        page_url = f"https://www.vscinemas.com.tw/vsweb/film/coming.aspx?p={page_num}"
        movies_on_page = extract_movie_info(page_url)

        # 將每頁的電影資訊寫入 CSV 文件
        for movie in movies_on_page:
            writer.writerow({
                "id": f"movie-{movie_id_counter}",  # 根據計數器生成唯一ID
                "category": "movie",  # 固定的類別
                "image": movie['img_url'], 
                "title": movie['title'], 
                "date": movie['release_date']
            })
            movie_id_counter += 1  # 增加計數器以確保唯一ID

print("所有電影資訊已成功寫入到 movie.csv 文件中")
