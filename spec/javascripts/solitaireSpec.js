/**
 * Created by luke on 8/12/17.
 */
describe("Card Placer", function(){
    it("should place cards", function(){
        var testCard = new Card(4, "clubs");
        CardPlacer.placeCard(testCard, "bottom-cards1");
        var resultingHTML = $("#bottom-cards1").html();
        expect(resultingHTML).toEqual(testCard.getCardHTML());
    });
});