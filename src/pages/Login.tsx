import { useState } from 'react';

// Types
interface LoginResponse {
  token: string;
  role: 'admin' | 'verifier';
}

// Mock functions for demonstration
const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        resolve({ token: 'mock-token', role: 'admin' });
      } else if (username === 'verifier' && password === 'verifier') {
        resolve({ token: 'mock-token', role: 'verifier' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (): Promise<void> => {
    setIsLoading(true);
    try {
    const {  role } = await loginUser(username, password);
      
      // In a real app, you'd use localStorage here
      // localStorage.setItem('token', token);
      // localStorage.setItem('role', role);

      if (role === 'admin') {
        alert('Login successful! Redirecting to admin panel...');
      } else if (role === 'verifier') {
        alert('Login successful! Redirecting to verifier panel...');
      } else {
        alert('Unknown role');
      }
    } catch (err) {
      alert('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center mb-6 text-gray-500 text-sm">
          Please log in to continue
        </p>
        <p className="text-center mb-4 text-xs text-gray-400">
          Demo: admin/admin or verifier/verifier
        </p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          onClick={handleLogin} 
          disabled={isLoading}
          className="w-full p-3 rounded-lg border-none bg-blue-600 text-white text-base cursor-pointer transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;