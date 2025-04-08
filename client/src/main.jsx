import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <GoogleOAuthProvider clientId="796792356312-p49utt8c7n6tivcbp4njahhe35034p1j.apps.googleusercontent.com">
                <App />
            </GoogleOAuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
