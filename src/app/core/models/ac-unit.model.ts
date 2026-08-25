export type AcUnitType =
  | 'Split'
  | 'Window'
  | 'Cassette'
  | 'Tower'
  | 'Ductable'
  | 'Central'
  | 'Other';

export type AcUnitStatus =
  | 'Active'
  | 'Inactive'
  | 'Removed';

export interface AcUnit {

  id: string;

  customerId: string;

  brand: string;

  authorizedBrand?: boolean;

  type: AcUnitType;

  tonnage?: string;

  indoorModelNumber?: string;

  indoorSerialNumber?: string;

  outdoorModelNumber?: string;

  outdoorSerialNumber?: string;

  installationDate?: string;

  warrantyEndDate?: string;

  status: AcUnitStatus;

}