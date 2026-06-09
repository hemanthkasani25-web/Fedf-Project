import React, { useState } from 'react';
import LoginPage from './Pages/LoginPage';
import SidebarNav from './Pages/SidebarNav';
import RequestLeaveTab from './Pages/RequestLeaveTab';
import TrackingTab from './Pages/TrackingTab';
import ApprovalsTab from './Pages/ApprovalsTab';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('student'); 
  const [currentTab, setCurrentTab] = useState('request');
  const [username, setUsername] = useState('');

  // Primary Data Storage
  const [leaveData, setLeaveData] = useState([
    { id: 'LV-9041', name: 'Suresh Kumar', role: 'student', type: 'Sick Leave', start: '2026-06-10', end: '2026-06-12', days: 3, status: 'Pending', reason: 'Suffering from viral fever, prescribed bed rest.' },
    { id: 'LV-8832', name: 'Dr. Anjali Sharma', role: 'faculty', type: 'Casual Leave', start: '2026-06-15', end: '2026-06-16', days: 2, status: 'Approved', reason: 'Attending family wedding event out of state.' }
  ]);

  const handleLogin = (user) => {
    setUsername(user || (role === 'student' ? '2520030230' : 'EMP-4091'));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentTab('request');
  };

  const handleAddLeave = (newLeave) => {
    const start = new Date(newLeave.start);
    const end = new Date(newLeave.end);
    const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;

    const entry = {
      id: `LV-${Math.floor(1000 + Math.random() * 9000)}`,
      name: role === 'student' ? 'Active Student User' : 'Active Faculty User',
      role: role,
      type: newLeave.type,
      start: newLeave.start,
      end: newLeave.end,
      days: isNaN(diffDays) ? 1 : diffDays,
      status: 'Pending',
      reason: newLeave.reason
    };

    setLeaveData([entry, ...leaveData]);
    setCurrentTab('tracking'); 
  };

  const handleUpdateStatus = (id, nextStatus) => {
    setLeaveData(leaveData.map(item => item.id === id ? { ...item, status: nextStatus } : item));
  };

  // Route guarding display check
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} role={role} setRole={setRole} />;
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-sans flex flex-col lg:flex-row">
      <SidebarNav 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        role={role} 
        username={username} 
        onLogout={handleLogout} 
      />

      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        <div className="mb-6 pb-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 capitalize">{currentTab} Panel Modules</h2>
            <p className="text-xs text-gray-400">Standard unified tracking ledger for university compliance system</p>
          </div>
          <div className="text-xs font-mono bg-white border border-gray-200 rounded px-3 py-1 text-gray-500">
            System Date: 2026-06-03
          </div>
        </div>

        {/* Conditional Component Loading Sub-Routes */}
        {currentTab === 'request' && <RequestLeaveTab onSubmitLeave={handleAddLeave} />}
        {currentTab === 'tracking' && <TrackingTab leaveData={leaveData} />}
        {currentTab === 'approvals' && <ApprovalsTab leaveData={leaveData} onUpdateStatus={handleUpdateStatus} />}
      </main>
    </div>
  );
};

export default App;