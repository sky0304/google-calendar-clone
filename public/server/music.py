from selenium import webdriver
from bs4 import BeautifulSoup
import time
import csv
import os

# 設定 WebDriver
driver = webdriver.Chrome()  # 確保已安裝 ChromeDriver
driver.get("https://npac-ntch.org/programs")  # 打開目標網站

# 等待頁面加載
time.sleep(10)  # 根據網速調整等待時間

# 獲取頁面內容
soup = BeautifulSoup(driver.page_source, 'html.parser')

# 找到活動的區域
events = soup.find_all('div', class_='css-18z68gp')  # 根據網站的結構更改此行

# 提取活動的圖片、標題和日期
events_data = []

for index, event in enumerate(events, start=1):
    # 獲取圖片 URL
    img_tag = event.find('img')  # 找到 img 標籤
    img_url = img_tag['src'] if img_tag and img_tag.get('src') else '無圖片'

    # 獲取標題
    title_tag = event.find('span', class_='css-12txkb2')  # 根據實際的 class 獲取標題
    title = title_tag.text.strip() if title_tag else '無標題'

    # 獲取日期
    date_tag = event.find('div', class_='css-4rdrpv')  # 根據實際的 class 獲取日期
    date_text = date_tag.text.strip() if date_tag else '無日期'

    # 儲存提取的資料
    events_data.append({
        'id': f'music-{index}',
        'category': 'music',
        'image': img_url,
        'title': title,
        'date': date_text,
        'location': '國家兩院廳'
    })

# 確保輸出目錄存在
output_dir = "public"
os.makedirs(output_dir, exist_ok=True)

# 儲存數據到 CSV 文件
csv_path = os.path.join(output_dir, 'music.csv')
with open(csv_path, mode='w', newline='', encoding='utf-8') as csv_file:
    fieldnames = ['id', 'category', 'image', 'title', 'date', 'location']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

    writer.writeheader()
    for event in events_data:
        writer.writerow(event)

print(f"數據已成功保存到 {csv_path}")

# 關閉瀏覽器
driver.quit()
