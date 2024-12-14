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

interface SleepTrackPopupProps {
  setShowSleepTrackPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const SleepTrackPopup: React.FC<SleepTrackPopupProps> = ({
  setShowSleepTrackPopup,
}) => {
  const [date, setDate] = React.useState<any>(dayjs(new Date())); // Date selection
  const [time, setTime] = React.useState<any>(dayjs(new Date()));
  const [durationInHrs, setDurationInHrs] = React.useState<number>(0); // Sleep duration in hours
  const [SleepIntake, setSleepIntake] = React.useState<any>({
    date: "",
    durationInHrs: 1,
  });

  const [items, setItems] = React.useState<any>([]);

  const saveSleepIntake = async () => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    console.log({
      date: formattedDate,
      durationInHrs,
    });

    if (SleepIntake.durationInHrs <= 0) {
      toast.error(
        "Please provide a valid sleep duration (greater than 0 hours)"
      );
      return;
    }

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/sleeptrack/addsleepentry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        date: formattedDate,
        durationInHrs: SleepIntake.durationInHrs,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          toast.success("Sleep entry saved successfully!");
          getSleepIntake();
        } else {
          toast.error("Failed to save sleep entry");
          console.log(data.error);
        }
      })
      .catch((err) => {
        toast.error("Failed to save sleep entry");
        console.log(err);
      });
  };

  const getSleepIntake = async () => {
    console.log("Fetching sleep data for date:", dayjs.utc(date).format("YYYY-MM-DD"));
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/sleeptrack/getsleepbydate", {
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
          console.log(data.data, "Sleep intake data for date");
          setItems(data.data);
        } else {
          toast.error("Failed to fetch sleep intake");
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch sleep intake");
        console.error(err);
      });
  };

  React.useEffect(() => {
    getSleepIntake();
  }, [date]);

  const deleteSleepIntake = async (item: any) => {
    console.log("Deleting sleep entry:", item._id);
    fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "/sleeptrack/deletesleepentry",
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
          toast.success("Sleep Intake deleted successfully!");
          getSleepIntake();
        } else {
          toast.error("Failed to delete Sleep intake");
        }
      })
      .catch((err) => {
        toast.error("Failed to delete Sleep intake");
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
            setShowSleepTrackPopup(false);
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
          label="Sleep Duration (hours)"
          type="number"
          variant="outlined"
          onChange={(e) =>
            setSleepIntake({ ...SleepIntake, durationInHrs: e.target.value })
          }
        />
        <Button variant="contained" color="warning" onClick={saveSleepIntake}>
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
                  <h3>Duration: {item.durationInHrs} hrs</h3>
                  <button
                    onClick={() => {
                      deleteSleepIntake(item);
                    }}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              ))
          ) : (
            <p>No sleep entries found for the selected date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SleepTrackPopup;
