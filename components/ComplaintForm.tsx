import React, { useState } from 'react';
import type { Complaint, UserLocation } from '../types';
import { QuestionMarkCircleIcon } from './icons';

interface ComplaintFormProps {
  prefilledLocation: UserLocation;
  onSubmit: (complaintData: Omit<Complaint, 'id' | 'status' | 'createdAt'>) => void;
  onCancel: () => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ prefilledLocation, onSubmit, onCancel }) => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, '');
    
    let numberPart = digits;
    if (digits.startsWith('91')) {
      numberPart = digits.substring(2);
    }
    
    numberPart = numberPart.substring(0, 10);

    let formatted = '';
    if (numberPart.length > 0) {
      formatted = `+91-${numberPart}`;
    }
    
    setMobile(formatted);
  };

  const canSubmit = description && name && mobile.length === 14;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsConfirming(true);
  };

  const handleConfirmSubmit = () => {
    onSubmit({
      ...prefilledLocation,
      description,
      name,
      mobile,
      email
    });
    setIsConfirming(false);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-green-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Raise a New Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700">Location Details</h3>
            <div className="mt-2 p-4 bg-gray-100 rounded-md border border-gray-200">
              <p><strong>District:</strong> {prefilledLocation.district}</p>
              <p><strong>Mandal:</strong> {prefilledLocation.mandal}</p>
              <p><strong>Village/Location:</strong> {prefilledLocation.village}</p>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Complaint Description <span className="text-red-500">*</span></label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={handleMobileChange}
              placeholder="+91-XXXXXXXXXX"
              maxLength={14}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
            <p className="mt-2 text-xs text-gray-500">Enter a 10-digit Indian mobile number.</p>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email ID (Optional)</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
              <button
                  type="button"
                  onClick={onCancel}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                  Cancel
              </button>
              <button
                  type="submit"
                  disabled={!canSubmit}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                  Submit Complaint
              </button>
          </div>
        </form>
      </div>

      {isConfirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <QuestionMarkCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Confirm Submission
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to submit this complaint? Please review the details before confirming.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleConfirmSubmit}
              >
                Confirm
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => setIsConfirming(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComplaintForm;