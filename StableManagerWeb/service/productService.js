(function () {
    var moneyService = function(){
        function calculateMarginPercent(price, cost) {
            var margin = 0;
            if (price !== null && cost !== null && !isNaN(price) && !isNaN(cost)) {
                margin = 100 * ((price - cost) / price);
            }
            margin = Math.round(margin);
            return margin;
        }
        function calculateMarginAmount(price, cost) {
            var margin = 0;
            if (price !== null && cost !== null && !isNaN(price) && !isNaN(cost)) {
                margin = price - cost;
            }
            return margin;
        }
        function calculatePriceFromPercent(cost, percent) {
            var price = cost;
            if (cost !== null && percent !== null && !isNaN(percent) && !isNaN(cost)) {
                price = cost + (cost * percent / 100);
                price = (Math.round(price * 100)) / 100;
            } else {
                return 0;
            }
            return price;
        }
        function calculatePriceFromAmount(cost, amount) {
            var price = cost;
            if (cost !== null && amount !== null && !isNaN(amount) && !isNaN(cost)) {
                price = cost + amount;
                price = (Math.round(price * 100)) / 100;
            } else {
                return 0;
            }
            return price;
        }

        return {
            calculateMarginPercent: calculateMarginPercent,
            calculateMarginAmount: calculateMarginAmount,
            calculatePriceFromMarkupPercent: calculatePriceFromPercent,
            calculatePriceFromMarkupAmount: calculatePriceFromAmount
        };

    }

    angular
        .module("common.services")
        .factory("moneyService",
            moneyService);

}());
