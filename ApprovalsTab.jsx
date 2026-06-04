import React from 'react';

const ApprovalsTab = ({
  leaveData,
  onUpdateStatus,
  role
}) => {

  const pendingRequests = leaveData.filter(item => {

    if (role === 'faculty') {
      return (
        item.status === 'Pending' &&
        item.role === 'student'
      );
    }

    if (role === 'hod') {
      return (
        item.status === 'Pending' &&
        item.role === 'faculty'
      );
    }

    return false;
  });

  return (
    <div className="space-y-4">

      <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 text-xs text-purple-800">
        💡
        <strong> Verification Desk Notice:</strong>

        {role === 'faculty'
          ? ' Review student leave requests.'
          : ' Review faculty leave requests.'}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {pendingRequests.map((request) => (

          <div
            key={request.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >

            <h4 className="text-sm font-bold text-gray-800">
              {request.name}
            </h4>

            <p className="text-xs text-purple-500 capitalize">
              {request.role}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              {request.reason}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4">

              <button
                onClick={() =>
                  onUpdateStatus(request.id, 'Approved')
                }
                className="bg-green-600 text-white py-2 rounded text-xs"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  onUpdateStatus(request.id, 'Rejected')
                }
                className="bg-red-600 text-white py-2 rounded text-xs"
              >
                Reject
              </button>

            </div>

          </div>
        ))}

        {pendingRequests.length === 0 && (
          <div className="col-span-full bg-white rounded-xl p-8 text-center text-gray-400">
            No requests waiting for approval.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalsTab;