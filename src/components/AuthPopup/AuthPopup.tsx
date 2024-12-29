"use client";
import React from 'react';
import './AuthPopup.css';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiOutlineClose } from 'react-icons/ai';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { toast } from 'react-toastify';

interface AuthPopupProps {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  onLogin: () => void;
}

interface SignupFormData {
  name: string | null;
  email: string | null;
  password: string | null;
  weightInKg: number | null;
  heightInCm: number | null;
  goal: string | null;
  gender: string | null;
  dob: Date | null;
  activityLevel: string | null;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ setShowPopup }) => {
  const [showSignup, setSignup] = React.useState<boolean>(false);
  const [signupformData, setSignupFormData] = React.useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    weightInKg: 0.0,
    heightInCm: 0.0,
    goal: '',
    gender: '',
    dob: new Date(),
    activityLevel: ''
  });

  const [loginformData, setLoginFormData] = React.useState({
    email: '',
    password: ''
  });

  const [forgotPassword, setForgotPassword] = React.useState<boolean>(false);
  const [ForgotPasswordForm, setForgotPasswordForm] = React.useState({
    email: '',
  });

  // Handle login
  const handleLogin = () => {
    console.log(loginformData);
    fetch('https://fitnessgeekbackend-production.up.railway.app/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginformData),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          toast.success(data.message);
          setShowPopup(false);
        } else {
          toast.error(data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Handle signup
  const handleSignup = () => {
    console.log(signupformData);

    fetch('https://fitnessgeekbackend-production.up.railway.app/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupformData),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.ok) {
          toast.success(data.message);
          setSignup(false);
        } else {
          toast.error(data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <div className='popup'>
      <button className='close' onClick={() => setShowPopup(false)}>
        <AiOutlineClose />
      </button>

      {showSignup ? (
        <div className='authform'>
          <div className='left'>
            <Image src={logo} alt="Logo" />
          </div>

          <div className='right'>
            <h1>Signup to become a Fit Geek!</h1>
            <form action="">
              {/* Signup Fields */}
              <Input color="warning" placeholder="name" size="lg" variant="solid"
                onChange={(e) => setSignupFormData({ ...signupformData, name: e.target.value })} />
              <Input color="warning" placeholder="email" size="lg" variant="solid"
                onChange={(e) => setSignupFormData({ ...signupformData, email: e.target.value })} />
              <Input color="warning" placeholder="password" type="password" size="lg" variant="solid"
                onChange={(e) => setSignupFormData({ ...signupformData, password: e.target.value })} />
              <Input color="warning" placeholder="Weight in kg" size="lg" type="number" variant="solid"
                onChange={(e) => setSignupFormData({ ...signupformData, weightInKg: parseFloat(e.target.value) })} />
              <Select color="warning" placeholder="Activity Level" size="lg" variant="solid"
                onChange={(event, newValue) => setSignupFormData({ ...signupformData, activityLevel: newValue?.toString() || '' })}>
                <Option value="Sedentary">Sedentary</Option>
                <Option value="Lightly Active">Lightly Active</Option>
                <Option value="Moderately Active">Moderately Active</Option>
                <Option value="Very Active">Very Active</Option>
                <Option value="Extra Active">Extra Active</Option>
              </Select>

              <Select color="warning" placeholder="Goal" size="lg" variant="solid"
                onChange={(event, newValue) => setSignupFormData({ ...signupformData, goal: newValue?.toString() || '' })}>
                <Option value="weightLoss">WeightLoss</Option>
                <Option value="weightMaintain">Maintain Weight</Option>
                <Option value="weightGain">WeightGain</Option>
              </Select>

              <Select color="warning" size="lg" placeholder="Gender" variant="solid"
                onChange={(event, newValue) => setSignupFormData({ ...signupformData, gender: newValue?.toString() || '' })}>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>

              <label htmlFor="">Height</label>
              <Input color="warning" placeholder="Height in cm" size="lg" type="number" variant="solid"
                onChange={(e) => setSignupFormData({ ...signupformData, heightInCm: parseFloat(e.target.value) })} />

              <label htmlFor="">Date of Birth</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker defaultValue={dayjs(new Date())}
                  sx={{ backgroundColor: 'wheat' }}
                  onChange={(newValue) => setSignupFormData({ ...signupformData, dob: new Date(newValue as any) })} />
              </LocalizationProvider>

              <button onClick={(e) => { e.preventDefault(); handleSignup(); }}>Signup</button>
            </form>
            <p>Already have an account? <button onClick={() => setSignup(false)}>Login</button></p>
          </div>
        </div>
      ) : (
        <div className='authform'>
          <div className='left'>
            <Image src={logo} alt="Logo" />
          </div>

          <div className='right'>
            <h1>Login to become a Fit Geek!</h1>
            <form action="">
              <Input color="warning" type="email" placeholder="email" size="lg" variant="solid"
                onChange={(e) => setLoginFormData({ ...loginformData, email: e.target.value })} />
              <Input color="warning" placeholder="password" type="password" size="lg" variant="solid"
                onChange={(e) => setLoginFormData({ ...loginformData, password: e.target.value })} />
              <button onClick={(e) => { e.preventDefault(); handleLogin(); }}>Login</button>

              <p>
                Don't have an account? <button onClick={() => setSignup(true)}>Signup</button>
              </p>
            </form>
          </div>
        </div>
      ) }
    </div>
  );
};

export default AuthPopup;
