import "./App.css"
import Header from "./components/header/Header"
import Main from "./components/main/Main"
import { useState } from "react"

function App() {
    let [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="body">
            <Header toggleMenu={toggleMenu} />
            <Main isMenuOpen={isMenuOpen} />
        </div>
    )
}

export default App
