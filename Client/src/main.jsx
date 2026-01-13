
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <>
        <App />
        <Toaster position='top-right' reverseOrder={false}/>
    </>
)
