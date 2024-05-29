import React from "react";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  InputLabel,
  Stack,
} from "@mui/material";

interface StepComponentProps {
  step: {
    title: string;
    message: string;
  };
  dropdownValue: string;
  onDropdownChange: (event: SelectChangeEvent) => void;
  windowSizeDropdownValue: number;
  onWindowSizeDropdownChange: (event: SelectChangeEvent) => void;
  thresholdDropdownValue: number;
  onThresholdDropdownChange: (event: SelectChangeEvent) => void;
  timeBetweenTupleDropdownValue: number;
  onTimeBetweenTupleDropdownChange: (event: SelectChangeEvent) => void;
}

const ChooseApproachStepComponent: React.FC<StepComponentProps> = ({
  step,
  dropdownValue,
  onDropdownChange,
  windowSizeDropdownValue,
  onWindowSizeDropdownChange,
  thresholdDropdownValue,
  onThresholdDropdownChange,
  timeBetweenTupleDropdownValue,
  onTimeBetweenTupleDropdownChange,
}) => {
  const options = [
    { value: "half_space_trees", label: "Half Space Trees" },
    { value: "gaussian_scorer", label: "Gaussian Scorer" },
    { value: "local_outlier_factor", label: "Local Outlier Factor" },
  ];

  const windowSizeOptions = [
    { value: 100, label: "100" },
    { value: 250, label: "250" },
    { value: 500, label: "500" },
    { value: 750, label: "750" },
    { value: 1000, label: "1000" },
  ];

  const thresholdOptions = [
    { value: 0.9, label: "0.9" },
    { value: 0.92, label: "0.92" },
    { value: 0.95, label: "0.95" },
    { value: 0.99, label: "0.99" },
  ];

  const timeBetweenTupleOptions = [
    { value: 0.05, label: "0.05" },
    { value: 0.2, label: "0.2" },
    { value: 0.25, label: "0.25" },
    { value: 0.5, label: "0.5" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
  ];

  return (
    <Stack>
      <Typography variant="h5" marginBottom={2}>
        {step.title}
      </Typography>
      <Typography variant="body1">{step.message}</Typography>
      <Box sx={{ display: "flex", gap: "16px" }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-approach">Approach</InputLabel>
          <Select
            size={"small"}
            value={dropdownValue}
            onChange={onDropdownChange}
            labelId={"select-approach"}
            label="Approach"
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-window">Window Size</InputLabel>
          <Select
            size={"small"}
            value={windowSizeDropdownValue.toString()}
            onChange={onWindowSizeDropdownChange}
            label={"Window Size"}
          >
            {windowSizeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", gap: "16px" }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-threshold">Threshold</InputLabel>
          <Select
            size={"small"}
            value={thresholdDropdownValue.toString()}
            onChange={onThresholdDropdownChange}
            label={"Threshold"}
          >
            {thresholdOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-time-between-tuples">
            Time Between Tuples (s)
          </InputLabel>
          <Select
            size={"small"}
            value={timeBetweenTupleDropdownValue.toString()}
            onChange={onTimeBetweenTupleDropdownChange}
            label={"Time Between Tuples (s)"}
          >
            {timeBetweenTupleOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default ChooseApproachStepComponent;
