import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import ProductionOrderForm from './components/production-order-form'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <ProductionOrderForm />
  )
}

export default App
