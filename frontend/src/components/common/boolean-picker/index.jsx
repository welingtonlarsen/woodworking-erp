import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const BooleanPicker = ({ label, name, value, onChangeCallBack }) => {
  return (
    <FormControl style={{ maxWidth: "266px" }} fullWidth>
      <InputLabel id="containsPurchaseOrder-label">{label}</InputLabel>
      <Select
        size="small"
        labelId={name}
        id={name}
        name={name}
        value={value}
        label={label}
        onChange={(newValue) => onChangeCallBack(newValue)}
      >
        <MenuItem value={true}>Sim</MenuItem>
        <MenuItem value={false}>Não</MenuItem>
      </Select>
    </FormControl>
  );
};

export default BooleanPicker;
