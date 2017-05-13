// JavaScript File
"use strict"
function GetRandomInteger(minZ, maxZ) {
    return Math.floor(
            Math.random() * (maxZ - minZ + 1)) + minZ;
}
function MadeSuit() {
    return GetRandomInteger(0, 3);
}

var suits = ["пика", "крести", "бубны", "черви"];
var suit = MadeSuit();
var trumpCard = suits[suit];
console.log("козырь: " + trumpCard);

function GetSuitName(cardIndex, N) {
    var suits = ["пика", "крести", "бубны", "черви"]
    return suits[GetSuitIndex(cardIndex, N)];
}
function GetCardName(cardIndex, N) {
    var cards = ["шесть", "семь", "восемь", "девять", "десять", "валет", "дама", "король", "туз"]
    return cards[GetCardRank(cardIndex, N)];
}

function GetCardRank(cardIndex, N) {
    return cardIndex % (N / 4);
}
function GetSuitIndex(cardIndex, N) {
    return Math.floor((cardIndex / N ) * 4);
}

function MadeDeck(N) {
    var KK = [];
    for (var i = 0; i < N; i++) {
        var card = {
            Suit: GetSuitName(i, N),
            Name: GetCardName(i, N),
            Rank: GetCardRank(i, N),
            SuitIndex: GetSuitIndex(i, N)
        };
        KK[i] = card;
    }
    return KK;
}

var kol = MadeDeck(36);
console.log(kol);

function ShuffleDeck(deck) {
    for (var i = 0; i < deck.length; i++) {
        var card1 = deck[i];
        var index = GetRandomInteger(0, deck.length - 1);
        var card2 = deck[index];
        deck[i] = card2;
        deck[index] = card1;
    }
    return deck;
}

kol = ShuffleDeck(kol);
console.log(kol);

function DivideDeck(deck) {
    var hand1 = [];
    var hand2 = [];
    while (deck.length >= 2) {
        hand1.push(deck.pop());
        hand2.push(deck.pop());
    }
    var allHands = {Player1: hand1, Player2: hand2};
    return allHands;
}
function CompareRank(i, pl1, pl2, sco,) {
    if (pl1[i].Rank == pl2[i].Rank) {
        return sco;
    } else if (pl1[i].Rank > pl2[i].Rank) {
        sco.Player1 = sco.Player1 + 1;
        return sco;
    } else {
        sco.Player2 = sco.Player2 + 1;
        return sco;
    }
}
function Compare(i, pl1, pl2, sco, trump) {
    if (pl1[i].SuitIndex == trump && pl2[i].SuitIndex !== trump) {
        sco.Player1 = sco.Player1 + 1;
        return sco;
    } else if (pl1[i].SuitIndex !== trump && pl2[i].SuitIndex == trump) {
        sco.Player2 = sco.Player2 + 1;
        return sco;
    } else
        sco = CompareRank(i, pl1, pl2, sco);
    return sco;
}


var hands = DivideDeck(kol);
console.log(hands);
var peter = hands.Player1;
var vasya = hands.Player2;
console.log(peter);
console.log(vasya);
console.log(peter[17].Suit);
console.log(trumpCard);
var score = {Player1: 0, Player2: 0};

var j = peter.length - 1;
while (j >= 0) {
    score = Compare(j, peter, vasya, score, suit);
    j--;
}

console.log(score.Player1);
console.log(score.Player2);

console.log(suit);


function FindWinner(sco) {
 if (sco.Player1 == sco.Player2) {
 return "не выявлен";
 } else if (sco.Player1 > sco.Player2) {
 return "Петя";
 } else return "Вася";
 }

 console.log(score);
 var winner = FindWinner(score);
 console.log(winner);


var totals = document.createElement('div');
totals.innerHTML = "<h1> Winner: " + winner + ". Suit: " + trumpCard + "</h1>";
document.body.appendChild(totals);
totals.style.textAlign='center';
var totalScore = document.createElement('div');
totalScore.innerHTML = "<h1>" + score.Player1 + " : " + score.Player2 + "</h1>";
document.body.appendChild(totalScore);
totalScore.style.textAlign='center';
var totalGame = CreateTable(peter, vasya);
document.body.appendChild(totalGame);


function CreateTable(pl1,pl2) {
    var tabElem = document.createElement('table');
    var strElem = `<tr><th>Петя</th><th>Вася</th></tr>`;
    for (var i = 17; i >= 0; i--) {
        strElem += `<tr><td>${pl1[i].Name} ${pl1[i].Suit}</td><td>${pl2[i].Name} ${pl2[i].Suit}</td></tr>`;
    }
    tabElem.innerHTML = strElem;

    tabElem.cellSpacing = "2";
    tabElem.cellPadding = "5";
    tabElem.style.marginLeft = "auto";
    tabElem.style.marginRight = "auto";
    tabElem.border = "1px solid black";
    tabElem.tableLayout = "auto";
    return tabElem;
    }

