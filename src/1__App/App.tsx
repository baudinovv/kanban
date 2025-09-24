import { routes } from './routes/routes.js'
import { RouterProvider } from 'react-router'
import { useUserStore } from './store/store.js'
import type { StoreType } from './store/StoreType.js'
export default function App() {
  
  return (
    <div 
      className={(useUserStore((state: StoreType) => state.theme)) + 
       " transition body bg-background h-lvh"}>
      
      <RouterProvider router={routes}></RouterProvider>
    </div>
  )
}