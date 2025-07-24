import { useState } from 'react';
import api from '../api'; // ✅ Reuse configured Axios

const Transfer = () => {
    const [toBaseId, setToBaseId] = useState('');
    const [assetType, setAssetType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');

    const handleTransfer = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await api.post(
                '/transfers',
                { toBaseId, assetType, quantity: Number(quantity) },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage(res.data.message);
            setToBaseId('');
            setAssetType('');
            setQuantity('');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error occurred');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Transfer Asset</h2>
            <input
                type="text"
                placeholder="To Base ID"
                value={toBaseId}
                onChange={(e) => setToBaseId(e.target.value)}
                className="border p-2 w-full mb-3"
                required
            />
            <input
                type="text"
                placeholder="Asset Type (e.g., Rifle)"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                className="border p-2 w-full mb-3"
                required
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border p-2 w-full mb-3"
                required
            />
            <button
                onClick={handleTransfer}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Transfer
            </button>
            {message && <p className="mt-4 text-sm text-center text-green-600">{message}</p>}
        </div>
    );
};

export default Transfer;
