# RF Chater - Setup Guide

## Prerequisites

- Node.js 18+ (https://nodejs.org)
- Git
- npm or yarn

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/nmsnalldesign-oss/rf-chater.git
cd rf-chater
```

### 2. Start Backend (Terminal 1)
```bash
cd server
npm install
npm start
```
Backend will run on `http://localhost:4000`

### 3. Start Frontend (Terminal 2)
```bash
cd client
npm install
npm run dev
```
Client will open Electron app window

## First Use

1. **Register**: Create account with email + password
2. **Login**: Use credentials to login
3. **Chat**: Join #general channel
4. **Invite Friends**: Share your laptop/run on another PC
5. **Voice**: Click button at bottom to start voice call

## File Structure

```
rf-chater/
├── server/              # Node.js + Express backend
│   ├── server.js        # Main server file
│   ├── routes/          # API endpoints
│   ├── utils/           # Helpers (DB, JWT, WebRTC)
│   ├── middleware/      # Auth, validation
│   ├── db/              # SQLite database
│   └── package.json
│
├── client/              # Electron + React frontend
│   ├── src/
│   │   ├── main.js      # Electron entry
│   │   ├── App.jsx      # React root
│   │   ├── pages/       # Login, Register, Dashboard
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom hooks
│   │   ├── store/       # State management (Zustand)
│   │   └── utils/       # Utilities
│   └── package.json
│
└── README.md            # This file
```

## Troubleshooting

### Port Already in Use
```bash
# Change server port in server/server.js
const PORT = process.env.PORT || 5000;  # Change 4000 to 5000
```

### WebRTC Connection Issues
Ensure both users are on the same local network or configure TURN server:
- Edit `client/src/utils/webrtc.js`
- Add TURN server configuration for external connections

### Database Issues
Delete `server/db/database.db` and restart server to reset

## Building Standalone App

### Windows
```bash
cd client
npm install electron-builder --save-dev
npm run build
# Output: dist/*.exe
```

### macOS
```bash
cd client
npm run build
# Output: dist/*.dmg
```

### Linux
```bash
cd client
npm run build
# Output: dist/*.AppImage
```

## Environment Variables

Create `server/.env`:
```
PORT=4000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## Firewall Rules

Allow port 4000 (or custom PORT) through firewall:
- Windows: Check Windows Defender settings
- macOS: System Preferences > Security & Privacy
- Linux: `sudo ufw allow 4000`

## Support

For issues: Open issue on GitHub

---

**Happy chatting!**
