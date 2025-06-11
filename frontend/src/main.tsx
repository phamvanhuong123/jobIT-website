import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom'; 
import {store} from './store.ts'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  
  </BrowserRouter>
);
