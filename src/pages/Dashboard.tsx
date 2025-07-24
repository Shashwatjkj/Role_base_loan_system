// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getDashboardStats } from '../api'; // adjust path as needed

// const Dashboard = () => {
//   //const token = localStorage.getItem('token');;
//   const navigate = useNavigate();
//   const [role, setRole] = useState<string | null>(null);
//   const [username, setUsername] = useState<string | null>(null);
//   const [stats, setStats] = useState<any>(null); // Type this based on your API shape

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedRole = localStorage.getItem('role');
//     const storedUsername = localStorage.getItem('username');

//     if (!storedToken || !storedRole) {
//       navigate('/');
//     } else {
//       setRole(storedRole);
//       setUsername(storedUsername);

//       // fetch stats
//       getDashboardStats(storedToken)
//         .then((data) => {
//           setStats(data);
//         })
//         .catch((err) => {
//           console.error('Failed to fetch stats:', err);
//         });
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   const handleGoToPanel = () => {
//     if (role === 'admin') {
//       navigate('/admin');
//     } else if (role === 'verifier') {
//       navigate('/verifier');
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Dashboard</h2>
//       <p>Welcome, <strong>{username || 'User'}</strong></p>
//       <p>Role: <strong>{role}</strong></p>

//       {stats ? (
//         <div style={{ marginTop: 20 }}>
//           <h4>Stats:</h4>
//           <pre>{JSON.stringify(stats, null, 2)}</pre>
//         </div>
//       ) : (
//         <p>Loading stats...</p>
//       )}

//       <button onClick={handleGoToPanel} style={{ marginRight: 10 }}>
//         Go to {role} Panel
//       </button>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats } from '../api'; // adjust path as needed

interface DashboardStats {
  total: number;
  pending: number;
  verified: number;
  approved: number;
  rejected: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeDashboard = async () => {
      const storedToken = localStorage.getItem('token');
      const storedRole = localStorage.getItem('role');
      const storedUsername = localStorage.getItem('username');

      if (!storedToken || !storedRole) {
        navigate('/');
        return;
      }

      setRole(storedRole);
      setUsername(storedUsername);
      setLoading(true);
      setError(null);

      try {
        const data = await getDashboardStats(storedToken);
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleGoToPanel = () => {
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'verifier') {
      navigate('/verifier');
    }
  };

  const getStatusColor = (status: string, value: number) => {
    if (value === 0) return '#e0e0e0';
    
    switch (status) {
      case 'total': return '#2196F3';
      case 'pending': return '#FF9800';
      case 'verified': return '#4CAF50';
      case 'approved': return '#8BC34A';
      case 'rejected': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <div style={{ 
      padding: '24px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '32px',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '16px'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#333', fontSize: '28px' }}>Dashboard</h1>
          <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '16px' }}>
            Welcome, <strong>{username || 'User'}</strong> | Role: <strong style={{ 
              color: role === 'admin' ? '#2196F3' : '#4CAF50',
              textTransform: 'capitalize'
            }}>{role}</strong>
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={handleGoToPanel}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              textTransform: 'capitalize'
            }}
          >
            Go to {role} Panel
          </button>
          <button 
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '22px' }}>
          Statistics Overview
        </h2>
        
        {loading && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '200px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px'
          }}>
            <p style={{ color: '#666', fontSize: '16px' }}>Loading statistics...</p>
          </div>
        )}

        {error && (
          <div style={{
            padding: '16px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '8px',
            border: '1px solid #ffcdd2'
          }}>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {stats && !loading && !error && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {Object.entries(stats).map(([key, value]) => (
              <div 
                key={key}
                style={{
                  backgroundColor: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #e0e0e0',
                  textAlign: 'center' as const,
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: getStatusColor(key, value),
                  borderRadius: '50%',
                  margin: '0 auto 12px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>
                  {value}
                </div>
                <h3 style={{ 
                  margin: '0 0 8px 0', 
                  color: '#333',
                  fontSize: '18px',
                  textTransform: 'capitalize'
                }}>
                  {key}
                </h3>
                <p style={{ 
                  margin: 0, 
                  color: '#666',
                  fontSize: '14px'
                }}>
                  {key === 'total' ? 'Total Records' : `${key} Records`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions Section */}
      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ color: '#333', marginBottom: '16px', fontSize: '18px' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
          <button 
            onClick={handleGoToPanel}
            style={{
              padding: '12px 24px',
              backgroundColor: 'white',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            📊 View {role} Panel
          </button>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: 'white',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            🔄 Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


