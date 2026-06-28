import styles from "./login.module.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../hooks/redux";
import { loginSuccess, logout } from "../feature/auth/authSlice";
import api from "../services/api";
import { store } from "../app/store";

const Login = () => {
  const dispatch = useAppDispatch();

  const handleGoogleLogin = async (cred) => {
    try {
      const token = {
        token: cred.credential,
      };
      const response = await api.post('/google-login', token);
      if (response.status === 200) {
        dispatch(
          loginSuccess({
            employee: response.data.data.employee,
            accessToken: response.data.data.accessToken,
          }),
        );
      }
    } catch (error) {
      console.error("something went wrong", error);
    }
  };

  const getProfile = async() => {
    try {
      const response = await api.get("/me")
      console.log('response', response)
    } catch (error) {
      console.error('error')
    }
  }

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
    <>
      <div className={styles.loginContainer}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("error in google login")}
          />
        </GoogleOAuthProvider>
        
      <button style={{background:"blue", color:"white" , border:"2px solid black", padding:"8px"}} onClick={getProfile}>
        GetProfile
      </button>
      <button style={{background:"blue", color:"white" , border:"2px solid black", padding:"8px"}} onClick={handleLogout}>
        Logout
      </button>
 
      </div>

    </>
  );
};
export default Login;
