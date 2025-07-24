// import { useEffect, useState } from 'react';
// import {
//   getApplications,
//   updateApplicationStatus,
//   addAdmin,
// } from '../api';

// interface Application {
//   _id: string;
//   name: string;
//   email: string;
//   loanAmount: number;
//   status: 'pending' | 'verified' | 'rejected' | 'approved';
//   dateApplied?: string;
//   createdAt?: string;
// }

// const AdminPanel: React.FC = () => {
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [newUsername, setNewUsername] = useState<string>('');
//   const [newPassword, setNewPassword] = useState<string>('');
//   const [showAddAdmin, setShowAddAdmin] = useState<boolean>(false);
//   const token = localStorage.getItem('token');

//   const fetchApps = async (): Promise<void> => {
//     if (!token) return;
//     const data = await getApplications(token);
//     setApplications(data);
//   };

//   const handleUpdate = async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
//     if (!token) return;
//     await updateApplicationStatus(id, status, token);
//     fetchApps();
//   };

//   const handleAddAdmin = async (): Promise<void> => {
//     if (!token || !newUsername || !newPassword) return;
//     try {
//       await addAdmin(newUsername, newPassword, token);
//       alert('New admin added');
//       setNewUsername('');
//       setNewPassword('');
//       setShowAddAdmin(false);
//     } catch (err) {
//       alert('Failed to add admin');
//     }
//   };

//   useEffect(() => {
//     fetchApps();
//   }, []);

//   const getStatusStyle = (status: string): React.CSSProperties => {
//     switch (status?.toLowerCase()) {
//       case 'pending':
//         return {
//           backgroundColor: '#fef3c7',
//           color: '#92400e',
//           border: '1px solid #f59e0b'
//         };
//       case 'verified':
//         return {
//           backgroundColor: '#d1fae5',
//           color: '#065f46',
//           border: '1px solid #10b981'
//         };
//       case 'rejected':
//         return {
//           backgroundColor: '#fee2e2',
//           color: '#991b1b',
//           border: '1px solid #ef4444'
//         };
//       case 'approved':
//         return {
//           backgroundColor: '#dbeafe',
//           color: '#1e40af',
//           border: '1px solid #3b82f6'
//         };
//       default:
//         return {
//           backgroundColor: '#f3f4f6',
//           color: '#374151',
//           border: '1px solid #9ca3af'
//         };
//     }
//   };

//   const getStatusText = (status: string): string => {
//     switch (status?.toLowerCase()) {
//       case 'pending':
//         return 'PENDING';
//       case 'verified':
//         return 'VERIFIED';
//       case 'rejected':
//         return 'REJECTED';
//       case 'approved':
//         return 'APPROVED';
//       default:
//         return status?.toUpperCase() || 'UNKNOWN';
//     }
//   };

//   const formatAmount = (amount: number): string => {
//     if (!amount) return 'N/A';
//     return parseFloat(amount.toString()).toLocaleString() + '.00';
//   };

//   const formatDate = (dateString?: string): string => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: '2-digit' 
//     });
//   };

//   const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const target = e.currentTarget;
//     const currentBg = target.style.backgroundColor;
//     if (currentBg === 'rgb(59, 130, 246)') target.style.backgroundColor = '#2563eb';
//     if (currentBg === 'rgb(16, 185, 129)') target.style.backgroundColor = '#059669';
//     if (currentBg === 'rgb(107, 114, 128)') target.style.backgroundColor = '#4b5563';
//     if (currentBg === 'rgb(239, 68, 68)') target.style.backgroundColor = '#dc2626';
//   };

//   const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const target = e.currentTarget;
//     const dataset = target.dataset.originalColor;
//     if (dataset === 'blue') target.style.backgroundColor = '#3b82f6';
//     if (dataset === 'green') target.style.backgroundColor = '#10b981';
//     if (dataset === 'gray') target.style.backgroundColor = '#6b7280';
//     if (dataset === 'red') target.style.backgroundColor = '#ef4444';
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       backgroundColor: '#f9fafb',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
//     }}>
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         padding: '32px 16px'
//       }}>
//         {/* Header */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '32px'
//         }}>
//           <h1 style={{
//             fontSize: '24px',
//             fontWeight: '600',
//             color: '#111827',
//             margin: 0
//           }}>
//             Applied Loans
//           </h1>
//           <div style={{ display: 'flex', gap: '16px' }}>
//             <button 
//               onClick={() => setShowAddAdmin(!showAddAdmin)}
//               data-original-color="blue"
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 padding: '8px 16px',
//                 backgroundColor: '#3b82f6',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500'
//               }}
//               onMouseOver={handleMouseOver}
//               onMouseOut={handleMouseOut}
//             >
//               <span style={{ marginRight: '8px' }}>+</span>
//               Add Admin
//             </button>
//             <button style={{
//               padding: '8px 16px',
//               backgroundColor: 'transparent',
//               color: '#6b7280',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               fontSize: '14px'
//             }}>
//               🔍 Filter
//             </button>
//             <button style={{
//               padding: '8px 16px',
//               backgroundColor: 'transparent',
//               color: '#6b7280',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               fontSize: '14px'
//             }}>
//               Sort
//             </button>
//           </div>
//         </div>

