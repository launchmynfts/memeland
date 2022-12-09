function updateNumber(val) {

    console.log(val)
    document.getElementById("buttonText").innerHTML = "MINT " + val
    document.getElementById("priceUpdate").innerHTML = "Total price = " + (val * 0.2).toFixed(1) + "ETH"
    
}7