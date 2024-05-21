export interface PatientVitalsTuple {
  id: string;
  timestamp: string;
  heart_rate: number;
  systolic_blood_pressure: number;
  diastolic_blood_pressure: number;
  temperature: number;
  oxygen_saturation: number;
  respiratory_rate: number;
  glucose: number;
  anomaly_scores: {
    heart_rate?: number;
    systolic_blood_pressure?: number;
    diastolic_blood_pressure?: number;
    temperature?: number;
    oxygen_saturation?: number;
    respiratory_rate?: number;
    glucose?: number;
  };
}
