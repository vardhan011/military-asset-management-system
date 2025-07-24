import { useState } from 'react';
import api from '../api';

const Assignment = () => {
    const [form, setForm] = useState({
        assetType: '',
        quantity: '',
        assignedTo: '',
        type: 'assigned'
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const res = await api.post('/assignments', form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Assignment failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Assign Asset</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="assetType"
                    placeholder="Asset Type (e.g., Rifle)"
                    value={form.assetType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="assignedTo"
                    placeholder="Assigned To (e.g., Soldier ID)"
                    value={form.assignedTo}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="assigned">Assign</option>
                    <option value="expended">Expend</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Assign
                </button>
                {message && <p className="text-center text-green-600 mt-2">{message}</p>}
            </form>
        </div>
    );
};

export default Assignment;
