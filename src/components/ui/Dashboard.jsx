// User Dashboard Application with Test Cases

import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';

// Custom Hook: useUserRole
function useUserRole(initialRole = 'user') {
  const [role, setRole] = useState(initialRole);
  const changeRole = (newRole) => setRole(newRole);
  return { role, changeRole };
}

// Header Component
function Header({ toggleDarkMode, isDarkMode }) {
  return (
    <header className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h1>User Dashboard</h1>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}

// User List Component
function UserList({ users }) {
  return (
    // <Card className="p-4">
    //   <CardContent>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} - {user.role}</li>
          ))}
        </ul>
    //   </CardContent>
    // </Card>
  );
}

// Main Dashboard Component
function Dashboard() {
  const { role, changeRole } = useUserRole();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const users = [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' },
  ];

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <UserList users={users} />
      <p>Current Role: {role}</p>
      <button onClick={() => changeRole('admin')}>Set Admin</button>
    </div>
  );
}

// Test Cases
// Test Case 1: Dark Mode Toggle
// test('Dark mode toggle works', () => {
//   const { getByText } = render(<Dashboard />);
//   const toggleButton = getByText('Dark Mode');
//   fireEvent.click(toggleButton);
//   expect(getByText('Light Mode')).toBeTruthy();
// });

// Test Case 2: Role Management
// test('Role changes to admin', () => {
//   const { getByText } = render(<Dashboard />);
//   const roleButton = getByText('Set Admin');
//   fireEvent.click(roleButton);
//   expect(getByText('Current Role: admin')).toBeTruthy();
// });

export default Dashboard;
