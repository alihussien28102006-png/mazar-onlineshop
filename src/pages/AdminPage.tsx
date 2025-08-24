import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface Order {
  id: number;
  name: string;
  phone: string;
  address: string;
  payment_method: string;
  notes: string;
  items: Array<{ productId: string; name: string; size: string; color?: string; qty: number; price: number }>;
  total: number;
  created_at: string;
  status: string;
}

const AdminPage: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [inputToken, setInputToken] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async (t: string) => {
    try {
      setError(null);
      const res = await fetch(`${API_URL}/orders`, {
        headers: { 'x-admin-token': t }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to fetch orders');
      setOrders(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleLogin = () => {
    localStorage.setItem('adminToken', inputToken);
    setToken(inputToken);
    fetchOrders(inputToken);
  };

  const markDelivered = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify({ status: 'delivered' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to update status');
      fetchOrders(token);
    } catch (e:any) {
      alert(e.message);
    }
  };

  useEffect(() => {
    if (token) fetchOrders(token);
  }, [token]);

  if (!token) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          className="border p-2 w-full rounded mb-4"
          placeholder="Enter admin token"
          value={inputToken}
          onChange={e => setInputToken(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-emerald-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {error && <p className="text-red-600">{error}</p>}
      <div className="space-y-4">
        {orders.map(o => (
          <div key={o.id} className="border rounded-xl p-4 shadow-sm">
            <div className="font-semibold">{o.name} – {o.phone}</div>
            <div className="text-sm text-gray-600">{o.address}</div>
            <div className="text-sm">Total: {o.total} ج.م – {o.payment_method}</div>
            <div className="text-sm text-gray-500">Placed at {new Date(o.created_at).toLocaleString()}</div>
            {o.notes && <div className="italic text-sm">Notes: {o.notes}</div>}
            <div className="text-sm font-medium">Status: {o.status}</div>
            <div className="mt-2">
              <h4 className="font-medium">Items:</h4>
              <ul className="list-disc ml-5 text-sm">
                {o.items.map((it, idx) => (
                  <li key={idx}>
                    {it.qty}× {it.name} ({it.size}{it.color ? `, ${it.color}` : ''}) – {it.price} ج.م
                  </li>
                ))}
              </ul>
            </div>
            {o.status !== 'delivered' && (
              <button
                onClick={() => markDelivered(o.id)}
                className="mt-3 bg-emerald-500 text-white px-4 py-1 rounded"
              >
                Mark as Delivered
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
