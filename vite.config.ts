import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  server: {
    // Specify MIME types for file extensions
  },
  plugins: [react()],
});