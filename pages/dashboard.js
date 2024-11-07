// pages/dashboard.js
import TaskList from '../components/TaskList';

export default function Dashboard() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f7fc', borderRadius: '8px',position:'centre', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ fontSize: '2rem', color: '#333', marginBottom: '20px' }}>Dashboard</h1>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <TaskList />
      </div>
    </div>
  );
}
