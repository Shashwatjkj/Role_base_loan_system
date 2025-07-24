// import { useState } from 'react';
// import { submitApplication } from '../api';

// const SubmitApplication = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     loanAmount: '',
//     loanTenure: '',
//     employmentStatus: '',
//     employmentAddress: '',
//     loanReason: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await submitApplication({
//         ...formData,
//         loanAmount: Number(formData.loanAmount),
//         loanTenure: Number(formData.loanTenure),
//       });
//       alert('Application submitted successfully');
//       setFormData({
//         name: '',
//         email: '',
//         loanAmount: '',
//         loanTenure: '',
//         employmentStatus: '',
//         employmentAddress: '',
//         loanReason: '',
//       });
//     } catch (err) {
//       alert('Submission failed');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
//       <h2>Submit Loan Application</h2>
//       {Object.entries(formData).map(([key, value]) => (
//         <input
//           key={key}
//           name={key}
//           value={value}
//           onChange={handleChange}
//           placeholder={key.replace(/([A-Z])/g, ' $1')}
//           style={{ display: 'block', marginBottom: 10, width: '100%' }}
//         />
//       ))}
//       <button onClick={handleSubmit} style={{ width: '100%' }}>
//         Submit Application
//       </button>
//     </div>
//   );
// };

// export default SubmitApplication;


import { useState } from 'react';
import { submitApplication } from '../api';

interface FormData {
  name: string;
  email: string;
  loanAmount: string;
  loanTenure: string;
  employmentStatus: string;
  employmentAddress: string;
  loanReason: string;
}

