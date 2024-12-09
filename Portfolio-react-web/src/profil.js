import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import { faMapMarkerAlt, faEnvelope, faPhone, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './ImageButton.css'; 
import Header from './header';
import pen from './images/pen.png';
import save from './images/save.png';
import trash from './images/trash.png';
import add from './images/addd.png';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ProfilePDFDocument from './ProfilePDFDocument';
import pdfIcon from './images/pdf.ico'; 




function Profil() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [educations, setEducations] = useState([]);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [showAddSkillPopup, setShowAddSkillPopup] = useState(false);
  const [loggedInUserProfileImage, setLoggedInUserProfileImage] = useState('');


  const [editExperiencePopupOpen, setEditExperiencePopupOpen] = useState(false);
  const [showAddEducationPopup, setShowAddEducationPopup] = useState(false);
  const toggleAddEducationPopup = () => {
    setShowAddEducationPopup(!showAddEducationPopup);
    setNewEducation({ school: '', studyfield: '', startmonth: '', startyear: '', endmonth: '', endyear: '', description: '' }); // Reset the form fields when opening the popup
};
  const [newEducation, setNewEducation] = useState({
    school: '',
    studyfield: '',
    startmonth: '',
    startyear: '',
    endmonth: '',
    endyear: '',
    description: ''
});

  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startmonth: '',
    startyear: '',
    endmonth: '',
    endyear: '',
    description: ''
  });
  const [showAddExperiencePopup, setShowAddExperiencePopup] = useState(false);


const handleNewEducationChange = (event) => {
    const { name, value } = event.target;
    setNewEducation(prev => ({ ...prev, [name]: value }));
};

const addNewEducation = async () => {
  const userId = localStorage.getItem('userId'); // Assuming userID is stored in localStorage
  const token = localStorage.getItem('authToken');
  if (!userId || !token) {
      alert('Authentication data not found, please login again.');
      return;
  }

  const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  };

  try {
      const response = await axios.post(`http://localhost:8080/api/education/${userId}`, newEducation, { headers });
      if (response.status === 201) {
          setEducations(prev => [...prev, { ...newEducation, id: response.data.id }]);
          setNewEducation({ school: '', studyfield: '', startmonth: '', startyear: '', endmonth: '', endyear: '', description: '' });
          fetchEducations(); 
          toggleAddEducationPopup(); 
          alert('Education added successfully!');
      }
  } catch (error) {
      console.error('Failed to add education:', error);
      alert('Failed to add education, please check your permissions and token validity.');
  }
};

  const [activeSlide, setActiveSlide] = useState(0);
  const [isEditingExperiences, setIsEditingExperiences] = useState(false);
  const [editExperienceFormData, setEditExperienceFormData] = useState({
      title: '',
      company: '',
      startmonth: '',
      startyear: '',
      endmonth: '',
      endyear: '',
      description: '',
  });
  const [currentExperienceId, setCurrentExperienceId] = useState(null);

  const saveExperiences = async () => {
    const token = localStorage.getItem('authToken');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const updatePromises = experiences.map(experience => {
        const { id, title, company, startmonth, startyear, endmonth, endyear, description, currentwork, location, locationtype, emptype } = experience;
        const updatedExperience = {
            title,
            company,
            startmonth,
            startyear,
            endmonth,
            endyear,
            description,
            currentwork,  // assuming you may want to update this in the future
            location,     // same as above
            locationtype, // same as above
            emptype       // same as above
        };

        return axios.put(`http://localhost:8080/api/experience/${id}`, updatedExperience, { headers });
    });

    try {
        await Promise.all(updatePromises);
        alert('All experiences updated successfully!');
        setIsEditingExperiences(false); // Exit edit mode
        fetchUserData(); 
    } catch (error) {
        console.error('Failed to save experiences:', error);
        alert('Failed to update some experiences, please check the data and try again.');
    }
};

