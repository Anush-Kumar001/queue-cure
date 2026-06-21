import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { getQueueState, addPatient, callNextPatient } from './queueState.js';

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "http://localhost:5173" } });

const broadcastQueueUpdate = (updatedState) => {
  io.emit("queue-update", updatedState);
};

// --- REST API Routes ---
app.get('/queue-status', (req, res) => {
  res.json(getQueueState());
});

app.post('/add-patient', (req, res) => {
  try {
    const { name, avgTime, phone } = req.body;
    if (!name) return res.status(400).json({ error: "Patient name is required" });
    
    const updatedState = addPatient(name, avgTime, phone);
    broadcastQueueUpdate(updatedState);
    res.status(201).json(updatedState);
  } catch (err) {
    console.error("Error adding patient:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/call-next', (req, res) => {
  try {
    const updatedState = callNextPatient();
    broadcastQueueUpdate(updatedState);
    
    // Twilio removed - Simulation log
    const patientBeingServed = updatedState.nowServing;
    if (patientBeingServed && patientBeingServed.phone) {
      console.log(`[Queue Notification] Ticket ${patientBeingServed.token} (${patientBeingServed.name}) is next. Alerting mobile target: ${patientBeingServed.phone}`);
    }
    
    res.json(updatedState);
  } catch (err) {
    console.error("Error calling next patient:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

io.on('connection', (socket) => {
  socket.emit("queue-update", getQueueState());
});

httpServer.listen(PORT, () => {
  console.log(`Queue Cure backend running on http://localhost:${PORT}`);
});