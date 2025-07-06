# SwiftGame Frontend

## ⚙️ Tech Stack

- **ReactJS** – UI framework
- **TanStack Router** – Modern file-based routing
- **Zustand** – Global state management (lightweight)
- **TanStack Query** – Data fetching/caching
- **Shadcn/UI** – Clean and customizable UI components
- **Socket.IO Client** – Real-time communication with backend

## 📄 Pages Overview

### Auth Page
- Simple username input
- On submit, Authenticated via JWT 
- Stores token in store and persist it using localstorage

### Home Page
- Displays countdown timer for session start/end
- Button to join current session (if active)
- Uses WebSocket `sessionEvents` to keep in sync

### Game Page
- User selects a number (1–10)
- Socket emits selection to backend
- When session ends, shows result (win/loss)
- Displays participant list in real time

## 🔁 Real-Time Integration

### On app load or reconnect:
- Socket emits `sessionInit` to get the current session

## 🧠 Logic Flow

### Session Start:
- Frontend gets `sessionStarted`
- User can now hit "Join Game"

### Number Selection:
- User picks number
- One-time selection per session

### Session End:
- Receives result, determines winner
- A buuton to join go back to the dashboard. A session is nit automatically joined for user so user can decide if they'd like to join a session or not.

## Setup
1. Clone git repo
2. Run
```
pnpm install
pnpm run dev
```
