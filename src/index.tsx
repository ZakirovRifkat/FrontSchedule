import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App'
import reportWebVitals from './reportWebVitals'
import './index.css'
import 'react-datepicker/dist/react-datepicker.css'

const node = document.getElementById('root')
if (!node) {
    throw new Error('Root node not found')
}

const root = ReactDOM.createRoot(node)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
