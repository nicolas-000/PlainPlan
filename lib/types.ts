export type Seniority = 'junior' | 'semi-senior' | 'senior';

export interface Worker {
  id: string;
  name: string;
  role: string;
  seniority: Seniority;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate?: string;
  workerIds: string[];
}
