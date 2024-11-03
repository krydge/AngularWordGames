import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import words from '../../../data/words_dictionary';
import PlayStates from '../../../data/PlayStates';
import { UserService } from '../../../services/UserServices';
import { Observable } from 'rxjs';

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
  readonly maxTries: number = 6
  instructions: string = `Guess the word, enter your guess for the word. Correctly placed letters will be underlined in green, correctly guessed  in the incorrect position will be underlined in yellow. Incorrectly guessed letters will be underlined in red. You have ${this.maxTries} guesses. Good luck!`;
  difficulty = '0';
  word: string = ''
  guessedLetters: string[] = [];
  tries: number = 0;
  styles: any[] = []
  definition!: Observable<any>;
  hint: boolean = false
  anotherHint:boolean=false
  usedLetters: string[] = []

  constructor(private _userService: UserService) {
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
      if (element.length == Number(this.difficulty) + 3)
        wordList.push(element)
    });
    let w = wordList[Math.floor(Math.random() * wordList.length)];
    let res = this._userService.getUser(w)
    res.subscribe({
      next: data => {
        this.definition = data[0].meanings[0].definitions[0].definition
      },
      error: error => {
        console.log(error)
        this.getWord()
      }
    }
    )

    console.log(this.definition)
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
      this.styles.push({ "borderColor": this.setColor(this.guessedLetters[x], x) ,"color": this.setColor(this.guessedLetters[x], x)})
      this.usedLetters.push(this.guessedLetters[x])

      if (!this.checkIsGoodLetter(this.guessedLetters[x], x)) {
        isgood = false
      }
    }
    this.usedLetters = this.usedLetters.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.usedLetters.sort()
    if (isgood) {
      console.log("win")
      this.state = PlayStates.won
    }
    else {
      console.log("word is incorrect")
    }
    this.tries++
    if (this.tries >= this.maxTries) {
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
    this.styles = []
    this.hint=false;
    this.anotherHint = false;
    this.getWord()
    this.usedLetters = [];
  }
  seeHint() {
    if (this.hint) {
      this.hint = false
    } else {
      this.hint = true
    }
  }
  seeAnotherHint(){
    if (this.anotherHint) {
      this.anotherHint = false
    } else {
      this.anotherHint = true
    }
  }
}