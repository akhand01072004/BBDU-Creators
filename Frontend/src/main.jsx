import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { LoginProvider } from './Context/LoginContext.jsx'
// import { AdminLoginProvider } from './component/admin/AdminContext/AdminLoginContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoginProvider>
    <App />
  </LoginProvider>
  
)
