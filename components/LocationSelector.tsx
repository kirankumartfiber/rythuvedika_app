
import React, { useState, useMemo } from 'react';
import type { UserLocation } from '../types';
import { LOCATION_DATA } from '../constants';

interface LocationSelectorProps {
  onLocationSave: (location: UserLocation) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationSave }) => {
  const [district, setDistrict] = useState('');
  const [mandal, setMandal] = useState('');
  const [village, setVillage] = useState('');

  const districts = Object.keys(LOCATION_DATA);
  const mandals = useMemo(() => district ? Object.keys(LOCATION_DATA[district]) : [], [district]);
  const villages = useMemo(() => (district && mandal) ? LOCATION_DATA[district][mandal] : [], [district, mandal]);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistrict(e.target.value);
    setMandal('');
    setVillage('');
  };

  const handleMandalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMandal(e.target.value);
    setVillage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (district && mandal && village) {
      onLocationSave({ district, mandal, village });
    }
  };

  const canSubmit = district && mandal && village;

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-green-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Set Your Rythuvedika</h2>
      <p className="text-center text-gray-500 mb-6">Select your location to proceed.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
          <select id="district" value={district} onChange={handleDistrictChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
            <option value="">Select District</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="mandal" className="block text-sm font-medium text-gray-700">Mandal</label>
          <select id="mandal" value={mandal} onChange={handleMandalChange} disabled={!district} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md disabled:bg-gray-100">
            <option value="">Select Mandal</option>
            {mandals.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="village" className="block text-sm font-medium text-gray-700">Village / Location</label>
          <select id="village" value={village} onChange={e => setVillage(e.target.value)} disabled={!mandal} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md disabled:bg-gray-100">
            <option value="">Select Village</option>
            {villages.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <button type="submit" disabled={!canSubmit} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocationSelector;
