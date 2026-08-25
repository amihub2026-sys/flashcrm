export interface AmcPlan {
  id: string;
  customerId: string;
  acUnitId: string;
  planName: string;
  startDate: string;
  endDate: string;
  totalServices: number;
  completedServices: number;
  frequencyMonths: number;
  status: 'Active' | 'Expired' | 'Cancelled';
}

export interface EwcPlan {
  id: string;
  customerId: string;
  acUnitId: string;
  provider: string;
  policyNumber?: string;
  startDate: string;
  endDate: string;
  coverage: string[];
  status: 'Active' | 'Expired' | 'Cancelled';
}
