import React from "react";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface StepComponentProps {
  step: {
    title: string;
    message: string;
  };
  options: { value: string; label: string }[];
  dropdownValue: string;
  onDropdownChange: (event: SelectChangeEvent) => void;
}

const ChooseApproachStepComponent: React.FC<StepComponentProps> = ({
  step,
  options,
  dropdownValue,
  onDropdownChange,
}) => {
  return (
    <div>
      <Typography variant="h5" marginBottom={2}>
        {step.title}
      </Typography>
      <Typography variant="body1">{step.message}</Typography>
      <FormControl fullWidth margin="normal">
        <Select
          size={"small"}
          value={dropdownValue}
          onChange={onDropdownChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ChooseApproachStepComponent;
