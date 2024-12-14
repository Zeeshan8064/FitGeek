import React from 'react'
import { CircularProgress } from '@mui/joy'
import { AiOutlineEye } from 'react-icons/ai'
import './HomeBanner1.css'
import { WiDayStormShowers } from 'react-icons/wi'
const HomeBanner1 = () => {


const [data, setData] = React.useState<any>(null)

const getData = async () => {
  let temp = [
    {
      "name":"Cal Intake",
      "value":2000,
      "unit":"kcal",
      "goal":2500,
      "goalunit":"kcal"
    },
    {
      "name":"Sleep",
      "value": 8,
      "unit": "hrs",
      "goal": 8,
      "goalunit": "hrs"
    },
    {
      "name": "Steps",
      "value": 50,
      "unit": "steps",
      "goal": 10000,
      "goalunit":"steps"
    },
    {
      "name":"Water",
      "value":2000,
      "unit":"ml",
      "goal":3000,
      "goalunit":"ml"
    },
    {
      "name": "Weight",
      "value": 75,
      "unit": "kg",
      "goal": 70,
      "goalunit": "kg"
    },
  ]

  fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/report/getreport',{
    method: "GET",
    credentials: 'include'
  })
  .then(res => {
    return res.json()
  })
  .then(data => {
    console.log(data)
    if (data && data.ok) {
      setData(data.data);
    } else {
      setData(temp)
    }
  })
  .catch(err => {
    console.log(err)
    setData(temp);
  })
}

React.useEffect(()=>{
  getData()
},[])

function simplifyFraction(numerator: number, denominator: number): [number, number] {
  if (denominator === 0) {
    throw new Error("Denominator cannot be zero");
  }

  // Get the greatest common divisor (GCD)
  function gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
  const intNumerator = Math.round(numerator);
  const intDenominator = Math.round(denominator);

  // Calculate the GCD of the numerator and denominator
  const commonDivisor = gcd(intNumerator, intDenominator);


  // Simplify the fraction
  const simplifiedNumerator = numerator / commonDivisor;
  const simplifiedDenominator = denominator / commonDivisor;

  // Round the simplified fraction values to 1 decimal place
  const roundedNumerator = Math.round(simplifiedNumerator);
  const roundedDenominator = Math.round(simplifiedDenominator);

  return [roundedNumerator, roundedDenominator];
}


  return (
    <div className='meters'>
    {
      data?.length >0 && data.map((item: any, index:number) =>{
        return (
          <div className='card' key={index}>
          <div className='card-header'>
            <div className='card-header-box'>
              <div className='card-header-box-name'>{item.name}</div>
              <div className='card-header-box-value'>{parseInt(item.value)}{item.unit}</div>
            </div>
            <div className='card-header-box'>
              <div className='card-header-box-name'>Target</div>
              <div className='card-header-box-value'>{parseInt(item.goal)}{item.goalunit}</div>
            </div>
          </div>

          <CircularProgress
            color="danger"
            determinate
            variant="soft"
            size='lg'
            value={
              (item.value/item.goal)*100
            }
          >
            <span className='textinCircle'>
            {
              simplifyFraction(item.value, item.goal)[0] + '/' + simplifyFraction(item.value, item.goal)[1]
            }
            </span>

          </CircularProgress>

        <button
        onClick={()=>{
          window.location.href = `/report/${item.name}`
        }}
        >Show Report<AiOutlineEye/></button>
        </div>
        )
      })
    }
      </div>
  )
}

export default HomeBanner1