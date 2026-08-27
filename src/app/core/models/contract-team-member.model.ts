export type ContractTeamMemberRole =
  | 'Team Leader'
  | 'Technician'
  | 'Helper'
  | 'Electrician'
  | 'Other';

export type ContractTeamMemberStatus =
  | 'Active'
  | 'Inactive';

export interface ContractTeamMember {
  id: string;

  /**
   * Contract team this member belongs to.
   */
  teamId: string;

  /**
   * Member's full name.
   */
  name: string;

  /**
   * Primary mobile number.
   */
  phone: string;

  /**
   * Optional alternate contact number.
   */
  alternatePhone?: string;

  /**
   * Member's role within the contract team.
   */
  role: ContractTeamMemberRole;

  /**
   * Optional profile photo URL.
   */
  profilePhotoUrl?: string;

  /**
   * Address of the member.
   */
  address?: string;

  area?: string;

  city?: string;

  pincode?: string;

  /**
   * KYC information will be expanded into
   * dedicated document records later.
   */
  kycVerified: boolean;

  /**
   * Current member status.
   */
  status: ContractTeamMemberStatus;

  /**
   * Optional internal notes.
   */
  notes?: string;

  createdAt?: string;

  updatedAt?: string;
}