import { useDispatch } from "react-redux";
import api from "../services/api";
import { logout } from "../feature/auth/authSlice";


const Home = () => {
  const dispatch = useDispatch()
  const handleLogout = async () => {
  try {
    await api.post("/logout");

   dispatch(logout());

    console.log("Logged out");
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div>
      Home Dashboard
      
      <button onClick={handleLogout}></button>


    </div>
  )

}

export default Home;