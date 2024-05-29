import { PatientVitalsTuple } from "../models/PatientVitalsTuple";
import { AxisOptions, Chart } from "react-charts";
import { useMemo } from "react";

interface PlotsComponentProps {
  tuples: PatientVitalsTuple[];
  field: string;
  threshold: number;
}

type AnomalyScoreTuple = {
  timestamp: Date;
  anomalyValue: number;
};

type Series = {
  label: string;
  data: AnomalyScoreTuple[];
};

const PlotComponent = ({ tuples, field, threshold }: PlotsComponentProps) => {
  const data: Series[] = [
    {
      label: `${field} anomaly score`,
      data: tuples.map((tuple) => ({
        timestamp: new Date(tuple.timestamp),
        anomalyValue:
          tuple.anomaly_scores[field as keyof typeof tuple.anomaly_scores] || 0,
      })),
    },
    {
      label: "Threshold",
      data: tuples.map((tuple) => ({
        timestamp: new Date(tuple.timestamp),
        anomalyValue: threshold,
      })),
    },
  ];

  const primaryAxis = useMemo(
    (): AxisOptions<AnomalyScoreTuple> => ({
      getValue: (datum) => datum.timestamp,
    }),
    [],
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<AnomalyScoreTuple>[] => [
      {
        getValue: (datum) => datum.anomalyValue,
      },
    ],
    [],
  );

  return (
    <Chart
      style={{ height: "90%", width: "100%" }}
      options={{
        data,
        primaryAxis,
        secondaryAxes,
      }}
    />
  );
};

export default PlotComponent;
