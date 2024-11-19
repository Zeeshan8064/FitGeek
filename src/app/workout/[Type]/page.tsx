"use client"
import React from 'react'
import './workoutPage.css'

const page = () => {
    const [workout, setWorkout] = React.useState<any>(null)

    const getworkout = async () => {
        let data: any = {
            type: 'Chest',
            imageUrl: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hlc3QlMjB3b3Jrb3V0fGVufDB8fDB8fHww',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Bench Press',
                    videoUrl: 'https://gymvisual.com/img/p/1/7/5/5/2/17552.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Targets the chest, shoulders, and triceps to build upper body strength.'
                },
                {
                    exercise: 'Incline Bench Press',
                    videoUrl: 'https://gymvisual.com/img/p/4/7/7/8/4778.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: ' Focuses on the upper chest and shoulders for a more defined upper torso.'
                },
                {
                    exercise: 'Decline Bench Press',
                    videoUrl: 'https://gymvisual.com/img/p/1/1/6/3/3/11633.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Emphasizes the lower chest muscles for balanced chest development.'
                }
            ]
        }

        setWorkout(data)
    }

    // Fetch data on component mounting
    React.useEffect(() => {
        getworkout()
    }, [])

    return (
        <div className='workout'>
            <h1 className='mainhead1'>{workout?.type} Day</h1>
            <div className='workout__exercises'>
                {
                    workout?.exercises.map((item: any, index: number) => {
                        return (
                            <div
                                key={index} // Added unique key here
                                className={
                                    index % 2 === 0
                                        ? 'workout__exercise'
                                        : 'workout__exercise workout__exercise--reverse'
                                }
                            >
                                <h3>{index + 1}</h3>
                                <div className='workout__exercise__image'>
                                    <img src={item.videoUrl} alt='' />
                                </div>
                                <div className='workout__exercise__content'>
                                    <h2>{item.exercise}</h2>
                                    <span>{item.sets} sets x {item.reps}</span>
                                    <p>{item.rest} seconds rest</p>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default page
