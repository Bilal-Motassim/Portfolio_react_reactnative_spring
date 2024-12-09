// api.js
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

export const FetchUserData = async () => {
  const token = localStorage.getItem('authToken');
  const { userId } = useParams();
  const currentUserId = localStorage.getItem('userId');

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`http://localhost:8080/api/users/${currentUserId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const imageResponse = await axios.get(`http://localhost:8080/api/users/profilepicbase64/${currentUserId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      userData: response.data,
      profileImage: `data:${imageResponse.data.type};base64,${imageResponse.data.base64}`
    };
  } catch (err) {
    throw err;
  }
};
