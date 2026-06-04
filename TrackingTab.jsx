import React from 'react';

const TrackingTab = ({ leaveData }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-800">Live Process Tracking Registry</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b">
              <th className="p-4">Request Ref</th>
              <th className="p-4">Applicant</th>
              <th className="p-4">Type</th>
              <th className="p-4">Timeline Span</th>
              <th className="p-4 text-center">Days</th>
              <th className="p-4 text-right">State Status</th>
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-gray-100">
            {leaveData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/40">
                <td className="p-4 font-mono font-bold text-[#9584E6]">{item.id}</td>
                <td className="p-4">
                  <p className="font-semibold text-gray-700">{item.name}</p>
                  <span className="text-[10px] font-mono text-gray-400 capitalize">{item.role}</span>
                </td>
                <td className="p-4 font-medium">{item.type}</td>
                <td className="p-4 text-gray-500 font-mono text-[11px]">{item.start} ~ {item.end}</td>
                <td className="p-4 text-center font-bold">{item.days}</td>
                <td className="p-4 text-right">
                  <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-full ${
                    item.status === 'Approved' ? 'bg-green-50 text-green-700 border border-green-200' :
                    item.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                    'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackingTab;