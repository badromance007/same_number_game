import './App.css';
import { Component } from 'react';
import Number from './components/Number';
import { nanoid } from 'nanoid';

class App extends Component {

  state = {
    numbers: [...Array(10)].map(item => (
      {
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      }
    ))
  }

  holdNumber = (id) => {
    this.setState(prevState => (
      {
        numbers: prevState.numbers.map(oldNum => (
          oldNum.id === id ? {
            ...oldNum,
            isHeld: !oldNum.isHeld
          } :
          oldNum
        ))
      }
    ))
  }

  rollNumber = () => {
    console.log('roll number')
  }

  componentDidMount() {
    document.title = 'Same Number Game'
  }

  render() {

    const numberElements = this.state.numbers.map((number) => (
      <Number
        key={number.id} 
        number={number}
        holdNumber={this.holdNumber}
      />
    ))

    return (
      <main>
        <div className='container'>
          <div className='game--description'>
            <h2>Same Number Game</h2>
            <p>Click "Roll" button until all freezed numbers are the same. Click each number to freeze it at its current value between rolls.</p>
          </div>

          <div className='game--container'>
            {numberElements}
          </div>

          <div className='game--button'>
            <button onClick={this.rollNumber}>Roll</button>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
