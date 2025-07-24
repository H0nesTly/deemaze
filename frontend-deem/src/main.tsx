import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter, Routes,Route } from 'react-router'
import Home from './pages/Home.tsx'
import DocumentExplorer from './pages/DocumentExplorer.tsx'
import Document from './pages/Document.tsx'
import NoPage from './pages/NoPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='/document' element={<DocumentExplorer/>}/>
      <Route path='/document/:id' element={<Document/>}/>
      <Route path='*' element={<NoPage/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
