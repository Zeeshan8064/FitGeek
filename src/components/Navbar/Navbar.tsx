"use client"
import React from 'react'
import logo from '@/assets/logo.png'
import {IoIosBody} from 'react-icons/io'
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'
import AuthPopup from '../AuthPopup/AuthPopup'

const Navbar = () => {
  const [isloggedIn, setIsLoggedIn] = React.useState<boolean>(false)

  // Simulate login status
  const [showpopup, setShowPopup] = React.useState<boolean>(false)

  const checklogin = async () => {
    fetch('https://fitnessgeekbackend-production.up.railway.app/auth/checklogin', {
      method: 'POST',
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
       console.log(data)
       if (data.ok){
         setIsLoggedIn(true)
       }else {
         setIsLoggedIn(false)
       }
     })

  }

  const handleLogout = async () => {
    try {
      const response = await fetch("https://fitnessgeekbackend-production.up.railway.app/auth/logout", {
        method: "POST",
        credentials: "include", // Ensures cookies are sent with the request
      });
      const data = await response.json();
      if (data.ok) {
        setIsLoggedIn(false); // Update state to reflect logged-out status
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  React.useEffect(() => {
    checklogin()}, [showpopup])

  return (
    <nav>
      <Image src={logo} alt="Logo" />
      <Link href= '/'>Home</Link>
      <Link href= '/about'>About</Link>
      <Link href= '/profile'><IoIosBody/></Link>
      {
        isloggedIn? <button
        onClick={()=>{
          setIsLoggedIn(false)
          handleLogout()
        }}>Logout</button>
        :
        <button onClick={()=>{
          setShowPopup(true)
        }}>Login</button>
      }

      {
        showpopup && <AuthPopup onLogin={checklogin} setShowPopup={setShowPopup}/>
      }
    </nav>
  )
}

export default Navbar
