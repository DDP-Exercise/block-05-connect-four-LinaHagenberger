"use strict";

//TODO: Think of this view as your game board.
//      Your view should listen to various custom events of your model.
//      For each event of your model, there should be a clear visual
//      representation of what's going on.

//TODO: Update the field. Show the whole battlefield with all the stones
//      that are already played.

//TODO: Show the current player

//TODO: Notify the player when the game is over. Make it clear how the
//      Game ended. If it's a win, show the winning stones.


import {connectfourModel} from "./model.connectfour.js";

export let connectfourView = {
    boardElement: document.querySelector("#game-board"),
    statusElement: document.querySelector("#status"),

    init() {
        connectfourModel.events.addEventListener(
            "connect4:playerchange",
            (event) => {
                this.renderCurrentPlayer(
                    event.detail.currentPlayer
                );
            }
        );

        connectfourModel.events.addEventListener(
            "connect4:stoneinserted",
            () => {
                this.renderBoard();
            }
        );

        connectfourModel.events.addEventListener(
            "connect4:gameover",
            (event) => {
                this.renderGameOver(event.detail);
            }
        );
    },

    renderBoard() {
        this.boardElement.innerHTML = "";

        for (let row = 0; row < connectfourModel.rows; row++) {
            for (let col = 0; col < connectfourModel.cols; col++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                let stone = connectfourModel.board[row][col];

                if (stone?.id === 1) cell.classList.add("p1");
                if (stone?.id === 2) cell.classList.add("p2");

                cell.dataset.col = col;

                this.boardElement.appendChild(cell);
            }
        }
    },

    renderCurrentPlayer(player) {
        this.statusElement.textContent =
            player.name + "'s turn";

        document.querySelector("#player-left").classList.remove("active-player");

        document.querySelector("#player-right").classList.remove("active-player");

        if (player.id === 1) {
            document.querySelector("#player-left").classList.add("active-player");
        } else {
            document.querySelector("#player-right").classList.add("active-player");
        }
    },

    renderGameOver(detail) {
        if (detail.isDraw) {
            this.statusElement.textContent = "It's a Draw!";
            return;
        }

        this.statusElement.textContent =
            detail.winner.name + " Wins!";

        detail.winningStones.forEach((stone) => {
            let index = stone.row * connectfourModel.cols + stone.col;

            this.boardElement.children[index].classList.add("winner")
        });
    }
}