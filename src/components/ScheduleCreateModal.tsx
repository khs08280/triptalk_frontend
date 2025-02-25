import { Box, Modal, TextField, Typography, Button } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState, ChangeEvent } from "react"; // Import ChangeEvent
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useAppSelector } from "@/store/hooks";

const ScheduleCreateModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [date, setDate] = useState<Dayjs | null>(null);
  const [name, setName] = useState<string>("");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [memo, setMemo] = useState<string>("");
  const tripId = useAppSelector(
    (state) => state.chatroom.currentChatRoom?.tripId,
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "memo":
        setMemo(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    const scheduleData = {
      tripId: tripId,
      date: date ? date.format("YYYY-MM-DD") : null,
      name: name,
      startTime: startTime ? startTime.format("HH:mm") : null,
      endTime: endTime ? endTime.format("HH:mm") : null,
      memo: memo,
    };
    if (!scheduleData.date) {
      alert("날짜(date)는 필수 값입니다.");
      return;
    }
    if (!scheduleData.name) {
      alert("이름은 비어 있을 수 없습니다.");
      return;
    }
    if (scheduleData.name.length > 255) {
      alert("이름이 너무 깁니다.");
      return;
    }
    if (scheduleData.memo.length > 1000) {
      alert("메모가 너무 깁니다.");
      return;
    }

    console.log("Sending data:", scheduleData);
    // Example using fetch (replace with your actual API endpoint):
    /*
    fetch('/api/schedules', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        handleClose(); // Close the modal on success
        // Optionally, refresh the schedule list or show a success message
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors (e.g., show an error message to the user)
    });
    */

    // handleClose(); // Moved inside the handleSubmit, but keep it commented out for now
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <div className="mr-2 cursor-pointer">
        <AddRoundedIcon onClick={handleOpen} />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[25%] left-[35%] flex h-[500px] w-2xl flex-col overflow-scroll border-2 border-blue-200 bg-white p-10 py-5 shadow">
            <div className="mb-5 flex items-center justify-between">
              <Typography id="modal-modal-title" variant="h6" component="h3">
                여행 일정 추가
              </Typography>
              <CloseRoundedIcon
                onClick={handleClose}
                className="cursor-pointer"
              />
            </div>

            <DatePicker
              label="일정 날짜"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
            />

            <TextField
              label="장소 이름"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={name}
              onChange={handleInputChange}
            />

            <TimePicker
              label="일정 시작 시간"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
            />

            {/* End Time */}
            <TimePicker
              label="일정 종료 시간 *"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
            />

            {/* Memo */}
            <TextField
              label="메모 (선택)"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              name="memo"
              value={memo}
              onChange={handleInputChange}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              일정 추가
            </Button>
          </Box>
        </Modal>
      </div>
    </LocalizationProvider>
  );
};
export default ScheduleCreateModal;
