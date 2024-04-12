export interface FetchedData {
  date: string;
  sum: number;
  type: string;
}

export interface OutPutObject {
  last_7_days_transactions_credit_debit_totals?: FetchedData[];
  last_7_days_transactions_totals_admin?: FetchedData[];
}

export interface DailySum {
  debit?: number;
  credit?: number;
  type?: string;
  date?: string;
  sum?: number;
}

export interface DailySums {
  [date: string]: DailySum;
}

export interface GraphProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

export interface TodaySunOfTheValue {
  totalDailySums: DailySum[];
}
export interface ApiStatusAndData {
  status: string;
  data: FetchedData[];
  errorMsg?: string;
}

export interface CrediteAndDebitList {
  debit?: number;
  credit?: number;
  type?: string;
  date?: string;
  sum?: number;
}
