import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";

function VerifyOtp() {
  let [otp, setOtp] = useState("");
  let [email, setEmail] = useState(""); // user email
  let { serverUrl, loading, setLoading } = useContext(authDataContext);
  let { setUserData } = useContext(userDataContext);
  let navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/verify-otp",
        { email, otp },
        { withCredentials: true }
      );
      setLoading(false);
      setUserData(result.data.user);
      toast.success("Email Verified Successfully ✅");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center relative">
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" />
      </div>

      <form
        onSubmit={handleVerify}
        className="max-w-[900px] w-[90%] h-[400px] flex items-center justify-center flex-col gap-[20px] border rounded-lg shadow-md"
      >
        <h1 className="text-[30px] text-[black]">Verify Your Email</h1>

        <div className="w-[90%] flex flex-col gap-[10px]">
          <label htmlFor="email" className="text-[20px]">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-[100%] h-[40px] border-[2px] border-[#555656] rounded-lg px-[20px]"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="w-[90%] flex flex-col gap-[10px]">
          <label htmlFor="otp" className="text-[20px]">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            className="w-[100%] h-[40px] border-[2px] border-[#555656] rounded-lg px-[20px]"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
        </div>

        <button
          type="submit"
          className="px-[50px] py-[10px] bg-[red] text-[white] text-[18px] rounded-lg mt-[10px]"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}

export default VerifyOtp;
