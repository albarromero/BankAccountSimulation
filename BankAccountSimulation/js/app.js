const ingress = [
    new Ingress("Nomina",1500.00),
    new Ingress("Bizum regalo",50)
];

const spending = [
    new Spending("Hipoteca",350),
    new Spending("Ropa",100)
]

let totalIngress = ()=>{
    let total = 0;
    for(let entry of ingress) {
        total+= entry.value;
    }
    return total;
}

let totalSpending = ()=>{
    let total = 0;
    for(let spend of spending) {
        total+= spend.value;
    }
    return total;
}

let loadApp = ()=>{
    loadHead();
    loadIngress();
    loadSpending();
}

let loadHead = ()=>{
    let balance = totalIngress()-totalSpending();
    let perc = totalSpending()/totalIngress();
    document.getElementById("balance").innerHTML = coinFormat(balance);
    document.getElementById("perc").innerHTML = percFormat(perc);
    document.getElementById("ingress").innerHTML = coinFormat(totalIngress());
    document.getElementById("spending").innerHTML = coinFormat(totalSpending());
}

const coinFormat = (value)=>{
    return value.toLocaleString("es-ES",{style:"currency", currency:"EUR", minimumFractionDigits:2});
}

const percFormat = (value)=>{
    return value.toLocaleString("es-ES",{style:"percent", minimumFractionDigits:2});
}

const loadIngress = ()=>{
    let ingressHTML = "";
    for(let entry of ingress) {
        ingressHTML+= createIngressHTML(entry);
    }
    document.getElementById("ingress-list").innerHTML = ingressHTML;
}
const createIngressHTML= (ingress)=>{
    let ingressHTML = `
    <div class="element cleanStyle">
        <div class="description_element">${ingress.description}</div>
        <div class="right cleanStyle">
            <div class="value_element">${coinFormat(ingress.value)}</div>
            <div class="delete_element">
                <button class="delete_element--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="deleteIngress(${ingress.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return ingressHTML;
}

const deleteIngress = (id)=>{
    let deleteIndex = ingress.findIndex(entry=> entry.id === id);
    ingress.splice(deleteIndex, 1);
    loadHead();
    loadIngress();
}

const loadSpending = ()=>{
    let spendingHTML="";
    for(let spend of spending) {
        spendingHTML+= createSpendingHTML(spend);
    }
    document.getElementById("spending-list").innerHTML = spendingHTML;
}

const createSpendingHTML = (spending)=>{
    let spendingHTML = `
    <div class="element cleanStyle">
        <div class="description_element">${spending.description}</div>
        <div class="right cleanStyle">
            <div class="value_element">${coinFormat(spending.value)}</div>
            <div class="perc_element">${percFormat(spending.value/totalSpending())}</div>
            <div class="delete_element">
                <button class="delete_element--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="deleteSpending(${spending.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return spendingHTML;
}

const deleteSpending = (id)=>{
    let deleteIndex = spending.findIndex(spend=> spend.id === id);
    spending.splice(deleteIndex, 1);
    loadHead();
    loadSpending();
}

let addData = ()=>{
    let form = document.forms["form"];
    let type = form["type"];
    let description = form["description"];
    let value = form["value"];
    if(description.value !=="" && value.value !=="") {
        if(type.value === "ingress") {
            ingress.push(new Ingress(description.value, Number(value.value)));
            loadHead();
            loadIngress();
        } else if(type.value === "spending") {
            spending.push(new Spending(description.value, Number(value.value)));
            loadHead();
            loadSpending();
        }
    }
}