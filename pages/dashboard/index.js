import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import blogData from '/data/blogs.json'; 
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/dashboard.module.css';

const Dashboard = () => {
  const [blogs, setBlogs] = useState(blogData);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogBody, setNewBlogBody] = useState('');
  const router = useRouter();

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTitle(blogs[index].title);
    setEditedBody(blogs[index].body);
  };

  const handleUpdate = (index) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index].title = editedTitle;
    updatedBlogs[index].body = editedBody;
    setBlogs(updatedBlogs);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updatedBlogs = [...blogs];
      updatedBlogs.splice(index, 1);
      setBlogs(updatedBlogs);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  const handleNewBlogSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title: newBlogTitle,
      body: newBlogBody,
      publishDate: new Date().toISOString().split('T')[0],
      author: JSON.parse(localStorage.getItem('user')).firstName,
      image: '/images/default.jpg', 
    };
    setBlogs([...blogs, newBlog]);
    setNewBlogTitle('');
    setNewBlogBody('');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) {
        router.push('/login');
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Welcome to the Dashboard</h1>
        <div className={styles.headerButtons}>
          <Link href="/profile">
            <button className={styles.profileButton}>My Profile</button>
          </Link>
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className={styles.newBlogForm}>
        <h2 className={styles.newBlogTitle}>Post a New Blog</h2>
        <form onSubmit={handleNewBlogSubmit} className={styles.newBlogFormFields}>
          <input className={styles.textarea}
            type="text"
            placeholder="Blog Title"
            value={newBlogTitle}
            onChange={(e) => setNewBlogTitle(e.target.value)}
            required
          />
          <textarea className={styles.textarea}
            placeholder="Blog Body"
            value={newBlogBody}
            onChange={(e) => setNewBlogBody(e.target.value)}
            required
          />
          <button className={styles.postButton} type="submit">Post</button>
        </form>
      </div>

      <div className={styles.blogPosts}>
        <h2 className={styles.blogPostsTitle}>My Blog Posts</h2>
        {blogs.map((blog, index) => (
          <div className={styles.blogPost} key={index}>
            <p className={styles.publishDate}>Publish Date: {blog.publishDate}</p>
            <p className={styles.author}>Author: {blog.author}</p>
            <Image src={blog.image} alt={blog.title} width={1120} height={400} />
            {editIndex === index ? (
             <div className={styles.editForm}>
             <input
               type="text"
               value={editedTitle}
               onChange={(e) => setEditedTitle(e.target.value)}
               className={styles.editTitleInput}
             />
             <textarea
               value={editedBody}
               onChange={(e) => setEditedBody(e.target.value)}
               className={styles.editBodyTextarea}
             />
             <button
               className={styles.saveButton}
               onClick={() => handleUpdate(index)}
             >
               Save
             </button>
             <button
               className={styles.cancelButton}
               onClick={() => {
                 setEditIndex(null);
                 setEditedTitle('');
                 setEditedBody('');
               }}
             >
               Cancel
             </button>
           </div>
            ) : (
              <div className={styles.blogContent}>
                <h3 className={styles.blogTitle}>{blog.title}</h3>
                <p className={styles.blogBody}>{blog.body}</p>
                <div className={styles.buttonsContainer}>
                  <button className={styles.editButton} onClick={() => handleEdit(index)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
