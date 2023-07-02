import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import { Provider } from 'react-redux';
// import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
        {/* <Provider store={store}> */}
          <App />
        {/* </Provider> */}
  </React.StrictMode>
);

reportWebVitals();
