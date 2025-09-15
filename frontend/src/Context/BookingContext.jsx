import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext'
import { listingDataContext } from './ListingContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
export const bookingDataContext= createContext()
function BookingContext({children}) {
    let [checkIn,setCheckIn]=useState("")
    let [checkOut,setCheckOut]=useState("")
    let [total,setTotal]=useState(0)
    let [night,setNight]=useState(0)
    let {serverUrl} = useContext(authDataContext)
    let {getCurrentUser} = useContext(userDataContext)
    let {getListing} = useContext(listingDataContext)
    let [bookingData,setBookingData]= useState([])
    let [booking,setbooking]= useState(false)
    let navigate = useNavigate()

    // const handleBooking = async (id) => {
    //      setbooking(true)
    //     try {
    //         let result = await axios.post( serverUrl + `/api/booking/create/${id}`,{
    //             checkIn,checkOut,totalRent:total
    //         },{withCredentials:true})
    //         await getCurrentUser()
    //         await getListing()
    //         setBookingData(result.data)
    //         console.log(result.data)
    //         setbooking(false)
    //         navigate("/booked")
    //         toast.success("Booking Successfully")

           

    //     } catch (error) {
    //         console.log(error)
    //         setBookingData(null)
    //         toast.error(error.response.data.message)


    //     }

        
    // }



    const handleBooking = async (id) => {
  setbooking(true);
  try {
    // 1. Backend se order banao
    let { data: order } = await axios.post(serverUrl + "/api/payment/create-order", {
      amount: total,
    }, { withCredentials: true });

    // 2. Razorpay options set karo
    var options = {
      key: "rzp_test_R65rS3t4vqO7i1", 

      amount: order.amount,
      currency: order.currency,
      name: "vaishali",
      description: "Booking Payment",
      order_id: order.id,
      handler: async function (response) {
        // 3. Payment successful => booking confirm
        let result = await axios.post(serverUrl + `/api/booking/create/${id}`, {
          checkIn, checkOut, totalRent: total,
          paymentId: response.razorpay_payment_id
        }, { withCredentials: true });

        await getCurrentUser();
        await getListing();
        setBookingData(result.data);
        setbooking(false);
        navigate("/booked");
        toast.success("Booking Successfully");
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    // 4. Razorpay checkout open karo
    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.log(error);
    setbooking(false);
    toast.error(error.response?.data?.message || "Payment failed");
  }
};


//ye uper chages hai
    const cancelBooking = async (id) => {
        try {
            let result = await axios.delete( serverUrl + `/api/booking/cancel/${id}`,{withCredentials:true})
        await getCurrentUser()
        await getListing()
        console.log(result.data)
        toast.success("CancelBooking Successfully")

            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        
    }

    let value={
        checkIn,setCheckIn,
        checkOut,setCheckOut,
        total,setTotal,
        night,setNight,
        bookingData,setBookingData,
        handleBooking,cancelBooking,booking,setbooking

    }
  return (
    <div>
      <bookingDataContext.Provider value={value}>
        {children}
      </bookingDataContext.Provider>
    </div>
  )
}

export default BookingContext
