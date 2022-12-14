import './App.css'
import Header from './components/header/Header'
import Main from './components/main/Main'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
    const [queryClient] = useState(() => {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                    refetchOnWindowFocus: false,
                },
            },
        })
    })

    const [search, setSearch] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(true)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div className="body">
                    <Header
                        search={search}
                        setSearch={setSearch}
                        toggleMenu={toggleMenu}
                    />
                    <Main search={search} isMenuOpen={isMenuOpen} />
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
