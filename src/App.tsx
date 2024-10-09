import React, { useState } from 'react';
import './App.css';
import People from './compo1'; // Adjust paths if needed
import TaskCompo from './compo2'; // Adjust paths if needed

const App: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>('people'); // Updated default state to 'people'

  const handleButtonClick = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div className="app-container">
      {/* Right-side Navbar */}
      <nav className="navbar">
        <button
          onClick={() => handleButtonClick('people')}
          className={activeComponent === 'people' ? 'active' : ''}
        >
          Users
        </button>
        <button
          onClick={() => handleButtonClick('taskcompo')}
          className={activeComponent === 'taskcompo' ? 'active' : ''}
        >
          Add Tasks
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="main-content">
        {activeComponent === 'people' && <People />}
        {activeComponent === 'taskcompo' && <TaskCompo />}
      </div>
    </div>
  );
};

export default App;
