from selenium import webdriver
from bs4 import BeautifulSoup
from datetime import datetime
import time
import csv

# 設定 WebDriver
driver = webdriver.Chrome()
driver.get("https://www.ctrun.com.tw/")  # 打開目標網站

# 等待頁面加載
time.sleep(20)

# 獲取頁面內容
soup = BeautifulSoup(driver.page_source, 'html.parser')

# 找到活動的區域
events = soup.find_all('div', class_='pri_table_list')

# 提取活動的圖片、名稱、日期和地點
events_data = []
today = datetime.today()  # 獲取今天的日期

for event in events:
    # 確保抓取到正確的圖片 URL
    pic_div = event.find('div', class_='pic')  # 定位到 class="pic" 的 div
    img_tag = pic_div.find('img') if pic_div else None
    img_url = img_tag['src'] if img_tag else None
    
    # 活動名稱（中文）
    title_zh_tag = event.find('h6', class_='mt-2')
    title_zh = title_zh_tag.text.strip() if title_zh_tag else 'No Title (ZH)'
    
    # 活動名稱（英文）
    title_en_tag = event.find('h4', style='font-weight:bold')
    title_en = title_en_tag.text.strip() if title_en_tag else 'No Title (EN)'
    
    # 組合名稱
    title = f"{title_zh} || {title_en}"
    
    # 活動日期
    date_tag = event.find('li')
    date_text = date_tag.text.strip() if date_tag else 'No Date'

    try:
        # 將日期文字轉換為 datetime 對象，假設日期格式為 "2025年1月19日 (星期日)"
        event_date = datetime.strptime(date_text.split(' ')[0], '%Y年%m月%d日')
    except ValueError:
        print(f"無法解析日期：{date_text}")
        continue  # 如果日期無法解析，跳過此活動

    # 如果活動日期已過，不處理
    if event_date < today:
        print(f"跳過過期活動：{title} ({date_text})")
        continue

    # 活動地點
    location_tag = event.find_all('li')[2]  # 第三個 li 是地點
    location = location_tag.text.strip() if location_tag else 'No Location'

    # 儲存提取的資料
    events_data.append({
        'image': img_url,
        'title': title,
        'date': date_text,
        'location': location
    })

# 儲存數據到 CSV 文件
with open('public/sport.csv', mode='w', newline='', encoding='utf-8') as csv_file:
    fieldnames = ['id', 'category', 'image', 'title', 'date', 'location']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

    writer.writeheader()
    
    # 將每個活動的資料寫入 CSV 並生成唯一ID和類別
    for index, event in enumerate(events_data, start=1):
        writer.writerow({
            'id': f'sport-{index}',  # 生成唯一 ID
            'category': 'sport',      # 固定類別
            'image': event['image'], 
            'title': event['title'], 
            'date': event['date'], 
            'location': event['location']
        })

print("數據已成功保存到 sport.csv")

# 關閉瀏覽器
driver.quit()
