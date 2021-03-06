import React from "react";
import Board from "./Board";
import calculateWinnerorDraw from "./CalculateWinner";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinnerorDraw(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinnerorDraw(current.squares);
    let status;
    if (winner) {
      status = winner;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>

          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}
