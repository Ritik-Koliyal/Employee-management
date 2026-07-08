import { useDispatch } from "react-redux";
import api from "../services/api.js";
import { logout } from "../feature/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      dispatch(logout());
      navigate("/login");
      console.log("Logged out");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      Home Dashboard
      <hr />
      <button
        style={{ background: "red", color: "white", padding: "6px" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
