#!/bin/bash
echo "Starting Smart Turistom Server..."
echo ""
echo "Server will be available at: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""
python3 -m http.server 8000
