export type CustomerType = 'Residential' | 'Commercial' | 'Office' | 'Shop' | 'Apartment';
export type ContactPreference = 'WhatsApp' | 'Call' | 'SMS';

export interface Customer {
  id: string;
  customerCode: string;
  name: string;
  primaryPhone: string;
  alternatePhone?: string;
  whatsappAvailable: boolean;
  preferredContact: ContactPreference;
  customerType: CustomerType;
  address: string;
  area: string;
  city: string;
  pincode: string;
  acCount: number;
  nextActionDate?: string;
  nextActionLabel?: string;
  status: 'Active' | 'Inactive';
  notes?: string;
}
