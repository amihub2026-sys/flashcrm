export type ContractTeamJobType =
  | 'Installation'
  | 'Service'
  | 'Repair'
  | 'Other';

export type ContractTeamJobStatus =
  | 'Pending'
  | 'Assigned'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export type ContractTeamMaterialSource =
  | 'Our Center'
  | 'Outside Purchase'
  | 'Both'
  | 'None';


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


  // ============================================================
  // CUSTOMER PAYMENT
  // ============================================================

  customerAmount: number;
  customerAmountCollected: number;


  // ============================================================
  // MATERIALS
  // ============================================================

  materialSource: ContractTeamMaterialSource;

  ourMaterialCost: number;
  outsideMaterialCost: number;

  totalMaterialCost: number;


  // ============================================================
  // CONTRACT TEAM SETTLEMENT
  // ============================================================

  teamAmount: number;
  teamAmountPaid: number;

  pendingTeamSettlement: number;


  // ============================================================
  // FINANCIAL RESULT
  // ============================================================

  totalCost: number;
  balanceAmount: number;


  // ============================================================
  // NOTES
  // ============================================================

  notes: string;

  createdAt: string;
  updatedAt: string;
}