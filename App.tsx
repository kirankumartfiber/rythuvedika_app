
import React, { useState, useCallback } from 'react';
import UserView from './components/UserView';
import AdminView from './components/AdminView';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Complaint } from './types';
import { Header } from './components/Header';
import { initialComplaints } from './constants';

type View = 'user' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<View>('user');
  const [complaints, setComplaints] = useLocalStorage<Complaint[]>('complaints', initialComplaints);
  const [nextComplaintId, setNextComplaintId] = useLocalStorage<number>('nextComplaintId', 4);

  const addComplaint = useCallback((newComplaintData: Omit<Complaint, 'id' | 'status' | 'createdAt'>) => {
    const newComplaint: Complaint = {
      ...newComplaintData,
      id: nextComplaintId,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setComplaints(prev => [...prev, newComplaint]);
    setNextComplaintId(prev => prev + 1);
    return newComplaint;
  }, [nextComplaintId, setComplaints, setNextComplaintId]);

  const updateComplaintStatus = useCallback((id: number, status: Complaint['status']) => {
    setComplaints(prevComplaints => 
      prevComplaints.map(c => c.id === id ? { ...c, status } : c)
    );
  }, [setComplaints]);

  return (
    <div className="min-h-screen bg-green-50 font-sans">
      <Header currentView={view} setView={setView} />
      <main className="p-4 sm:p-6 lg:p-8">
        {view === 'user' ? (
          <UserView allComplaints={complaints} addComplaint={addComplaint} />
        ) : (
          <AdminView allComplaints={complaints} updateComplaintStatus={updateComplaintStatus} />
        )}
      </main>
    </div>
  );
};

export default App;