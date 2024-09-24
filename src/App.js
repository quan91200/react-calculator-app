/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-eval */
import './App.css'
import { useState, useEffect } from 'react'

function App() {
  // Trạng thái Dark Mode
  const [darkMode, setDarkMode] = useState(false)

  const [result, setResult] = useState('')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Chuyển đổi giữa dark và light mode
  }

  // Biến lưu kết quả
  const [calculatedResult, setCalculatedResult] = useState('')

  const handleClick = (e) => {
    setResult(result.concat(e.target.name))
  }

  const clear = () => {
    setResult("")
    setCalculatedResult('') // Xóa luôn kết quả khi nhấn AC
  }

  const handleDelete = () => {
    setResult(result.slice(0, -1))
  }

  const calculate = () => {
    try {
      const evalResult = eval(result).toString()
      setCalculatedResult(evalResult) // Lưu kết quả vào biến calculatedResult

    } catch {
      setCalculatedResult("Error")
    }
  }

  const handleKeyPress = (e) => {
    const key = e.key

    if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
      // Nếu là số hoặc phép toán thì thêm vào chuỗi result
      setResult(result.concat(key))
    } else if (key === 'Enter') {
      // Nếu nhấn Enter thì tính toán
      calculate()
    } else if (key === 'Backspace') {
      // Nếu nhấn Backspace thì xóa một ký tự
      handleDelete()
    } else if (key === 'Escape') {
      // Nếu nhấn Escape thì xóa tất cả
      clear()
    }
  }

  useEffect(() => {
    // Thêm event listener khi component được render
    window.addEventListener('keydown', handleKeyPress)

    // Cleanup event listener khi component bị hủy
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [result])

  return (
    <div className={`App ${darkMode ? '' : 'dark'}`}>
      <h3>Cobham Calculator App</h3>
      <div className='container'>
        {/* Nút Switch cho Dark Mode */}
        <label className="switch">
          <input type="checkbox" onChange={toggleDarkMode} checked={darkMode} />
          <span className="slider"></span>
        </label>
        <form>
          <div className='calculated-result'>
            <input type="text" value={result} />
            <p className='result'>{calculatedResult}</p>
          </div>
        </form>

        <div className='keypad'>
          <button onClick={clear} id='clear' className='highlight'>AC</button>
          <button onClick={handleDelete} className='highlight'>DEL</button>
          <button name='/' onClick={handleClick} className='highlight'>&divide;</button>
          <button className='number' name="7" onClick={handleClick}>7</button>
          <button className='number' name="8" onClick={handleClick}>8</button>
          <button className='number' name="9" onClick={handleClick}>9</button>
          <button name="*" onClick={handleClick} className='highlight'>&times;</button>
          <button className='number' name="4" onClick={handleClick}>4</button>
          <button className='number' name="5" onClick={handleClick}>5</button>
          <button className='number' name="6" onClick={handleClick}>6</button>
          <button name="-" onClick={handleClick} className='highlight'>-</button>
          <button className='number' name="1" onClick={handleClick}>1</button>
          <button className='number' name="2" onClick={handleClick}>2</button>
          <button className='number' name="3" onClick={handleClick}>3</button>
          <button name="+" onClick={handleClick} className='highlight'>+</button>
          <button className='number' name="0" onClick={handleClick}>0</button>
          <button className='number' name="." onClick={handleClick}>.</button>
          <button onClick={calculate} id='equal'>=</button>
        </div>

      </div>

    </div>
  )
}

export default App