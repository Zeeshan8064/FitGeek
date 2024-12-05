import React from 'react'
import './AuthPopup.css'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { toast, ToastContainer } from 'react-toastify';

interface AuthPopupProps {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignupFormData{
    name: String | null,
    email : String| null,
    password: String| null,
    weightInKg: number| null,
    heightInCm: number| null,
    goal : String| null,
    gender: String| null,
    dob: Date| null,
    activityLevel: String| null
}

const AuthPopup: React.FC<AuthPopupProps> = ({setShowPopup}) => {

  const [showSignup, setSignup] = React.useState<boolean>(false)
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
  })

  const [loginformData, setLoginFormData] = React.useState({
    email: '',
    password: ''
  })


/*
  router.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json(createResponse(false, "Invalid email or password"));
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json(createResponse(false, "Invalid email or password"));
      }
  
      const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '50m' });
      const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '100m' });
  
      res.cookie('authToken', authToken, { httpOnly: true });
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
  
      res.status(200).json(createResponse(true, 'Logged in successfully', {
        authToken,
        refreshToken
      }));
    } catch (err) {
      next(err); // Make sure next is included here for error-handling middleware
    }
  });

  router.post("/register", async (req, res) => {
    try {
      const {name,email, password, weightInKg, heightInCm, gender, dob, goal, activityLevel} = req.body;
      const existingUser = await User.findOne({email: email});
  
      if (existingUser) {
        return res.status(409).json(createResponse(false, "Email already exists"));
      }
  
      const newUser = new User({
          name,
          password,
          email,
          weight: [
              {
                  weight: weightInKg,
                  unit: "kg",
                  date: Date.now()
              }
          ],
          height: [
              {
                  height: heightInCm,
                  date: Date.now(),
                  unit: "cm"
              }
          ],
          gender,
          dob,
          goal,
          activityLevel
      });
      await newUser.save();
  
      res.status(201).json(createResponse(true, 'User registered successfully'));
    }
    catch (err) {
      next(err);
    }
  });
  */

  const handleLogin= () => {
    console.log(loginformData);
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginformData),
        credentials: 'include'
    })

    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.ok){
            toast.success(data.message)
            setShowPopup(false);
        } else {
            toast.error(data.message)
        }
    }).catch(err => {
        console.log(err)
    })
  }

  const handleSignup= () => {
    console.log(signupformData)

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupformData),
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.ok){
            toast.success(data.message)
            setSignup(false);
        } else {
            toast.error(data.message)
        }
    }).catch(err => {
        console.log(err)
    })
  }


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

            <Input color="warning" placeholder="name" size="lg" variant="solid"
                onChange={(e) => {
                    setSignupFormData({
                    ...signupformData,
                    name: e.target.value})
                }}
            />

            <Input color="warning" placeholder="email" size="lg" variant="solid"
                onChange={(e) => {
                    setSignupFormData({
                    ...signupformData,
                    email: e.target.value})
                }}
            />

            <Input color="warning" placeholder="password" type="password" size="lg" variant="solid"
                onChange={(e) => {
                    setSignupFormData({
                    ...signupformData,
                    password: e.target.value})
                }}
            />

            <Input color="warning" placeholder="Weight in kg" size="lg" type="number" variant="solid"
                onChange={(e)=> {
                setSignupFormData({
                ...signupformData,
                 weightInKg: parseFloat(e.target.value)})
                }}
            />

            <Select color="warning" placeholder="Activity Level" size="lg"  variant="solid"
                onChange={(
                    event: React.SyntheticEvent | null,
                    newValue : string | null,
                )=> {
                    setSignupFormData({
                       ...signupformData,
                        activityLevel: newValue?.toString() || ''
                    })
                }}
                >
                    <Option value="Sedentary">Sedentary</Option>
                    <Option value="Lightly Active">Lightly Active</Option>
                    <Option value="Moderately Active">Moderately Active</Option>
                    <Option value="Very Active">Very Active</Option>
                    <Option value="Extra Active">Extra Active</Option>
            </Select>

            <Select color="warning" placeholder="Goal" size="lg"  variant="solid"
                onChange={(
                    event: React.SyntheticEvent | null,
                    newValue : string | null,
                )=> {
                    setSignupFormData({
                       ...signupformData,
                        goal: newValue?.toString() || ''
                    })
                }}
                >
                    <Option value="weightLoss">WeightLoss</Option>
                    <Option value="weightMaintain">Maintain Weight</Option>
                    <Option value="weightGain">WeightGain</Option>
            </Select>

            <Select color="warning" size="lg" placeholder="Gender" variant="solid"
                onChange={(
                    event: React.SyntheticEvent | null,
                    newValue : string | null,
                )=> {
                    setSignupFormData({
                       ...signupformData,
                        gender: newValue?.toString() || ''
                    })
                }}
                >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
            </Select>

            <label htmlFor="">Height</label>
            <Input color="warning" placeholder="Height in cm" size="lg" type="number" variant="solid"
                onChange={(e)=> {
                    setSignupFormData({
                    ...signupformData,
                     heightInCm: parseFloat(e.target.value)})
                }}
            />

            <label htmlFor="">Date of Birth</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker defaultValue={dayjs(new Date())}
                sx={{
                    backgroundColor:'wheat'
                }}
                onChange={(newValue)=> {
                    setSignupFormData({
                   ...signupformData,
                   dob: new Date(newValue as any)})
                }}
                />
            </LocalizationProvider>

            <button
                onClick={(e)=>{
                    e.preventDefault()
                    handleSignup()}}>Signup</button>
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

            <Input color="warning" type="email" placeholder="email" size="lg" variant="solid"
                onChange={(e) => {
                    setLoginFormData({
                    ...loginformData,
                    email: e.target.value})
                }}
            />

            <Input color="warning" placeholder="password" type="password" size="lg" variant="solid"
                onChange={(e) => {
                    setLoginFormData({
                    ...loginformData,
                    password: e.target.value})
                }}
            />

            <button
                 onClick={(e)=>{
                    e.preventDefault()
                    handleLogin()}}>Login</button>
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