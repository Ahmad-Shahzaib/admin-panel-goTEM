// Importing React (remove if you're using React 17 or newer and the new JSX Transform)
import { useState, useEffect } from 'react';
import './Users.css';

// Define a TypeScript interface for the user data
interface User {
  UserId: string;
  Username: string;
  referrewarded: number | null;
  totalgot: number;
  hookspeed: number | null;
  multiplier: number | null;
  tasks: string | null;
}

const People = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://api-dapp.gotem.io/get_all_user_details')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  // Summation and count calculations for the cards
  const totalUsers = users.length;
  const totalGotEM = users.reduce((acc, user) => acc + (user.totalgot || 0), 0);
  const totalRefers = users.reduce((acc, user) => acc + (user.referrewarded || 0), 0);

  // Function to handle null or undefined values
  const displayValue = (value: any) => value ? value.toString() : "--";

  return (
    <div className="users-container">
      <h1 className="users-header">Users</h1>
      {/* Cards for displaying summaries */}
      <div className="summary-cards">
        <div className="card">
          <h5>Total Users</h5>
          <p>{totalUsers}</p>
        </div>
        <div className="card">
          <h5>Total gotEM dis.</h5>
          <p>{totalGotEM}</p>
        </div>
        <div className="card">
          <h5>Total Refers</h5>
          <p>{totalRefers}</p>
        </div>
      </div>
      <div className="users-data-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Userid</th>
              <th>Username</th>
              <th>Refertotal</th>
              <th>Totalgot</th>
              <th>Hookspeed</th>
              <th>Multiplier</th>
              <th>Donetasks</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.UserId}>
                <td>{displayValue(user.UserId)}</td>
                <td>{displayValue(user.Username)}</td>
                <td>{displayValue(user.referrewarded)}</td>
                <td>{displayValue(user.totalgot)}</td>
                <td>{displayValue(user.hookspeed)}</td>
                <td>{displayValue(user.multiplier)}</td>
                <td>{displayValue(user.tasks)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default People;
