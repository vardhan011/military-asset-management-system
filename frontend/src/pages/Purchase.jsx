import { useState } from 'react';
import api from "../api"; // ✅ Using central Axios instance

const Purchase = () => {
    const [assetType, setAssetType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');

    const handlePurchase = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await api.post(
                '/purchases',
                { assetType, quantity: Number(quantity) },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage(res.data.message);
            setAssetType('');
            setQuantity('');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error occurred');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add Purchase</h2>
            <input
                type="text"
                placeholder="Asset Type"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <button
                onClick={handlePurchase}
                className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Add Purchase
            </button>
            {message && <p className="mt-4 text-sm text-center">{message}</p>}
        </div>
    );
};

export default Purchase;
