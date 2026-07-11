// ===============================
// Lifeline Healthcare
// script.js Part 1
// ===============================


// Medicine Database

const medicines = [

{
name:"Paracetamol 650",
price:30,
category:"Tablets"
},

{
name:"Dolo 650",
price:35,
category:"Tablets"
},

{
name:"Crocin Advance",
price:40,
category:"Tablets"
},

{
name:"Calpol Syrup",
price:70,
category:"Syrups"
},

{
name:"Benadryl Syrup",
price:120,
category:"Syrups"
},

{
name:"ORS Powder",
price:20,
category:"Health"
},

{
name:"Vitamin C Tablets",
price:150,
category:"Tablets"
},

{
name:"Bandage Roll",
price:50,
category:"First Aid"
},

{
name:"Betadine Ointment",
price:90,
category:"First Aid"
},

{
name:"Zincovit",
price:130,
category:"Health"
}

];


// Cart

let cart = [];


// Elements

const medicineContainer =
document.getElementById("medicineContainer");

const searchBox =
document.getElementById("searchBox");


// Display Medicines

function displayMedicines(list){

medicineContainer.innerHTML="";


list.forEach((medicine,index)=>{


medicineContainer.innerHTML += `

<div class="medicineCard">

<h3>${medicine.name}</h3>

<p>
Category: ${medicine.category}
</p>


<p class="price">
₹${medicine.price}
</p>


<span class="stock">
🟢 Available
</span>


<button class="addBtn"
onclick="addToCart(${index})">

Add To Cart

</button>


</div>

`;


});


}


// Load Medicines

displayMedicines(medicines);



// Search Medicines

searchBox.addEventListener("input",()=>{


let value =
searchBox.value.toLowerCase();



let filtered =
medicines.filter(item =>

item.name.toLowerCase()
.includes(value)

);



displayMedicines(filtered);


});



// Add To Cart

function addToCart(index){


let medicine =
medicines[index];


let existing =
cart.find(item =>
item.name === medicine.name
);



if(existing){

existing.quantity++;

}

else{

cart.push({

name:medicine.name,

price:medicine.price,

quantity:1

});

}


updateCart();


}
// ===============================
// Cart System
// ===============================


const cartItems =
document.getElementById("cartItems");

const medicineTotal =
document.getElementById("medicineTotal");

const grandTotal =
document.getElementById("grandTotal");


// Update Cart

function updateCart(){


cartItems.innerHTML="";


let total = 0;


if(cart.length === 0){


cartItems.innerHTML = `

<p class="emptyCart">

Your cart is empty.

</p>

`;


medicineTotal.innerHTML="₹0";

grandTotal.innerHTML="₹0";

return;

}



cart.forEach((item,index)=>{


let itemTotal =
item.price * item.quantity;


total += itemTotal;



cartItems.innerHTML += `

<div class="medicineCard">


<h3>

${item.name}

</h3>


<p>

₹${item.price} × ${item.quantity}

</p>


<p>

Subtotal: ₹${itemTotal}

</p>



<button class="addBtn"
onclick="decreaseQuantity(${index})">

-

</button>


<button class="addBtn"
onclick="increaseQuantity(${index})">

+

</button>


</div>

`;



});



medicineTotal.innerHTML =
"₹"+total;


grandTotal.innerHTML =
"₹"+total;



}



// Increase Quantity

function increaseQuantity(index){


cart[index].quantity++;


updateCart();


}




// Decrease Quantity

function decreaseQuantity(index){


if(cart[index].quantity > 1){


cart[index].quantity--;


}

else{


cart.splice(index,1);


}


updateCart();


}



// ===============================
// WhatsApp Order
// ===============================


const placeOrder =
document.getElementById("placeOrder");


placeOrder.addEventListener("click",()=>{


let name =
document.getElementById("customerName").value;


let phone =
document.getElementById("customerPhone").value;


let address =
document.getElementById("customerAddress").value;


let coupon =
document.getElementById("couponCode").value;



if(name==="" || phone==="" || address===""){


alert("Please fill customer details");


return;


}



if(cart.length===0){


alert("Your cart is empty");


return;


}



let message =

`🏥 LIFELINE HEALTHCARE ORDER

👤 Name:
${name}

📞 Phone:
${phone}

📍 Address:
${address}


💊 Medicines:
`;



let total = 0;



cart.forEach(item=>{


let price =
item.price * item.quantity;


total += price;



message += `

${item.name}
Quantity: ${item.quantity}
Price: ₹${price}

`;

});



message += `

💰 Total:
₹${total}


🎟 Coupon:
${coupon || "None"}


Coupon will be verified by staff.

Thank you ❤️

`;



let whatsapp =

"https://wa.me/918797124365?text="

+
encodeURIComponent(message);



window.open(
whatsapp,
"_blank"
);



});
// ===============================
// Category Filter System
// ===============================


const categoryButtons =
document.querySelectorAll(".category");



categoryButtons.forEach(button=>{


button.addEventListener("click",()=>{


// Remove active class

categoryButtons.forEach(btn=>{

btn.classList.remove("active");

});


// Add active class

button.classList.add("active");



let category =
button.innerText
.replace("💊","")
.replace("🧃","")
.replace("🩹","")
.replace("👶","")
.trim();



if(category === "All"){


displayMedicines(medicines);


return;


}



let filtered =
medicines.filter(item=>


item.category
.toLowerCase()
.includes(category.toLowerCase())


);



displayMedicines(filtered);



});


});



// ===============================
// Order Button Animation
// ===============================


const orderBtn =
document.getElementById("orderBtn");

const home =
document.getElementById("home");

const medicinePage =
document.getElementById("medicinePage");



orderBtn.addEventListener("click",()=>{


home.classList.add("hidden");


medicinePage.classList.remove("hidden");



window.scrollTo({

top:0,

behavior:"smooth"

});


});




// ===============================
// Button Click Sound Effect
// ===============================


document.querySelectorAll("button")
.forEach(button=>{


button.addEventListener("click",()=>{


button.style.transform="scale(.95)";


setTimeout(()=>{


button.style.transform="";


},100);


});


});




// ===============================
// Welcome Message
// ===============================


window.addEventListener("load",()=>{


console.log(

"❤️ Lifeline Healthcare Website Loaded Successfully"

);


});




// ===============================
// End Of Script
// ===============================