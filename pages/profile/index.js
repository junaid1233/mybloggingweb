import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/userprofile.module.css';

const Profile = () => {
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState('');   
  const [password, setPassword] = useState('');   
  const [profilePhoto, setProfilePhoto] = useState(''); 
  const router = useRouter();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
   
    router.push('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Profile Page</h1>
      <button className={`${styles.button} ${styles.logout}`} onClick={handleLogout}>Logout</button>
      <form className={styles.form} onSubmit={handleUpdateProfile}>
        <label className={styles.label}>
          Profile Photo:
          <input
            className={`${styles.input} ${styles.profilePhotoInput}`}
            type="text"
            value={profilePhoto}
            onChange={(e) => setProfilePhoto(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          First Name:
          <input
            className={styles.input}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Last Name:
          <input
            className={styles.input}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Password:
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className={styles.button} type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