//         {/* Add Admin Form */}
//         {showAddAdmin && (
//           <div style={{
//             backgroundColor: 'white',
//             borderRadius: '12px',
//             border: '1px solid #e5e7eb',
//             padding: '24px',
//             marginBottom: '24px',
//             boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
//           }}>
//             <h3 style={{
//               fontSize: '18px',
//               fontWeight: '500',
//               color: '#111827',
//               marginBottom: '16px',
//               margin: '0 0 16px 0'
//             }}>
//               Add New Admin
//             </h3>
//             <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={newUsername}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)}
//                 style={{
//                   flex: 1,
//                   padding: '8px 12px',
//                   border: '1px solid #d1d5db',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   outline: 'none'
//                 }}
//                 onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#3b82f6'}
//                 onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#d1d5db'}
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={newPassword}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
//                 style={{
//                   flex: 1,
//                   padding: '8px 12px',
//                   border: '1px solid #d1d5db',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   outline: 'none'
//                 }}
//                 onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#3b82f6'}
//                 onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#d1d5db'}
//               />
//               <button
//                 onClick={handleAddAdmin}
//                 data-original-color="green"
//                 style={{
//                   padding: '8px 24px',
//                   backgroundColor: '#10b981',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500'
//                 }}
//                 onMouseOver={handleMouseOver}
//                 onMouseOut={handleMouseOut}
//               >
//                 Add Admin
//               </button>
//               <button
//                 onClick={() => setShowAddAdmin(false)}
//                 data-original-color="gray"
//                 style={{
//                   padding: '8px 24px',
//                   backgroundColor: '#6b7280',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500'
//                 }}
//                 onMouseOver={handleMouseOver}
//                 onMouseOut={handleMouseOut}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Applications Table */}
//         <div style={{
//           backgroundColor: 'white',
//           borderRadius: '12px',
//           border: '1px solid #e5e7eb',
//           overflow: 'hidden',
//           boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
//         }}>
//           {/* Table Header */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: '3fr 2fr 3fr 2fr 2fr',
//             gap: '16px',
//             padding: '16px 24px',
//             backgroundColor: '#f9fafb',
//             borderBottom: '1px solid #e5e7eb',
//             fontSize: '12px',
//             fontWeight: '500',
//             color: '#6b7280',
//             textTransform: 'uppercase'
//           }}>
//             <div>Applicant Name</div>
//             <div>Amount</div>
//             <div>Date Applied</div>
//             <div>Status</div>
//             <div></div>
//           </div>

