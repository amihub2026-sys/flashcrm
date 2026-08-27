export type ContractTeamDocumentType =
  | 'Aadhaar'
  | 'PAN'
  | 'Address Proof'
  | 'Bank Proof'
  | 'Agreement'
  | 'Other';

export type ContractTeamDocumentStatus =
  | 'Pending'
  | 'Verified'
  | 'Rejected'
  | 'Expired';

export interface ContractTeamDocument {
  id: string;

  /**
   * Contract team to which this document belongs.
   */
  teamId: string;

  /**
   * Optional member ID.
   * Use this when the document belongs to a specific
   * team member rather than the entire team.
   */
  memberId?: string;

  /**
   * Type/category of KYC or supporting document.
   */
  documentType: ContractTeamDocumentType;

  /**
   * Document number/reference.
   * Example: PAN number or other official reference.
   *
   * Sensitive values should be handled securely by the backend.
   */
  documentNumber?: string;

  /**
   * Name appearing on the document.
   */
  documentHolderName?: string;

  /**
   * Reference to the uploaded document.
   * The backend will eventually provide the actual secure URL.
   */
  documentUrl?: string;

  /**
   * Optional original file name.
   */
  fileName?: string;

  /**
   * Document verification status.
   */
  status: ContractTeamDocumentStatus;

  /**
   * Date on which the document was verified.
   */
  verifiedAt?: string;

  /**
   * Optional document expiry date.
   */
  expiryDate?: string;

  /**
   * Internal notes regarding this document.
   */
  notes?: string;

  createdAt?: string;

  updatedAt?: string;
}