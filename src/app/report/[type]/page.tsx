"use client";
import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./ReportPage.css";
import { AiFillEdit } from "react-icons/ai";
import CaloriIntakePopup from "@/components/ReportFormPopup/CalorieIntake/CalorieIntakePopup";
import SleepTrackPopup from "@/components/ReportFormPopup/SleepTrack/SleepTrackPopup";
import StepTrackPopup from "@/components/ReportFormPopup/StepTrack/StepTrackPopup";
import WaterTrackPopup from "@/components/ReportFormPopup/WaterTrack/WaterTrackPopup";
import WeightTrackPopup from "@/components/ReportFormPopup/WeightTrack/WeightTrackPopup";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";


const page = () => {
  const color = "#dc1313";
  const pathname = usePathname();
  const chartsParams = {
    height: 250,
    width: 500,
  };
  const [dataS1, setDataS1] = React.useState<any>({
    data: [],
    xAxis: {
      data: [],
      label: "",
      scaleType: "linear",
    },
    title: "",
    color: "",
  });

  const getDataForS1 = async () => {
    if (pathname == "/report/Calorie%20Intake") {
        fetch(
        process.env.NEXT_PUBLIC_BACKEND_API +
          "/calorieintake/getcalorieintakebylimit",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: 10,
          }),
        }
        )
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            console.log("API Response Data:", data.data);
            const temp = data.data.map((item: any) => {
              console.log("Mapping item:", item);
              return {
                date: new Date(item.date).getTime(),
                value: item.calorieIntake,
              };
            });

            console.log("Mapped Data for Chart:", temp);

            // Prepare data for the chart
            const dataForLineChart = temp.map((item: any) => item.value);
            const dataForXAxis = temp.map((item: any) => item.date);

            setDataS1({
              data: dataForLineChart,
              title: "1 Day Calorie Intake",
              color: color,
              xAxis: {
                data: dataForXAxis,
                label: "Last 10 Days",
                scaleType: "time",
              },
            });
          } else {
            setDataS1([]); // If the API response is not okay, reset the chart data
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error fetching data");
        });
    } else if (pathname == "/report/Sleep") {
        fetch(
        process.env.NEXT_PUBLIC_BACKEND_API +
          "/sleeptrack/getsleepbylimit",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: 10,
          }),
        }
        )
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            console.log("API Response Data:", data.data);
            const temp = data.data.map((item: any) => {
              console.log("Mapping item:", item);
              return {
                date: new Date(item.date).getTime(),
                value: item.durationInHrs,
              };
            });

            console.log("Mapped Data for Chart:", temp);

            // Prepare data for the chart
            const dataForLineChart = temp.map((item: any) => item.value);
            const dataForXAxis = temp.map((item: any) => item.date);

            setDataS1({
              data: dataForLineChart,
              title: "1 Day Sleep Intake",
              color: color,
              xAxis: {
                data: dataForXAxis,
                label: "Last 10 Days",
                scaleType: "time",
              },
            });
          } else {
            setDataS1([]); // If the API response is not okay, reset the chart data
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error fetching data");
        });
    } else if
    (pathname == "/report/Steps") {
      fetch(
      process.env.NEXT_PUBLIC_BACKEND_API +
        "/steptrack/getstepsbylimit",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 10,
        }),
      }
      )
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          console.log("API Response Data:", data.data);
          const temp = data.data.map((item: any) => {
            console.log("Mapping item:", item);
            return {
              date: new Date(item.date).getTime(),
              value: item.steps,
            };
          });

          console.log("Mapped Data for Chart:", temp);

          // Prepare data for the chart
          const dataForLineChart = temp.map((item: any) => item.value);
          const dataForXAxis = temp.map((item: any) => item.date);

          setDataS1({
            data: dataForLineChart,
            title: "1 Day Step Intake",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "time",
            },
          });
        } else {
          setDataS1([]); // If the API response is not okay, reset the chart data
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching data");
      });
    } else if (pathname == "/report/Water") {
      fetch(
      process.env.NEXT_PUBLIC_BACKEND_API +
        "/watertrack/getwaterbylimit",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 10,
        }),
      }
      )
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          console.log("API Response Data:", data.data);
          const temp = data.data.map((item: any) => {
            console.log("Mapping item:", item);
            return {
              date: new Date(item.date).getTime(),
              value: item.amountInMilliliters,
            };
          });

          console.log("Mapped Data for Chart:", temp);

          // Prepare data for the chart
          const dataForLineChart = temp.map((item: any) => item.value);
          const dataForXAxis = temp.map((item: any) => item.date);

          setDataS1({
            data: dataForLineChart,
            title: "1 Day Water Intake",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "time",
            },
          });
        } else {
          setDataS1([]); // If the API response is not okay, reset the chart data
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching data");
      });
    } else if (pathname == "/report/Weight") {
      fetch(
      process.env.NEXT_PUBLIC_BACKEND_API +
        "/weighttrack/getweightbylimit",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 10,
        }),
      }
      )
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          console.log("API Response Data:", data.data);
          const temp = data.data.map((item: any) => {
            console.log("Mapping item:", item);
            return {
              date: new Date(item.date).getTime(),
              value: item.weight,
            };
          });

          console.log("Mapped Data for Chart:", temp);

          // Prepare data for the chart
          const dataForLineChart = temp.map((item: any) => item.value);
          const dataForXAxis = temp.map((item: any) => item.date);

          setDataS1({
            data: dataForLineChart,
            title: "1 Day Weight",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "time",
            },
          });
        } else {
          setDataS1([]); // If the API response is not okay, reset the chart data
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching data");
      });
    }  else {
            // Get data for other reports
            alert("get data for the other reports");
    }
  };

  React.useEffect(() => {
    getDataForS1();
  }, []);

  const [showCalorieIntakePopup, setShowCalorieIntakePopup] = React.useState<boolean>(false);
  const [showSleepTrackPopup, setShowSleepTrackPopup] = React.useState<boolean>(false);
  const [showStepTrackPopup, setShowStepTrackPopup] = React.useState<boolean>(false);
  const [showWaterTrackPopup, setShowWaterTrackPopup] = React.useState<boolean>(false);
  const [showWeightTrackPopup, setShowWeightTrackPopup] = React.useState<boolean>(false);

  return (
    <div className="reportpage">
    <div className="s1">
      {dataS1?.data?.length > 0 && dataS1?.xAxis?.data?.length > 0 ? (
        <>
          <LineChart
            xAxis={[
              {
                id: "Day",
                data: dataS1.xAxis.data,
                scaleType: dataS1.xAxis.scaleType,
                label: dataS1.xAxis.label,
                valueFormatter: (timestamp: number) => {
                  const date = new Date(timestamp);
                  return `${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`;
                },
              },
            ]}
            series={[
              {
                data: dataS1.data,
                label: dataS1.title,
                color: dataS1.color,
              },
            ]}
            {...chartsParams}
          />
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>

    <button
      className="editbutton"
      onClick={() => {
        if (pathname == "/report/Calorie%20Intake") {
          setShowCalorieIntakePopup(true);
        } else if (pathname == "/report/Sleep") {
          setShowSleepTrackPopup(true);
        } else if (pathname == "/report/Steps") {
          setShowStepTrackPopup(true);
        } else if (pathname == "/report/Water") {
          setShowWaterTrackPopup(true);
        } else if (pathname == "/report/Weight") {
          setShowWeightTrackPopup(true);
        }
      }}
    >
      <AiFillEdit />
    </button>

    {showCalorieIntakePopup && (
      <CaloriIntakePopup setShowCalorieIntakePopup={setShowCalorieIntakePopup} />
    )}

    {showSleepTrackPopup && (
      <SleepTrackPopup setShowSleepTrackPopup={setShowSleepTrackPopup} />
    )}

    {showStepTrackPopup && (
      <StepTrackPopup setShowStepTrackPopup={setShowStepTrackPopup} />
    )}

    {showWaterTrackPopup && (
      <WaterTrackPopup setShowWaterTrackPopup={setShowWaterTrackPopup} />
    )}

    {showWeightTrackPopup && (
      <WeightTrackPopup setShowWeightTrackPopup={setShowWeightTrackPopup} />
    )}
      </div>

  );

};

export default page;