//           {/* Table Body */}
//           {applications.length === 0 ? (
//             <div style={{
//               padding: '48px 24px',
//               textAlign: 'center'
//             }}>
//               <div style={{
//                 width: '48px',
//                 height: '48px',
//                 backgroundColor: '#f3f4f6',
//                 borderRadius: '50%',
//                 margin: '0 auto 16px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: '20px'
//               }}>
//                 👤
//               </div>
//               <p style={{
//                 color: '#6b7280',
//                 fontSize: '18px',
//                 margin: '0 0 8px 0'
//               }}>
//                 No applications found
//               </p>
//               <p style={{
//                 color: '#9ca3af',
//                 fontSize: '14px',
//                 margin: 0
//               }}>
//                 Applications will appear here when submitted
//               </p>
//             </div>
//           ) : (
//             applications.map((app: Application, index: number) => (
//               <div
//                 key={app._id || index}
//                 style={{
//                   display: 'grid',
//                   gridTemplateColumns: '3fr 2fr 3fr 2fr 2fr',
//                   gap: '16px',
//                   padding: '16px 24px',
//                   borderBottom: index < applications.length - 1 ? '1px solid #f3f4f6' : 'none',
//                   transition: 'background-color 0.2s'
//                 }}
//                 onMouseOver={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.backgroundColor = '#f9fafb'}
//                 onMouseOut={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.backgroundColor = 'transparent'}
//               >
//                 {/* Loan Officer */}
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <div style={{
//                     width: '40px',
//                     height: '40px',
//                     backgroundColor: '#e5e7eb',
//                     borderRadius: '50%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     marginRight: '12px',
//                     fontSize: '16px'
//                   }}>
//                     👤
//                   </div>
//                   <div>
//                     <div style={{
//                       fontWeight: '500',
//                       color: '#111827',
//                       fontSize: '14px'
//                     }}>
//                       {app.name}
//                     </div>
//                     <div style={{
//                       fontSize: '12px',
//                       color: '#6b7280'
//                     }}>
//                       Updated 1 day ago
//                     </div>
//                   </div>
//                 </div>

//                 {/* Amount */}
//                 <div>
//                   <div style={{
//                     fontWeight: '500',
//                     color: '#111827',
//                     fontSize: '14px'
//                   }}>
//                     {formatAmount(app.loanAmount)}
//                   </div>
//                   <div style={{
//                     fontSize: '12px',
//                     color: '#6b7280'
//                   }}>
//                     {app.status === 'approved' ? 'Loan Fully Repaid' : 'Not Debt Yet'}
//                   </div>
//                 </div>

//                 {/* Date Applied */}
//                 <div>
//                   <div style={{
//                     color: '#111827',
//                     fontSize: '14px'
//                   }}>
//                     {formatDate(app.dateApplied || app.createdAt)}
//                   </div>
//                   <div style={{
//                     fontSize: '12px',
//                     color: '#6b7280'
//                   }}>
//                     6:30 PM
//                   </div>
//                 </div>

//                 {/* Status */}
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <span style={{
//                     padding: '4px 12px',
//                     borderRadius: '20px',
//                     fontSize: '11px',
//                     fontWeight: '600',
//                     textTransform: 'uppercase',
//                     ...getStatusStyle(app.status)
//                   }}>
//                     {getStatusText(app.status)}
//                   </span>
//                 </div>

//                 {/* Actions */}
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between'
//                 }}>
//                   {['pending', 'verified'].includes(app.status) && (
//                     <div style={{ display: 'flex', gap: '8px' }}>
//                       <button
//                         onClick={() => handleUpdate(app._id, 'approved')}
//                         data-original-color="blue"
//                         style={{
//                           padding: '4px 12px',
//                           backgroundColor: '#3b82f6',
//                           color: 'white',
//                           border: 'none',
//                           borderRadius: '4px',
//                           cursor: 'pointer',
//                           fontSize: '12px',
//                           fontWeight: '500'
//                         }}
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleUpdate(app._id, 'rejected')}
//                         data-original-color="red"
//                         style={{
//                           padding: '4px 12px',
//                           backgroundColor: '#ef4444',
//                           color: 'white',
//                           border: 'none',
//                           borderRadius: '4px',
//                           cursor: 'pointer',
//                           fontSize: '12px',
//                           fontWeight: '500'
//                         }}
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   )}
//                   <button style={{
//                     padding: '4px',
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     cursor: 'pointer',
//                     color: '#9ca3af',
//                     fontSize: '16px'
//                   }}>
//                     ⋮
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;



import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getApplications,
  updateApplicationStatus,
  addAdmin,
} from '../api';

