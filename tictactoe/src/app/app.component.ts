import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  characters: String[] = ['O', 'X']
  activeCharacter: number =  0;
  winningCharacter: String = '';
  showStartScreen: boolean = true;
  showPlayGrid: boolean = false;
  showEndScreen: boolean = false;
  endMessage: String = "";
  playGrid: String[] =
    [
      "", "", "",
      "", "", "",
      "", "", ""
    ]

  winningPatterns: number[][] = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]

  selectCell(index: number) {
    if(this.playGrid[index] === "")
      this.playGrid[index] = this.characters[this.activeCharacter];

    if(this.activeCharacter === 0)
      this.activeCharacter = 1
    else
      this.activeCharacter = 0;

    this.checkWinner()
  }
  checkWinner() {
    for (let pattern of this.winningPatterns) {
      const [a, b, c] = pattern;

      if (
        this.playGrid[a] &&
        this.playGrid[a] === this.playGrid[b] &&
        this.playGrid[a] === this.playGrid[c]
      ) {
        this.winningCharacter = this.playGrid[a];
        this.endMessage = "Won the game!"
        this.showPlayGrid = false;
        this.showEndScreen = true;
        return;
      }

      if(this.playGrid.every(cell => cell !== "")) {
        this.showEndScreen = true;
        this.showPlayGrid = false;
        this.showStartScreen = false;
        this.endMessage = "It's a Tie"
        return;
      }

    }
  }

  setStartingCharacter(character: number) {
      this.activeCharacter = character;
      this.showPlayGrid = true;
      this.showStartScreen = false;
  }

  startNewGame() {
    this.winningCharacter = '';
    this.playGrid = [
      "", "", "",
      "", "", "",
      "", "", ""
    ]
    this.showStartScreen = true;
    this.showEndScreen = false;
    this.endMessage = "";
  }

}
