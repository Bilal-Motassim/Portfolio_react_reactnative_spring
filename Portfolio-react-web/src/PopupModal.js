import React from 'react';
import './ImageButton.css'; // Importing CSS for styling

const PopupModal = ({ isOpen, togglePopup, handleSubmit, handleInputChange, editFormData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={togglePopup}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input type="text" name="name" value={editFormData.name} onChange={handleInputChange} />
          </label>
          <label>
            Phone Number
            <input type="text" name="phone" value={editFormData.phone} onChange={handleInputChange} />
          </label>
          <label>
            Profile Image
            <input type="file" name="profileImage" onChange={handleInputChange} />
          </label>
          <label>
            Skills
            <input type="text" name="skills" value={editFormData.skills} onChange={handleInputChange} />
          </label>
          <label>
            Experience
            <input type="text" name="experience" value={editFormData.experience} onChange={handleInputChange} />
          </label>
          <label>
            Education
            <input type="text" name="education" value={editFormData.education} onChange={handleInputChange} />
          </label>
          <button type="submit" className="save-btn">Save Changes</button>
        </form>
        <button onClick={togglePopup} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default PopupModal;