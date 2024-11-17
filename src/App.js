import './App.css'
import { useState, useEffect } from 'react'
import Display from './components/Display'
import Button from './components/Button'

// Calculator app
function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [result, setResult] = useState('')
  const [calculatedResult, setCalculatedResult] = useState('')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleClick = (e) => {
    setResult(result.concat(e.target.name))
  }

  const clear = () => {
    setResult('')
    setCalculatedResult('')
  };

  const handleDelete = () => {
    setResult(result.slice(0, -1))
  }

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const evalResult = eval(result).toString()
      setCalculatedResult(evalResult)
    } catch {
      setCalculatedResult("Error")
    }
  }

  const handleKeyPress = (e) => {
    const key = e.key
    if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
      setResult(result.concat(key))
    } else if (key === 'Enter') {
      calculate()
    } else if (key === 'Backspace') {
      handleDelete()
    } else if (key === 'Escape') {
      clear()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  return (
    <div className={`App ${darkMode ? '' : 'dark'}`}>
      <h3>Cobham Calculator App</h3>
      <div className='container'>
        <label className="switch">
          <input type="checkbox" onChange={toggleDarkMode} checked={darkMode} />
          <span className="slider"></span>
        </label>
        <form>
          <Display result={result} calculatedResult={calculatedResult} />
        </form>

        <div className='keypad'>
          <Button name='AC' onClick={clear} className='highlight' />
          <Button name='DEL' onClick={handleDelete} className='highlight' />
          <Button name='/' onClick={handleClick} className='highlight' />
          <Button name='*' onClick={handleClick} className='highlight' />
          <Button name='7' onClick={handleClick} className='number' />
          <Button name='8' onClick={handleClick} className='number' />
          <Button name='9' onClick={handleClick} className='number' />
          <Button name='-' onClick={handleClick} className='highlight' />
          <Button name='4' onClick={handleClick} className='number' />
          <Button name='5' onClick={handleClick} className='number' />
          <Button name='6' onClick={handleClick} className='number' />
          <Button name='+' onClick={handleClick} className='highlight' />
          <Button name='1' onClick={handleClick} className='number' />
          <Button name='2' onClick={handleClick} className='number' />
          <Button name='3' onClick={handleClick} className='number' />
          <Button name='=' onClick={calculate} className='highlight' id='qual' />
          <Button name='0' onClick={handleClick} className='number' />
          <Button name='.' onClick={handleClick} className='number' />
        </div>
      </div>
    </div>
  )
}

export default App
