import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx', 'resources/css/dashboard.css', 'resources/css/navbar.css'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
          '@': path.resolve(__dirname, 'resources/js'),
        },
      },
});
