
import React, { useState, useMemo } from 'react';
import LocationSelector from './LocationSelector';
import ComplaintForm from './ComplaintForm';
import ComplaintList from './ComplaintList';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Complaint, UserLocation } from '../types';
import { PlusCircleIcon } from './icons';

interface UserViewProps {
  allComplaints: Complaint[];
  addComplaint: (newComplaintData: Omit<Complaint, 'id' | 'status' | 'createdAt'>) => Complaint;
}

const UserView: React.FC<UserViewProps> = ({ allComplaints, addComplaint }) => {
  const [userLocation, setUserLocation] = useLocalStorage<UserLocation | null>('userLocation', null);
  const [isRaisingComplaint, setIsRaisingComplaint] = useState(false);
  const [submittedComplaintIds, setSubmittedComplaintIds] = useLocalStorage<number[]>('submittedComplaintIds', []);

  const handleLocationSave = (location: UserLocation) => {
    setUserLocation(location);
  };
  
  const handleComplaintSubmit = (newComplaintData: Omit<Complaint, 'id' | 'status' | 'createdAt'>) => {
    const newComplaint = addComplaint(newComplaintData);
    setSubmittedComplaintIds(prev => [...prev, newComplaint.id]);
    setIsRaisingComplaint(false);
  };
  
  const userComplaints = useMemo(() => {
    return allComplaints
      .filter(c => submittedComplaintIds.includes(c.id))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [allComplaints, submittedComplaintIds]);

  if (!userLocation) {
    return <LocationSelector onLocationSave={handleLocationSave} />;
  }

  if (isRaisingComplaint) {
    return <ComplaintForm prefilledLocation={userLocation} onSubmit={handleComplaintSubmit} onCancel={() => setIsRaisingComplaint(false)} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-lg border border-green-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Your Rythuvedika Location</h2>
        <p className="text-gray-600 mt-2">
          <span className="font-medium">{userLocation.village}</span>, {userLocation.mandal}, {userLocation.district}
        </p>
        <button
          onClick={() => setUserLocation(null)}
          className="mt-3 text-sm text-green-600 hover:text-green-800 font-semibold"
        >
          Change Location
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Complaints</h2>
        <button
          onClick={() => setIsRaisingComplaint(true)}
          className="flex items-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Raise a Complaint
        </button>
      </div>

      {userComplaints.length > 0 ? (
        <ComplaintList complaints={userComplaints} isAdminView={false} />
      ) : (
        <div className="text-center py-12 px-6 bg-white rounded-lg shadow-md border border-dashed border-gray-300">
          <p className="text-gray-500">You have not raised any complaints yet.</p>
          <p className="text-gray-500 mt-2">Click the button above to get started.</p>
        </div>
      )}
    </div>
  );
};

export default UserView;
