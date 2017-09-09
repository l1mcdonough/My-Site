/**
 * Created by luke on 8/12/17.
 */


describe("Card", function () {
    const testCard = new Card(4, "clubs");
    it("should give card stack top HTML", function(){
        expect(testCard.getCardStackTopHTML()).toEqual("<div class=\"card-stack-top\"><div class=\"card-top\">" + testCard.getCardIdentifier() +"</div></div>");
    });
});
describe("Card Interface", function(){
    const testCard = new Card(4, "clubs");
    beforeEach(function () {
        loadFixtures("solitaire.html");
    });
    it("should place cards", function(){
        CardInterface.placeCard(testCard, "bottom-cards2");
        expect($("#bottom-cards2")).toHaveHtml(testCard.getCardHTML());
    });
    it("should stack cards", function(){
        const testCard2 = new Card(2, "hearts");
        CardInterface.stackCard(testCard, "bottom-cards2");
        CardInterface.stackCard(testCard2, "bottom-cards2");
        const stackedCardHTML = testCard.getCardStackTopHTML() + testCard2.getCardHTML();
        expect($("#bottom-cards2")).toHaveHtml(stackedCardHTML);
    });
    it("should get top card", function(){
    const expectedElement = "<div class=\"black card\"><div class=\"card-top\">5 ♣</div><div class=\"card-middle\">♣</div><div class=\"card-bottom\">♣ 5</div></div>";
        CardInterface.getTopCard()
    });
});
