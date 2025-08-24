import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Database from 'better-sqlite3';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'changeme';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// SQLite setup
const db = new Database('data.db');
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    image TEXT,
    category TEXT,
    description TEXT,
    sizes TEXT,
    colors TEXT,
    colorImages TEXT
  );
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    payment_method TEXT DEFAULT 'COD',
    notes TEXT,
    items TEXT NOT NULL,
    total INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'pending'
  );
`);

// Seed products endpoint (one-time)
app.post('/seed', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) return res.status(401).json({error: 'Unauthorized'});
  const products = req.body.products || [];
  const insert = db.prepare(`INSERT OR REPLACE INTO products 
    (id,name,price,image,category,description,sizes,colors,colorImages) 
    VALUES (@id,@name,@price,@image,@category,@description,@sizes,@colors,@colorImages)`);
  const tx = db.transaction((rows)=>{
    rows.forEach(p => insert.run({
      ...p,
      sizes: JSON.stringify(p.sizes || []),
      colors: JSON.stringify(p.colors || []),
      colorImages: JSON.stringify(p.colorImages || {}),
    }));
  });
  tx(products);
  res.json({ok:true, count: products.length});
});

app.get('/products', (req,res)=>{
  const rows = db.prepare('SELECT * FROM products').all();
  const products = rows.map(r => ({
    ...r,
    sizes: r.sizes ? JSON.parse(r.sizes) : [],
    colors: r.colors ? JSON.parse(r.colors) : [],
    colorImages: r.colorImages ? JSON.parse(r.colorImages) : {}
  }));
  res.json(products);
});

app.post('/orders', (req,res)=>{
  const {name, phone, address, payment_method='COD', notes='', items, total} = req.body;
  if (!name || !phone || !address || !Array.isArray(items) || typeof total !== 'number') {
    return res.status(400).json({error: 'Invalid payload'});
  }
  const stmt = db.prepare(`INSERT INTO orders (name,phone,address,payment_method,notes,items,total)
    VALUES (?,?,?,?,?,?,?)`);
  const info = stmt.run(name, phone, address, payment_method, notes, JSON.stringify(items), total);
  res.json({ok:true, id: info.lastInsertRowid});
});

// Admin: list orders
app.get('/orders', (req,res)=>{
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) return res.status(401).json({error: 'Unauthorized'});
  const rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  const orders = rows.map(o => ({...o, items: JSON.parse(o.items)}));
  res.json(orders);
});

// Admin: update order status
app.put('/orders/:id/status', (req,res)=>{
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) return res.status(401).json({error: 'Unauthorized'});
  const {status} = req.body;
  if (!['pending','delivered'].includes(status)) return res.status(400).json({error:'Invalid status'});
  const info = db.prepare('UPDATE orders SET status=? WHERE id=?').run(status, req.params.id);
  res.json({ok:true, changes: info.changes});
});

app.get('/health', (_req,res)=> res.json({ok:true}));

app.listen(PORT, ()=>{
  console.log('Server running on port', PORT);
});
