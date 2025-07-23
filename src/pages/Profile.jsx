import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://reqres.in/api/users', {
      headers: {
        'x-api-key': 'reqres-free-v1',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched users:', data.data);
        const firstUser = data.data && data.data[0];
        if (firstUser) {
          setUser(firstUser);
        } else {
          setError('No users found');
        }
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setError('Error loading profile');
      });
  }, []);

  if (error) return <p className="profile-error">{error}</p>;
  if (!user) return <p className="profile-loading">Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={user.avatar} alt="profile" className="profile-avatar" />
        <h2 className="profile-heading">{user.first_name} {user.last_name}</h2>
        <p className="profile-text">{user.email}</p>
      </div>
    </div>
  );
}
