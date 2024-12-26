import React, { Suspense } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './HomeBanner2.css';
import { useSearchParams } from 'next/navigation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const HomeBanner2 = () => {
  const [workouts, setWorkouts] = React.useState<any[] | null>(null);
  const [data, setData] = React.useState<any[] | null>(null);
  const searchParams = useSearchParams();
  const workoutid = searchParams.get('id');

  const getData = async () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutplans/workouts', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          setData(data.data);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log('Error:', err);
        setData([]);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <h1 className="mainhead1">Workouts</h1>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          centeredSlides={false}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {data &&
            data.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    className="swiper-slide"
                    style={{
                      backgroundImage: `url(${item.imageURL})`,
                    }}
                    onClick={() => {
                      window.location.href = `/workout/${item._id}`;
                    }}
                  >
                    <div className="swiper-slide-content">
                      <h2>{item.name}</h2>
                      <p>{item.durationInMinutes} min</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </>
  );
};

// Wrap in Suspense
export default function SuspendedHomeBanner() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeBanner2 />
    </Suspense>
  );
}
