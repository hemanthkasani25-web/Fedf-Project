import React from 'react';

const SidebarNav = ({
  currentTab,
  setCurrentTab,
  role,
  username,
  onLogout
}) => {
  return (
    <aside className="w-full lg:w-64 bg-white border-r border-gray-200 flex flex-col justify-between shadow-sm shrink-0">

      <div>
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3 bg-gray-50/50">
          <div className="bg-[#9584E6] text-white p-1.5 rounded text-xs font-black">
            KL
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-800">
              KLEF Leaves
            </h2>

            <p className="text-[10px] text-purple-600 font-medium capitalize font-mono">
              {role} Account
            </p>
          </div>
        </div>

        <nav className="p-4 space-y-1">

          <button
            onClick={() => setCurrentTab('request')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-medium transition-all ${
              currentTab === 'request'
                ? 'bg-[#9584E6]/10 text-[#9584E6]'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span>📄</span>
            <span>File Leave Request</span>
          </button>

          <button
            onClick={() => setCurrentTab('tracking')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-medium transition-all ${
              currentTab === 'tracking'
                ? 'bg-[#9584E6]/10 text-[#9584E6]'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span>⏳</span>
            <span>Tracking Details</span>
          </button>

          {/* Approval panel only for Faculty and HOD */}
          {role !== 'student' && (
            <button
              onClick={() => setCurrentTab('approvals')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'approvals'
                  ? 'bg-[#9584E6]/10 text-[#9584E6]'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span>🛡️</span>
              <span>Approval Panel</span>
            </button>
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50/30">
        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3 text-center">
          <p className="text-[11px] font-bold text-gray-700 truncate">
            {username}
          </p>

          <span className="text-[9px] text-green-600 font-semibold uppercase tracking-wider">
            Online
          </span>
        </div>

        <button
          onClick={onLogout}
          className="w-full text-center bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-md py-2 text-xs font-medium transition-colors"
        >
          Exit Workspace
        </button>
      </div>
    </aside>
  );
};

export default SidebarNav;