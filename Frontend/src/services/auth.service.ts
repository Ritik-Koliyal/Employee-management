import api from "./api";
import { setAccessToken, logout, setEmployee, authFinished } from "../feature/auth/authSlice";
import { store } from "../app/store";


export const initializeAuth = async () => {
  try {
    const response = await api.post("/refresh-token");
    store.dispatch(
      setAccessToken(
        response.data.data.accessToken
      )
    );
    store.dispatch(
      setEmployee(response.data.data.employee)
    );
    return true;
  }
  catch {
    store.dispatch(logout());
    return false;
  }

  finally {

    store.dispatch(authFinished());


  }

};