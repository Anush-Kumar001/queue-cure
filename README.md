# Queue Cure 🏥

**Queue Cure** is a real-time, event-driven clinic queue management system designed to minimize patient anxiety and optimize clinic workflows. By shifting state metrics away from fragile client-side pooling mechanisms, this infrastructure leverages **WebSockets** to guarantee sub-second updates across distributed patient lounges and receptionist dashboards simultaneously.

---

## 🚀 Core Features

* **Live Registration Desk:** Allows receptionists to seamlessly intake patients, collect name/contact metrics, and track estimated service consultation durations.
* **Instant Broadcast Architecture:** Utilizes sub-second WebSocket signals to synchronize changes instantly across all screens without manual page refreshes.
* **Smart Lounge Tracker:** Patients can look up their exact token identifiers to check real-time queue standings, active metrics on tokens ahead, and total calculated wait durations dynamically.

---

## 🏗️ System Architecture & Event Flow

The platform separates responsibilities cleanly between an independent backend data state router and dynamic frontend views.



### 📡 WebSocket Sync Blueprint
* **`connection`**: Triggered when a device opens a layout view; the server instantly delivers the current global queue snapshot object.
* **`queue-update`**: Multi-cast event broadcasted to all connected clients immediately after any array mutations occur (adding a patient or calling the next token).

---

## 🛠️ Tech Stack & Infrastructure

* **Frontend:** React, Tailwind CSS (for highly scannable, responsive interfaces), Vite.
* **Backend:** Node.js, Express (REST API layers for structural commands).
* **Real-Time Layer:** Socket.IO (Bidirectional WebSocket pipes).

---

## ⚙️ Installation & Local Setup

Follow these steps to run the full-stack architecture on your local machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/Anush-Kumar001/queue-cure.git](https://github.com/Anush-Kumar001/queue-cure.git)
cd queue-cure
