import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@ant-design/v5-patch-for-react-19';
import "../src/styles/reset.css";
import "../src/styles/table.css";

createRoot(document.getElementById('root')!).render(
    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <App />
    </div>
)
