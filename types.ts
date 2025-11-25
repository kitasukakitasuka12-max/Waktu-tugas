export interface CommissionData {
  amount: number;
  currency: string;
  message: string;
  taskId: string;
}

export enum TimerStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED', // Optional, technically not requested but good to have in type def
  COMPLETED = 'COMPLETED',
}