import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import api from '../api';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState([]);
    const [userRole, setUserRole] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role);
        }
    }, [token]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get('/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDashboardData(res.data.dashboard);
            } catch (err) {
                console.error('Dashboard fetch failed:', err.message);
            }
        };

        fetchDashboard();
    }, [token]);

    const getTotal = (key) =>
        dashboardData.reduce((acc, item) => acc + (item[key] || 0), 0);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card title="Total Purchases" value={getTotal('purchases')} />
                <Card title="Total Assigned" value={getTotal('assigned')} />
                <Card title="Total Expended" value={getTotal('expended')} />
                <Card title="Closing Balance" value={getTotal('closingBalance')} />
            </div>

            {/* Asset-wise Breakdown */}
            <div className="bg-white shadow rounded p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2">Asset Breakdown</h3>
                <table className="w-full text-left border">
                    <thead>
                        <tr>
                            <th className="border p-2">Asset</th>
                            <th className="border p-2">Purchased</th>
                            <th className="border p-2">Assigned</th>
                            <th className="border p-2">Expended</th>
                            <th className="border p-2">Closing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardData.map((item) => (
                            <tr key={item.assetType}>
                                <td className="border p-2">{item.assetType}</td>
                                <td className="border p-2">{item.purchases}</td>
                                <td className="border p-2">{item.assigned}</td>
                                <td className="border p-2">{item.expended}</td>
                                <td className="border p-2">{item.closingBalance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Card = ({ title, value }) => (
    <div className="bg-blue-100 p-4 rounded shadow text-center">
        <p className="text-sm">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
    </div>
);

export default Dashboard;
