import React, { useState } from 'react';

const RequestLeaveTab = ({ onSubmitLeave }) => {
  const [newLeave, setNewLeave] = useState({ type: 'Sick Leave', start: '', end: '', reason: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitLeave(newLeave);
    setNewLeave({ type: 'Sick Leave', start: '', end: '', reason: '' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-w-xl p-6">
      <h3 className="text-sm font-bold text-gray-800 mb-4 border-b pb-2">New Leave Application Submission</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold text-gray-500 mb-1">Leave Classification</label>
          <select value={newLeave.type} onChange={(e) => setNewLeave({...newLeave, type: e.target.value})} className="w-full border border-gray-200 bg-gray-50 p-2.5 rounded text-xs">
            <option value="Sick Leave">Sick Leave (Medical/Health)</option>
            <option value="Casual Leave">Casual Leave (Personal Work)</option>
            <option value="Duty Leave">On-Duty Leave (Institutional Representation)</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 mb-1">Start On</label>
            <input type="date" required value={newLeave.start} onChange={(e) => setNewLeave({...newLeave, start: e.target.value})} className="w-full border border-gray-200 bg-gray-50 p-2.5 rounded text-xs" />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 mb-1">End On</label>
            <input type="date" required value={newLeave.end} onChange={(e) => setNewLeave({...newLeave, end: e.target.value})} className="w-full border border-gray-200 bg-gray-50 p-2.5 rounded text-xs" />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-gray-500 mb-1">Detailed Explanation Context</label>
          <textarea rows="4" required placeholder="Write clear descriptive statements here..." value={newLeave.reason} onChange={(e) => setNewLeave({...newLeave, reason: e.target.value})} className="w-full border border-gray-200 bg-gray-50 p-2.5 rounded text-xs focus:outline-none"></textarea>
        </div>
        <button type="submit" className="w-full bg-[#9584E6] text-white font-semibold py-2.5 rounded text-xs uppercase tracking-wider shadow">Dispatch Leave Request</button>
      </form>
    </div>
  );
};

export default RequestLeaveTab;