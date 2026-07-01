import styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        The page you're looking for doesn't exist or is currently under
        development.
      </p>

      <button onClick={() => navigate("/")}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;