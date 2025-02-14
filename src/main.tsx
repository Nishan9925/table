import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@ant-design/v5-patch-for-react-19';
import "../public/styles/reset.css";

createRoot(document.getElementById('root')!).render(
    <div style={{width: "100%"}}>
        <App />
    </div>
)
