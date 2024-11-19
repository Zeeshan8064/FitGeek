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
  return (
    <nav>
      <Image src={logo} alt="Logo" />
      <Link href= '/'>Home</Link>
      <Link href= '/about'>About</Link>
      <Link href= '/profile'><IoIosBody/></Link>
      {
        isloggedIn? <button>Logout</button>
        :
        <button onClick={()=>{
          setShowPopup(true)
        }}>Login</button>
      }
      {
        showpopup && <AuthPopup/>
      }
    </nav>
  )
}

export default Navbar