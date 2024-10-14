// Importing React (remove if you're using React 17 or newer and the new JSX Transform)
import { useState, useEffect } from 'react';
import './Users.css';

// Define a TypeScripst interface for the user data
interface User {
  UserId: string;
  Username: string;
  Refertotal: number | null;
  totalgot: number;
  hookspeed: number | null;
  multiplier: number | null;
  tasks: string | null;
}

const people = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://api-dapp.gotem.io/get_all_user_details')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  // Function to handle null or undefined values
  const displayValue = (value: any) => value ? value.toString() : "--";

  return (
    <div className="users-container">
      <h1 className="users-header">Users</h1>
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
                <td>{displayValue(user.Refertotal)}</td>
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

export default people;
