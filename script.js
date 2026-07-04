const medicines = [
 {name:"Cremaffin Mint",price:318.59},
 {name:"Eptoin 300 ER",price:210.40},
 {name:"Eptoin 100",price:225.52},
 {name:"Satrogyl Tab",price:165.00},
 {name:"Valparin Syrup",price:138.60},
 {name:"Nootropil 800mg Tab",price:1084.21},
 {name:"Calpol Syp 250mg",price:42.84},
 {name:"Ziten-M 20/1000mg",price:323.90},
 {name:"Veltam 0.4",price:232.00},
 {name:"Etilaam MD 0.5",price:88.13},
 {name:"Ultracet Tab",price:325.10},
 {name:"Omnacortil-20",price:25.61},
 {name:"Concor 5",price:145.39},
 {name:"Concor Cor 2.5",price:97.40},
 {name:"S-Celepra 10",price:96.10},
 {name:"Neopeptine Drop",price:111.50},
 {name:"Enterogermina Liquid",price:82.07},
 {name:"Etoshine-MR",price:338.00},
 {name:"Gemer Sita IR 50/500/1mg",price:132.19},
 {name:"Eliwel-10mg",price:25.42},
 {name:"Eliwel-25mg",price:26.48},
 {name:"Lonazep-0.5mg",price:55.28},
 {name:"Shelcal 200ml Syrup",price:170.39},
 {name:"Derobin Ointment",price:130.78},
 {name:"Udapa S 10/100 Tab",price:194.90}
];

let quantities = {};

const medicineContainer =
document.getElementById("medicineContainer");

function displayMedicines(list){

    medicineContainer.innerHTML = "";

    list.forEach(med=>{

        const qty = quantities[med.name] || 0;

        medicineContainer.innerHTML += `
        <div class="medicine-card">

            <h3>${med.name}</h3>
            <p>₹${med.price}</p>

            ${
                qty === 0
                ?
                `<button onclick="addToCart('${med.name}')">
                    Add To Cart
                </button>`
                :
                `<div class="qty-controls">
                    <button onclick="decreaseQty('${med.name}')">−</button>
                    <span>${qty}</span>
                    <button onclick="increaseQty('${med.name}')">+</button>
                </div>`
            }

        </div>
        `;
    });
}

function addToCart(name){

    quantities[name] = 1;

    updateCart();

    displayMedicines(getFilteredMedicines());
}

function increaseQty(name){

    quantities[name]++;

    updateCart();

    displayMedicines(getFilteredMedicines());
}

function decreaseQty(name){

    quantities[name]--;

    if(quantities[name] <= 0){
        delete quantities[name];
    }

    updateCart();

    displayMedicines(getFilteredMedicines());
}

function updateCart(){

    const cartItems =
    document.getElementById("cartItems");

    const billDetails =
    document.getElementById("billDetails");

    let subtotal = 0;

    cartItems.innerHTML = "";
    billDetails.innerHTML = "";

    for(const medName in quantities){

        const qty = quantities[medName];

        const med =
        medicines.find(
            m => m.name === medName
        );

        const itemTotal =
        med.price * qty;

        subtotal += itemTotal;

        cartItems.innerHTML += `
        <li>
            ${medName} × ${qty}
            = ₹${itemTotal.toFixed(2)}
        </li>
        `;

        billDetails.innerHTML += `
        <p>
            ${medName} × ${qty}
            = ₹${itemTotal.toFixed(2)}
        </p>
        `;
    }

    const gst = subtotal * 0.05;
    const grandTotal = subtotal + gst;

    document.getElementById("total").innerText =
    subtotal.toFixed(2);

    document.getElementById("subtotal").innerText =
    subtotal.toFixed(2);

    document.getElementById("gst").innerText =
    gst.toFixed(2);

    document.getElementById("grandTotal").innerText =
    grandTotal.toFixed(2);
}

function getFilteredMedicines(){

    const search =
    document.getElementById("searchBar")
    .value
    .toLowerCase();

    return medicines.filter(med =>
        med.name
        .toLowerCase()
        .includes(search)
    );
}

document
.getElementById("searchBar")
.addEventListener("input",()=>{

    displayMedicines(
        getFilteredMedicines()
    );

});

function placeOrder(){

    const name =
    document.getElementById("name")
    .value.trim();

    const phone =
    document.getElementById("phone")
    .value.trim();

    const address =
    document.getElementById("address")
    .value.trim();

    const payment =
    document.getElementById("payment")
    .value;

    if(
        name === "" ||
        phone === "" ||
        address === ""
    ){
        alert("Please fill all details!");
        return;
    }

    if(
        Object.keys(quantities).length === 0
    ){
        alert("Your cart is empty!");
        return;
    }

    let medicineList = "";

    for(const medName in quantities){

        medicineList +=
        `• ${medName} x${quantities[medName]}\n`;
    }

    const grandTotal =
    document.getElementById("grandTotal")
    .innerText;

    const message =
`💊 Lifeline Healthcare Order

👤 Name: ${name}
📞 Phone: ${phone}
🏠 Address: ${address}

💳 Payment: ${payment}

🛒 Medicines:
${medicineList}

💰 Grand Total: ₹${grandTotal}`;

    const whatsappNumber =
    "918797124365";

    const whatsappURL =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL,"_blank");
}

displayMedicines(medicines);