interface Application {
  _id: string;
  name: string;
  email: string;
  loanAmount: number;
  status: 'pending' | 'verified' | 'rejected' | 'approved';
  dateApplied?: string;
  createdAt?: string;
}

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [showAddAdmin, setShowAddAdmin] = useState<boolean>(false);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const fetchApps = async (): Promise<void> => {
    if (!token) return;
    const data = await getApplications(token);
    setApplications(data);
  };

  const handleUpdate = async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
    if (!token) return;
    await updateApplicationStatus(id, status, token);
    fetchApps();
  };

  const handleAddAdmin = async (): Promise<void> => {
    if (!token || !newUsername || !newPassword) return;
    try {
      await addAdmin(newUsername, newPassword, token);
      alert('New admin added');
      setNewUsername('');
      setNewPassword('');
      setShowAddAdmin(false);
    } catch (err) {
      alert('Failed to add admin');
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const getStatusStyle = (status: string): React.CSSProperties => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return {
          backgroundColor: '#fef3c7',
          color: '#92400e',
          border: '1px solid #f59e0b'
        };
      case 'verified':
        return {
          backgroundColor: '#d1fae5',
          color: '#065f46',
          border: '1px solid #10b981'
        };
      case 'rejected':
        return {
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #ef4444'
        };
      case 'approved':
        return {
          backgroundColor: '#dbeafe',
          color: '#1e40af',
          border: '1px solid #3b82f6'
        };
      default:
        return {
          backgroundColor: '#f3f4f6',
          color: '#374151',
          border: '1px solid #9ca3af'
        };
    }
  };

  const getStatusText = (status: string): string => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'PENDING';
      case 'verified':
        return 'VERIFIED';
      case 'rejected':
        return 'REJECTED';
      case 'approved':
        return 'APPROVED';
      default:
        return status?.toUpperCase() || 'UNKNOWN';
    }
  };

  const formatAmount = (amount: number): string => {
    if (!amount) return 'N/A';
    return parseFloat(amount.toString()).toLocaleString() + '.00';
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit' 
    });
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const currentBg = target.style.backgroundColor;
    if (currentBg === 'rgb(59, 130, 246)') target.style.backgroundColor = '#2563eb';
    if (currentBg === 'rgb(16, 185, 129)') target.style.backgroundColor = '#059669';
    if (currentBg === 'rgb(107, 114, 128)') target.style.backgroundColor = '#4b5563';
    if (currentBg === 'rgb(239, 68, 68)') target.style.backgroundColor = '#dc2626';
    if (currentBg === 'rgb(34, 197, 94)') target.style.backgroundColor = '#16a34a';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const dataset = target.dataset.originalColor;
    if (dataset === 'blue') target.style.backgroundColor = '#3b82f6';
    if (dataset === 'green') target.style.backgroundColor = '#10b981';
    if (dataset === 'gray') target.style.backgroundColor = '#6b7280';
    if (dataset === 'red') target.style.backgroundColor = '#ef4444';
    if (dataset === 'dashboard') target.style.backgroundColor = '#22c55e';
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 16px'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            margin: 0
          }}>
            Applied Loans
          </h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            {/* Dashboard Button - Only show for admin */}
            {role === 'admin' && (
              <button 
                onClick={handleGoToDashboard}
                data-original-color="dashboard"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <span style={{ marginRight: '8px' }}>📊</span>
                Dashboard
              </button>
            )}
            <button 
              onClick={() => setShowAddAdmin(!showAddAdmin)}
              data-original-color="blue"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <span style={{ marginRight: '8px' }}>+</span>
              Add Admin
            </button>
            <button style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              🔍 Filter
            </button>
            <button style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Sort
            </button>
          </div>
        </div>

        {/* Add Admin Form */}
        {showAddAdmin && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              Add New Admin
            </h3>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Username"
                value={newUsername}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#d1d5db'}
              />
              <input
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#d1d5db'}
              />
              <button
                onClick={handleAddAdmin}
                data-original-color="green"
                style={{
                  padding: '8px 24px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                Add Admin
              </button>
              <button
                onClick={() => setShowAddAdmin(false)}
                data-original-color="gray"
                style={{
                  padding: '8px 24px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Applications Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '3fr 2fr 3fr 2fr 2fr',
            gap: '16px',
            padding: '16px 24px',
            backgroundColor: '#f9fafb',
            borderBottom: '1px solid #e5e7eb',
            fontSize: '12px',
            fontWeight: '500',
            color: '#6b7280',
            textTransform: 'uppercase'
          }}>
            <div>Applicant Name</div>
            <div>Amount</div>
            <div>Date Applied</div>
            <div>Status</div>
            <div></div>
          </div>

          {/* Table Body */}
          {applications.length === 0 ? (
            <div style={{
              padding: '48px 24px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#f3f4f6',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                👤
              </div>
              <p style={{
                color: '#6b7280',
                fontSize: '18px',
                margin: '0 0 8px 0'
              }}>
                No applications found
              </p>
              <p style={{
                color: '#9ca3af',
                fontSize: '14px',
                margin: 0
              }}>
                Applications will appear here when submitted
              </p>
            </div>
          ) : (
            applications.map((app: Application, index: number) => (
              <div
                key={app._id || index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3fr 2fr 3fr 2fr 2fr',
                  gap: '16px',
                  padding: '16px 24px',
                  borderBottom: index < applications.length - 1 ? '1px solid #f3f4f6' : 'none',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseOut={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {/* Loan Officer */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    fontSize: '16px'
                  }}>
                    👤
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '500',
                      color: '#111827',
                      fontSize: '14px'
                    }}>
                      {app.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      Updated 1 day ago
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <div style={{
                    fontWeight: '500',
                    color: '#111827',
                    fontSize: '14px'
                  }}>
                    {formatAmount(app.loanAmount)}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    {app.status === 'approved' ? 'Loan Fully Repaid' : 'Not Debt Yet'}
                  </div>
                </div>

                {/* Date Applied */}
                <div>
                  <div style={{
                    color: '#111827',
                    fontSize: '14px'
                  }}>
                    {formatDate(app.dateApplied || app.createdAt)}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    6:30 PM
                  </div>
                </div>

                {/* Status */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    ...getStatusStyle(app.status)
                  }}>
                    {getStatusText(app.status)}
                  </span>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  {['pending', 'verified'].includes(app.status) && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleUpdate(app._id, 'approved')}
                        data-original-color="blue"
                        style={{
                          padding: '4px 12px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdate(app._id, 'rejected')}
                        data-original-color="red"
                        style={{
                          padding: '4px 12px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  <button style={{
                    padding: '4px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9ca3af',
                    fontSize: '16px'
                  }}>
                    ⋮
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;