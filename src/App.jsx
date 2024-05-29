import { Route, Routes } from "react-router-dom";
import Homepage from "./Components/HomePage/Homepage";
import Authentication from "./Components/Authentication/Authentication";
import OtpVerification from "./Components/Authentication/OtpVerification";
import "./index.css";
import PageNotFound from "./Components/Error/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={false ? <Homepage /> : <Authentication />} />
        <Route exact path="/verifyotp" element={<OtpVerification />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
