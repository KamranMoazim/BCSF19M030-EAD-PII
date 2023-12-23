import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'


const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     retry: 3,
  //     cacheTime: 300_000, // 5 minutes
  //     staleTime: 1000 * 60 * 60, // 1 hour
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //   },
  // },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <App /> */}
    </QueryClientProvider>
    {/* <ReactQueryDevtools initialIsOpen={false}  /> */}
  </React.StrictMode>,
)
