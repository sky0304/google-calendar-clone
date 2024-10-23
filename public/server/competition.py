from selenium import webdriver
from bs4 import BeautifulSoup
import time
import csv

# 设置 WebDriver
driver = webdriver.Chrome()  # 确保已安装 ChromeDriver
driver.get("https://bhuntr.com/tw/competitions?category=116,117,118")

# 等待页面加载
time.sleep(20)  # 根据网速调整等待时间

# 获取页面内容
soup = BeautifulSoup(driver.page_source, 'html.parser')

# 找到活动区域
competitions = soup.find_all('div', class_='col-lg-3 col-md-4 col-sm-6 col-12 bh-card-item')

# 提取活动的图片、标题和日期
competitions_data = []
for competition_index, competition in enumerate(competitions, start=1):
    img_tag = competition.find('img', class_='bh-image')
    img = img_tag['src'] if img_tag else '无图片'
    
    title_tag = competition.find('a', class_='bh-title')
    title = title_tag.text.strip() if title_tag else '无标题'
    
    date_tag = competition.find('span', class_='bh-item is-processing')
    date = date_tag.text.strip() if date_tag else '无日期'

    # 提取“还有 xx 天”的部分
    if date.startswith("投稿中："):
        date = date.replace("投稿中：", "").strip()  # 去掉“投稿中：”前缀
    
    # 只存入有效日期的活动
    if date and date != '无日期':
        competitions_data.append({
            'id': f"competition-{competition_index}",
            'category': 'competition',
            'image': img,
            'title': title,
            'date': date
        })

# 保存数据到 CSV 文件
with open("public/competition.csv", mode='w', newline='', encoding='utf-8') as csv_file:
    fieldnames = ['id', 'category', 'image', 'title', 'date']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

    writer.writeheader()
    for competition in competitions_data:
        writer.writerow(competition)

print("数据已成功保存到 competitions.csv")

# 关闭浏览器
driver.quit()
