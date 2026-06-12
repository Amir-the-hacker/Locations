import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CssBaseline from '@mui/material/CssBaseline'
import { HomePage } from './components/HomePage'

const queryClient = new QueryClient()

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />

        <HomePage />
      </QueryClientProvider>
    </>
  )
}

export default App
