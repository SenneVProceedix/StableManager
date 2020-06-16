describe("moneyService", function () {

    var moneyService;

    beforeEach(module("ngResource"));
    beforeEach(module('common.services'));

    beforeEach(
        inject(
            function (_moneyService_) {
                moneyService = _moneyService_;
            }
        )
    );

    it("should calculate the margin in percent.", function () {
        expect(moneyService.calculateMarginPercent(600, 400)).toBe(33);
    });

    it("should calculate the margin.", function () {
        expect(moneyService.calculateMarginAmount(600, 400)).toBe(200);
    });

    it("should calculate the price from the margin in percent.", function () {
        expect(moneyService.calculatePriceFromMarkupPercent(400, 50)).toBe(600);
    });

    it("should calculate the price from the margin.", function () {
        expect(moneyService.calculatePriceFromMarkupAmount(400, 200)).toBe(600);
    });

    it("should return 0 if a value is null.", function () {
        expect(moneyService.calculateMarginPercent(null, 400)).toBe(0);
        expect(moneyService.calculateMarginAmount(600, null)).toBe(0);
        expect(moneyService.calculatePriceFromMarkupPercent(null, 50)).toBe(0);
        expect(moneyService.calculatePriceFromMarkupAmount(400, null)).toBe(0);
    });

    it("should return 0 if a value is not a number.", function () {
        expect(moneyService.calculateMarginPercent("bad input", 400)).toBe(0);
        expect(moneyService.calculateMarginAmount(600, "bad input")).toBe(0);
        expect(moneyService.calculatePriceFromMarkupPercent("bad input", 50)).toBe(0);
        expect(moneyService.calculatePriceFromMarkupAmount(400, "bad input")).toBe(0);
    });

})