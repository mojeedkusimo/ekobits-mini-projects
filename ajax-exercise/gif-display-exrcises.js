let form = document.querySelector("form"),
    newGifPhrase = document.querySelector("input"),
    mainDiv = document.querySelector("main"),
    deleteAllgGifsButton = document.querySelector("#delete-gifs");

form.addEventListener("submit", getGif);
deleteAllgGifsButton.addEventListener("click", deleteAll);

function getGif(e) {
    e.preventDefault();
    let XHR = new XMLHttpRequest();
    if (newGifPhrase.value === "") {
        alert("Please enter an expression");
    } else {
        XHR.onreadystatechange = function() {
            if (XHR.readyState === 4 && XHR.status === 200) {

                let responseObj = JSON.parse(XHR.responseText);
                if (responseObj.data.length < 1) {
                    alert("Unable to fetch gif, Please enter another expression");
                } else {
                    let randomNum = Math.floor(Math.random() * 50);
                    let gifSource = responseObj.data[randomNum].images.original.url;
                    displayGifInDOM(newGifPhrase.value, gifSource);
                    console.log(responseObj);
                }
            }
        };
        XHR.open("GET", `http://api.giphy.com/v1/gifs/search?q=${newGifPhrase.value}&api_key=guHXsN0bwpEyzbxRosmqk04IhcPpjI7k`);
        XHR.send();    
    }
}

function elementFactory() {

    if (arguments.length < 2) {
        return document.createElement(arguments[0]);
    }

    let factoryProducts = [];
    for (let elem of arguments) {
        factoryProducts.push(document.createElement(elem));
    }
    return factoryProducts;

}

function displayGifInDOM(phrase, image) {

    let [gifSecElem, gifDivElem, gifImageElem] = elementFactory("section", "div", "img");

    gifSecElem.setAttribute("id", "gif-displays");

    if (mainDiv.childElementCount < 2) {
        mainDiv.appendChild(gifSecElem);
    }
        gifDivElem.classList.add("gifs");
        mainDiv.children[1].appendChild(gifDivElem);
        gifImageElem.setAttribute("alt", `${phrase}`);
        gifImageElem.setAttribute("src", `${image}`);
        gifImageElem.setAttribute("height", `200px`);
        gifImageElem.setAttribute("width", `200px`);
        gifDivElem.appendChild(gifImageElem);


}

function deleteAll() {
    if (mainDiv.childElementCount > 1) {
        mainDiv.removeChild(mainDiv.children[1]);
    }
}