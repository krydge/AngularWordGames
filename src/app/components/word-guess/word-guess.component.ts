import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import words from '../../../data/words_dictionary';
import PlayStates from '../../../data/PlayStates';

@Component({
  selector: 'app-word-guess',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './word-guess.component.html',
  styleUrl: './word-guess.component.css'
})
export class WordGuessComponent {
  state = PlayStates.playing
  title: string = " Word Guess";
  instructions: string = "Guess the word, enter your guess for the word. Correctly placed letters will be underlined in green, correctly guessed  in the incorrect position will be underlined in yellow. Incorrectly guessed letters will be underlined in red. You have 6 guesses. Good luck!";
  difficulty = '0';
  word: string = ''
  guessedLetters: string[] = [];
  tries: number = 0;
  maxTries: number = 3
  styles: any[] = []

  constructor() {
    this.getWord()


  }
  ngOnInit() {
    this.getWord()
  }

  onSubmit(guess: string) {

  }
  setDifficulty() {
    this.difficulty = (Number(this.difficulty)).toString()
  }
  getWord() {
    let wordList: any = []
    words.map(element => {
      if (element.length == Number(this.difficulty) + 5)
        wordList.push(element)
    });
    let w = wordList[Math.floor(Math.random() * wordList.length)];

    this.word = w
  }

  checkWord() {
    console.log(this.guessedLetters)
    let isgood = true;

    if (this.guessedLetters.length == 0) {
      console.log("no word given")
      return
    }
    this.styles = []
    for (let x = 0; x < this.guessedLetters.length; x++) {
      this.styles.push({ "color": this.setColor(this.guessedLetters[x], x) })
      if (!this.checkIsGoodLetter(this.guessedLetters[x], x)){
        isgood = false
      }
    }
    if (isgood) {
      console.log("win")
      this.state = PlayStates.won
    }
    else {
      console.log("word is incorrect")
    }
    this.tries++
    if (this.tries > this.maxTries) {
      this.state = PlayStates.lost
    }
  }
  letterIsInWord(letter: string) {
    return this.word.includes(letter)
  }
  letterInCorrectPosition(letter: string, index: number) {
    return this.word[index] == letter
  }
  checkIsGoodLetter(letter: string, index: number) {
    return this.letterIsInWord(letter) && this.letterInCorrectPosition(letter, index)
  }
  setColor(letter: string, index: number) {
    if (this.letterIsInWord(letter)) {
      if (this.letterInCorrectPosition(letter, index)) {
        return "green"
      }
      else {
        return "yellow"
      }
    }
    else {
      return "red"
    }
  }

  newGame() {
    this.state = PlayStates.playing
    this.word = ''
    this.guessedLetters = [];
    this.tries = 0;
    this.maxTries = 3
    this.styles = []
    this.getWord()
  }
}