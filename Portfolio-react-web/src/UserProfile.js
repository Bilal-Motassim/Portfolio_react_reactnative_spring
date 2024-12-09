import React from 'react';

function UserProfile({ userData, currentUserId }) {
  return (
    <div className="user-profile">
      <div className="latest-post">
        <h2>Latest Posts</h2>
        {userData && userData.posts ? (
          userData.posts
            .filter(post => post.userId === currentUserId) // Filter posts by currentUserId
            .slice(0, 3) // Take only the first three posts after filtering
            .map((post, index) => (
              <p key={index}>{post.title}</p>
            ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
