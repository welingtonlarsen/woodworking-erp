import { TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const DatePicker = ({ label, dateValue, onChangeDateCallBack }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={label}
          inputFormat="dd/MM/yyyy"
          value={dateValue}
          onChange={(newDate) => onChangeDateCallBack(newDate)}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default DatePicker;
