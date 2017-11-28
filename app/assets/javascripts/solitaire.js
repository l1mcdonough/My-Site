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
        else if (this.suit == "clubs" || this.suit == "spades")
            color = "black";
        else
            console.log("Error: Can't get the color")
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

    getClasses(){
        return this.getCardColor() + " card";
    }

    getCardDiv(divClass, content){
        return "<div class=\"" + divClass + "\">" + content + "</div>";
    }
    

    getCardHTML(){
        let innerDivs = "";
        innerDivs += this.getCardDiv("card-top", this.getCardIdentifier());
        innerDivs += this.getCardDiv("card-middle", this.getSuitHTML());
        innerDivs += this.getCardDiv("card-bottom", this.getCardIdentifierBackwards());
        return this.getCardDiv(this.getClasses(), innerDivs);
    }

    getCardStackTopHTML(){
        //cardTopDiv and cardStackTop are two different things
        const cardTopDiv = this.getCardDiv("card-top", this.getCardIdentifier());
        return this.getCardDiv("card-stack-top " + this.getCardColor(), cardTopDiv);
    }
    
}

class CardStack {
    constructor(){
        this.cards = [];
    }

    flipCard(){
        return this.cards.pop();
    }

    add(card){
        this.cards.push(card)
    }
}

class Deck extends CardStack{
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
        super();
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

class BottomCards {
    constructor(){
        this.cardStacks = [];
    }


}

class CardInterface {
    static changeClass(id, className){
        $(id).attr({"class" : className});
    }

    static getID(name){
        return "#" + name;
    }

    static encodeSuit(suit){
        let suitWord;
        switch (suit){
            case "♥":
                suitWord = "hearts";
                break;
            case "♦":
                suitWord = "diams";
                break;
            case "♠":
                suitWord = "spades";
                break;
            case "♣":
                suitWord = "clubs";
                break;
            default:
                console.log("ERROR: suit not recognized");
        }
        return suitWord;
    }
    static getTrueNumber(cardNum){
        let trueCardNum;
        switch (cardNum){
            case "A":
                trueCardNum = 1;
                break;
            case "J":
                trueCardNum = 11;
                break;
            case "Q":
                trueCardNum = 12;
                break;
            case "K":
                trueCardNum = 13;
                break;
            default:
                trueCardNum = parseInt(cardNum);
                break;
        }
        return trueCardNum;
    }

    static getCard(text){
        console.log("the text passed in to getCard is " + text);
        const splitText = text.split(" ");
        const cardNum = splitText[0];
        const trueCardNum = CardInterface.getTrueNumber(cardNum);
        const suitSymbol = splitText[1];
        const suitText = this.encodeSuit(suitSymbol);
        return new Card(trueCardNum, suitText);
    }

    static getTopCardJQuery(source){
        const fullID = this.getID(source);
        return $(fullID).find(".card").last();
    }

    static getTopCard(source){
        const CardHTML = this.getTopCardJQuery(source).find(".card-top").html();
        return this.getCard(CardHTML);
    }


    //replaces full card with just the top
    static replaceTopCardWithTop(source){
        const card = this.getTopCard(source);
        this.getTopCardJQuery(source).remove();
        const id = this.getID(source);
        $(id).append(card.getCardStackTopHTML());
    }

    static placeCard(card, dest){
        const destID = this.getID(dest);
        $(destID).html(card.getCardHTML());
        this.changeClass(destID, "card-space");
    }

    static stackCard(card, dest){
        if ($(this.getID(dest)).html()){
            console.log($(this.getID(dest)).html());
            this.replaceTopCardWithTop(dest);
            console.log("it's true");
            $(this.getID(dest)).append(card.getCardHTML());
        }
        else
            this.placeCard(card, dest);
    }
}

class CardDealer {
    static deal(deck){
        var card = deck.flipCard();
        CardInterface.stackCard(card, "bottom-cards1");
        CardInterface.stackCard(card, "bottom-cards1");
    }
    constructor(deck){

    }
}
console.log("Hello");
var deck = new Deck();

$(function () {
    CardDealer.deal(deck);
    $("#deck").click( function() {
        var topCard = deck.flipCard();
        $('#flipped-deck').html(topCard.getCardHTML());
    });
});