const toggleAddSkillPopup = () => {
  setShowAddSkillPopup(!showAddSkillPopup);
};


  const toggleEditExperiencePopup = () => {
      setEditExperiencePopupOpen(!editExperiencePopupOpen);
  };

  const toggleEditExperiencesMode = () => {
    setIsEditingExperiences(!isEditingExperiences);
};

  const [editEducationPopupOpen, setEditEducationPopupOpen] = useState(false);
  const [isEditingEducations, setIsEditingEducations] = useState(false);
  const [editEducationFormData, setEditEducationFormData] = useState({
    school: '',
    studyfield: '',
    startmonth: '',
    startyear: '',
    endmonth: '',
    endyear: '',
    description: '',
  });
  

  const [currentEducationId, setCurrentEducationId] = useState(null);
  const selectForEditing = (id) => {
    const education = educations.find(edu => edu.id === id);
    if (education) {
      setEditEducationFormData(education);
      setCurrentEducationId(education.id);  
      toggleEditEducationPopup(); 
    }
  };
  

  const [profileImage, setProfileImage] = useState('');
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    headline: '',
    about: '',
    profileImage: null,
  });


  const currentUserId = localStorage.getItem('userId');

  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]); 
  const [editSkillPopupOpen, setEditSkillPopupOpen] = useState(false);
  const [editSkillFormData, setEditSkillFormData] = useState({
      skill: ''
  });
  const [currentSkillId, setCurrentSkillId] = useState(null);

  const [posts, setPosts] = useState([]); 
  useEffect(() => {
    if (userId) {
      fetchEducations(); 
      fetchUserData();
      fetchSkills();
      fetchExperiences();
      fetchPosts();
      fetchEducations(); 
    }
}, [userId]); 

  const fetchPosts = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/posts/${userId}`);
        setPosts(response.data);  
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
};

const fetchUserData = async () => {
  const token = localStorage.getItem('authToken');
  const currentUserId = localStorage.getItem('userId'); // ID of the logged-in user
  if (!token) {
      setError('No token found');
      setLoading(false);
      return;
  }

  try {
      // Fetching the visited profile's data
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      setUserData(response.data);

      // Fetching visited profile's photo
      const imageResponse = await axios.get(`http://localhost:8080/api/users/profilepicbase64/${userId}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      setProfileImage(`data:${imageResponse.data.type};base64,${imageResponse.data.base64}`);

      // Fetching logged-in user's photo for the header
      const loggedInUserImageResponse = await axios.get(`http://localhost:8080/api/users/profilepicbase64/${currentUserId}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      setLoggedInUserProfileImage(`data:${loggedInUserImageResponse.data.type};base64,${loggedInUserImageResponse.data.base64}`);
  } catch (err) {
      setError('Failed to fetch data');
  } finally {
      setLoading(false);
  }
};



  const toggleEditEducationPopup = () => {
    setEditEducationPopupOpen(!editEducationPopupOpen);
  };

  const toggleEditEducationsMode = () => {
    setIsEditingEducations(!isEditingEducations);
};

const toggleEditSkillsMode = () => {
  setIsEditingSkills(!isEditingSkills);
};

const toggleAddExperiencePopup = () => {
  setShowAddExperiencePopup(!showAddExperiencePopup); // Toggle visibility of the popup
};


  const selectSkillForEditing = (id) => {
    const skill = skills.find(sk => sk.id === id);
    if (skill) {
        setEditSkillFormData(skill);
        setCurrentSkillId(skill.id);
        toggleEditSkillPopup();
    }
  };

  const toggleEditSkillPopup = () => {
      setEditSkillPopupOpen(!editSkillPopupOpen);
  };

  const handleExperienceChange = (event, id, field) => {
    const newExperiences = experiences.map(experience => {
        if (experience.id === id) {
            return { ...experience, [field]: event.target.value };
        }
        return experience;
    });
    setExperiences(newExperiences);
  };

  const handleNewExperienceChange = (event) => {
    const { name, value } = event.target;
    setNewExperience(prev => ({ ...prev, [name]: value }));
};

const handleNewSkillChange = (event) => {
  setNewSkill(event.target.value);
};

  const handleSkillChange = (event) => {
    const { name, value } = event.target;
    setEditSkillFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.put(`http://localhost:8080/api/skill/${currentSkillId}`, editSkillFormData, { headers });
        fetchSkills();
        toggleEditSkillPopup(); 
    } catch (error) {
        console.error('Failed to update skill data', error);
    }
  };


  const handleExperienceSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.put(`http://localhost:8080/api/experience/${currentExperienceId}`, editExperienceFormData, { headers });
        await fetchExperiences(); 
        toggleEditExperiencePopup();  
    } catch (error) {
        console.error('Failed to update experience data', error);
    }
  };


  const fetchSkills = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`http://localhost:8080/api/skill/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSkills(response.data); 
    } catch (err) {
      console.error('Failed to fetch skills', err);
    }
  };  
  
  const fetchExperiences = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`http://localhost:8080/api/experience/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setExperiences(response.data); 
    } catch (err) {
      console.error('Failed to fetch experiences', err);
    }
  };

  const fetchEducations = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found for authentication.');
        return;
    }
    try {
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await axios.get(`http://localhost:8080/api/education/${userId}`, { headers });
        setEducations(response.data || []);
    } catch (error) {
        console.error('Failed to fetch educations:', error);
    }
};


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found.</div>;
  
  const toggleEditPopup = () => {
    setEditPopupOpen(!editPopupOpen); 
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  const handleInputChange = (event) => {
    const { name, files } = event.target;

    if (name === 'profileImage' && files.length > 0) {
        setEditFormData({ ...editFormData, profileImage: files[0] });
    } else {
        setEditFormData({ ...editFormData, [name]: event.target.value });
    }
};



  const handleEducationSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    if (currentEducationId) { 
      try {
        await axios.put(`http://localhost:8080/api/education/${currentEducationId}`, editEducationFormData, { headers });
        fetchUserData();  
        fetchEducations();
        toggleEditEducationPopup(); 
      } catch (error) {
        console.error('Failed to update education data', error);
      }
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    
    try {
        const commonHeaders = {
            'Authorization': `Bearer ${token}`
        };

        // Update headline
        if (editFormData.headline) {
            await axios.put(`http://localhost:8080/api/users/headline/${currentUserId}`, { headline: editFormData.headline }, { headers: { ...commonHeaders, 'Content-Type': 'application/json' } });
        }

        // Update about
        if (editFormData.about) {
            await axios.put(`http://localhost:8080/api/users/about/${currentUserId}`, { about: editFormData.about }, { headers: { ...commonHeaders, 'Content-Type': 'application/json' } });
        }

        // Update profile picture
        if (editFormData.profileImage) {
            const formData = new FormData();
            formData.append('image', editFormData.profileImage); // Ensure the file is appended as 'image', matching the server's expectation

            await axios.put(`http://localhost:8080/api/users/profilepic/${currentUserId}`, formData, { headers: { ...commonHeaders } }); // Content-Type not set manually
        }

        fetchUserData(); 
        toggleEditPopup();
    } catch (error) {
        console.error('Failed to update data', error.response || error);
    }
};


  const handleEducationChange = (event, id, field) => {
    const newEducations = educations.map(education => {
        if (education.id === id) {
            return { ...education, [field]: event.target.value };
        }
        return education;
    });
    setEducations(newEducations);
};

const addNewExperience = async (event) => {
  event.preventDefault();
  const token = localStorage.getItem('authToken');
  const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  };
  const userId = localStorage.getItem('userId'); // Assuming userId is necessary

  try {
      const response = await axios.post(`http://localhost:8080/api/experience/${userId}`, newExperience, { headers });
      if (response.status === 201) {
          setExperiences(prev => [...prev, { ...newExperience, id: response.data.id }]);
          setNewExperience({ title: '', company: '', startmonth: '', startyear: '', endmonth: '', endyear: '', description: '' }); // Reset form
          toggleAddExperiencePopup(); // Close the popup on success
      }
  } catch (error) {
      console.error('Failed to add experience:', error);
      alert('Failed to add experience, please try again.');
  }
};

