window.addEventListener('load', (event) => {
    document.querySelector("#change_heading").textContent = "Hello World!";

    let selectedColor = document.querySelector(".selected");

    let newElem = document.createElement("div");
    newElem.classList.add("purple");
    document.querySelector("section").appendChild(newElem);
    let colors = document.querySelectorAll("section div");

    for (let color of colors) {
        color.addEventListener("mouseover", function(event) {
        selectedColor.textContent = event.target.classList[0];
        });
    }


    let button = document.querySelector("button");
    button.addEventListener("click", startRace);


    let carOne = document.querySelector(".car1");
    let carTwo = document.querySelector(".car2");

    function startRace () {
        let marginValue = [0,0];
        let veiwPort = window.innerWidth;
        let incrementTimerID = setInterval(increment, 100);

        function increment() {
            marginValue[0] += 2;
            marginValue[1] += 1;
            carOne.style.marginLeft = `${marginValue[0]}px`;
            carTwo.style.marginLeft = `${marginValue[1]}px`;
            console.log(marginValue);
            console.log(window.innerWidth);
            if ((marginValue[0] || marginValue[1]) === veiwPort - 58) {
                clearTimeout(incrementTimerID);
                alert("winner!");
            }
        }
    }

});