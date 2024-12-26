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

interface WaterTrackPopupProps {
  setShowWaterTrackPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaterTrackPopup: React.FC<WaterTrackPopupProps> = ({
  setShowWaterTrackPopup,
}) => {
  const [date, setDate] = React.useState<any>(dayjs(new Date())); // Date selection
  const [time, setTime] = React.useState<any>(dayjs(new Date()));
  const [amountInMilliliters, setamountInMilliliters] = React.useState<number>(0);
  const [WaterIntake, setWaterIntake] = React.useState<any>({
    date: "",
    amountInMilliliters: 0,
  });
  const [items, setItems] = React.useState<any>([]);
  const saveWaterIntake = async () => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    console.log({
      date: formattedDate,
      amountInMilliliters,
    });

    if (WaterIntake.amountInMilliliters <= 0) {
      toast.error(
        "Please provide a valid Water Intake number (greater than 0 ml)"
      );
      return;
    }

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "watertrack/addwaterentry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        date: formattedDate,
        amountInMilliliters : WaterIntake.amountInMilliliters,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          toast.success("Water entry saved successfully!");
          getWaterIntake();
        } else {
          toast.error("Failed to save Water entry");
          console.log(data.error);
        }
      })
      .catch((err) => {
        toast.error("Failed to save Water entry");
        console.log(err);
      });
  };

  const getWaterIntake = async () => {
    console.log("Fetching step data for date:", dayjs.utc(date).format("YYYY-MM-DD"));
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "watertrack/getwaterbydate", {
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
          console.log(data.data, "Water intake data for date");
          setItems(data.data);
        } else {
          toast.error("Failed to fetch Water intake");
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch Water intake");
        console.log(err);
      });
  };

  React.useEffect(() => {
    getWaterIntake();
  }, [date]);

  const deleteWaterIntake = async (item: any) => {
    console.log("Deleting water entry:", item._id);
    fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "watertrack/deletewaterentry",
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
          toast.success("Water Intake deleted successfully!");
          getWaterIntake();
        } else {
          toast.error("Failed to delete Water intake");
        }
      })
      .catch((err) => {
        toast.error("Failed to delete Water intake");
        console.error(err);
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
            setShowWaterTrackPopup(false);
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
          label="Water Intake (In ml)"
          type="number"
          variant="outlined"
          onChange={(e) =>
            setWaterIntake({ ...WaterIntake, amountInMilliliters: e.target.value })
          }
        />
        <Button variant="contained" color="warning" onClick={saveWaterIntake}>
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
                  <h3>{item.amountInMilliliters}</h3>
                  <button
                    onClick={() => {
                      deleteWaterIntake(item);
                    }}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              ))
          ) : (
            <p>No Water entries found for the selected date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaterTrackPopup;
