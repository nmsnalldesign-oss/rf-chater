# RF Chater - Desktop Chat & Voice App

Drop-in replacement for Discord/Telegram for small groups. Works completely offline. No external servers, Russia-friendly.

## Quick Features

- Text chats with history (#general, #gaming, #random)
- P2P voice calls (1-on-1 and groups up to 6)
- No external dependencies
- Works in local networks
- Email/password auth

## Tech: Node + Electron + React

Backend: Express, Socket.io, SQLite  
Frontend: Electron, React, TailwindCSS, Zustand  

## Setup

### Backend
```bash
cd server
npm install
npm start
# http://localhost:4000
```

### Frontend (new terminal)
```bash
cd client
npm install
npm run dev
```

## Usage

1. Register with email+password
2. Join #general
3. Invite friends to voice call (bottom button)

## Structure

server/ - Node backend  
client/ - Electron+React  

## Russia Notes

No Google STUN, CloudFlare, AWS - uses local STUN/TURN or direct P2P.