const addNewSkill = async (event) => {
  event.preventDefault();
  const token = localStorage.getItem('authToken');
  const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  };

  try {
      const response = await axios.post(`http://localhost:8080/api/skill/${userId}`, { skill: newSkill }, { headers });
      if (response.status === 201) {
          setSkills(prev => [...prev, { ...response.data }]);  // Assuming the backend returns the full new skill object
          setNewSkill(''); // Reset the input field
          toggleAddSkillPopup(); 
          fetchSkills();

      }
  } catch (error) {
      console.error('Failed to add skill:', error);
      alert('Failed to add skill, please try again.');
  }
};


  const deleteExperience = async (experienceId) => {
    const token = localStorage.getItem('authToken');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.delete(`http://localhost:8080/api/experience/${experienceId}`, { headers });
        fetchExperiences();  
    } catch (error) {
        console.error('Failed to delete experience', error);
    }
};

const confirmAndDeleteEducation = (educationId) => {
  if (window.confirm("Are you sure you want to delete this education?")) {
      deleteEducation(educationId);
  }
};


const deleteEducation = async (educationId) => {
  const token = localStorage.getItem('authToken');
  const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  };

  try {
      await axios.delete(`http://localhost:8080/api/education/${educationId}`, { headers });
      fetchUserData(); 
  } catch (error) {
      console.error('Failed to delete education', error);
  }
};


  const confirmAndDeleteExperience = (experienceId) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
        deleteExperience(experienceId);
    }
  };
  
  const deleteSkill = async (skillId) => {
    const token = localStorage.getItem('authToken');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.delete(`http://localhost:8080/api/skill/${skillId}`, { headers });
        fetchSkills(); 
    } catch (error) {
        console.error('Failed to delete skill', error);
     }
  
  
};

  const isOwner = currentUserId === userId;

  const handleSlideChange = (direction) => {
    const container = document.getElementById('carouselContainer');
    const scrollAmount = direction === 'left' ? -300 : 300;  
    container.scrollLeft += scrollAmount;
  };

  const carouselStyles = {
    carouselContainer: {
        position: 'relative',
        overflow: 'hidden',
        width: '990px',
        minHeight: '200px',
        marginLeft: 160,
        marginTop: -180,
    },
    cardsContainer: {
        display: 'flex',
        overflowX: 'auto',
        scrollBehavior: 'smooth',
        padding: '20px 0'
    },
    card: {
      margin: '0 15px',
      width: '300px', 
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#fff', 
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
     },
    navigationButton: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 10
    },
    prevButton: {
        left: '10px'
    },
    nextButton: {
        right: '10px'
    },
        
    carouselHeader: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '40px 0',
    },
};

  const formStyles = {
    contactContainer: {
      backgroundColor: 'white',
      borderRadius: '20px',
      maxWidth: '280px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 'fit-content',
      marginBottom: '20px',
      width: '25%', 
      flexShrink: 0, 
      marginLeft: '20px', 
      marginRight: '13px',
    },
    formInput: {
      margin: '10px 3',
      maxWidth: '250px',
      marginBottom: '7px',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd', 
      fontSize: '16px',
    },
    submitButton: {
      backgroundColor: '#4B3F6B', 
      color: 'white',
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '20px',
      border: 'none',
      cursor: 'pointer',
      margin: '20px 0 0 0',
    },
  };
  
  const styles = {
    
    mainContainer: {
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center', 
      minHeight: '90vh',
      padding: '20px',
      width: '100%', 
    },
    profileContainer: {
      display: 'flex',
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'flex-start', 
      width: '100%', 
      maxWidth: '924px', 
      height:'300px',
      margin: '0 auto', 
      backgroundColor: '#1C1A4A',
      borderRadius: 10,
      color: 'white',
      padding: '20px',
      boxSizing: 'border-box',
      marginBottom: '40px',
      marginLeft: 150,
    },
  
    profileInfo: {
      marginLeft: '20px',
      flex: 1, 
    },
    profileImage: {
      width: '150px',
      height: '150px',
      borderRadius: '50%'
    },
    icon: {
      marginRight: '10px'
    },
    experienceContainer: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      width: '58%',
      maxWidth: '1150px',
      marginTop:'20px',
      marginBottom: '20px',
      marginLeft: 'calc(50% - 50vw + 315px)', 
      marginRight: 'calc(50% - 50vw)',
      position: 'relative',
      top: -140, 
      left: '20%',
      right: '50%',
      transform: 'translateX(-50%)',
    },
    experienceHeader: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    carouselContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: '20px',
    },
    header: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '20px 0',
    },
    skillsContainer: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: '20px', 
      backgroundColor: '#f5f5f5', 
    },
    skillsHeader: {
      fontWeight: 'bold',
      fontSize: '18px',
      marginBottom: '10px'
    },
    skillChip: {
      margin: '5px',
      padding: '5px 10px',
      borderRadius: '25px',
      backgroundColor: '#e0e0e0', 
      display: 'inline-block',
      cursor: 'pointer', 
      border: '1px solid #ccc' 
    },
    editButton: {
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '1px'
    },
    addButton: {
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '1px'
    },
    deleteButton: {
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginLeft: '10px',
      padding: '5px 10px'
    },
    popupOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000, // Ensure it's above other content
  },
  popup: {
      backgroundColor: '#FFF',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      width: '90%',
      maxWidth: '500px', // Max width for the popup
      zIndex: 1001,
  },
  inputStyle: { // New style for inputs
      marginBottom: '15px', // Space between inputs
      width: '100%', // Full width of the form
      padding: '8px', // Padding inside the inputs for better text visibility
      border: '1px solid #ccc', // Subtle border for inputs
      borderRadius: '4px' // Matched border radius with buttons
  },
  submitButton: {
      marginTop: '10px',
      marginRight: '30px',
      marginLeft: '10px',
      padding: '8px 16px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
  },
  cancelButton: {
      padding: '8px 16px',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
  }
  
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
    <Header currentPic={loggedInUserProfileImage} currentUserId={currentUserId}/>
      {userData ? (
        <>
        {showAddEducationPopup && (
            <div style={styles.popupOverlay}>
                <div style={styles.popup}>
                    <h2>Add New Education</h2>
                    <form onSubmit={addNewEducation}>
                        <input type="text" name="school" value={newEducation.school} onChange={handleNewEducationChange} placeholder="School" style={styles.inputStyle} />
                        <input type="text" name="studyfield" value={newEducation.studyfield} onChange={handleNewEducationChange} placeholder="Field of Study" style={styles.inputStyle} />
                        <input type="text" name="startmonth" value={newEducation.startmonth} onChange={handleNewEducationChange} placeholder="Start Month" style={styles.inputStyle} />
                        <input type="number" name="startyear" value={newEducation.startyear} onChange={handleNewEducationChange} placeholder="Start Year" style={styles.inputStyle} />
                        <input type="text" name="endmonth" value={newEducation.endmonth} onChange={handleNewEducationChange} placeholder="End Month" style={styles.inputStyle} />
                        <input type="number" name="endyear" value={newEducation.endyear} onChange={handleNewEducationChange} placeholder="End Year" style={styles.inputStyle} />
                        <textarea name="description" value={newEducation.description} onChange={handleNewEducationChange} placeholder="Description" style={{...styles.inputStyle, height: '100px'}} />
                        <div>
                            <button type="submit" style={styles.submitButton} >Submit</button>
                            <button onClick={toggleAddEducationPopup} style={styles.cancelButton}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        {showAddExperiencePopup && (
          <div style={styles.popupOverlay}>
              <div style={styles.popup}>
                  <h2>Add New Experience</h2>
                  <form onSubmit={addNewExperience}>
                      <input type="text" name="title" value={newExperience.title} onChange={handleNewExperienceChange} placeholder="Job Title"  style={styles.inputStyle} />
                      <input type="text" name="company" value={newExperience.company} onChange={handleNewExperienceChange} placeholder="Company" style={styles.inputStyle} />
                      <input type="text" name="startmonth" value={newExperience.startmonth} onChange={handleNewExperienceChange} placeholder="Start Month" style={styles.inputStyle} />
                      <input type="number" name="startyear" value={newExperience.startyear} onChange={handleNewExperienceChange} placeholder="Start Year" style={styles.inputStyle}  />
                      <input type="text" name="endmonth" value={newExperience.endmonth} onChange={handleNewExperienceChange} placeholder="End Month (or Present)" style={styles.inputStyle} />
                      <input type="number" name="endyear" value={newExperience.endyear} onChange={handleNewExperienceChange} placeholder="End Year (if applicable)" style={styles.inputStyle}  />
                      <textarea name="description" value={newExperience.description} onChange={handleNewExperienceChange} placeholder="Description" style={{...styles.inputStyle, height: '100px'}}/>
                      <button type="submit" style={styles.submitButton}>Add Experience</button>
                      <button onClick={toggleAddExperiencePopup} style={styles.cancelButton}>Cancel</button>
                  </form>
              </div>
          </div>
      )}
      {showAddSkillPopup && (
        <div style={styles.popupOverlay}>
            <div style={styles.popup}>
                <h2>Add New Skill</h2>
                <form onSubmit={addNewSkill}>
                    <input type="text" value={newSkill} onChange={handleNewSkillChange} placeholder="New Skill" style={styles.inputStyle}/>
                    <button type="submit" style={styles.submitButton}>Add Skill</button>
                    <button onClick={toggleAddSkillPopup} style={styles.cancelButton}>Cancel</button>
                </form>
            </div>
        </div>
       )}
        {editEducationPopupOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
              <h2>Edit Education</h2>
              <form onSubmit={handleEducationSubmit}>
                <input type="text" name="school" value={editEducationFormData.school || ''} onChange={handleEducationChange} placeholder="School" />
                <input type="text" name="studyfield" value={editEducationFormData.studyfield || ''} onChange={handleEducationChange} placeholder="Field of Study" />
                <input type="text" name="startmonth" value={editEducationFormData.startmonth || ''} onChange={handleEducationChange} placeholder="Start Month" />
                <input type="number" name="startyear" value={editEducationFormData.startyear || ''} onChange={handleEducationChange} placeholder="Start Year" />
                <input type="text" name="endmonth" value={editEducationFormData.endmonth || ''} onChange={handleEducationChange} placeholder="End Month" />
                <input type="number" name="endyear" value={editEducationFormData.endyear || ''} onChange={handleEducationChange} placeholder="End Year" />
                <textarea name="description" value={editEducationFormData.description || ''} onChange={handleEducationChange} placeholder="Description"></textarea>
                <button type="submit">Save Changes</button>
              </form>
              <button onClick={toggleEditEducationPopup}>Close</button>
            </div>
          </div>
        )}
        {editExperiencePopupOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h2>Edit Experience</h2>
                  <form onSubmit={handleExperienceSubmit}>
                      <input type="text" name="title" value={editExperienceFormData.title || ''} onChange={handleExperienceChange} placeholder="Title" />
                      <input type="text" name="company" value={editExperienceFormData.company || ''} onChange={handleExperienceChange} placeholder="Company" />
                      <input type="text" name="startmonth" value={editExperienceFormData.startmonth || ''} onChange={handleExperienceChange} placeholder="Start Month" />
                      <input type="number" name="startyear" value={editExperienceFormData.startyear || ''} onChange={handleExperienceChange} placeholder="Start Year" />
                      <input type="text" name="endmonth" value={editExperienceFormData.endmonth || ''} onChange={handleExperienceChange} placeholder="End Month" />
                      <input type="number" name="endyear" value={editExperienceFormData.endyear || ''} onChange={handleExperienceChange} placeholder="End Year" />
                      <textarea name="description" value={editExperienceFormData.description || ''} onChange={handleExperienceChange} placeholder="Description"></textarea>
                      <button type="submit">Save Changes</button>
                  </form>
                  <button onClick={toggleEditExperiencePopup}>Close</button>
              </div>
          </div>
        )}
        {editSkillPopupOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h2>Edit Skill</h2>
                  <form onSubmit={handleSkillSubmit}>
                      <input type="text" name="skill" value={editSkillFormData.skill || ''} onChange={handleSkillChange} placeholder="Skill Name" />
                      <button type="submit">Save Changes</button>
                  </form>
                  <button onClick={toggleEditSkillPopup}>Close</button>
              </div>
          </div>
        )}
          {editPopupOpen && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                  <input type="text" name="headline" value={editFormData.headline} onChange={handleInputChange} placeholder="Headline" style={styles.inputStyle} />
                  <input type="file" name="profileImage" onChange={handleInputChange}  />
                  <input type="text" name="about" value={editFormData.about} onChange={handleInputChange} placeholder="About" style={styles.inputStyle} />
                  <button type="submit" style={{...styles.submitButton, marginBottom: '10px', width:'100%'}}>Save Changes</button>
                </form>
                <button onClick={toggleEditPopup} style={{...styles.cancelButton, marginBottom: '10px', width:'100%'}}>Close</button>
              </div>
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <div style={styles.profileContainer}>
              {isOwner && (
                <button onClick={toggleEditPopup} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <img src={require('./images/Buttonedit.svg').default} alt="Edit Profile" style={{ width: '32px', height: '32px' }} />
                </button>
              )}
              <img
                style={styles.profileImage}
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
              />
              <div style={styles.profileInfo}>
                <h1>{userData.firstName} {userData.lastName}</h1>
                <p>{userData.headline}</p>
                <p><FontAwesomeIcon icon={faEnvelope} style={styles.icon} />{userData.email}</p>
                <p>{userData.bio}</p>
                <p>{userData.about}</p>
              </div>
            </div>
    
            <div style={formStyles.contactContainer}>
              <h2 style={{display: 'flex', justifyContent: 'center'}} >Quick Contact</h2>
              <p style={{display: 'flex', justifyContent: 'center'}}>Feel free to contact me  </p>
              <input type="text" placeholder="Name" style={formStyles.formInput} />
              <input type="email" placeholder="E-mail" style={formStyles.formInput} />
              <input type="text" placeholder="Topic" style={formStyles.formInput} />
              <input type="tel" placeholder="Phone" style={formStyles.formInput} />
              <button style={formStyles.submitButton}>Send Message</button>
            </div>
          </div>
          <div>
            {error && <p>{error}</p>}
            <div style={styles.experienceContainer}>
              <div style={styles.experienceHeader}>Educations</div>
              {isOwner && (
              <button onClick={toggleAddEducationPopup} style={styles.addButton}><img src={add} /></button> )}
              {isOwner && (
              <button onClick={toggleEditEducationsMode} style={styles.editButton}>
                  {isEditingEducations ? <img src={save} />: <img src={pen} />}
              </button>  )}
              {educations.map((education) => (
                <div key={education.id}>
                    <p style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}>
                        {isEditingEducations ? 
                            <input type="text" value={education.school} onChange={(e) => handleEducationChange(e, education.id, 'school')} /> :
                            `${education.school} - ${education.studyfield}`
                        }
                    </p>
                    <p style={{ color: 'gray', fontSize: '12px', marginLeft:'10px' }}>
                        {isEditingEducations ? (
                            <>
                                <input type="text" value={education.startmonth} onChange={(e) => handleEducationChange(e, education.id, 'startmonth')} />
                                <input type="text" value={education.startyear} onChange={(e) => handleEducationChange(e, education.id, 'startyear')} />
                                to
                                <input type="text" value={education.endmonth || 'Present'} onChange={(e) => handleEducationChange(e, education.id, 'endmonth')} />
                            </>
                        ) : (
                            `${education.startmonth} ${education.startyear} to ${education.endmonth || 'Present'}`
                        )}
                    </p>
                    <p style={{ color: 'black', fontSize: '12px', marginLeft:'10px' }}>
                        {isEditingEducations ? 
                            <textarea value={education.description} onChange={(e) => handleEducationChange(e, education.id, 'description')} /> :
                            education.description
                        }
                    </p>
                    {isOwner && (
                    <button onClick={() => confirmAndDeleteEducation(education.id)} style={styles.deleteButton}>
                        <img src={trash} alt="Delete" />
                    </button> )}
                </div>
            ))}
            </div>
            <div style={styles.experienceContainer}>
          <div style={styles.experienceHeader}>
              Experiences
              {isOwner && (

              <button onClick={toggleAddExperiencePopup} style={styles.addButton}><img src={add} /></button> )}
              {isOwner && (
              <button onClick={toggleEditExperiencesMode} style={styles.editButton}>
                  {isEditingExperiences ? <img src={save} />: <img src={pen} alt="Edit" />}
              </button> )}
          </div>
          {experiences.map((experience) => (
              <div key={experience.id}>
                  <h3>
                      {isEditingExperiences ? 
                          <input type="text" value={experience.title} onChange={(e) => handleExperienceChange(e, experience.id, 'title')} /> :
                          `${experience.title} at ${experience.company}`
                      }
                  </h3>
                  <p>
                      {isEditingExperiences ? (
                          <>
                              <input type="text" value={experience.startmonth} onChange={(e) => handleExperienceChange(e, experience.id, 'startmonth')} />
                              <input type="text" value={experience.startyear} onChange={(e) => handleExperienceChange(e, experience.id, 'startyear')} />
                              to
                              <input type="text" value={experience.endmonth || 'Present'} onChange={(e) => handleExperienceChange(e, experience.id, 'endmonth')} />
                          </>
                      ) : (
                          `${experience.startmonth} ${experience.startyear} to ${experience.endmonth || 'Present'}`
                      )}
                  </p>
                  <p>
                      {isEditingExperiences ? 
                          <textarea value={experience.description} onChange={(e) => handleExperienceChange(e, experience.id, 'description')} /> :
                          experience.description
                      }
                  </p>
                  {isOwner && (
                  <button onClick={() => confirmAndDeleteExperience(experience.id)} style={styles.deleteButton}>
                    <img src={trash} />
                  </button> )}
              </div>
          ))}
      </div>

      <div style={styles.experienceContainer}>
            <div style={styles.experienceHeader}>
                Skills               {isOwner && (

                <button onClick={toggleAddSkillPopup} style={styles.addButton}><img src={add} /></button> )}
              {isOwner && (
                <button onClick={toggleEditSkillsMode} style={styles.editButton}>
                    {isEditingSkills ? <img src={save} /> : <img src={pen} />}
                </button> )}
            </div>
            {skills.map((skill) => (
                <div key={skill.id} style={styles.skillChip}>
                    {isEditingSkills ? (
                        <input type="text" value={skill.skill} onChange={(e) => handleSkillChange(e, skill.id)} />
                    ) : (
                        skill.skill
                    )}
                  {isOwner && (
                    <button onClick={() => deleteSkill(skill.id)} style={styles.deleteButton}>
                      <img src={trash} />
                    </button> )}
                </div>
            ))}
        </div>
        <div style={{  display: 'flex', justifyContent: 'center', padding: '20px', top:'-100px' }}>
            <PDFDownloadLink
              document={
                <ProfilePDFDocument
                  userData={userData}
                  profileImage={profileImage}
                  educations={educations}
                  experiences={experiences}
                  skills={skills}
                />
              }
              fileName={`${userData.firstName}_${userData.lastName}_Profile.pdf`}
              className="pdf-download-button"
            >
              {({ loading }) => (
                loading ? 'Preparing Document...' : <span><img src={pdfIcon} alt="Download PDF" />Download My Profile PDF</span>
              )}
            </PDFDownloadLink>
          </div>
          </div>
        </>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
  
  
  
}

export default Profil;