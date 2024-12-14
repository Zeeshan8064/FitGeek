"use client"
import React from 'react';
import './workoutPage.css';

const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const [workout, setWorkout] = React.useState<any>(null);
    const { id: workoutid } = React.use(params);
    const [data, setData] = React.useState<any>(null);

    const getworkout = async () => {
        console.log('getWorkout', workoutid);
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutplans/workouts/' + workoutid, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then(data => {
                if (data.ok) {
                    setData(data.data);
                } else {
                    setData(null);
                }
            })
            .catch(error => console.log(error));
    };

    // Fetch data on component mounting
    React.useEffect(() => {
        getworkout();
    }, []);

    return (
        <div className='workout'>
            <h1 className='workout'>{data?.name} Day</h1>
            <div className='workout__exercises'>
                {data?.exercises?.map((item: any, index: number) => {
                    return (
                        <div
                            key={index}
                            className={
                                index % 2 === 0
                                    ? 'workout__exercise'
                                    : 'workout__exercise workout__exercise--reverse'
                            }
                        >
                            <h3>{index + 1}</h3>
                            <div className='workout__exercise__image'>
                                <img src={item.imageURL} alt='' />

                            </div>
                            <div className='workout__exercise__content'>
                                <h2>{item.name}</h2>
                                <span>{item.sets} sets x {item.reps}</span>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default page;
