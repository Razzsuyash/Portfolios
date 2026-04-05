import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.warn('MONGO_URI is not defined in the environment variables.');
}

// Global caching for serverless environments (like Vercel)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URI) throw new Error('MONGO_URI missing');
  
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

// Define the Mongoose Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Avoid 'OverwriteModelError' in serverless hot reloads
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

// Vercel serverless function handler
export default async function handler(req, res) {
  // We only accept POST requests for submitting the form
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    // 1. Connect to MongoDB
    await dbConnect();
    
    // 2. Extract Data
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Please provide name, email, and message.' });
    }

    // 3. Save to Database
    const newContact = await Contact.create({ name, email, message });
    
    // 4. Return success response
    return res.status(201).json({ success: true, data: newContact });
    
  } catch (error) {
    console.error("Database connection/save error:", error);
    return res.status(500).json({ success: false, error: 'Server Error: Could not save message.' });
  }
}
