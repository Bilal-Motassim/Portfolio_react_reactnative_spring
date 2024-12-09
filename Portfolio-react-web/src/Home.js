
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './index.css'; 
import Header from './header';
import NewPublication from './NewPublication'; 
import SocialMediaPost from './SocialMediaPost';
import follow from './images/follow.png';

function Home() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]); // To store posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    fetchUserData();
    fetchPosts(); 
  }, [userId]);

  const fetchUserData = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${currentUserId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserData(response.data);
      const imageResponse = await axios.get(`http://localhost:8080/api/users/profilepicbase64/${currentUserId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProfileImage(`data:${imageResponse.data.type};base64,${imageResponse.data.base64}`);
    } catch (err) {
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setPosts(response.data); 
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setError('Failed to fetch posts');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home">
      <Header currentPic={profileImage} currentUserId={currentUserId}/>
      <div className="main-container">
        <div className="user-profile">
            <div className="profile-header">
              <img src={profileImage} alt="profile" className="profile-picture" />
              <h3>{userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}</h3>
            </div>
            <div className="latest-post">
              <h2>Latest News</h2>
              {posts.map(post => (
                <p key={post.postid}>{post.title}</p> 
              ))}
            </div>
        </div>
        <NewPublication profileImage={profileImage} currentUserId={currentUserId} />
        <svg xmlns="http://www.w3.org/2000/svg" width="500" height="2" viewBox="0 0 500 2" fill="none">
          <path d="M0 1L500 1.00004" stroke="#BFBEBB"/>
        </svg>
        {posts.map(post => (
          <SocialMediaPost key={post.postid} post={post} currentPic={profileImage} currentUserId={currentUserId} />
        ))}
        <svg xmlns="http://www.w3.org/2000/svg" width="500" height="2" viewBox="0 0 500 2" fill="none">
          <path d="M0 1L500 1.00004" stroke="#BFBEBB"/>
        </svg>
      </div>
    </div>
  );
};

export default Home;
