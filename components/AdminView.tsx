import React, { useState, useMemo } from 'react';
import ComplaintList from './ComplaintList';
import type { Complaint, SortKey, SortDirection } from '../types';
import { LOCATION_DATA } from '../constants';
import { SearchIcon } from './icons';

interface AdminViewProps {
  allComplaints: Complaint[];
  updateComplaintStatus: (id: number, status: Complaint['status']) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ allComplaints, updateComplaintStatus }) => {
  const [districtFilter, setDistrictFilter] = useState('');
  const [mandalFilter, setMandalFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const districts = Object.keys(LOCATION_DATA);
  const mandals = districtFilter ? Object.keys(LOCATION_DATA[districtFilter] || {}) : [];
  
  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedComplaints = useMemo(() => {
    const filtered = allComplaints.filter(complaint => {
      const districtMatch = !districtFilter || complaint.district === districtFilter;
      const mandalMatch = !mandalFilter || complaint.mandal === mandalFilter;
      const searchMatch = !searchQuery || (
        complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.mobile.includes(searchQuery)
      );
      return districtMatch && mandalMatch && searchMatch;
    });

    const statusOrder: { [key in Complaint['status']]: number } = {
        'Pending': 3,
        'In Progress': 2,
        'Resolved': 1
    };

    return [...filtered].sort((a, b) => {
        let valA: string | number;
        let valB: string | number;

        switch (sortKey) {
            case 'id':
                valA = a.id;
                valB = b.id;
                break;
            case 'createdAt':
                valA = new Date(a.createdAt).getTime();
                valB = new Date(b.createdAt).getTime();
                break;
            case 'status':
                valA = statusOrder[a.status];
                valB = statusOrder[b.status];
                break;
            default:
                return 0;
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

  }, [allComplaints, districtFilter, mandalFilter, searchQuery, sortKey, sortDirection]);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistrictFilter(e.target.value);
    setMandalFilter(''); // Reset mandal filter when district changes
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Administrator Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="district-filter" className="block text-sm font-medium text-gray-700">
              Filter by District
            </label>
            <select
              id="district-filter"
              value={districtFilter}
              onChange={handleDistrictChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              <option value="">All Districts</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="mandal-filter" className="block text-sm font-medium text-gray-700">
              Filter by Mandal
            </label>
            <select
              id="mandal-filter"
              value={mandalFilter}
              onChange={e => setMandalFilter(e.target.value)}
              disabled={!districtFilter}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md disabled:bg-gray-100"
            >
              <option value="">All Mandals</option>
              {mandals.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="md:col-span-1">
            <label htmlFor="search-complaints" className="block text-sm font-medium text-gray-700">
              Search Complaints
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    id="search-complaints"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search by name, number, or keyword..."
                />
            </div>
          </div>
        </div>
      </div>
      
      <ComplaintList 
        complaints={filteredAndSortedComplaints} 
        isAdminView={true}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
        onStatusChange={updateComplaintStatus}
      />
    </div>
  );
};

export default AdminView;