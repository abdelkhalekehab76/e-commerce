import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";

export default function useCheckLogin() {
  const { userToken } = useContext(UserContext);
  const navigate = useNavigate();

  const checkLogin = () => {
    if (!userToken) {
      toast.error("Please login first");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      return false;
    }

    return true;
  };

  return checkLogin;
}