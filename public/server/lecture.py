import requests
from bs4 import BeautifulSoup
import csv

def extract_event_info(url):
    response = requests.get(url)
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')

    event_list = soup.find_all('a', class_='kf-img obj-img-contain rd-item ay-item')

    if not event_list:
        print(f"未找到活動列表部分：{url}")
        return []

    events = []
    for event in event_list:
        # 提取活動數據，使用默認值進行處理
        image = "https://cultureexpress.taipei" + event.find('img')['src'] if event.find('img') else "未知圖片"
        title = event.find('h3', class_='rd-tit').text.strip() if event.find('h3', class_='rd-tit') else "未知活動名稱"
        date = " ~ ".join([d.strip() for d in event.find('p', class_='card-date').stripped_strings]) if event.find('p', class_='card-date') else "未知日期"
        location = event.find('li', string=lambda t: "活動地點：" in t).text.replace('活動地點：', '').strip() if event.find('li', string=lambda t: "活動地點：" in t) else "未知地點"

        events.append({
            "title": title,
            "date": date,
            "image": image,
            "location": location
        })

    return events

all_events = []
for page in range(1, 5):  # 假設頁碼從 1 到 4
    url = f"https://cultureexpress.taipei/Event/C000003?SearchKeyword=%e8%ac%9b%e5%ba%a7&PageIndex={page}"
    all_events.extend(extract_event_info(url))

# 定義 CSV 文件的欄位順序
fieldnames = ["id", "category", "image", "title", "date", "location"]

with open("public/lecture.csv", "w", encoding="utf-8", newline='') as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()

    for index, event in enumerate(all_events, start=1):
        writer.writerow({
            "id": f"lecture-{index}",
            "category": "lecture",
            "image": event['image'],
            "title": event['title'],
            "date": event['date'],
            "location": event['location']
        })

print("所有活動資訊已成功寫入到 lecture.csv 文件中")
