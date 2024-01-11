import './index.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import App from './App.tsx'
import { AppProvider } from './ContexData/app.contex.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
