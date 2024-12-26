"use client";
import React from 'react'
import '../popup.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

interface CaloriIntakePopupProps {
  setShowCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalorieIntakePopup: React.FC<CaloriIntakePopupProps> = ({ setShowCalorieIntakePopup }) => {
  const color = '#dc1313'
  const [date, setDate] = React.useState<any>(dayjs(new Date()))
  const [time, setTime] = React.useState<any>(dayjs(new Date()))

  const [calorieIntake, setCalorieIntake] = React.useState<any>({
    item: '',
    date: '',
    quantity: '',
    quantitytype: 'g'
  })

  const [items, setItems] = React.useState<any>([])

  const saveCalorieIntake = async () => {
    let tempdate = date.format('YYYY-MM-DD')
    let temptime = time.format('HH:mm:ss')
    let tempdatetime = tempdate + ' ' + temptime
    let finaldatetime = new Date(tempdatetime).toISOString();

    console.log(finaldatetime + ' finaldatetime' )

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/addcalorieintake',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
          item: calorieIntake.item,
          date: finaldatetime,
          quantity: calorieIntake.quantity,
          quantityType: calorieIntake.quantitytype,
      }),
    })

    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        toast.success('Calorie Intake saved successfully!');
        getCalorieIntake()
      } else {
        toast.error('Failed to save calorie intake');
      }
    })
    .catch(err => {
      toast.error('Failed to save calorie intake')
      console.log(err)
    })
  }

  const getCalorieIntake = async ()  => {
    setItems([])
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/getcalorieintakebydate',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
          date: date
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        console.log(data.data, 'Calorie intake data for date')
        setItems(data.data)
      } else {
        toast.error('Failed to fetch calorie intake');
      }
    })
    .catch(err => {
      toast.error('Failed to fetch calorie intake')
      console.error(err)
    })
  }

  React.useEffect(() => {
    getCalorieIntake()
  }, [date])

  const deleteCalorieIntake = async (item: any) => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/deletecalorieintake',{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
          item: item.item,
          date: item.date,
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        toast.success('Calorie Intake deleted successfully!');
        getCalorieIntake()
      } else {
        toast.error('Failed to delete calorie intake');
      }
    })
    .catch(err => {
      toast.error('Failed to delete calorie intake')
      console.error(err)
    })
  }

  const selectedDay = (val:any) => {
    setDate(val)
  }
  return (
    <div className='popupout'>
      <div className='popupbox'>
        <button className='close'
          onClick={() => {
            setShowCalorieIntakePopup(false)
          }}
        >
          <AiOutlineClose/>
        </button>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={date}
            onChange={(newValue: any) => {
              selectedDay(newValue)
            }}
          />
        </LocalizationProvider>

        <TextField id='outlined-basic' label='Food item name' variant = "outlined" color='warning'
          onChange={(e)=> {
            setCalorieIntake({...calorieIntake, item: e.target.value })
          }}
        />

        <TextField id='outlined-basic' label='Food item amount(in gms)' variant = "outlined" color='warning'
        type='number'
          onChange={(e)=> {
            setCalorieIntake({...calorieIntake, quantity: e.target.value })
          }}
        />

        <div className='timebox'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticTimePicker
            ampm
            orientation="landscape"
            openTo="minutes"
            value={time}
            onChange={(newValue) => {
              setTime(newValue);
            }}
          />
        </LocalizationProvider>
        </div>

        <Button variant="contained" color='warning'
        onClick={saveCalorieIntake}>
          Save
        </Button>

        <div className='hrline'></div>
        <div className='items'>
          {
            items.map((items:any , index: number) => {
              return (
                <div className='item' key={index}>
                  <h3>{items.item}</h3>
                  <h3>{items.quantity}{items.quantityType}</h3>
                  <button
                  onClick={() => {
                    deleteCalorieIntake(items)}}
                    >
                    <AiFillDelete/>
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default CalorieIntakePopup