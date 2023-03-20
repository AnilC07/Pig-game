'use strict';

/* VARIABLES */

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current1El = document.getElementById('current--0');
const current2El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// DÉCLARATION DES VARIABLE D'ÉTAT
let scores, activePlayer, playing, currentScore;

// FONCTIONS

/** 
 * FONCTION QUI EFFECTUE LE CHANGEMENT DE JOUEUR
 */
function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

/**
 * FONCTION D'INITIALISATION DE TOUTES LES VARIABLES QUI S'ENCLENCHE AU CHARGEMENT DE LA PAGE ET SUR LE CLICK DE "NEW GAME"
 */
const init = () => {
  // TABLEAU QUI CONTIENT LES POINTS POUR CHACUN DES JOUEURS
  scores = [0, 0];
  activePlayer = 0;
  // VARIABLE D'ÉTAT QUI INDIQUE L'ÉTAT DE LA PARTIE ("EN COUR", "FINI")
  playing = true;

  currentScore = 0;

  // INITIALISATION DE L'AFFICHAGE
  score0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');
};

// PRÉPARATION DE LA PARTIE
init();

// AU CLICK SUR LE BOUTON "ROLL"
btnRoll.addEventListener('click', () => {

  // CHECK L'ÉTAT DE LA PARTIE, Si "true" le bouton est actif
  if (playing) {

    // Génération d'un nombre aléatoire
    let dice = Math.trunc(Math.random() * 6) + 1;

    // AFFICHAGE DU DÉ
    diceEl.classList.remove('hidden');
    // AFFICHAGE DYNAMIQUE DES IMAGES REPRESENTANT LES FACE DU DÉ
    diceEl.setAttribute('src', `/img/dice-${dice}.png`);

    // Verifie si le lancé est egale à 1
    if (dice !== 1) {

      // Ajouter "dice" au score actuelle
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // currentScore;
    } else {
      // SI LE LANCER EST EGALE À 1,ON REIITIALISE L'AFFICHAGE A 0 AINSI QUE LA VARIABLE
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      // ON EFFECTUE LE CHANGEMENT DE JOUEUR
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {

    // CHECK L'ÉTAT DE LA PARTIE, SI "TRUE" LE BOUTON EST ACTIF
  if (playing) {

    // 1. ON AJOUTE LE "CURRENTSCORE" A LA PRECEDENTE VALEUR STOCKÉ POUR LE JOUEUR ACTUELLE
    scores[activePlayer] += currentScore;

    // AFFICHE LE NOUVELLE ÉTAT DU SCORE
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. VERIFIE SI LE JEU EST FINI OU NON
    if (scores[activePlayer] >= 100) {
      // ON INDIQUE QUE LE JEU EST FINI
      playing = false;

      // APPLIQUE LA BONNE CLASSE SUR LE BON JOUEUR
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

        // CACHE LE DÉ
      diceEl.classList.add('hidden');
    } else {
      // 3. SINON, ON CHANGE DE JOEUR
      switchPlayer();
      currentScore = 0;
    }
  }
});

btnNew.addEventListener('click', init);
