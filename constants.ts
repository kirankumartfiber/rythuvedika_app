
import type { LocationData, Complaint } from './types';

export const LOCATION_DATA: LocationData = {
  "Adilabad": {
    "Adilabad (Urban)": ["Adilabad", "Dasnapur", "Anukunta"],
    "Jainath": ["Jainath", "Bela", "Sirikonda"],
    "Tamsi": ["Tamsi", "Gona", "Kapparla"]
  },
  "Karimnagar": {
    "Karimnagar (Urban)": ["Karimnagar", "Rekurthi", "Alugunur"],
    "Ganneruvaram": ["Ganneruvaram", "Gundlapalli", "Jangapalli"],
    "Manakondur": ["Manakondur", "Vemulawada", "GATTUDUDDENAPALLY"]
  },
  "Warangal": {
    "Warangal": ["Warangal", "Hanamkonda", "Kazipet"],
    "Geesugonda": ["Geesugonda", "Gorrekunta", "Machapur"],
    "Wardhannapet": ["Wardhannapet", "Inavole", "Damera"]
  }
};

export const initialComplaints: Complaint[] = [
    {
      id: 1,
      district: 'Karimnagar',
      mandal: 'Karimnagar (Urban)',
      village: 'Rekurthi',
      description: 'Irrigation water supply is inconsistent. Pumps are not working correctly.',
      name: 'Ramesh Kumar',
      mobile: '9876543210',
      email: 'ramesh.k@example.com',
      status: 'Resolved',
      createdAt: '2023-10-10T10:00:00Z',
    },
    {
      id: 2,
      district: 'Warangal',
      mandal: 'Geesugonda',
      village: 'Gorrekunta',
      description: 'Request for soil testing services. Haven\'t received a visit from the agricultural officer.',
      name: 'Sunitha Reddy',
      mobile: '9123456780',
      email: 'sunitha.r@example.com',
      status: 'In Progress',
      createdAt: '2023-10-22T14:30:00Z',
    },
    {
        id: 3,
        district: 'Adilabad',
        mandal: 'Jainath',
        village: 'Bela',
        description: 'Fertilizer subsidy has not been credited to my account for the last quarter.',
        name: 'Anand Rao',
        mobile: '9988776655',
        email: 'anand.rao@example.com',
        status: 'Pending',
        createdAt: '2023-10-25T09:15:00Z',
      },
];
