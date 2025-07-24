// // import { useEffect, useState } from 'react';
// // import { getApplications, updateApplicationStatus } from '../api';

// // const VerifierPanel = () => {
// //   const [applications, setApplications] = useState([]);
// //   const token = localStorage.getItem('token');

// //   const fetchApps = async () => {
// //     if (!token) return;
// //     const data = await getApplications(token);
// //     setApplications(data);
// //   };

// //   const handleUpdate = async (id: string, status: 'verified' | 'rejected') => {
// //     if (!token) return;
// //     await updateApplicationStatus(id, status, token);
// //     fetchApps(); // Refresh list
// //   };

// //   useEffect(() => {
// //     fetchApps();
// //   }, []);

// //   return (
// //     <div style={{ padding: 20 }}>
// //       <h2>Verifier Panel</h2>
// //       {applications.length === 0 && <p>No applications found.</p>}

// //       {applications.map((app: any) => (
// //         <div
// //           key={app._id}
// //           style={{
// //             border: '1px solid #ccc',
// //             marginBottom: 10,
// //             padding: 10,
// //             borderRadius: 6,
// //           }}
// //         >
// //           <p><strong>Name:</strong> {app.name}</p>
// //           <p><strong>Email:</strong> {app.email}</p>
// //           <p><strong>Loan Amount:</strong> {app.loanAmount}</p>
// //           <p><strong>Status:</strong> {app.status}</p>

// //           {app.status === 'pending' && (
// //             <div>
// //               <button onClick={() => handleUpdate(app._id, 'verified')}>Verify</button>
// //               <button
// //                 onClick={() => handleUpdate(app._id, 'rejected')}
// //                 style={{ marginLeft: 10 }}
// //               >
// //                 Reject
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default VerifierPanel;


// import { useEffect, useState } from 'react';
// import { getApplications, updateApplicationStatus } from '../api';

// interface Application {
//   _id: string;
//   name: string;
//   email: string;
//   loanAmount: number;
//   status: 'pending' | 'verified' | 'rejected' | 'approved';
//   dateApplied?: string;
//   createdAt?: string;
// }

// const VerifierPanel: React.FC = () => {
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');
//   const token = localStorage.getItem('token');

//   const fetchApps = async (): Promise<void> => {
//     if (!token) return;
//     const data = await getApplications(token);
//     setApplications(data);
//   };

//   const handleUpdate = async (id: string, status: 'verified' | 'rejected'): Promise<void> => {
//     if (!token) return;
//     await updateApplicationStatus(id, status, token);
//     fetchApps();
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

//   const filteredApplications = applications.filter(app => {
//     if (filter === 'all') return true;
//     return app.status === filter;
//   });

//   const pendingCount = applications.filter(app => app.status === 'pending').length;
//   const verifiedCount = applications.filter(app => app.status === 'verified').length;
//   const rejectedCount = applications.filter(app => app.status === 'rejected').length;

//   const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const target = e.currentTarget;
//     const currentBg = target.style.backgroundColor;
//     if (currentBg === 'rgb(16, 185, 129)') target.style.backgroundColor = '#059669';
//     if (currentBg === 'rgb(239, 68, 68)') target.style.backgroundColor = '#dc2626';
//     if (currentBg === 'rgb(59, 130, 246)') target.style.backgroundColor = '#2563eb';
//   };

//   const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const target = e.currentTarget;
//     const dataset = target.dataset.originalColor;
//     if (dataset === 'green') target.style.backgroundColor = '#10b981';
//     if (dataset === 'red') target.style.backgroundColor = '#ef4444';
//     if (dataset === 'blue') target.style.backgroundColor = '#3b82f6';
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
//             Verifier Panel
//           </h1>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//             <button
//               onClick={() => fetchApps()}
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
//             >
//               🔄 Refresh
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//           gap: '16px',
//           marginBottom: '32px'
//         }}>
//           <div style={{
//             backgroundColor: 'white',
//             padding: '20px',
//             borderRadius: '12px',
//             border: '1px solid #e5e7eb',
//             boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
//           }}>
//             <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
//               Pending Applications
//             </div>
//             <div style={{ fontSize: '24px', fontWeight: '600', color: '#f59e0b' }}>
//               {pendingCount}
//             </div>
//           </div>
//           <div style={{
//             backgroundColor: 'white',
//             padding: '20px',
//             borderRadius: '12px',
//             border: '1px solid #e5e7eb',
//             boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
//           }}>
//             <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
//               Verified Applications
//             </div>
//             <div style={{ fontSize: '24px', fontWeight: '600', color: '#10b981' }}>
//               {verifiedCount}
//             </div>
//           </div>
//           <div style={{
//             backgroundColor: 'white',
//             padding: '20px',
//             borderRadius: '12px',
//             border: '1px solid #e5e7eb',
//             boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
//           }}>
//             <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
//               Rejected Applications
//             </div>
//             <div style={{ fontSize: '24px', fontWeight: '600', color: '#ef4444' }}>
//               {rejectedCount}
//             </div>
//           </div>
//         </div>

