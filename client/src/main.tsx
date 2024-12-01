import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './output.css'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
    <App />
)
