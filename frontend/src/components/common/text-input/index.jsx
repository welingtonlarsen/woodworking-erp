import { TextField } from "@mui/material";

const TextInput = ({ label, name, value, onChangeCallBack }) => {
  return (
    <TextField
      size="small"
      fullWidth
      label={label}
      name={name}
      onChange={(newValue) => onChangeCallBack(newValue)}
      required
      value={value}
      variant="outlined"
    />
  );
};

export default TextInput;