const SubmitApplication = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    loanAmount: '',
    loanTenure: '',
    employmentStatus: '',
    employmentAddress: '',
    loanReason: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.loanAmount.trim()) {
      newErrors.loanAmount = 'Loan amount is required';
    } else if (isNaN(Number(formData.loanAmount)) || Number(formData.loanAmount) <= 0) {
      newErrors.loanAmount = 'Please enter a valid loan amount';
    }
    if (!formData.loanTenure.trim()) {
      newErrors.loanTenure = 'Loan tenure is required';
    } else if (isNaN(Number(formData.loanTenure)) || Number(formData.loanTenure) <= 0) {
      newErrors.loanTenure = 'Please enter a valid loan tenure';
    }
    if (!formData.employmentStatus.trim()) newErrors.employmentStatus = 'Employment status is required';
    if (!formData.employmentAddress.trim()) newErrors.employmentAddress = 'Employment address is required';
    if (!formData.loanReason.trim()) newErrors.loanReason = 'Loan reason is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await submitApplication({
        ...formData,
        loanAmount: Number(formData.loanAmount),
        loanTenure: Number(formData.loanTenure),
      });
      
      // Success message
      alert('Application submitted successfully! You will be notified about the status via email.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        loanAmount: '',
        loanTenure: '',
        employmentStatus: '',
        employmentAddress: '',
        loanReason: '',
      });
      setErrors({});
    } catch (err) {
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatFieldName = (key: string): string => {
    const fieldNames: { [key: string]: string } = {
      name: 'Full Name',
      email: 'Email Address',
      loanAmount: 'Loan Amount (₹)',
      loanTenure: 'Loan Tenure (Months)',
      employmentStatus: 'Employment Status',
      employmentAddress: 'Employment Address',
      loanReason: 'Reason for Loan'
    };
    return fieldNames[key] || key;
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading) {
      e.currentTarget.style.backgroundColor = '#059669';
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading) {
      e.currentTarget.style.backgroundColor = '#10b981';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '32px 16px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 8px 0'
          }}>
            Loan Application
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            margin: 0
          }}>
            Fill out the form below to submit your loan application
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '32px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#111827',
                marginBottom: '20px',
                paddingBottom: '8px',
                borderBottom: '2px solid #f3f4f6'
              }}>
                Personal Information
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                {/* Name Field */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    {formatFieldName('name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${errors.name ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = errors.name ? '#ef4444' : '#d1d5db'}
                  />
                  {errors.name && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '12px',
                      margin: '4px 0 0 0'
                    }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    {formatFieldName('email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${errors.email ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = errors.email ? '#ef4444' : '#d1d5db'}
                  />
                  {errors.email && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '12px',
                      margin: '4px 0 0 0'
                    }}>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Loan Details Section */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#111827',
                marginBottom: '20px',
                paddingBottom: '8px',
                borderBottom: '2px solid #f3f4f6'
              }}>
                Loan Details
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Loan Amount Field */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    {formatFieldName('loanAmount')} *
                  </label>
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    placeholder="50000"
                    min="1"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${errors.loanAmount ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = errors.loanAmount ? '#ef4444' : '#d1d5db'}
                  />
                  {errors.loanAmount && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '12px',
                      margin: '4px 0 0 0'
                    }}>
                      {errors.loanAmount}
                    </p>
                  )}
                </div>

                {/* Loan Tenure Field */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    {formatFieldName('loanTenure')} *
                  </label>
                  <input
                    type="number"
                    name="loanTenure"
                    value={formData.loanTenure}
                    onChange={handleChange}
                    placeholder="12"
                    min="1"
                    max="360"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${errors.loanTenure ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = errors.loanTenure ? '#ef4444' : '#d1d5db'}
                  />
                  {errors.loanTenure && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '12px',
                      margin: '4px 0 0 0'
                    }}>
                      {errors.loanTenure}
                    </p>
                  )}
                </div>
              </div>

              {/* Loan Reason Field */}
              <div style={{ marginTop: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  {formatFieldName('loanReason')} *
                </label>
                <textarea
                  name="loanReason"
                  value={formData.loanReason}
                  onChange={handleChange}
                  placeholder="Please describe the reason for taking this loan"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `1px solid ${errors.loanReason ? '#ef4444' : '#d1d5db'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = errors.loanReason ? '#ef4444' : '#d1d5db'}
                />
                {errors.loanReason && (
                  <p style={{
                    color: '#ef4444',
                    fontSize: '12px',
                    margin: '4px 0 0 0'
                  }}>
                    {errors.loanReason}
                  </p>
                )}
              </div>
            </div>

            {/* Employment Information Section */}
           <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '20px',
                paddingBottom: '8px',
                borderBottom: '2px solid #f3f4f6'
              }}>
                Employment Information
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                {/* Employment Status Field */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    {formatFieldName('employmentStatus')} *
                  </label>
                  <select
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${errors.employmentStatus ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      backgroundColor: '#374151'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = errors.employmentStatus ? '#ef4554' : '#d1d5db'}
                  >
                    <option value="">Select employment status</option>
                    <option value="employed">Employed</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="self-employed">Self Employed</option>
                    <option value="student">Student</option>
                  </select>
                  {errors.employmentStatus && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '12px',
                      margin: '4px 0 0 0'
                    }}>
                      {errors.employmentStatus}
                    </p>
                  )}
                </div>


                {/* Employment Address Field */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    {formatFieldName('employmentAddress')} *
                  </label>
                  <textarea
                    name="employmentAddress"
                    value={formData.employmentAddress}
                    onChange={handleChange}
                    placeholder="Enter your workplace/business address"
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${errors.employmentAddress ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = errors.employmentAddress ? '#ef4444' : '#d1d5db'}
                  />
                  {errors.employmentAddress && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '12px',
                      margin: '4px 0 0 0'
                    }}>
                      {errors.employmentAddress}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  backgroundColor: loading ? '#9ca3af' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ marginRight: '8px' }}>⏳</span>
                    Submitting Application...
                  </span>
                ) : (
                  'Submit Loan Application'
                )}
              </button>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: '24px',
              padding: '16px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{
                fontSize: '12px',
                color: '#64748b',
                margin: 0,
                textAlign: 'center',
                lineHeight: '1.5'
              }}>
                <strong>Note:</strong> All information provided will be verified. 
                False information may result in rejection of your application. 
                You will receive updates about your application status via email.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitApplication;