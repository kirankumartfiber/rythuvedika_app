
export interface Complaint {
  id: number;
  district: string;
  mandal: string;
  village: string;
  description: string;
  name: string;
  mobile: string;
  email: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface LocationData {
  [district: string]: {
    [mandal: string]: string[];
  };
}

export interface UserLocation {
    district: string;
    mandal: string;
    village: string;
}

export type SortKey = 'id' | 'createdAt' | 'status';
export type SortDirection = 'asc' | 'desc';
