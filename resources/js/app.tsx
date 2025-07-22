import React from 'react';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { createRoot } from 'react-dom/client';
import '../css/dashboard.css';
import '../css/navbar.css';

createInertiaApp({
    resolve: (name) => import(`./Pages/${name}.tsx`).then(module => module.default),
    setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
