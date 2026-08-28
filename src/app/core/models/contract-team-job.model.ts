export type ContractTeamJobType =
  | 'Installation'
  | 'Service'
  | 'Repair'
  | 'Warranty'
  | 'Other';

export type ContractTeamJobStatus =
  | 'Pending'
  | 'Assigned'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export type ContractTeamMaterialSource =
  | 'Office'
  | 'Outside'
  | 'Customer'
  | 'None'
  | 'Mixed';

export interface ContractTeamJobMaterial {
  id: string;
  materialId?: string;
  materialName: string;
  unit: string;
  quantity: number;
  source: 'Office' | 'Outside' | 'Customer';
  fixedRate: number;
  outsidePurchaseAmount: number;
  customerPaid: number;
  amount: number;
  balance: number;
}

export interface ContractTeamJob {
  id: string;
  teamId: string;
  customerId?: string;

  customerName: string;
  customerPhone: string;
  customerAddress: string;

  jobType: ContractTeamJobType;
  serviceDescription: string;
  serviceDate: string;
  assignedMemberId?: string;
  assignedMemberName?: string;
  status: ContractTeamJobStatus;

  acQuantity: number;
  ratePerAc: number;
  totalInstallationAmount: number;

  customerAmount: number;
  customerAmountCollected: number;
  customerPendingAmount: number;

  materialSource: ContractTeamMaterialSource;
  materials: ContractTeamJobMaterial[];

  officeMaterialCost: number;
  outsideMaterialCost: number;
  customerMaterialCost: number;
  totalMaterialCost: number;

  technicianHeldAmount: number;
  centerAmount: number;

  teamAmount: number;
  teamAmountPaid: number;
  pendingTeamSettlement: number;

  totalCost: number;
  balanceAmount: number;

  notes: string;
  createdAt: string;
  updatedAt: string;
}
