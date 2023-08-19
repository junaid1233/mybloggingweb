import Link from "next/link";
import styles from ".././styles/homepage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to My Blogging Website</h1>
      <p className={styles.description}>Explore and share your thoughts!</p>
      <Link href="/signup">
        <button className={styles.button}>Sign Up</button>
      </Link>
    </div>
  );
};

export default HomePage;
