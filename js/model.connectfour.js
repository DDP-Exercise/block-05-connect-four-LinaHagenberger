"use strict";

//TODO: Think of this model as the game-logic.
//      The model knows everything that is neccessary to manage
//      the game. It knows the players, know who's turn it is,
//      knows all the stones and where they are, knows if the
//      game is over and if so, why (draw or winner). It knows
//      which stones are the winning stones. The model also has
//      sovereignty over the battlefield.
//      First step: Create your model-object with all the properties
//      necessary to store that information.

//TODO: Prepare some customEvents. The model should dispatch events when
//      - The Player Changes
//      - A stone was inserted
//      - The Game is over (Draw or Winner)
//      Don't forget to give your events a namespace.
//      For each customEvent, just make a >method< for your model-object,
//      that, when called, dispatches the event. Nothing else should
//      happen in those methods.


//TODO: Initiate the battlefield. Your model needs a representation of the
//      battlefield as data (two-dimensional array). Obviously, there are
//      no stones yet in the field.

//TODO: The model should offer a method to insert a stone at a given column.
//      If the stone can be inserted, the model should insert the stone,
//      dispatch an event to let the world know that the battlefield has changed
//      and check if the game is over now.
//      Hint: This method will be called later by your controller, when the
//      user makes an according input.

//TODO: Methods to check if the game is over, either by draw or a win.
//      Let the world know in both cases what happend. If it's a win,
//      Don't forget to store the winning stones and add this >detail<
//      to your custom event.

//TODO: Method to change the current player (and dispatch the according event).

export let connectfourModel = {

    rows: 6,
    cols: 7,

    board: [],

    players: [
        {
            id: 1,
            name: "Spyro",
            color: "purple"
        },
        {
            id: 2,
            name: "Dark Spyro",
            color: "black"
        }
    ],

    currentPlayer: null,
    gameOver: false,
    winner: null,
    isDraw: false,
    winningStones: [],

    events: new EventTarget(),

    dispatchPlayerChange() {

        this.events.dispatchEvent(
            new CustomEvent("connect4:playerchange", {
                detail: {
                    currentPlayer: this.currentPlayer
                }
            })
        );
    },

    dispatchStoneInserted(row, col) {

        this.events.dispatchEvent(
            new CustomEvent("connect4:stoneinserted", {
                detail: {
                    row: row,
                    col: col
                }
            })
        );
    },

    dispatchGameOver() {

        this.events.dispatchEvent(
            new CustomEvent("connect4:gameover", {
                detail: {
                    winner: this.winner,
                    isDraw: this.isDraw,
                    winningStones: this.winningStones
                }
            })
        );

    },

    initBoard() {
        this.board = Array.from(
            {length: this.rows},

            () => Array(this.cols).fill(null)
        );
    },

    insertStone(col) {

        if (this.gameOver) return false;

        for (let row = this.rows - 1; row >= 0; row--) {

            if (this.board[row][col] === null) {
                this.board[row][col] = this.currentPlayer;
                this.dispatchStoneInserted(row, col);
                this.checkGameOver();

                if (!this.gameOver) {
                    this.switchPlayer();
                }
                return true;
            }
        }
        return false;
    },

    checkGameOver() {

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {

                let player = this.board[row][col];

                if (player === null) continue;

                if (this.checkDirection(row, col, 0, 1, player)) return;
                if (this.checkDirection(row, col, 1, 0, player)) return;
                if (this.checkDirection(row, col, 1, 1, player)) return;
                if (this.checkDirection(row, col, 1, -1, player)) return;
            }
        }
        this.checkDraw();
    },

    checkDirection(row, col, dRow, dCol, player) {

        let stones = [{ row, col }];
        for (let i = 1; i <4; i++) {
            let r = row + dRow * i;
            let c = col + dCol * i;

            if (!this.board[r] || this.board[r][c] !== player) {
                return false;
            }
            stones.push({ row: r, col: c });
        }

        this.gameOver = true;
        this.winner = player;
        this.winningStones = stones;

        this.dispatchGameOver();
        return true;
    },

    checkDraw() {

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {

                if (this.board[row][col] === null) {
                    return;
                }
            }
        }
        this.gameOver = true;
        this.isDraw = true;

        this.dispatchGameOver();
    },

    switchPlayer() {

        if (this.gameOver) return;

        if (this.currentPlayer.id === this.players[0].id) {
            this.currentPlayer = this.players[1];
        } else {
            this.currentPlayer = this.players[0];
        }
        this.dispatchPlayerChange();
    },

    resetGame() {
        this.board = Array.from(
            { length: this.rows },
            () => Array(this.cols).fill(null)
        );

        this.currentPlayer = this.players[0];

        this.gameOver = false;
        this.winner = null;
        this.isDraw = false;
        this.winningStones = [];

        this.dispatchPlayerChange();
    }

}




















