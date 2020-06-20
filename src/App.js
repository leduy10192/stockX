import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
const alphaVantageKey = process.env.REACT_APP_ALPHA_VANTAGE_KEY;

class App extends Component {
  state = {
    ticker: null,
    stockData: ''
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(this.state.ticker !== prevState.ticker){
  //     this.fetchStockData(this.state.ticker)
  //   }
  // }

  //Sample Axios fetch
  fetchStockData= () => {
    const ticker = this.state.ticker
    console.log('ticket', ticker)
    axios.get(
        // `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${alphaVantageKey}`
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${alphaVantageKey}`
    ).then(res => {
        const stockData = res.data["Global Quote"];
        console.log('stockData', stockData)
        this.setState({stockData})
    }).catch(error => {
        // this.setState({ error: true })
        console.log(error)
    });
  };

  inputHandler = (event) => {
    const ticker = event.target.value;
    this.setState({ticker : ticker})
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.fetchStockData()
  }


  render() {
    return (
      <div class="mainDiv">

        <div align="center">
          <h1>EMA TRACKING</h1>
          <nav>
            <div>
              <h1><u>INPUT</u></h1>
              <form id="input" name="input" onSubmit={this.submitHandler}>
                <table>
                  <tr>
                    <td>
                      <label>Ticket: </label>
                      <input type="text" id="ticket" name="ticket" onChange={(event) => this.inputHandler(event)}/>
                    </td>
                    <td>
                      <label for="time">TimeFrame: </label>
                      <input type="text" id="time" name="time" />
                    </td>
                    <td>
                      {/* <input type="submit" value="Submit" /> */}
                      <button>Submit</button>
                    </td>
                  </tr>
                  <tr>
                    <label for="ema">EMA: </label>
                    <input type="text" id="ema1" name="ema1" />
                    <input type="text" id="ema2" name="ema2" />
                    <input type="text" id="ema3" name="ema3" />

                  </tr>
                </table>
              </form>
              <br />
              <div>
                <h1><u>OUTPUT</u></h1>
                <nav>
                  <table>
                    <tr>
                      <td><b>Ticker name: {this.state.stockData["01. symbol"]}  </b></td>
                      <td><label id="ticketname"></label></td >
                    </tr>
                    <tr>
                      <td><b>Price:{this.state.stockData["05. price"]}  </b></td>
                      <td></td >
                    </tr>
                    <tr>
                      <td><b>Cross detector:</b></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td><b>Ticket Trend: {this.state.stockData["10. change percent"]}</b></td>
                      <td></td >
                    </tr>
                    <tr>
                      <input type="submit" value="Show graph" />
                    </tr>

                  </table>
                </nav>
              </div>

            </div>
          </nav>
        </div>

      </div>
    );
  }
}


export default App;



