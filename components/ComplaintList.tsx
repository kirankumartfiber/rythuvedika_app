
import React from 'react';
import type { Complaint, SortKey, SortDirection } from '../types';
import { TagIcon, CalendarIcon, ChevronUpIcon, ChevronDownIcon } from './icons';

interface ComplaintListProps {
  complaints: Complaint[];
  isAdminView: boolean;
  sortKey?: SortKey;
  sortDirection?: SortDirection;
  onSort?: (key: SortKey) => void;
  onStatusChange?: (id: number, status: Complaint['status']) => void;
}

const statusColors: { [key in Complaint['status']]: string } = {
  Pending: 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Resolved: 'bg-green-100 text-green-800',
};

const statusBorderColors: { [key in Complaint['status']]: string } = {
    Pending: 'border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500',
    'In Progress': 'border-blue-500 focus:ring-blue-500 focus:border-blue-500',
    Resolved: 'border-green-500 focus:ring-green-500 focus:border-green-500',
};

const ComplaintCard: React.FC<{ complaint: Complaint }> = ({ complaint }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="p-5">
            <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-green-700">
                    COMPLAINT #{complaint.id}
                </p>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[complaint.status]}`}>
                    {complaint.status}
                </span>
            </div>
            <p className="mt-3 text-gray-700 text-base">{complaint.description}</p>
        </div>
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span>Submitted on: {new Date(complaint.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    </div>
);


const AdminComplaintTable: React.FC<{ 
    complaints: Complaint[], 
    sortKey: SortKey, 
    sortDirection: SortDirection, 
    onSort: (key: SortKey) => void,
    onStatusChange: (id: number, status: Complaint['status']) => void 
}> = ({ complaints, sortKey, sortDirection, onSort, onStatusChange }) => {

    const SortableHeader: React.FC<{ title: string, sortByKey: SortKey }> = ({ title, sortByKey }) => {
        const isActive = sortKey === sortByKey;
        return (
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                <button className="flex items-center space-x-1 group" onClick={() => onSort(sortByKey)}>
                    <span>{title}</span>
                    <span className="opacity-50 group-hover:opacity-100">
                    {isActive ? (
                        sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    ) : (
                        <ChevronUpIcon className="w-4 h-4 text-gray-300" />
                    )}
                    </span>
                </button>
            </th>
        );
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <SortableHeader title="ID" sortByKey="id" />
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Location</th>
                        <SortableHeader title="Date" sortByKey="createdAt" />
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Submitted By</th>
                        <SortableHeader title="Status" sortByKey="status" />
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {complaints.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{c.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <div>{c.village}</div>
                                <div className="text-xs text-gray-400">{c.mandal}, {c.district}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(c.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 max-w-sm" title={c.description}>
                                <span className="line-clamp-2">{c.description}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <div className="font-medium">{c.name}</div>
                                <div className="text-xs text-gray-400">{c.mobile}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[c.status]}`}>
                                    {c.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <select
                                    value={c.status}
                                    onChange={(e) => onStatusChange(c.id, e.target.value as Complaint['status'])}
                                    className={`text-sm rounded-md border-2 bg-white ${statusBorderColors[c.status]}`}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ComplaintList: React.FC<ComplaintListProps> = ({ complaints, isAdminView, sortKey, sortDirection, onSort, onStatusChange }) => {
    if (complaints.length === 0) {
        return (
            <div className="text-center py-12 px-6 bg-white rounded-lg shadow-md border border-dashed border-gray-300">
                <TagIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No Complaints Found</h3>
                <p className="mt-1 text-sm text-gray-500">There are no complaints matching the current criteria.</p>
            </div>
        )
    }

    if (isAdminView && onSort && sortKey && sortDirection && onStatusChange) {
        return <AdminComplaintTable complaints={complaints} sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} onStatusChange={onStatusChange} />;
    }

    return (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {complaints.map(c => (
                <ComplaintCard key={c.id} complaint={c} />
            ))}
        </div>
    );
};

export default ComplaintList;