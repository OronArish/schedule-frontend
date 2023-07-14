import React from 'react'
import Sidebar from './Sidebar';

function Home() {
  // const [role, setUserRole] = useState('');

    return (
        <div className="container">
        <Sidebar />
      <div className="content">
        <h1>Welcome to Technical Support website</h1>
        <p>Here you can submit constraints, publish schedule and manage employees</p>
      </div>
    </div>
  );
}

export default Home;