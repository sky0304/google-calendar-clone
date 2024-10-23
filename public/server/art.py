import requests
from bs4 import BeautifulSoup
import csv
import os

# 确保 'public' 目录存在
os.makedirs('public', exist_ok=True)

# 定义类别
category = 'art'

# 准备写入 CSV 文件，存储在 'public/art.csv'
with open('public/art.csv', mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    # 写入 CSV 头，包括 'id' 和 'category'
    writer.writerow(['id', 'category', 'image', 'title', 'date', 'location'])
    
    # 初始化 id 计数器
    current_id = 1

    # 遍历每一页
    for page in range(1, 3):  # 从第一页到第二页
        url = f"https://artemperor.tw/tidbits?sort=2&page={page}"
        
        # 发送请求
        response = requests.get(url)

        # 检查请求是否成功
        if response.status_code == 200:
            # 解析网页内容
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # 找到所有的条目
            items = soup.find_all('div', class_='list_box')

            for item in items:
                # 获取图片链接
                pic_div = item.find('div', class_='pic')
                if pic_div and 'style' in pic_div.attrs:
                    style = pic_div['style']
                    image_url = style.split('url(')[1].split(')')[0] if 'url(' in style else '无图片'
                else:
                    image_url = '无图片'

                # 获取标题
                title_tag = item.find('h2')
                title = title_tag.text.strip() if title_tag else '无标题'
                
                # 获取日期和地点
                p_tag = item.find('p')
                date_location = p_tag.text.strip() if p_tag else '无日期与地点'
                if '｜' in date_location:
                    date, location = date_location.split('｜', 1)
                else:
                    date, location = ('无日期', '无地点')
                
                # 去掉多余的字符
                date = date.replace('日期：', '').strip()
                location = location.strip()

                # 生成带类别前缀的id
                unique_id = f"{category}-{current_id}"

                # 写入 CSV 文件，包括 'id' 和 'category'
                writer.writerow([unique_id, category, image_url, title, date, location])
                
                # 递增 id
                current_id += 1

        else:
            print(f"Failed to retrieve page {page}: Status code {response.status_code}")

# 打印成功消息
print("数据已成功保存到 public/art.csv")
