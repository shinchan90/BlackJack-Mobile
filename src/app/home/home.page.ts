import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menu: MenuController) {}
  openStart() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

}

const naipes = ['Copas', 'Ouros', 'Espadas', 'Paus'];
const numeros = ['Dois', 'Tres', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove', 'Valete', 'Rainha', 'Rei', 'Ás' ];
const valor = 0;
let score = 0;
let scoreDealer = 0;
let scorePlayer = 0;
// eslint-disable-next-line prefer-const
let criarDeck = [];
let cartasDealer =[];
let cartasPlayer =[];
let cartasDeck = [];
let stringDealer = '';
let stringPlayer = '';
let empate = false;
let dealerWin = false;
let playerWin = false;
const gameOver = false;
let start = false;
class Deck{
  public deck()
  {
    cartasDeck = [];
    for (const i of naipes)
    {

      for (const x  of numeros)
      {
        // eslint-disable-next-line prefer-const
        let carta = {naipe : naipes[i], numero : numeros[x]};
        cartasDeck.push(carta);
        }

    }

    return cartasDeck;
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  public randomizeDeck(cartasDeck)
  {
    for(let i = 0; i < cartasDeck.length; i++)
    {
      const shuffle = Math.trunc(Math.random() * cartasDeck.length);
      const tmp = cartasDeck[shuffle];
      cartasDeck[shuffle] = cartasDeck[i];
      cartasDeck[i] = tmp;
    }
  }

  public stringCartas(carta)
  {
    return ' \n'+ carta.numero + ' de ' + carta.naipe;
  }

  public valoresCartas(carta)
  {
    switch(carta.numero)
    {
        case 'Dois':
            return 2;
        case 'Tres':
            return 3;
        case 'Quatro':
            return 4;
        case 'Cinco':
            return 5;
        case 'Seis':
            return 6;
        case 'Sete':
            return 7;
        case 'Oito':
            return 8;
        case 'Nove':
            return 9;
        case 'Ás':
            return 1;
        default:
            return 10;
    }
  }

  public pontuacao(listaCartas)
  {
    score = 0;
    let as = false;

    listaCartas.forEach(i => {
      const lista = i;
      score += this.valoresCartas(lista);

      if(lista.numero === 'Ás')
      {
        as = true;
      }
    });

    if(as && score + 10 <=21)
    {
        return score + 10;
    }

    return score;
  }

  public clear()
  {
    stringDealer = '';
    stringPlayer = '';
  }

  public mostrar()
  {
    this.clear();

    cartasDealer.forEach(i => {
        stringDealer += this.stringCartas(i);
    });


    cartasPlayer.forEach(i => {
        stringPlayer += this.stringCartas(i);
    });

    scoreDealer = this.pontuacao(cartasDealer);
    scorePlayer = this.pontuacao(cartasPlayer);
    document.getElementById('dealer_status').innerText = ' '+ stringDealer +'\n';
    document.getElementById('sc_dealer').innerText = '' + scoreDealer;
    document.getElementById('player_status').innerText = ' '+ stringPlayer +'\n';
    document.getElementById('sc_player').innerText = ' ' + scorePlayer;
  }

public startGame()
{
    start = true;
    dealerWin = false;
    playerWin = false;
    criarDeck = this.deck();
    this.randomizeDeck(criarDeck);
    cartasDealer = [criarDeck.shift()];
    cartasPlayer = [criarDeck.shift(), criarDeck.shift()];
    console.log(cartasDealer);
    console.log(cartasPlayer);
    this.mostrar();
    document.getElementById('b_jogar').style.display = 'none';
    document.getElementById('regras').style.display = 'none';
    document.getElementById('lista_regras').style.display = 'none';
    document.getElementById('botao_hit').style.display = 'inline';
    document.getElementById('botao_stay').style.display = 'inline';
    document.getElementById('inicio_jogo').style.display = 'inline';
    document.getElementById('dealer').style.display = 'inline';
    document.getElementById('player').style.display = 'inline';
    document.getElementById('sc').style.display = 'inline';
    document.getElementById('sc2').style.display = 'inline';
    document.getElementById('jogar_novo').style.display = 'none';
    dealerWin = false;
    playerWin = false;
    empate = false;
    document.getElementById('win').innerText = '';
}

public hitDealer()
{
  if((scoreDealer<17))
    {
        cartasDealer.push(criarDeck.shift());

    }
}

public hit()
{
  this.hitDealer();
    cartasPlayer.push(criarDeck.shift());
    this.mostrar();

    if(scoreDealer>21 || scorePlayer>21)
    {
      this.terminoJogo();
    }
    console.log(cartasDealer);
    console.log(cartasPlayer);
}

public stay()
{
  this.hitDealer();
  if(scoreDealer>21 || scorePlayer>21)
  {
    this.terminoJogo();
  }
  this.terminoJogo();
  this.mostrar();
}

public terminoJogo()
{
  scoreDealer = this.pontuacao(cartasDealer);
    scorePlayer = this.pontuacao(cartasPlayer);
    if((scoreDealer <= 21 && scoreDealer> scorePlayer) || (scoreDealer > 21 && scoreDealer< scorePlayer) || scorePlayer>21)
    {
        document.getElementById('win').innerText = 'Vitória do Dealer';
        document.getElementById('botao_hit').style.display = 'none';
        document.getElementById('botao_stay').style.display = 'none';
    }

    else if((scorePlayer <= 21 && scorePlayer > scoreDealer) || (scorePlayer > 21 && scorePlayer < scoreDealer) || scoreDealer>21)
    {
        document.getElementById('win').innerText = 'Vitória do Player';
        document.getElementById('botao_hit').style.display = 'none';
        document.getElementById('botao_stay').style.display = 'none';
    }

    else if(scorePlayer === scoreDealer)
    {
        document.getElementById('win').innerText = 'Empate';
        document.getElementById('botao_hit').style.display = 'none';
        document.getElementById('botao_stay').style.display = 'none';
    }


    document.getElementById('jogar_novo').style.display = 'inline';
}



}
