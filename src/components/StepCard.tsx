import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Grid,
  Modal,
} from "@mui/material";
import { toast } from "react-toastify";
import ChooseApproachStepComponent from "./ChooseApproachStepComponent";
import { PatientVitalsTuple } from "../models/PatientVitalsTuple";
import ExecutionStepComponent from "./ExecutionStepComponent";
import PlotComponent from "./PlotComponent";

interface StepInfo {
  title: string;
  message: string;
  shortTitle: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const steps: StepInfo[] = [
  {
    shortTitle: "Choose Approach",
    title: "Welcome to Anomaly Detection Experiment Runner!",
    message:
      "This is an environment for running anomaly detection experiments on patient vitals. Get started by selecting an option below and click next.",
  },
  {
    shortTitle: "Execution",
    title: "Using the approach you selected, we are now processing the data.",
    message:
      "The data is being processed and anomalies are being detected. The anomalies over 0.9 will be highlighted with " +
      "red in the table. Once you clicked STOP, the anomaly score plots are generated. Click the show plots button to view them.",
  },
];

const StepCard: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [dropdownValue, setDropdownValue] = useState("");
  const [windowSizeDropdownValue, setWindowSizeDropdownValue] = useState(100);
  const [thresholdDropdownValue, setThresholdDropdownValue] = useState(0.9);
  const [timeBetweenTuple, setTimeBetweenTuple] = useState(0.05);

  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [tuples, setTuples] = useState<PatientVitalsTuple[]>([]);
  const [tuplesToDiplay, setTuplesToDisplay] = useState<PatientVitalsTuple[]>(
    [],
  );
  const [warmup, setWarmup] = useState(0);
  const [showPlots, setShowPlots] = useState(false);
  const [displayShowPlotsButton, setDisplayShowPlotsButton] = useState(false);
  const [isExeutionStopped, setIsExecutionStopped] = useState(false);

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8001/");

    websocket.onopen = () => {
      console.log("<< ----- SOCKET CONNECTED ----- >>");
      toast.success("🦄 Connected to websockets", {
        position: "top-right",
        autoClose: 5000,
      });
    };

    websocket.onclose = () => {
      toast.error("🦄 Disconnected from websockets", {
        position: "top-right",
        autoClose: 5000,
      });
    };

    websocket.onmessage = (event) => {
      const eventObject = JSON.parse(event.data);
      const { type, data } = eventObject;

      if (type === "processed_tuples") {
        setTuples((prevState) => [...prevState, { ...data }]);
        setTuplesToDisplay((prevState) =>
          [...prevState, { ...data }].slice(-100),
        );
      }

      if (type === "warmup_update") {
        setWarmup(data.warmup * 100);
      }
    };

    setWebSocket(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const handleNext = () => {
    const objectToSend = {
      event: "start",
      approach: dropdownValue,
      window_size: windowSizeDropdownValue,
      threshold: thresholdDropdownValue,
      sleep_time: timeBetweenTuple,
    };

    webSocket?.send(JSON.stringify(objectToSend));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setTuples([]);
    setTuplesToDisplay([]);
    setIsExecutionStopped(false);
  };

  const handleDropdownChange = (event: any) => {
    setDropdownValue(event.target.value as string);
  };

  const handleWindowDropdownChange = (event: any) => {
    const windowSize = Number(event.target.value as string);
    setWindowSizeDropdownValue(windowSize);
  };

  const handleThresholdDropdownChange = (event: any) => {
    const threshold = Number(event.target.value as string);
    setThresholdDropdownValue(threshold);
  };

  const handleTimeBetweenTupleChange = (event: any) => {
    const timeBetweenTuple = Number(event.target.value as string);
    setTimeBetweenTuple(timeBetweenTuple);
  };

  const handleStopExecution = () => {
    webSocket?.send(JSON.stringify({ event: "stop" }));
    setIsExecutionStopped(true);
    setDisplayShowPlotsButton(tuples.length > 0);
  };

  return (
    <Card
      sx={{
        width: "80%",
        bgcolor: "background.paper",
        boxShadow: 3,
        maxHeight: "80%",
      }}
    >
      <CardContent>
        <Stepper activeStep={activeStep} sx={{ marginBottom: 2 }}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.shortTitle}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 ? (
          <ChooseApproachStepComponent
            step={steps[activeStep]}
            dropdownValue={dropdownValue}
            onDropdownChange={handleDropdownChange}
            onWindowSizeDropdownChange={handleWindowDropdownChange}
            windowSizeDropdownValue={windowSizeDropdownValue}
            onThresholdDropdownChange={handleThresholdDropdownChange}
            thresholdDropdownValue={thresholdDropdownValue}
            timeBetweenTupleDropdownValue={timeBetweenTuple}
            onTimeBetweenTupleDropdownChange={handleTimeBetweenTupleChange}
          />
        ) : activeStep === 1 ? (
          <ExecutionStepComponent
            step={steps[activeStep]}
            tuples={tuplesToDiplay}
            warmup={warmup}
            threshold={thresholdDropdownValue}
          />
        ) : (
          <div>
            <p>All steps completed</p>
          </div>
        )}
        {activeStep < steps.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={
              !dropdownValue ||
              !windowSizeDropdownValue ||
              !thresholdDropdownValue ||
              !timeBetweenTuple
            }
            sx={{ marginTop: 2 }}
          >
            Next
          </Button>
        )}

        {activeStep > 0 && (
          <Box display={"flex"} gap={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBack}
              disabled={!dropdownValue}
              sx={{ marginTop: 2 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleStopExecution}
              disabled={isExeutionStopped}
              sx={{ marginTop: 2 }}
            >
              Stop
            </Button>
            {displayShowPlotsButton && (
              <Button
                variant="contained"
                color="info"
                onClick={() => setShowPlots(true)}
                sx={{ marginTop: 2 }}
              >
                Show Plots
              </Button>
            )}
          </Box>
        )}
        <Modal
          open={showPlots}
          onClose={() => setShowPlots(false)}
          sx={{
            ".MuiDialog-paper": { width: "80%", height: "80%" },
          }}
        >
          <Box sx={style}>
            <Grid container spacing={3} sx={{ height: "100%", width: "100%" }}>
              <Grid item xs={12} sm={6} md={4} lg={3} key={"heart_rate"}>
                <PlotComponent
                  tuples={tuples}
                  field={"heart_rate"}
                  threshold={thresholdDropdownValue}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={"systolic_blood_pressure"}
              >
                <PlotComponent
                  tuples={tuples}
                  field={"systolic_blood_pressure"}
                  threshold={thresholdDropdownValue}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={"diastolic_blood_pressure"}
              >
                <PlotComponent
                  tuples={tuples}
                  field={"diastolic_blood_pressure"}
                  threshold={thresholdDropdownValue}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} key={"temperature"}>
                <PlotComponent
                  tuples={tuples}
                  field={"temperature"}
                  threshold={thresholdDropdownValue}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} key={"oxygen_saturation"}>
                <PlotComponent
                  tuples={tuples}
                  field={"oxygen_saturation"}
                  threshold={thresholdDropdownValue}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} key={"respiratory_rate"}>
                <PlotComponent
                  tuples={tuples}
                  field={"respiratory_rate"}
                  threshold={thresholdDropdownValue}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} key={"glucose"}>
                <PlotComponent
                  tuples={tuples}
                  field={"glucose"}
                  threshold={thresholdDropdownValue}
                />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
};

export default StepCard;
