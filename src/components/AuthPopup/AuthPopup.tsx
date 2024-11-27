import React from 'react'
import './AuthPopup.css'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai';

interface AuthPopupProps {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthPopup: React.FC<AuthPopupProps> = ({setShowPopup}) => {

  const [showSignup, setSignup] = React.useState<boolean>(false)

  const handleLogin= () => {}
  const handleSignup= () => {}
  return (
    <div className='popup'>
            <button className='close'
                onClick={()=>{
                    setShowPopup(false);
                }}>
                <AiOutlineClose />
            </button>
        {
          showSignup ? (
            <div className='authform'>
            <div className='left'>
                <Image src={logo} alt="Logo"/>
            </div>
            <div className='right'>
                <h1>Signup to become a Fit Geek!</h1>
                <form action="">
                <Input
                    color="warning"
                    placeholder="email"
                    size="lg"
                    variant="soft"
                />
                <Input
                    color="warning"
                    placeholder="password"
                    size="lg"
                    variant="soft"
                    type='password'
                />
                <div className='form_input_leftright'>
                <Input
                    color="warning"
                    placeholder="Age"
                    size="lg"
                    variant="soft"
                    type="number"
                />
                <Input
                    color="warning"
                    placeholder="Weight"
                    size="lg"
                    variant="soft"
                    type="number"
                />
                </div>

                <Select
                 color="warning"
                 placeholder="Gender"
                 size="lg"
                 variant="soft"
                >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
                </Select>
<br/>
                <label htmlFor=''>Height</label>
                <div className='form_input_leftright'>
                    <Input
                        color="warning"
                        placeholder="ft"
                        size="lg"
                        variant="soft"/>
                     <Input
                        color="warning"
                        placeholder="in"
                        size="lg"
                        variant="soft"/>
                </div>

                <button
                    onClick={()=>{handleSignup()}}>Signup</button>
                </form>
                <p>Already have an account? <button onClick={()=>{
                     setSignup(false);
                }}>Login</button></p>
            </div>

        </div>
            ):(
                <div className='authform'>
                <div className='left'>
                    <Image src={logo} alt="Logo"/>
                </div>
                <div className='right'>
                    <h1>Login to become a Fit Geek!</h1>
                    <form action="">
                    <Input
                         color="warning"
                        disabled={false}
                         placeholder="email..."
                        size="lg"
                        variant="soft"
                    />
                    <Input
                         color="warning"
                        disabled={false}
                         placeholder="password..."
                        size="lg"
                        variant="soft"
                        type='password'
                    />
                    <button
                        onClick={()=>{handleLogin()}}>Login</button>
                    </form>
                    <p>Don't have an account? <button onClick={()=>{
                         setSignup(true);
                    }}>Signup</button></p>
                </div>

            </div>
            )
        }

    </div>
  )
}

export default AuthPopup