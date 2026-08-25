import { Injectable } from '@angular/core';

import { Customer } from '../models/customer.model';
import { AcUnit } from '../models/ac-unit.model';
import { Technician } from '../models/technician.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  readonly customers: Customer[] = [

    {
      id: '1',
      customerCode: 'CUS-1001',
      name: 'Rajesh Kumar',
      primaryPhone: '9876543210',
      whatsappAvailable: true,
      preferredContact: 'WhatsApp',
      customerType: 'Residential',
      address: '12, Lake View Road',
      area: 'K. Pudur',
      city: 'Madurai',
      pincode: '625007',
      acCount: 2,
      nextActionDate: '2026-08-25',
      nextActionLabel: 'AMC Service',
      status: 'Active'
    },

    {
      id: '2',
      customerCode: 'CUS-1002',
      name: 'Meena Stores',
      primaryPhone: '9840011223',
      whatsappAvailable: true,
      preferredContact: 'WhatsApp',
      customerType: 'Shop',
      address: '88, Main Road',
      area: 'Anna Nagar',
      city: 'Madurai',
      pincode: '625020',
      acCount: 4,
      nextActionDate: '2026-08-24',
      nextActionLabel: 'Call Follow-up',
      status: 'Active'
    },

    {
      id: '3',
      customerCode: 'CUS-1003',
      name: 'Suresh Babu',
      primaryPhone: '9790012345',
      whatsappAvailable: false,
      preferredContact: 'Call',
      customerType: 'Residential',
      address: '4, East Street',
      area: 'Vandiyur',
      city: 'Madurai',
      pincode: '625020',
      acCount: 1,
      nextActionDate: '2026-08-28',
      nextActionLabel: 'EWC Expiry',
      status: 'Active'
    },

    {
      id: '4',
      customerCode: 'CUS-1004',
      name: 'A1 Office Solutions',
      primaryPhone: '9092555500',
      whatsappAvailable: true,
      preferredContact: 'WhatsApp',
      customerType: 'Office',
      address: '201, Business Tower',
      area: 'KK Nagar',
      city: 'Madurai',
      pincode: '625020',
      acCount: 6,
      nextActionDate: '2026-08-26',
      nextActionLabel: 'General Service',
      status: 'Active'
    }

  ];


  /*
   * =====================================================
   * AC UNITS
   * =====================================================
   *
   * Frontend mock data only.
   *
   * Later:
   *
   * Angular
   * ↓
   * Node.js API
   * ↓
   * MongoDB
   */

  readonly acUnits: AcUnit[] = [

    /*
     * Rajesh Kumar
     */

    {
      id: 'ac-1001',
      customerId: '1',
      brand: 'O General',
      authorizedBrand: true,
      type: 'Split',
      tonnage: '1.5 Ton',
      indoorModelNumber: 'ASGG18CGTA',
      indoorSerialNumber: 'IN-RK-001',
      outdoorModelNumber: 'AOGG18CGTA',
      outdoorSerialNumber: 'OUT-RK-001',
      installationDate: '2024-06-15',
      warrantyEndDate: '2027-06-14',
      status: 'Active'
    },

    {
      id: 'ac-1002',
      customerId: '1',
      brand: 'LG',
      authorizedBrand: false,
      type: 'Split',
      tonnage: '1 Ton',
      indoorModelNumber: 'PS-Q12YNZE',
      indoorSerialNumber: 'IN-RK-002',
      outdoorModelNumber: 'PS-Q12YNZE-ODU',
      outdoorSerialNumber: 'OUT-RK-002',
      installationDate: '2023-11-20',
      status: 'Active'
    },


    /*
     * Meena Stores
     */

    {
      id: 'ac-2001',
      customerId: '2',
      brand: 'Amstrad',
      authorizedBrand: true,
      type: 'Split',
      tonnage: '1.5 Ton',
      indoorModelNumber: 'AM-18INV',
      indoorSerialNumber: 'IN-MS-001',
      outdoorModelNumber: 'AM-18INV-OD',
      outdoorSerialNumber: 'OUT-MS-001',
      installationDate: '2024-02-05',
      status: 'Active'
    },

    {
      id: 'ac-2002',
      customerId: '2',
      brand: 'Cruise',
      authorizedBrand: true,
      type: 'Split',
      tonnage: '2 Ton',
      indoorModelNumber: 'CR-24INV',
      indoorSerialNumber: 'IN-MS-002',
      outdoorModelNumber: 'CR-24INV-OD',
      outdoorSerialNumber: 'OUT-MS-002',
      installationDate: '2024-02-05',
      status: 'Active'
    },

    {
      id: 'ac-2003',
      customerId: '2',
      brand: 'Voltas',
      authorizedBrand: false,
      type: 'Cassette',
      tonnage: '2 Ton',
      indoorModelNumber: 'VOL-CAS-24',
      indoorSerialNumber: 'IN-MS-003',
      outdoorModelNumber: 'VOL-CAS-24-OD',
      outdoorSerialNumber: 'OUT-MS-003',
      status: 'Active'
    },

    {
      id: 'ac-2004',
      customerId: '2',
      brand: 'Blue Star',
      authorizedBrand: false,
      type: 'Split',
      tonnage: '1.5 Ton',
      indoorModelNumber: 'BS-18INV',
      indoorSerialNumber: 'IN-MS-004',
      outdoorModelNumber: 'BS-18INV-OD',
      outdoorSerialNumber: 'OUT-MS-004',
      status: 'Active'
    },


    /*
     * Suresh Babu
     */

    {
      id: 'ac-3001',
      customerId: '3',
      brand: 'Cruise',
      authorizedBrand: true,
      type: 'Window',
      tonnage: '1.5 Ton',
      indoorModelNumber: 'CR-WIN-18',
      indoorSerialNumber: 'IN-SB-001',
      installationDate: '2025-01-10',
      status: 'Active'
    },


    /*
     * A1 Office Solutions
     */

    {
      id: 'ac-4001',
      customerId: '4',
      brand: 'O General',
      authorizedBrand: true,
      type: 'Cassette',
      tonnage: '2 Ton',
      indoorModelNumber: 'OG-CAS-24-A',
      indoorSerialNumber: 'IN-A1-001',
      outdoorModelNumber: 'OG-CAS-24-A-OD',
      outdoorSerialNumber: 'OUT-A1-001',
      status: 'Active'
    },

    {
      id: 'ac-4002',
      customerId: '4',
      brand: 'O General',
      authorizedBrand: true,
      type: 'Cassette',
      tonnage: '2 Ton',
      indoorModelNumber: 'OG-CAS-24-B',
      indoorSerialNumber: 'IN-A1-002',
      outdoorModelNumber: 'OG-CAS-24-B-OD',
      outdoorSerialNumber: 'OUT-A1-002',
      status: 'Active'
    },

    {
      id: 'ac-4003',
      customerId: '4',
      brand: 'Daikin',
      authorizedBrand: false,
      type: 'Split',
      tonnage: '1.5 Ton',
      indoorModelNumber: 'DAI-18-A',
      indoorSerialNumber: 'IN-A1-003',
      outdoorModelNumber: 'DAI-18-A-OD',
      outdoorSerialNumber: 'OUT-A1-003',
      status: 'Active'
    },

    {
      id: 'ac-4004',
      customerId: '4',
      brand: 'LG',
      authorizedBrand: false,
      type: 'Split',
      tonnage: '1.5 Ton',
      indoorModelNumber: 'LG-18-B',
      indoorSerialNumber: 'IN-A1-004',
      outdoorModelNumber: 'LG-18-B-OD',
      outdoorSerialNumber: 'OUT-A1-004',
      status: 'Active'
    },

    {
      id: 'ac-4005',
      customerId: '4',
      brand: 'Amstrad',
      authorizedBrand: true,
      type: 'Split',
      tonnage: '2 Ton',
      indoorModelNumber: 'AM-24-C',
      indoorSerialNumber: 'IN-A1-005',
      outdoorModelNumber: 'AM-24-C-OD',
      outdoorSerialNumber: 'OUT-A1-005',
      status: 'Active'
    },

    {
      id: 'ac-4006',
      customerId: '4',
      brand: 'Cruise',
      authorizedBrand: true,
      type: 'Split',
      tonnage: '1 Ton',
      indoorModelNumber: 'CR-12-D',
      indoorSerialNumber: 'IN-A1-006',
      outdoorModelNumber: 'CR-12-D-OD',
      outdoorSerialNumber: 'OUT-A1-006',
      status: 'Active'
    }

  ];


  /*
   * =====================================================
   * TECHNICIANS
   * =====================================================
   */

  readonly technicians: Technician[] = [

    {
      id: 't1',
      name: 'Kumar',
      phone: '9000011111',
      skills: [
        'Split AC',
        'Installation',
        'AMC'
      ],
      availability: 'Available',
      activeJobs: 2
    },

    {
      id: 't2',
      name: 'Mani',
      phone: '9000022222',
      skills: [
        'Repair',
        'PCB',
        'Gas Filling'
      ],
      availability: 'Busy',
      activeJobs: 3
    },

    {
      id: 't3',
      name: 'Suresh',
      phone: '9000033333',
      skills: [
        'Commercial AC',
        'Electrical'
      ],
      availability: 'Available',
      activeJobs: 1
    }

  ];

}