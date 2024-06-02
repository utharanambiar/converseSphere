import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../Store/Auth/Action";

export default function OtpVerification({ reset, isLoading }) {
  const [code, setCode] = useState(""); // Refs to control each digit input element
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]; // Reset all inputs and clear state
  const resetCode = () => {
    inputRefs.forEach((ref) => {
      ref.current.value = "";
    });
    inputRefs[0].current.focus();
    setCode("");
  }; // Listen for external reset toggle
  useEffect(() => {
    resetCode();
  }, [reset]); //eslint-disable-line // Handle input
  function handleInput(e, index) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1]; // Update code state with single digit
    const newCode = [...code];
    newCode[index] = input.value;
    setCode(newCode.join("")); //}
    input.select();
    if (input.value === "") {
      // If the value is deleted, select previous input, if exists
      if (previousInput) {
        previousInput.current.focus();
      }
    } else if (nextInput) {
      // Select next input on entry, if exists
      nextInput.current.select();
    }
  } // Select the contents on focus
  function handleFocus(e) {
    e.target.select();
  } // Handle backspace key
  function handleKeyDown(e, index) {
    const input = e.target;
    const previousInput = inputRefs[index - 1]; // eslint-disable-next-line no-unused-vars
    const nextInput = inputRefs[index + 1];
    if ((e.keyCode === 8 || e.keyCode === 46) && input.value === "") {
      e.preventDefault();
      setCode(
        (prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1)
      );
      if (previousInput) {
        previousInput.current.focus();
      }
    }
  } // Capture pasted characters
  const handlePaste = (e) => {
    const pastedCode = e.clipboardData.getData("text");
    if (pastedCode.length === 6) {
      setCode(pastedCode);
      inputRefs.forEach((inputRef, index) => {
        inputRef.current.value = pastedCode.charAt(index);
      });
    }
  }; //Clear button deletes all inputs and selects the first input for entry
  const ClearButton = () => {
    return (
      <button type="submit" onClick={resetCode} className="text-2xl top-3">
        X
      </button>
    );
  };

  const handleSubmit = () => {
    const verifyOtpDetails = { email: auth?.user?.email, otp: code };
    dispatch(verifyOtp(verifyOtpDetails));
  };

  useEffect(() => {
    if (auth?.verified && auth?.jwt) {
      navigate("/");
    }
  }, [auth?.verified]);
  return (
    <div className="flex gap-2 relative h-[100vh] justify-center items-center">
           {" "}
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <input
          className="md:m-4 bg-[#dbdbdb] w-[50px] h-[50px] rounded-md font-semibold text-center"
          key={index}
          type="number"
          min={0}
          max={9}
          maxLength="1"
          onInput={(e) => (e.target.value = e.target.value.slice(0, 1))}
          onChange={(e) => handleInput(e, index)}
          ref={inputRefs[index]}
          autoFocus={index === 0}
          onFocus={handleFocus}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={isLoading}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {/* <div>      {code.length ? <ClearButton /> : <></>}    </div> */}
    </div>
  );
}
