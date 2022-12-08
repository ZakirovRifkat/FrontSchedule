import "./App.css"
import Header from "./components/header/Header"
import Main from "./components/main/Main"
import { useState } from "react"

function App() {
    let [menuMode, setMenuMode] = useState(false)
    const editBurger = () => {
        setMenuMode(!menuMode)
    }
    return (
        <div className="body">
            <Header setMenuMode={editBurger} />
            <Main menuMode={menuMode} />
        </div>
    )
}

export default App
