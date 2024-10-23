// src/pages/ActivityList.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SidebarDrawer from '../components/SidebarDrawer'; // 引入側邊抽屜
import '../assets/style/Activitylist.css'; // 確保引入 CSS 的路徑正確
import { FaStar } from 'react-icons/fa';
import Papa from 'papaparse';

// 導入所有圖片
import artImage from '../assets/images/art.jpeg';
import sportImage from '../assets/images/sport.jpeg';
import movieImage from '../assets/images/movie.jpeg';
import competitionImage from '../assets/images/competition.jpeg';
import musicImage from '../assets/images/music.jpeg';
import lectureImage from '../assets/images/lecture.jpeg';
import logoImg from '../assets/images/logo.png'; // 確保路徑正確

const categoryNames = {
    art: '藝文',
    sport: '運動',
    movie: '電影',
    competition: '競賽',
    music: '音樂',
    lecture: '講座',
};

// 建立圖片映射對象
const images = {
    art: artImage,
    sport: sportImage,
    movie: movieImage,
    competition: competitionImage,
    music: musicImage,
    lecture: lectureImage,
};

const ActivityList = () => {
    const { category } = useParams();
    const [events, setEvents] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isViewingFavorites, setIsViewingFavorites] = useState(false);
    const [mainFavorite, setMainFavorite] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false); // 控制側邊抽屜是否顯示

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev); // 切換抽屜顯示狀態
    };

    useEffect(() => {
        // 从 localStorage 获取收藏
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
        if (storedFavorites && Array.isArray(storedFavorites)) {
            setFavorites(storedFavorites);
        }

        // 解析 CSV 文件
        Papa.parse(`${process.env.PUBLIC_URL}/${category}.csv`, {
            header: true,
            download: true,
            encoding: 'UTF-8',
            complete: function (results) {
                try {
                    const validData = results.data.filter(event =>
                        event.id && event.title && event.image && event.date
                    );
                    setEvents(validData);
                } catch (error) {
                    console.error("Data processing error:", error);
                }
            },
            error: function (err) {
                console.error('Error parsing CSV:', err);
            }
        });
    }, [category]);

    useEffect(() => {
        // 保存收藏到 localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (event) => {
        setFavorites((prevFavorites) => {
            const isFavorited = prevFavorites.some(fav => fav.id === event.id);
            let newFavorites;

            if (isFavorited) {
                newFavorites = prevFavorites.filter(fav => fav.id !== event.id);
            } else {
                newFavorites = [...prevFavorites, event];
            }

            return newFavorites;
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(searchInput.trim());
    };

    const filteredEvents = isViewingFavorites
        ? events.filter(event => favorites.some(fav => fav.id === event.id))
        : events.filter(event =>
            event.title && typeof event.title === 'string' && event.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="activity-wrapper">
            {/* 頂部導航條 */}
            <header className="px-4 py-2 flex items-center bg-[#d3e8e6]">
                {/* 點擊 logo 以顯示/隱藏側邊抽屜 */}
                <img
                    src={logoImg}
                    alt="calendar"
                    className="mr-2 w-12 h-12 cursor-pointer"
                    onClick={toggleDrawer}
                />
                <h1 className="mr-10 text-xl text-gray-500 font-bold">{categoryNames[category] || category} 活動列表</h1>
            </header>

            {/* 側邊抽屜 */}
            <SidebarDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

            <div className="activity-container">
                <div className="container">
                    <h1 className="category-title">{categoryNames[category] || category}</h1>
                    <img
                        src={images[category]}
                        alt={`${category}活動`}
                        className="main-image"
                    />

                    <div
                        className={`favorite-icon ${mainFavorite ? 'favorited' : ''}`}
                        onClick={() => {
                            setIsViewingFavorites(prev => !prev);
                            setMainFavorite(prev => !prev);
                        }}
                    >
                        <FaStar />
                    </div>

                    <form className="search-box" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder={`搜尋${categoryNames[category] || category}活動`}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button type="submit">搜尋</button>
                    </form>
                </div>

                {/* 活動列表 */}
                <div className="activity-list">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div className="activity-info" key={event.id}>
                                <div className="poster">
                                    <img src={event.image} alt={event.title} />
                                </div>
                                <div className="details">
                                    <h3 className="activity-name">{event.title}</h3>
                                    <p className="activity-date">活動日期：{event.date}</p>
                                    {event.location && <p className="activity-location">地點：{event.location}</p>}
                                </div>

                                <div
                                    className={`favorite-icon ${favorites.some(fav => fav.id === event.id) ? 'favorited' : ''}`}
                                    onClick={() => toggleFavorite(event)}
                                >
                                    <FaStar />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-results">沒有找到相關活動。</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivityList;
