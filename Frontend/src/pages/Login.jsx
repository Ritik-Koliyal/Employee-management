import styles from "./login.module.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../hooks/redux.js";
import { loginSuccess } from "../feature/auth/authSlice.js";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import loginBanner from "../assets/bg.jpg";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [loginform, setLoginForm] = useState({
    empID: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    empID: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {
      empID: "",
      password: "",
    };

    let isValid = true;

    if (!loginform.empID.trim()) {
      newErrors.empID = "Employee ID is required";
      isValid = false;
    }

    if (!loginform.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleLogin = async (type, credential) => {
    if (type === "employee" && !validate()) return;

    try {
      setLoading(true);
      let url = "";
      let payload;

      if (type === "google") {
        url = "/google-login";
        payload = { token: credential?.credential };
      } else {
        url = "/login";
        payload = loginform;
      }

      const response = await api.post(url, payload);
      if (response.status === 200) {
        dispatch(
          loginSuccess({
            employee: response.data.data.employee,
            accessToken: response.data.data.accessToken,
          }),
        );

        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <div className={`container-fluid ${styles.loginContainer}`}>
      <div className="row h-100">
        <div className="col-lg-5 p-0">
          <div className={styles.imageContainer}>
            <img src={loginBanner} alt="" />
          </div>
        </div>
        <div className="col-lg-7 p-0">
          <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
              <div className={styles.logo}>⚡</div>

              <h2 className={styles.heading}>Welcome Back !</h2>

              <div className="mb-3">
                <label className={styles.label}>Employee ID</label>
                <input
                  className={`form-control ${styles.input}`}
                  value={loginform.empID}
                  name="empID"
                  onChange={handleChange}
                  placeholder="EMP001.."
                />
                {errors.empID && (
                  <div className="text-danger mt-1">{errors.empID}</div>
                )}
              </div>

              <div className="mb-3">
                <label className={styles.label}>Password</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${styles.input}`}
                    value={loginform.password}
                    name="password"
                    onChange={handleChange}
                    placeholder="Password.."
                  />
                  {loginform.password && (
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  )}
                </div>
                {errors.password && (
                  <div className="text-danger mt-1">{errors.password}</div>
                )}
              </div>

              <div className={styles.options}>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <label className="form-check-label">Remember me</label>
                </div>

                <a href="#">Forgot Password?</a>
              </div>

              <button
                className={styles.loginBtn}
                onClick={() => handleLogin("employee")}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div className={styles.divider}>
                <span>or Sign in with Google</span>
              </div>

              <div className="my-4">
                <GoogleOAuthProvider clientId={googleClientID}>
                  <GoogleLogin
                    onSuccess={(credentialResponse) =>
                      handleLogin("google", credentialResponse)
                    }
                    onError={() => console.log("Google Login Error")}
                  />
                </GoogleOAuthProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
