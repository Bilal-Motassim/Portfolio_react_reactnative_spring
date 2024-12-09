import React, { useEffect, useState } from 'react';
import './style/SocialMediaPost.css'; 
import shareIcon from './images/share.png';
import commentIcon from './images/comment.png';
import likeOn from './images/likeOn.png';
import likeOff from './images/likeOff.png';
import submit from './images/submit.png';

import axios from 'axios';

function SocialMediaPost({ post, currentPic, currentUserId }) {
  const {
    firstname,
    lastname,
    base64,
    likes: initialLikes,
    comments = '0',
    shares = '0',
    description,
    title,
    createdAt,
    profilebase64,
    postid,
    userHasLiked,
  } = post || {};

  const [likes, setLikes] = useState(parseInt(initialLikes, 10));
  const date = new Date(createdAt).toLocaleDateString("en-US");
  const [hasLiked, setHasLiked] = useState(userHasLiked);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    fetchComments(); 
  }, []);

  const handleLikeClick = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.post(`http://localhost:8080/api/posts/${postid}/like/${currentUserId}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 200) {
        setLikes(response.data.likes);
        setHasLiked(!hasLiked);
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
      alert('Failed to toggle like. Error: ' + error.message);
    }
  };
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const copyPostLink = () => {
    const postLink = `http://localhost:8080/api/post/${post.postid}`;
    navigator.clipboard.writeText(postLink)
      .then(() => {
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };


  const fetchComments = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`http://localhost:8080/api/posts/${postid}/comments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setCommentsList(response.data);
        fetchLikes();
      } else {
        console.error('Failed to fetch comments:', error);
        setCommentsList([]);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      setCommentsList([]);
    }
  };

  const fetchLikes = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`http://localhost:8080/api/posts/likes/${postid}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setLikes(response.data); 
    } catch (err) {
      console.error('Failed to fetch likes', err);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitComment = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.post(`http://localhost:8080/api/posts/comments/${postid}/${currentUserId}`, { content: comment }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        fetchComments();
        setComment('');
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Failed to add comment. Error: ' + error.message);
    }
  };

  return (
    <div className="post-container">
      <header className="post-header">
        <img src={`data:image/jpeg;base64,${profilebase64}`} className="brand-logo" alt={`${firstname} ${lastname}`} />
        <div className="brand-info">
          <h2>{`${firstname} ${lastname}`}</h2>
          <p>{date} • {title}</p>
        </div>
        <button className="menu-button">...</button>
      </header>
      <div className="post-content">
        {description && <p style={{ marginLeft: 10 }}>{description}</p>}
        {base64 && <img src={`data:image/jpeg;base64,${base64}`} alt="Post Content" className="post-image" />}
      </div>
      <div className="post-actions">
        <button className="actions-button" onClick={handleLikeClick}>
          <img src={hasLiked ? likeOn : likeOff} alt="Like"/>
        </button>
        <button className="actions-button">
          <img src={commentIcon} alt="Comment"/>
        </button>
        <button className="actions-button" onClick={copyPostLink}>
          <img src={shareIcon} alt="Share"/>
        </button>
      </div>
      {showCopySuccess && (
        <div className="copy-success-overlay">
          <div className="copy-success-message">
            Link copied to clipboard!
          </div>
        </div>
      )}
      <footer className="post-stats">
        <span>{likes} likes</span>
        <span> comments</span>
        <span> share it</span>
      </footer>
      <svg xmlns="http://www.w3.org/2000/svg" width="500" height="2" viewBox="0 0 500 2" fill="none">
        <path d="M0 1L500 1.00004" stroke="#BFBEBB"/>
      </svg>
      <div className="comment-section">
        <img style={{ marginLeft: 10 }} src={currentPic} className="user-comment-image" alt="User"/>
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          className="comment-input" 
        />
        <button onClick={submitComment} className="publish-button"><img src={submit} /></button>
      </div>
      {commentsList.map((comment, index) => (
        <div key={index} className="comment-container">
          <div className="comment" style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}>
            <img src={`data:image/jpeg;base64,${comment.iconBase64}`} className="comment-user-image" alt={`${comment.firstname} ${comment.lastname}`} />
            <div className="comment-text" style={{
              marginLeft: '10px',
            }}>
              <h2 style={{
                color: '#181818',
                fontFamily: 'Montserrat',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                marginBottom: '5px'  
              }}>
                {`${comment.firstname} ${comment.lastname}`} 
              </h2>
              <p style={{
                color: '#181818',
                fontFamily: 'Montserrat',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                textAlign: 'left',
              }}>
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}


export default SocialMediaPost;
