export type ContractTeamStatus =
  | 'Active'
  | 'Inactive'
  | 'Suspended';

export type ContractTeamContactPreference =
  | 'WhatsApp'
  | 'Call'
  | 'SMS';

export interface ContractTeam {
  id: string;

  /**
   * Unique internal reference for the contract team.
   * Example: CT-0001
   */
  teamCode: string;

  /**
   * Registered/display name of the external contract team.
   */
  teamName: string;

  /**
   * Primary person responsible for communicating with the team.
   */
  contactPersonName: string;

  /**
   * Primary contact number.
   */
  primaryPhone: string;

  /**
   * Optional secondary contact number.
   */
  alternatePhone?: string;

  /**
   * Whether WhatsApp is available on the primary contact.
   */
  whatsappAvailable: boolean;

  /**
   * Preferred communication method.
   */
  preferredContact: ContractTeamContactPreference;

  /**
   * Optional email address.
   */
  email?: string;

  /**
   * Complete registered/contact address.
   */
  address: string;

  area: string;

  city: string;

  pincode: string;

  /**
   * Current operational status of the contract team.
   */
  status: ContractTeamStatus;

  /**
   * Optional internal notes.
   */
  notes?: string;

  /**
   * Audit timestamps.
   * These will be populated properly by the backend later.
   */
  createdAt?: string;

  updatedAt?: string;
}