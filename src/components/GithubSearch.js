import React, { useState } from 'react';
import './GithubSearch.css';
import { FaMapMarkerAlt } from 'react-icons/fa'; 
import { PiBuildingsFill } from 'react-icons/pi';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';

const GithubSearch = () => {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    const NODE_API_URL = process.env.REACT_APP_NODE_API_URL;


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        setProfile(null); 

        if (!username.trim()) {
            setError('Please enter a GitHub username.');
            return;
        }

        if (!NODE_API_URL) {
            
            setError('API URL is not configured. Please check your environment variables.');
            
            console.error(
                `REACT_APP_NODE_API_URL (or VITE_NODE_API_URL) is not defined!
                Ensure your .env file is in the root of your React project
                and you've restarted your development server after adding/changing it.`
            );
            return;
        }

        try {
            
            const response = await fetch(`${NODE_API_URL}/api/github-user/${username}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred fetching user data.');
            }
            const data = await response.json();
            setProfile(data);
            setError(null); 
        } catch (error) {
            setProfile(null);
            setError(error.message); 
            console.error('Fetch error:', error);
        }
    };

    return (
        <div className='main-container'>
            <h1 className='main-heading'>GitHub Profile Detective</h1>
            <form onSubmit={handleSubmit} className='search-form'>
                <input
                    type='text'
                    placeholder='Enter Github Username....'
                    value={username}
                    className='search-input'
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <button type='submit' className='search-btn'>Search</button>
            </form>

            {error && <p className='error-msg'>{error}</p>}
            {profile && (
                <div className='profile-container'>
                    <div className='profile-content'>
                        <div className='profile-img'>
                            <img src={profile.avatar_url} alt='Avatar' className='profile-avatar'></img>
                        </div>
                        <div className='profile-details'>

                            <div className='profile-des'>
                                <h2 className='profile-name'>{profile.name || profile.login}</h2> 
                                <p className='profile-created'>Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
                            </div>

                            <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-username'>@{profile.login}</a>
                            <p className='profile-bio'>{profile.bio ? profile.bio : 'No bio available.'}</p>

                            <div className='profile-stats'>
                                <p className='profile-repos'>Repositories<br /><span className='stats'>{profile.public_repos}</span></p>
                                <p className='profile-followers'>Followers<br /><span className='stats'>{profile.followers}</span></p>
                                <p className='profile-following'>Following<br /><span className='stats'>{profile.following}</span></p>
                            </div>

                            <div className='profile-info'>
                                <p className='profile-location'><FaMapMarkerAlt /> {profile.location ? profile.location : 'N/A'}</p>
                                <p className='profile-company'><PiBuildingsFill /> {profile.company ? profile.company : 'N/A'}</p>
                            </div>

                            <div className='profile-links'>
                                <a href={profile.twitter_username ? `https://twitter.com/${profile.twitter_username}` : '#'} target='_blank' rel="noreferrer" className={`twitter-link ${!profile.twitter_username ? 'not-available' : ''}`}>
                                    <FaXTwitter /> {profile.twitter_username ? profile.twitter_username : 'Not Available'}
                                </a>
                                <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-url'><FaGithub />View Profile</a>
                            </div>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GithubSearch;