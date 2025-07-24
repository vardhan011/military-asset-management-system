import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // ✅ Use your custom axios instance

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await api.post('/login', {
                email,
                password,
            });

            localStorage.setItem('token', res.data.token);
            onLogin();
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <>
            <div className="text-3xl font-bold uppercase text-center mt-8 text-blue-800 tracking-wide">
                Military System
            </div>

            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleLogin} className="space-y-5">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition cursor-pointer"
                    >
                        Login
                    </button>
                    {error && <p className="text-center text-red-600 text-sm">{error}</p>}
                </form>
            </div>
        </>
    );
};

export default Login;
