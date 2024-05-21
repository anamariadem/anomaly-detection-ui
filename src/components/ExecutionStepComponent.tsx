import {
  Box,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PatientVitalsTuple } from "../models/PatientVitalsTuple";

interface StepComponentProps {
  step: {
    title: string;
    message: string;
  };
  tuples: PatientVitalsTuple[];
  warmup: number;
}

const MyTableCell = ({
  value,
  anomalyScore,
}: {
  value: number;
  anomalyScore: number;
}) => {
  return (
    <TableCell
      sx={{
        backgroundColor: anomalyScore > 0.9 ? "red" : "inherit",
        color: anomalyScore > 0.9 ? "white" : "inherit",
      }}
    >
      {value}
    </TableCell>
  );
};

const ExecutionStepComponent = ({
  step,
  tuples,
  warmup,
}: StepComponentProps) => {
  return (
    <>
      <Typography variant="h5" marginBottom={2}>
        {step.title}
      </Typography>
      <Typography variant="body1">{step.message}</Typography>
      {warmup > 0 && warmup < 100 && (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="body2" color="textSecondary">
              {`Warming up... ${Math.round(warmup)}%`}
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={warmup} />
        </>
      )}
      {tuples.length > 0 && (
        <TableContainer style={{ maxHeight: "500px", overflow: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Heart Rate</TableCell>
                <TableCell>Systolic Blood Pressure</TableCell>
                <TableCell>Diastolic Blood Pressure</TableCell>
                <TableCell>Temperature</TableCell>
                <TableCell>Oxygen Saturation</TableCell>
                <TableCell>Respiratory Rate</TableCell>
                <TableCell>Glucose</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tuples
                .slice()
                .reverse()
                .map((tuple) => (
                  <TableRow key={tuple.id}>
                    <TableCell>{tuple.id}</TableCell>
                    <TableCell>{tuple.timestamp}</TableCell>
                    <MyTableCell
                      value={tuple.heart_rate}
                      anomalyScore={tuple.anomaly_scores?.heart_rate || 0}
                    />
                    <MyTableCell
                      value={tuple.systolic_blood_pressure}
                      anomalyScore={
                        tuple.anomaly_scores?.systolic_blood_pressure || 0
                      }
                    />
                    <MyTableCell
                      value={tuple.diastolic_blood_pressure}
                      anomalyScore={
                        tuple.anomaly_scores?.diastolic_blood_pressure || 0
                      }
                    />
                    <MyTableCell
                      value={tuple.temperature}
                      anomalyScore={tuple.anomaly_scores?.temperature || 0}
                    />
                    <MyTableCell
                      value={tuple.oxygen_saturation}
                      anomalyScore={
                        tuple.anomaly_scores?.oxygen_saturation || 0
                      }
                    />
                    <MyTableCell
                      value={tuple.respiratory_rate}
                      anomalyScore={tuple.anomaly_scores?.respiratory_rate || 0}
                    />
                    <MyTableCell
                      value={tuple.glucose}
                      anomalyScore={tuple.anomaly_scores?.glucose || 0}
                    />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ExecutionStepComponent;
