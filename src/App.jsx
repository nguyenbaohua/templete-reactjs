import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const NODE_ENV = process.env.NODE_ENV

  return (
    <>
      <nav>
        <ul>
          <li><a href="/">Dashboard</a></li>
          <li><a href="/settings">Settings</a></li>
        </ul>
      </nav>
    </>
  )
}

export default App
