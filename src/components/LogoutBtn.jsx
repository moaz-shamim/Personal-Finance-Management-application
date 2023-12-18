import { useDispatch } from "react-redux";
import authService from "../appwrite/authentication";
import { logout } from "../slices/authentication/authSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  return (
    <>
   

      <button
        onClick={logoutHandler}
        class="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-red-300"
      >
        <span class="text-sm font-medium ">Logout</span>
      </button>
    </>
  );
}
