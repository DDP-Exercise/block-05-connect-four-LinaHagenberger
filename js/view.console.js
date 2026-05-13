"use strict";

//TODO: Optional: Create a console-view to test your Game.

import {connectfourModel} from "./model.connectfour.js";

export let connectfourConsoleView = {

    init() {

        connectfourModel.events.addEventListener(
            "connect4:playerchange",
            (event) => {
                console.log("PLAYER CHANGE:", event.detail.currentPlayer.name);
            }
        );

        connectfourModel.events.addEventListener(
            "connect4:stoneinserted",
            (event) => {
                console.log("STONE INSERTED:", "row", event.detail.row, "col", event.detail.col);
            }
        );

        connectfourModel.events.addEventListener(
            "connect4:gameover",
            (event) => {
                if (event.detail.isDraw) {
                    console.log("GAME OVER: DRAW");

                } else {
                    console.log("GAME OVER:", event.detail.winner.name, "wins!");

                    console.log("WINNING STONES:", event.detail.winningStones);
                }
            }
        );
    }
}