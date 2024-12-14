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

interface StepTrackPopupProps {
  setShowStepTrackPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepTrackPopup: React.FC<StepTrackPopupProps> = ({
  setShowStepTrackPopup,
}) => {
  const [date, setDate] = React.useState<any>(dayjs(new Date())); // Date selection
  const [time, setTime] = React.useState<any>(dayjs(new Date()));
  const [steps, setsteps] = React.useState<number>(0);
  const [StepIntake, setStepIntake] = React.useState<any>({
    date: "",
    steps: 0,
  });

  const [items, setItems] = React.useState<any>([]);

  const saveStepIntake = async () => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    console.log({
      date: formattedDate,
      steps,
    });

    if (StepIntake.steps <= 0) {
      toast.error(
        "Please provide a valid steps taken number (greater than 0 steps)"
      );
      return;
    }

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/steptrack/addstepentry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        date: formattedDate,
        steps: StepIntake.steps,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          toast.success("Step entry saved successfully!");
          getStepIntake();
        } else {
          toast.error("Failed to save step entry");
          console.log(data.error);
        }
      })
      .catch((err) => {
        toast.error("Failed to save step entry");
        console.log(err);
      });
  };

  const getStepIntake = async () => {
    console.log("Fetching step data for date:", dayjs.utc(date).format("YYYY-MM-DD"));
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/steptrack/getstepsbydate", {
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
          console.log(data.data, "Steps intake data for date");
          setItems(data.data);
        } else {
          toast.error("Failed to fetch step intake");
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch step intake");
        console.log(err);
      });
  };

  React.useEffect(() => {
    getStepIntake();
  }, [date]);

  const deleteStepIntake = async (item: any) => {
    console.log("Deleting step entry:", item._id);
    fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "/steptrack/deletestepentry",
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
          toast.success("Step Intake deleted successfully!");
          getStepIntake();
        } else {
          toast.error("Failed to delete Step intake");
        }
      })
      .catch((err) => {
        toast.error("Failed to delete Step intake");
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
            setShowStepTrackPopup(false);
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
          label="Steps taken"
          type="number"
          variant="outlined"
          onChange={(e) =>
            setStepIntake({ ...StepIntake, steps: e.target.value })
          }
        />
        <Button variant="contained" color="warning" onClick={saveStepIntake}>
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
                  <h3>steps: {item.steps}</h3>
                  <button
                    onClick={() => {
                      deleteStepIntake(item);
                    }}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              ))
          ) : (
            <p>No step entries found for the selected date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepTrackPopup;
