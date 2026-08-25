export interface Technician {
  id: string;
  name: string;
  phone: string;
  skills: string[];
  availability: 'Available' | 'Busy' | 'Leave';
  activeJobs: number;
}
