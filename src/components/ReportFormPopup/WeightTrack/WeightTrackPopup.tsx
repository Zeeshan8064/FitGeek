"use client";
import React from "react";
import "../popup.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface WeightTrackPopupProps {
  setShowWeightTrackPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeightTrackPopup: React.FC<WeightTrackPopupProps> = ({
  setShowWeightTrackPopup,
}) => {
  const [date, setDate] = React.useState<any>(dayjs(new Date())); // Date selection
  const [time, setTime] = React.useState<any>(dayjs(new Date()));
  const [weight, setweight] = React.useState<number>(0);
  const [Weighttoday, setWeighttoday] = React.useState<any>({
    date: "",
    weight: 0,
  });
  const [items, setItems] = React.useState<any>([]);

  const saveWeighttoday = async () => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    console.log({
      date: formattedDate,
      weight,
    });

    if (Weighttoday.weightInKg <= 0) {
      toast.error(
        "Please provide a valid Weight (greater than 0 kg)"
      );
      return;
    }

    fetch("https://fitnessgeekbackend-production.up.railway.app/weighttrack/addweightentry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        date: formattedDate,
        weightInKg : Weighttoday.weight,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          toast.success("Weight entry saved successfully!");
          getWeighttoday();
        } else {
          toast.error("Failed to save Weight entry");
          console.log(data.error);
        }
      })
      .catch((err) => {
        toast.error("Failed to save Weight entry");
        console.log(err);
      });
  };

  const getWeighttoday = async () => {
    console.log("Fetching step data for date:", dayjs.utc(date).format("YYYY-MM-DD"));
    fetch("https://fitnessgeekbackend-production.up.railway.app/weighttrack/getweightbydate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        date: date,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          console.log(data.data, "Weight intake data for date");
          setItems(data.data);
        } else {
          toast.error("Failed to fetch Weight intake");
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch Weight intake");
        console.log(err);
      });
  };

  React.useEffect(() => {
    getWeighttoday();
  }, [date]);

  const deleteWeighttoday = async (item: any) => {
    console.log("Deleting weight entry:", item._id);
    fetch(
      "https://fitnessgeekbackend-production.up.railway.app/weighttrack/deleteweightentry",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id: item._id,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          toast.success("Weight today deleted successfully!");
          getWeighttoday();
        } else {
          toast.error("Failed to delete Weight today");
        }
      })
      .catch((err) => {
        toast.error("Failed to delete Weight today");
        console.log(err);
      });
  };

  const selectedDay = (val: any) => {
    setDate(val);
  };

  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setShowWeightTrackPopup(false);
          }}
        >
          <AiOutlineClose />
        </button>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={date}
            onChange={(newValue: any) => {
              selectedDay(newValue);
            }}
          />
        </LocalizationProvider>

        <div className="timebox">
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

        <TextField
          label="Weight today (in kg)"
          type="number"
          variant="outlined"
          onChange={(e) =>
            setWeighttoday({ ...Weighttoday, weight: parseFloat(e.target.value) })
          }
        />
        <Button variant="contained" color="warning" onClick={saveWeighttoday}>
          Save
        </Button>

        <div className="hrline"></div>
        <div className="items">
          {items.some((item: any) =>
          dayjs.utc(item.date).startOf('day').isSame(dayjs.utc(date).startOf('day'), 'day')
          ) ? (
            items
              .filter((item: any) =>
                dayjs.utc(item.date).startOf('day').isSame(dayjs.utc(date).startOf('day'), 'day')
              )
              .map((item: any, index: number) => (
                <div className="item" key={index}>
                  <h3>Date: {dayjs.utc(item.date).format("DD-MM-YYYY")}</h3>
                  <h3>{item.weight || "N/A"}Kg</h3>
                  <button
                    onClick={() => {
                      deleteWeighttoday(item);
                    }}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              ))
          ) : (
            <p>No Weight entries found for the selected date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeightTrackPopup;
