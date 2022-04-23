import './App.css';
import Number from './components/Number';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

function App() {
  const [numbers, setNumbers] = useState(allNewNumbers())
  const [endGame, setEndGame] = useState(false)

  useEffect(() => {
    document.title = 'Same Number Game'
  }, [])

  useEffect(() => {
    if (numbers.every(number => (number.isHeld && number.value === numbers[0].value))) {
      setEndGame(true)
    }
  }, [numbers])

  function generateNewNumber() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }
  
  function allNewNumbers() {
    return [...Array(10)].map(item => (
      generateNewNumber()
    ))
  }

  function rollNumber() {
    if (endGame) {
      setEndGame(false)
      setNumbers(allNewNumbers())
    } else {
      setNumbers(oldNumbers => oldNumbers.map(oldNum => {
        return oldNum.isHeld ?
              oldNum :
              generateNewNumber()
      }))
    }
  }

  function holdNumber(id) {
    setNumbers(oldNumbers => oldNumbers.map(oldNum => {
        return oldNum.id === id ?
                { ...oldNum, isHeld: !oldNum.isHeld } :
                oldNum
              })
    )
  }

  const numberElements = numbers.map(number => (
    <Number
      key={number.id} 
      number={number}
      holdNumber={holdNumber}
    />
  ))

  return (
    <main>
      <div className='container'>
        <div className='game--description'>
          <h2>Same Number Game</h2>
          { !endGame && <p>Click "Roll" button until all freezed numbers are the same. Click each number to freeze it at its current value between rolls.</p> }
          { endGame && <p>All numbers are the same. Congratulation!</p> }
        </div>

        <div className='game--container'>
          {numberElements}
        </div>

        <div className='game--button'>
          <button onClick={rollNumber}> { endGame  ? 'Reset Game' : 'Roll' }</button>
        </div>
      </div>
    </main>
  )
}

export default App;
