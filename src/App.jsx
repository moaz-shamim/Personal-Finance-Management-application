import { useEffect, useState } from "react";
import { login, logout } from "./slices/authentication/authSlice";
import { useDispatch } from "react-redux";
import authService from "./appwrite/authentication";
import { Outlet } from "react-router-dom";
import Head from "./components/Head";
import Layout from "./pages/Layout";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Initially we check user exist or not and according to this we update our store(slice)
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log(userData);
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        {/* <Layout/> */}
        <Head/>
        <Outlet/>
      </div>
    </div>
  ) : null;
}
