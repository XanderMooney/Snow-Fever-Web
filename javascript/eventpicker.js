let cards = document.getElementsByClassName("card")

let selectedCard = 0; // 0 = none 1 = top 2 = bottom

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function() {
        cards[i].classList.remove("unchecked");
        cards[i].classList.remove("checked");
        cards[i].classList.add("checked");

        selectedCard = i + 1;

        for (let i2 = 0; i2 < cards.length; i2++) {
            if (i2 != i) {
                cards[i2].classList.remove("checked");
                cards[i2].classList.remove("unchecked");
                cards[i2].classList.add("unchecked");
            }
        }

        window.scrollTo(0, window.innerHeight);

        displayPaymentInfo();
    })
    
}

function displayPaymentInfo() {
    document.getElementById("eventName").innerText = "The " + ["Mountain Retreat", "Trail Getaway"][selectedCard - 1] + " package";
    document.getElementById("pricePerDay").innerText = ["$50", "$40"][selectedCard - 1] + " a night";

    document.getElementById("hidePaymentInfo").style.visibility = "visible";

    document.getElementById("displayText").innerText = ""; // clear our price display when we change the event
}