import { lazy, Suspense } from 'react'

const Chatbot = lazy(() => import('./mychatbot'));

function App() {



  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Chatbot />
    </Suspense>
  )
}

export default App
