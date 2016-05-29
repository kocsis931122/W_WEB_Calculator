(function () {
    var button = document.querySelector(".eval");
    button.addEventListener("click", showResult);
    var httpRequest = new XMLHttpRequest();
    var locStorage = localStorage;

    function showResult() {
        var number = document.querySelector(".screen");
        if (locStorage && locStorage.getItem(number.innerHTML)) {
            var result = locStorage.getItem(number.innerHTML);
            placeResult(result);
        } else {
            getTrivia(number);
        }
    }


    function getTrivia(number) {
        var url = 'http://numbersapi.com/' + number.innerHTML;
        httpRequest.open('GET', url);
        httpRequest.onreadystatechange = function (e) {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    locStorage.setItem(number.innerHTML, httpRequest.responseText);
                    placeResult(httpRequest.responseText);
                } else {
                    console.error(httpRequest.statusText);
                }
            }
        };
        httpRequest.send(null);
    }

    function placeResult(result) {
        var resultField = document.querySelector("#result");
        resultField.innerHTML = result;
    }

})();
