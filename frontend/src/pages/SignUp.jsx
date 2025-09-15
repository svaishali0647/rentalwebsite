import React, { useContext, useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import { toast } from 'react-toastify';

function SignUp() {
    let [show,setShow] = useState(false)
    let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext)
    let [name,setName]= useState("")
    let [email,setEmail]= useState("")
    let [password,setPassword]= useState("")
    let {loading,setLoading}= useContext(authDataContext)
    let{userData,setUserData}=useContext(userDataContext)
    




    const handleSignUP = async (e) => {
      setLoading(true)
        try {
            e.preventDefault()
            let result = await axios.post(serverUrl + "/api/auth/signup",{
                name,
                email,
                password

            },{withCredentials:true} )
            setLoading(false)
            setUserData(result.data)
            // navigate("/")
            // toast.success("Signup Successfully")
            // console.log(result)


     toast.success(result.data.message || "Signup successful! Please check your email for OTP");
    navigate("/verify");  


        } catch (error) {
          setLoading(false)
            console.log(error)
            // toast.error("Somethings went wrong")
            //  toast.error(error.response.data.message)

              if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong, please try again!");
    }
  }
            
        }
        
    
  return (
         <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>
        <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center' onClick={()=>navigate("/")}>
          <FaArrowLeftLong className='w-[25px] h-[25px] text-[white]' /></div>
        <form action="" className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]' onSubmit={handleSignUP}>
            <h1 className='text-[30px] text-[black]'>Welcome to Airbnb</h1>
            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px] '>
          <label htmlFor="name" className='text-[20px]'>UserName</label>
          <input type="text" id='name' className='w-[90%] h-[40px] border-[2px] border-[#555656]  rounded-lg text-[18px] px-[20px] ' required onChange={(e)=>setName(e.target.value)} value={name}/>
          </div> 



          <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
          <label htmlFor="email" className='text-[20px]'>Email</label>
          <input type="text" id='email' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
          </div> 



          <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] relative  '>
           <label htmlFor="password" className='text-[20px]'>Password</label>
          <input type={show?"text":"password"} id='password' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] ' required onChange={(e)=>setPassword(e.target.value)} value={password} />
          {!show && <IoMdEye className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick={()=>setShow(prev =>!prev)}/>}
          {show && <IoMdEyeOff className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick={()=>setShow(prev =>!prev)}/>}
          </div>
          <button className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg mt-[20px]' disabled={loading}>{loading?"Loading...":"SignUp"}</button>
          <p className='text-[18px]'>Already have a account? <span className='text-[19px] text-[red] cursor-pointer' onClick={()=>navigate("/login")}>Login</span>
          </p>
        </form>
     
    </div>
  )
}

export default SignUp







// import React, { useContext, useState } from "react";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import axios from "axios";
// import { authDataContext } from "../Context/AuthContext";
// import { userDataContext } from "../Context/UserContext";
// import { toast } from "react-toastify";

// function SignUp() {
//   let [show, setShow] = useState(false);
//   let navigate = useNavigate();
//   let { serverUrl, loading, setLoading } = useContext(authDataContext);
//   let { setUserData } = useContext(userDataContext);
//   let [name, setName] = useState("");
//   let [email, setEmail] = useState("");
//   let [password, setPassword] = useState("");

//   const handleSignUP = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       let result = await axios.post(
//         serverUrl + "/api/auth/signup",
//         { name, email, password },
//         { withCredentials: true }
//       );
//       setLoading(false);
//       setUserData(result.data);
//       navigate("/");
//       toast.success("Signup Successfully");
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div
//       className="container-fluid min-vh-100 d-flex align-items-center justify-content-center position-relative"
//       style={{
//         background: "linear-gradient(135deg, #d9a7c7, #fffcdc)",
//         backgroundSize: "cover"
//       }}
//     >
//       {/* Back Button */}
//       <div
//         className="position-absolute top-0 start-0 m-4 rounded-circle d-flex align-items-center justify-content-center shadow"
//         style={{
//           width: "50px",
//           height: "50px",
//           cursor: "pointer",
//           background: "linear-gradient(45deg, #a18cd1, #fbc2eb)"
//         }}
//         onClick={() => navigate("/")}
//       >
//         <FaArrowLeftLong className="text-white fs-4" />
//       </div>

//       {/* Card */}
//       <div
//         className="card shadow-lg border-0 rounded-4 p-4 w-100"
//         style={{
//           maxWidth: "420px",
//           background: "linear-gradient(135deg, #e0c3fc, #8ec5fc)"
//         }}
//       >
//         <h2 className="text-center mb-4 fw-bold text-dark">Welcome to Airbnb</h2>

//         <form onSubmit={handleSignUP}>
//           {/* Username */}
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label fw-semibold text-dark">Username</label>
//             <input
//               type="text"
//               id="name"
//               className="form-control form-control-lg rounded-3 shadow-sm"
//               placeholder="Enter your username"
//               required
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label fw-semibold text-dark">Email</label>
//             <input
//               type="email"
//               id="email"
//               className="form-control form-control-lg rounded-3 shadow-sm"
//               placeholder="Enter your email"
//               required
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-3 position-relative">
//             <label htmlFor="password" className="form-label fw-semibold text-dark">Password</label>
//             <div className="input-group">
//               <input
//                 type={show ? "text" : "password"}
//                 id="password"
//                 className="form-control form-control-lg rounded-start-3 shadow-sm"
//                 placeholder="Enter your password"
//                 required
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//               />
//               <span
//                 className="input-group-text bg-white rounded-end-3 shadow-sm"
//                 style={{ cursor: "pointer" }}
//               >
//                 {!show ? (
//                   <IoMdEye
//                     className="fs-4 text-secondary"
//                     onClick={() => setShow((prev) => !prev)}
//                     style={{ transition: "color 0.3s" }}
//                     onMouseOver={(e) => (e.currentTarget.style.color = "#a18cd1")}
//                     onMouseOut={(e) => (e.currentTarget.style.color = "#6c757d")}
//                   />
//                 ) : (
//                   <IoMdEyeOff
//                     className="fs-4 text-secondary"
//                     onClick={() => setShow((prev) => !prev)}
//                     style={{ transition: "color 0.3s" }}
//                     onMouseOver={(e) => (e.currentTarget.style.color = "#a18cd1")}
//                     onMouseOut={(e) => (e.currentTarget.style.color = "#6c757d")}
//                   />
//                 )}
//               </span>
//             </div>
//           </div>

//           {/* Button */}
//           <div className="d-grid mt-4">
//             <button
//               className="btn btn-lg rounded-3 fw-semibold shadow text-white"
//               type="submit"
//               disabled={loading}
//               style={{
//                 background: "linear-gradient(45deg, #8ec5fc, #e0c3fc)",
//                 border: "none"
//               }}
//             >
//               {loading ? "Loading..." : "Sign Up"}
//             </button>
//           </div>
//         </form>

//         {/* Login link */}
//         <p className="text-center mt-3 text-dark">
//           Already have an account?{" "}
//           <span
//             className="fw-bold"
//             style={{ cursor: "pointer", color: "#6a11cb" }}
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default SignUp;
