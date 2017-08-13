/**
 * Created by luke on 7/30/17.
 */
class Card {
    constructor(number, suit){
        this.number = number;
        this.suit = suit;
    }

    getNumber(){
        var trueNumber;
        switch (this.number){
            case 1:
                trueNumber = "A";
                break;
            case 11:
                trueNumber = "J";
                break;
            case 12:
                trueNumber = "Q";
                break;
            case 13:
                trueNumber = "K";
                break;
            default:
                trueNumber = this.number.toString();
        }

        return trueNumber;
    }

    getCardColor(){
        var color;
        if (this.suit == "diams" || this.suit == "hearts")
            color = "red";
        else
            color = "black";
        return color;
    }

    getSuitHTML(){
        return "&" + this.suit + ";";
    }
    
    getCardIdentifier(){
        return this.getNumber() +" " + this.getSuitHTML();
    }

    getCardIdentifierBackwards(){
        return this.getSuitHTML() + " " + this.getNumber();
    }

    getCardDiv(divClass, content){
        return "<div class=" + divClass + ">" + content + "</div>"
    }
    

    getCardHTML(){
        var HTML = "";
        HTML += this.getCardDiv("card-top", this.getCardIdentifier());
        HTML += this.getCardDiv("card-middle", this.getSuitHTML());
        HTML += this.getCardDiv("card-bottom", this.getCardIdentifierBackwards());
        return HTML;
    }
    
}

class Deck {
    makeAllWithSuit(suit){
        for (var cardNumber = 1; cardNumber <= 13; cardNumber++) {
            var currentCard = new Card(cardNumber, suit);
            this.cards.push(currentCard);
        }
    }

    makeDeck(){
        var thisscope = this;
        var suits = ["clubs", "hearts", "diams", "spades"];
            suits.forEach(function(suit){
                thisscope.makeAllWithSuit(suit);
            });
    }

    constructor(){
        this.cards = [];
        this.makeDeck();
        this.shuffleDeck()
    }

    shuffleDeck(){
        var shuffledDeck = [];
        while(this.cards.length > 0){
            var randomIndex = Math.floor(Math.random() * this.cards.length);
            shuffledDeck.push(this.cards[randomIndex]);
            this.cards.splice(randomIndex, 1)
        }
        this.cards = shuffledDeck;
    }

    flipCard(){
        return this.cards.pop();
    }
}

class CardPlacer {
    static placeCard(card, dest){
        $("#" + dest).html(card.getCardHTML());
    }
}

class BottomCards {
    deal(deck){
        var card = deck.flipCard();
        CardPlacer.placeCard(card, "bottom");
    }
    constructor(deck){

    }
}
console.log("Hello");
var deck = new Deck();
$(document).ready(function () {
    $("#deck").click( function() {
        var topCard = deck.flipCard();
        $('#flipped-deck').attr({"class" : topCard.getCardColor() + " card"});
        $('#flipped-deck').html(topCard.getCardHTML());
        console.log(topCard.getCardHTML());
        console.log("clicked");
    });
});



