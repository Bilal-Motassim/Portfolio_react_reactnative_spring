import React, { useEffect, useState } from 'react';
import './style/post.css';
import imageIcon from './images/image.png';
import videoIcon from './images/video.png';
import fileIcon from './images/file.png';
import submitIcon from './images/submit.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewPublication({ profileImage, currentUserId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await axios.post(`http://localhost:8080/api/posts/${currentUserId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setShowModal(true); // Show the modal on success
        setTitle('');       // Clear the title field
        setDescription(''); // Clear the description field
        setFile(null);      // Clear the file input
        setTimeout(() => {
          navigate("/home"); // Navigate after showing the modal for a bit
          closeModal();     // Ensure modal is closed after navigation
        }, 2000);            // Delay to show modal message before redirecting
      }
    } catch (error) {
      console.error('Error posting new publication:', error);
      alert('Failed to create post');
    }
  };

  const Modal = ({ show, message, onClose }) => {
    if (!show) return null;
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <h4>{message}</h4>
        </div>
      </div>
    );
  };

  return (
    <div className="post-creator">
      <Modal show={showModal} message="Post created successfully." onClose={closeModal} />
      <div className="post-top">
        <div className="profile-pic-and-input">
          <div className="post-profile-pic">
            <img src={profileImage} alt="Profile" />
          </div>
          <input
            className="post-input"
            placeholder="What's on your mind?"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <textarea
            className="post-textarea"
            placeholder="Post Description..."
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
      </div>
      <div className="post-options">
        <label htmlFor="file-upload" className="option-button">
          <img className="post-attached" src={imageIcon} alt="Attach" />
          Photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="file-upload"
          style={{ display: 'none' }} // Hide the file input element
        />
        <button className="publish-button" onClick={handleSubmit}>
          <img className="post-attached" src={submitIcon} alt="Submit" />
          Publish
        </button>
      </div>
    </div>
  );
}

export default NewPublication;