//         {/* Filter Tabs */}
//         <div style={{
//           backgroundColor: 'white',
//           borderRadius: '12px',
//           border: '1px solid #e5e7eb',
//           marginBottom: '24px',
//           overflow: 'hidden'
//         }}>
//           <div style={{
//             display: 'flex',
//             borderBottom: '1px solid #e5e7eb'
//           }}>
//             {(['all', 'pending', 'verified', 'rejected'] as const).map((filterOption) => (
//               <button
//                 key={filterOption}
//                 onClick={() => setFilter(filterOption)}
//                 style={{
//                   flex: 1,
//                   padding: '12px 16px',
//                   backgroundColor: filter === filterOption ? '#f3f4f6' : 'transparent',
//                   color: filter === filterOption ? '#111827' : '#6b7280',
//                   border: 'none',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                   textTransform: 'capitalize',
//                   borderBottom: filter === filterOption ? '2px solid #3b82f6' : '2px solid transparent'
//                 }}
//               >
//                 {filterOption} {filterOption !== 'all' && `(${
//                   filterOption === 'pending' ? pendingCount :
//                   filterOption === 'verified' ? verifiedCount :
//                   rejectedCount
//                 })`}
//               </button>
//             ))}
//           </div>
//         </div>

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
//             <div>Applicant</div>
//             <div>Amount</div>
//             <div>Date Applied</div>
//             <div>Status</div>
//             <div>Actions</div>
//           </div>

//           {/* Table Body */}
//           {filteredApplications.length === 0 ? (
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
//                 📋
//               </div>
//               <p style={{
//                 color: '#6b7280',
//                 fontSize: '18px',
//                 margin: '0 0 8px 0'
//               }}>
//                 No {filter !== 'all' ? filter : ''} applications found
//               </p>
//               <p style={{
//                 color: '#9ca3af',
//                 fontSize: '14px',
//                 margin: 0
//               }}>
//                 {filter === 'pending' 
//                   ? 'Applications requiring verification will appear here' 
//                   : 'Applications will appear here when submitted'
//                 }
//               </p>
//             </div>
//           ) : (
//             filteredApplications.map((app: Application, index: number) => (
//               <div
//                 key={app._id || index}
//                 style={{
//                   display: 'grid',
//                   gridTemplateColumns: '3fr 2fr 3fr 2fr 2fr',
//                   gap: '16px',
//                   padding: '16px 24px',
//                   borderBottom: index < filteredApplications.length - 1 ? '1px solid #f3f4f6' : 'none',
//                   transition: 'background-color 0.2s'
//                 }}
//                 onMouseOver={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.backgroundColor = '#f9fafb'}
//                 onMouseOut={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.backgroundColor = 'transparent'}
//               >
//                 {/* Applicant */}
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
//                       {app.email}
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
//                     Loan Amount
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
//                   gap: '8px'
//                 }}>
//                   {app.status === 'pending' && (
//                     <>
//                       <button
//                         onClick={() => handleUpdate(app._id, 'verified')}
//                         data-original-color="green"
//                         style={{
//                           padding: '4px 12px',
//                           backgroundColor: '#10b981',
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
//                         Verify
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
//                     </>
//                   )}
//                   {app.status !== 'pending' && (
//                     <span style={{
//                       fontSize: '12px',
//                       color: '#9ca3af',
//                       fontStyle: 'italic'
//                     }}>
//                       No actions available
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifierPanel;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getApplications,
  updateApplicationStatus,
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

const VerifierPanel: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const token = localStorage.getItem('token');

  const fetchApps = async (): Promise<void> => {
    if (!token) return;
    const data = await getApplications(token);
    setApplications(data);
  };

  const handleVerify = async (id: string): Promise<void> => {
    if (!token) return;
    await updateApplicationStatus(id, 'verified', token);
    fetchApps();
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
    if (currentBg === 'rgb(16, 185, 129)') target.style.backgroundColor = '#059669';
    if (currentBg === 'rgb(34, 197, 94)') target.style.backgroundColor = '#16a34a';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const dataset = target.dataset.originalColor;
    if (dataset === 'green') target.style.backgroundColor = '#10b981';
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
            Loan Verification Panel
          </h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            {/* Dashboard Button */}
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

        {/* Info Banner */}
        <div style={{
          backgroundColor: '#e0f2fe',
          borderRadius: '12px',
          border: '1px solid #0284c7',
          padding: '16px 24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#0284c7',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px',
            fontSize: '14px',
            color: 'white'
          }}>
            ℹ️
          </div>
          <div>
            <p style={{
              color: '#0c4a6e',
              fontSize: '14px',
              margin: 0,
              fontWeight: '500'
            }}>
              <strong>Verifier Role:</strong> You can verify pending loan applications. 
              Once verified, applications will be forwarded to admin for final approval.
            </p>
          </div>
        </div>

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
            <div>Actions</div>
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
                {/* Applicant Info */}
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
                      {app.email}
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
                    ₹{formatAmount(app.loanAmount)}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    Loan Amount
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
                    Application Date
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
                  {app.status === 'pending' ? (
                    <button
                      onClick={() => handleVerify(app._id)}
                      data-original-color="green"
                      style={{
                        padding: '6px 16px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <span style={{ marginRight: '4px' }}>✓</span>
                      Verify
                    </button>
                  ) : app.status === 'verified' ? (
                    <div style={{
                      padding: '6px 16px',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ marginRight: '4px' }}>⏳</span>
                      Awaiting Admin
                    </div>
                  ) : app.status === 'approved' ? (
                    <div style={{
                      padding: '6px 16px',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ marginRight: '4px' }}>✅</span>
                      Approved
                    </div>
                  ) : (
                    <div style={{
                      padding: '6px 16px',
                      backgroundColor: '#fee2e2',
                      color: '#991b1b',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ marginRight: '4px' }}>❌</span>
                      Rejected
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

        {/* Statistics Summary */}
        <div style={{
          marginTop: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#f59e0b',
              marginBottom: '8px'
            }}>
              {applications.filter(app => app.status === 'pending').length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Pending Verification
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#10b981',
              marginBottom: '8px'
            }}>
              {applications.filter(app => app.status === 'verified').length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Verified by You
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#3b82f6',
              marginBottom: '8px'
            }}>
              {applications.filter(app => app.status === 'approved').length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Finally Approved
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '8px'
            }}>
              {applications.length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Total Applications
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifierPanel;