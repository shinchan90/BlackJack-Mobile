/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IonImg } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';


@Component({
  selector: 'app-jogar',
  templateUrl: './jogar.page.html',
  styleUrls: ['./jogar.page.scss'],
})
export class JogarPage implements OnInit {
  naipes = ['copas', 'ouros', 'espadas', 'paus'];
  numeros = ['dois', 'tres', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'valete', 'rainha', 'rei', 'as' ];
  valor = 0;
  score = 0;
  scoreDealer = 0;
  scorePlayer = 0;
  criarDeck = [];
  cartasDealer = [];
  cartasPlayer = [];
  cartasDeck = [];
  result = [];
  imagesDealer = [];
  imagesPlayer = [];
  stringDealer = '';
  stringPlayer = '';
  dealerStatus = '';
  scDealer = '';
  playerStatus = '';
  scPlayer = '';
  win = '';
  empate = false;
  dealerWin = false;
  playerWin = false;
  gameOver = true;
  start = false;
  cardsGiven = false;
  back = true;
  maxcards = true;
  cardImg = '';

  constructor() { }

  ionViewDidEnter() {
    this.gameOver = true;
    this.cardsGiven = false;
    this.back = true;
    this.maxcards = true;
    if(this.gameOver === true)
    {
       this.imagesDealer.length = 0;
       this.imagesPlayer.length = 0;
    }

    this.startGame();
  }
  ngOnInit() {

  }

  deck() {

    this.cartasDeck = [];
    for (let i = 0; i < this.naipes.length; i++)
    {
      for (let x = 0; x < this.numeros.length; x++)
      {
        const carta = {naipe : this.naipes[i], numero : this.numeros[x]};
        this.cartasDeck.push(carta);
      }

    }

    return this.cartasDeck;
  }

  randomizeDeck(cartasDeck)
  {
    for(let i = 0; i < cartasDeck.length; i++)
    {
      const shuffle = Math.trunc(Math.random() * cartasDeck.length);
      const tmp = cartasDeck[shuffle];
      cartasDeck[shuffle] = cartasDeck[i];
      cartasDeck[i] = tmp;
    }
  }

  stringCartas(carta: { numero: string; naipe: string })
  {
    return carta.numero + '-' + carta.naipe;
  }

  valoresCartas(carta: { numero: string })
  {
    switch(carta.numero)
    {
      case 'dois':
          return 2;
      case 'tres':
          return 3;
      case 'quatro':
          return 4;
      case 'cinco':
          return 5;
      case 'seis':
          return 6;
      case 'sete':
          return 7;
      case 'oito':
          return 8;
      case 'nove':
          return 9;
      case 'as':
          return 1;
      default:
          return 10;
    }
  }

  pontuacao(listaCartas)
  {
    this.score = 0;
    let as = false;

    listaCartas.forEach(i => {
      const lista = i;
      this.score += this.valoresCartas(lista);

      if(lista.numero === 'as')
      {
        as = true;
      }
    });

    if(as && this.score + 10 <=21)
    {
        return this.score + 10;
    }

    return this.score;
  }

  clear()
  {
    this.stringDealer = '';
    this.stringPlayer = '';
  }

  showCards()
  {
    this.imagesPlayer.push('/assets/cards/' + this.stringPlayer + '.png');
  }
  mostrar()
  {
    this.clear();

    this.cartasDealer.forEach(i => {
      this.stringDealer = '';
      this.stringDealer = this.stringCartas(i);
    });

    this.imagesDealer.push('/assets/cards/' + this.stringDealer + '.png');
    this.stringDealer = '';


    if(this.cardsGiven === false){
      this.cartasPlayer.forEach(i => {
        this.stringPlayer = '';
        this.stringPlayer = this.stringCartas(i);
        this.showCards();
        this.cardsGiven = true;
    });
    }
    this.imagesPlayer = [];

    if(this.cardsGiven === true)
    {
      this.cartasPlayer.forEach(i => {
        this.stringPlayer = '';
        this.stringPlayer = this.stringCartas(i);
        this.showCards();
      });
    }

    this.stringPlayer = '';
    this.scoreDealer = this.pontuacao(this.cartasDealer);
    this.scorePlayer = this.pontuacao(this.cartasPlayer);
    this.scDealer = '' + this.scoreDealer;
    this.scPlayer = ' ' + this.scorePlayer;

  }

  startGame()
{
  this.reset();
  this.start = true;
  this.maxcards = true;
  this.gameOver = false;
  this.dealerWin = false;
  this.playerWin = false;
  this.back = true;
  this.criarDeck = this.deck();
  this.randomizeDeck(this.criarDeck);
  this.cartasDealer = [this.criarDeck.shift()];
  this.cartasPlayer = [this.criarDeck.shift(), this.criarDeck.shift()];
  this.mostrar();

  this.dealerWin = false;
  this.playerWin = false;
  this.empate = false;
  this.win = '';
}

hitDealer()
{
  this.cartasDealer.push(this.criarDeck.shift());
}

hit()
{
  this.back = false;
  this.cartasPlayer.push(this.criarDeck.shift());
  this.mostrar();
  if(this.scoreDealer>21 || this.scorePlayer>21)
  {
    this.terminoJogo();
  }
}

stay()
{
  this.back = false;
  console.log(this.maxcards);
  do{
    this.hitDealer();
    this.mostrar();
  }
  while(this.scoreDealer<17);

  if(this.scoreDealer>21 || this.scorePlayer>21)
  {
    this.terminoJogo();
  }

  this.terminoJogo();

}

reset()
{
  if(this.gameOver === true){
    this.imagesDealer.length = 0;
    this.imagesPlayer.length = 0;
  }
}
terminoJogo()
{
  this.mostrar();
  this.gameOver = true;
  this.start = false;
  this.cardsGiven = false;
  this.maxcards = true;
  this.scoreDealer = this.pontuacao(this.cartasDealer);
  this.scorePlayer = this.pontuacao(this.cartasPlayer);
  if((this.scoreDealer <= 21 && this.scoreDealer> this.scorePlayer) ||
  (this.scoreDealer > 21 && this.scoreDealer< this.scorePlayer) || this.scorePlayer>21)
  {
    this.win = 'Vitória do Dealer';
  }
  else if((this.scorePlayer <= 21 && this.scorePlayer > this.scoreDealer) ||
  (this.scorePlayer > 21 && this.scorePlayer < this.scoreDealer) || this.scoreDealer>21)
  {
    this.win = 'Vitória do Player';
  }
  else if(this.scorePlayer === this.scoreDealer)
  {
    this.win = 'Empate';
  }
}

}
