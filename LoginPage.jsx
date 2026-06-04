import React, { useState, useEffect } from 'react';

const LoginPage = ({
  onLogin,
  role = 'student',
  setRole = () => {},
}) => {
  const [username, setUsername] = useState('2520030230');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [approvals, setApprovals] = useState([
    {
      id: 1,
      type: 'Leave Request',
      requester: 'Dr. A. Kumar (Faculty)',
      details: 'Medical Leave - 3 Days',
      date: '2026-06-02',
      status: 'Pending',
    },
    {
      id: 2,
      type: 'Budget Sanction',
      requester: 'CSE Dept - Lab 3',
      details: 'Upgrade IoT Development Kits ($1,200)',
      date: '2026-06-01',
      status: 'Pending',
    },
    {
      id: 3,
      type: 'Course Modification',
      requester: 'Prof. S. Sharma',
      details: 'Syllabus update for Advanced AI Core',
      date: '2026-05-30',
      status: 'Pending',
    },
  ]);

  const generateCaptcha = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 6; i++) {
      result += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setCaptchaText(result);
    setCaptchaError(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      captchaInput.trim().toLowerCase() !==
      captchaText.toLowerCase()
    ) {
      setCaptchaError(true);
      return;
    }

    setCaptchaError(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (role === 'hod') {
        setIsLoggedIn(true);
      } else {
        onLogin?.(username);
      }
    }, 1200);
  };

  const handleApprovalAction = (id, newStatus) => {
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: newStatus }
          : item
      )
    );
  };

  /* ===========================
     HOD APPROVAL DESK
     =========================== */
  if (isLoggedIn && role === 'hod') {
    return (
      <div className="min-h-screen w-full bg-[#9584E6] flex flex-col justify-between p-6 font-sans">

        {/* Header */}
        <div className="max-w-6xl w-full mx-auto flex justify-between items-center bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl shadow-md text-white">
          <div>
            <h1 className="text-xl font-black tracking-wider uppercase flex items-center gap-2">
              <span className="text-red-500 bg-white px-2 py-0.5 rounded text-sm font-black">
                KL
              </span>
              KLEF ERP Portal
            </h1>
            <p className="text-xs text-purple-100 mt-1">
              Welcome back, Head of Department 👋
            </p>
          </div>

          <button
            onClick={() => {
              setIsLoggedIn(false);
              setUsername('2520030230');
              setPassword('password123');
              setCaptchaInput('');
              generateCaptcha();
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-lg"
          >
            Logout Desk
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-6xl w-full mx-auto my-8 grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Left Panel */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-xl">
              <h3 className="text-gray-400 text-xs font-bold uppercase">
                Desk Overview
              </h3>

              <div className="mt-4 space-y-3">

                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl">
                  <span className="text-xs font-medium">
                    Pending Action
                  </span>
                  <span className="text-lg font-black">
                    {
                      approvals.filter(
                        (a) => a.status === 'Pending'
                      ).length
                    }
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                  <span className="text-xs font-medium">
                    Approved
                  </span>
                  <span className="text-lg font-black">
                    {
                      approvals.filter(
                        (a) => a.status === 'Approved'
                      ).length
                    }
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-rose-50 rounded-xl">
                  <span className="text-xs font-medium">
                    Rejected
                  </span>
                  <span className="text-lg font-black">
                    {
                      approvals.filter(
                        (a) => a.status === 'Rejected'
                      ).length
                    }
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Approval Table */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-2xl">

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Approval Desk Workspace
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">

                <thead>
                  <tr className="border-b text-xs uppercase text-gray-500">
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Requester</th>
                    <th className="pb-3">Description</th>
                    <th className="pb-3 text-center">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {approvals.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-4 font-semibold text-purple-700">
                        {item.type}
                      </td>

                      <td>{item.requester}</td>

                      <td>{item.details}</td>

                      <td className="text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : item.status === 'Approved'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="text-right">
                        {item.status === 'Pending' ? (
                          <>
                            <button
                              onClick={() =>
                                handleApprovalAction(
                                  item.id,
                                  'Approved'
                                )
                              }
                              className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                            >
                              Approve
                            </button>

                            <button
                              onClick={() =>
                                handleApprovalAction(
                                  item.id,
                                  'Rejected'
                                )
                              }
                              className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-400 italic">
                            Action Logged
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>

        <div className="text-center text-white/70 text-xs">
          © Copyright 2026 K L Deemed to be University.
        </div>
      </div>
    );
  }

  /* ===========================
     LOGIN PAGE
     =========================== */

  return (
    <div className="min-h-screen w-full bg-[#9584E6] flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-[#9584E6] mb-6">
          Login
        </h2>

        {/* Role Selector */}
        <div className="grid grid-cols-3 bg-gray-100 rounded-xl p-1 mb-6">

          <button
            type="button"
            onClick={() => setRole?.('student')}
            className={`py-2 rounded-lg ${
              role === 'student'
                ? 'bg-[#9584E6] text-white'
                : 'text-gray-600'
            }`}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => setRole?.('faculty')}
            className={`py-2 rounded-lg ${
              role === 'faculty'
                ? 'bg-[#9584E6] text-white'
                : 'text-gray-600'
            }`}
          >
            Faculty
          </button>

          <button
            type="button"
            onClick={() => setRole?.('hod')}
            className={`py-2 rounded-lg ${
              role === 'hod'
                ? 'bg-[#9584E6] text-white'
                : 'text-gray-600'
            }`}
          >
            HOD
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onFocus={() => setIsFocused('user')}
            onBlur={() => setIsFocused('')}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-lg px-3 py-3"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onFocus={() => setIsFocused('pass')}
              onBlur={() => setIsFocused('')}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-3 pr-12"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? '👀' : '🙈'}
            </button>
          </div>

          <div className="bg-gray-50 border rounded-xl p-3">

            <div className="flex justify-between mb-2">
              <span className="text-xs font-semibold">
                Verification
              </span>

              <button
                type="button"
                onClick={generateCaptcha}
                className="text-purple-600 text-xs"
              >
                Refresh
              </button>
            </div>

            <div className="h-12 flex items-center justify-center bg-pink-50 border rounded-lg mb-2 text-xl font-bold tracking-widest text-red-500">
              {captchaText}
            </div>

            <input
              type="text"
              placeholder="Enter captcha"
              value={captchaInput}
              onChange={(e) => {
                setCaptchaInput(e.target.value);
                setCaptchaError(false);
              }}
              className="w-full border rounded-lg px-3 py-3"
              required
            />

            {captchaError && (
              <p className="text-red-500 text-xs mt-2">
                ❌ Code incorrect. Please retry.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#9584E6] text-white py-3 rounded-lg font-bold"
          >
            {isLoading
              ? 'Authorizing...'
              : 'Submit Access'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;