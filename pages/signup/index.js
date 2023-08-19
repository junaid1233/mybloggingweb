import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/signup.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    if (
      formData.firstName.length < 3 ||
      formData.lastName.length < 1 ||
      formData.firstName.length > 20 ||
      formData.lastName.length > 20 ||
      !formData.email.includes('@') ||
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password)
    ) {
      alert('Please fill in valid information.');
      return;
    }

    localStorage.setItem('user', JSON.stringify(formData));
    alert('Signup successful! Please log in.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: ''
    });

  
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formcontainer}>
        <h1>Signup Page</h1>
        <form onSubmit={handleSubmit}>

          <div className={styles.inputgroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              minLength="3"
              maxLength="20"
              required
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputgroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              minLength="1"
              maxLength="20"
              required
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputgroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputgroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              minLength="8"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputgroup}>
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              type="password"
              name="repeatPassword"
              placeholder="Repeat Password"
              minLength="8"
              required
              value={formData.repeatPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.buttoncontainer}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
