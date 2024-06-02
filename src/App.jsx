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
  const jwt = localStorage.getItem("AuthToken");
  const dispatch = useDispatch();
  console.log(auth);
  useEffect(() => {
    if (jwt && auth?.verified) {
      dispatch(getUserProfile(jwt));
      navigate("/");
    }
  }, [auth?.jwt]);
  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={auth?.user ? <Homepage /> : <Authentication />}
        />
        <Route exact path="/verifyotp" element={<OtpVerification />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
