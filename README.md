# Setup Guide

## Run Locally in 3 Steps

### 1. Create `.env` file

Create a file named `.env` in this folder and add:

```
API_KEY=your-api-key
PORT=3000
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
npm start
```

### 4. Open your browser

Go to: **http://localhost:3000**

---

## Troubleshooting

**Port 3000 already in use?**
- Change `PORT=3001` in your `.env` file

**Module not found?**
- Run `npm install` again

**API error?**
- Check that your `.env` file exists
- Verify the API_KEY is correct

