import React, { useState } from 'react';
import './InstagramProfile.css'; 
import { FaGlobe, FaCheckCircle } from 'react-icons/fa'; 
import { IoGridOutline } from 'react-icons/io5'; 

const InstagramProfileViewer = () => {
    const [profile] = useState({
        username: "explore_the_galaxy",
        full_name: "Space Explorer",
        profile_pic_url: "https://www.instagram.com/arjun.prratap05/", 
        biography: "🚀 Astronaut in training | ✨ Documenting the cosmos | 🌌 Dreamer of distant stars. Follow for daily celestial wonders!",
        followers_count: 1234567,
        following_count: 85,
        media_count: 450, 
        external_url: "https://www.space-explorer.com", 
        is_private: false,
        is_verified: true, 
        recent_posts: [
            
        ]
    });
    
    return (
        <div className='instagram-container'>
            <h1 className='instagram-heading'>Instagram Profile Viewer (Mock)</h1>
            
            {profile && (
                <div className='instagram-profile-card'>
                    <div className='profile-header'>
                        <div className='profile-pic-wrapper'>
                            <img src={profile.profile_pic_url} alt='Profile' className='profile-avatar'></img>
                            {profile.is_verified && <FaCheckCircle className="verified-badge" />}
                        </div>
                        <div className='profile-meta'>
                            <h2 className='profile-username-ig'>{profile.username}</h2>
                            {profile.full_name && <p className='profile-full-name'>{profile.full_name}</p>}
                            <div className='profile-stats-ig'>
                                <p><span className='stat-value'>{profile.media_count}</span> posts</p>
                                <p><span className='stat-value'>{profile.followers_count.toLocaleString()}</span> followers</p>
                                <p><span className='stat-value'>{profile.following_count}</span> following</p>
                            </div>
                        </div>
                    </div>

                    <p className='profile-bio-ig'>{profile.biography}</p>

                    {profile.external_url && (
                        <a href={profile.external_url} target='_blank' rel="noreferrer" className='profile-link-bio'>
                            <FaGlobe /> {profile.external_url.replace(/(^\w+:|^)\/\//, '')} {/* Show URL without protocol */}
                        </a>
                    )}

                    <div className="profile-tabs">
                        <div className="tab-item active">
                            <IoGridOutline /> Posts
                        </div>
                       
                    </div>

                    <div className='profile-posts-grid'>
                        {profile.recent_posts.map((postUrl, index) => (
                            <div key={index} className='post-thumbnail'>
                                <img src={postUrl} alt={`Post ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstagramProfileViewer;