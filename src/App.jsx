import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./Components/HomePage/Homepage";
import Authentication from "./Components/Authentication/Authentication";
import OtpVerification from "./Components/Authentication/OtpVerification";
import "./index.css";
import PageNotFound from "./Components/Error/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./Store/Auth/Action";
import { useEffect } from "react";

function App() {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const jwt = sessionStorage.getItem("AuthToken");
  const dispatch = useDispatch();

  let theme = localStorage.getItem("theme");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    if (auth?.jwt) {
      dispatch(getUserProfile(auth?.jwt));
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (jwt && auth?.verified && auth?.jwt) {
      dispatch(getUserProfile(auth?.jwt));
      navigate("/");
    }
  }, [auth?.jwt, jwt]);

  return (
    <div className="overflow-x-hidden dark:bg-[#26282B] dark:text-gray-400">
      <Routes>
        <Route
          path="/*"
          element={auth?.jwt && auth?.user ? <Homepage /> : <Authentication />}
        />
        <Route exact path="/verifyotp" element={<OtpVerification />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
