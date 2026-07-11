// ==============================
// Lifeline Healthcare
// script.js (Part 1)
// ==============================

// Landing Page

const orderBtn = document.getElementById("orderBtn");
const landingPage = document.getElementById("landingPage");
const medicinePage = document.getElementById("medicinePage");

orderBtn.addEventListener("click", () => {

landingPage.classList.add("hidden");
medicinePage.classList.remove("hidden");

window.scrollTo({
top:0,
behavior:"smooth"
});

});

// ==============================
// Medicine Database
// ==============================

const medicines = [

{
name:"Paracetamol 650",
price:30,
category:"Tablets",
stock:true
},

{
name:"Dolo 650",
price:35,
category:"Tablets",
stock:true
},

{
name:"Calpol Syrup",
price:65,
category:"Syrups",
stock:true
},

{
name:"Cetirizine",
price:25,
category:"Tablets",
stock:true
},

{
name:"ORS Powder",
price:20,
category:"Health",
stock:true
},

{
name:"Digene Gel",
price:120,
category:"Syrups",
stock:true
},

{
name:"Crocin Advance",
price:32,
category:"Tablets",
stock:true
},

{
name:"Vitamin C Tablets",
price:180,
category:"Tablets",
stock:true
},

{
name:"Bandage Roll",
price:55,
category:"First Aid",
stock:true
},

{
name:"Betadine Ointment",
price:95,
category:"Ointments",
stock:true
},

{
name:"Zincovit",
price:150,
category:"Tablets",
stock:true
},

{
name:"Benadryl Syrup",
price:145,
category:"Syrups",
stock:true
}

];

// ==============================
// Cart
// ==============================

let cart = [];

const medicineContainer =
document.getElementById("medicineContainer");

const cartItems =
document.getElementById("cartItems");

const medicineTotal =
document.getElementById("medicineTotal");

const grandTotal =
document.getElementById("grandTotal");

// ==============================
// Show Medicines
// ==============================

function displayMedicines(list){

medicineContainer.innerHTML="";

list.forEach((medicine,index)=>{

medicineContainer.innerHTML += `

<div class="medicineCard">

<h3>${medicine.name}</h3>

<p>${medicine.category}</p>

<p class="price">
₹${medicine.price}
</p>

<span class="stock">

${medicine.stock ? "🟢 In Stock" : "🔴 Out of Stock"}

</span>

<button
class="addBtn"
onclick="addToCart(${index})">

Add To Cart

</button>

</div>

`;

});

}

displayMedicines(medicines);

// ==============================
// Search
// ==============================

const searchBox =
document.getElementById("searchBox");

searchBox.addEventListener("input",()=>{

const value =
searchBox.value.toLowerCase();

const filtered =
medicines.filter(medicine=>

medicine.name.toLowerCase().includes(value)

);

displayMedicines(filtered);

});
// ==============================
// Add To Cart
// ==============================

function addToCart(index){

const medicine = medicines[index];

const existing = cart.find(item => item.name === medicine.name);

if(existing){

existing.quantity++;

}else{

cart.push({
...medicine,
quantity:1
});

}

updateCart();

}

// ==============================
// Increase Quantity
// ==============================

function increase(index){

cart[index].quantity++;

updateCart();

}

// ==============================
// Decrease Quantity
// ==============================

function decrease(index){

if(cart[index].quantity > 1){

cart[index].quantity--;

}else{

cart.splice(index,1);

}

updateCart();

}

// ==============================
// Update Cart
// ==============================

function updateCart(){

cartItems.innerHTML="";

let total=0;

if(cart.length===0){

cartItems.innerHTML="Your cart is empty.";

medicineTotal.innerHTML="₹0";

grandTotal.innerHTML="₹0";

return;

}

cart.forEach((item,index)=>{

const subTotal=item.price*item.quantity;

total+=subTotal;

cartItems.innerHTML+=`

<div class="medicineCard">

<h3>${item.name}</h3>

<p>

₹${item.price} × ${item.quantity}

</p>

<h4>

Subtotal : ₹${subTotal}

</h4>

<div style="display:flex;gap:10px;margin-top:10px;">

<button
class="addBtn"
onclick="decrease(${index})">

−

</button>

<button
class="addBtn"
onclick="increase(${index})">

+

</button>

</div>

</div>

`;

});

medicineTotal.innerHTML=`₹${total}`;

grandTotal.innerHTML=`₹${total}`;

}
// ==============================
// WhatsApp Order
// ==============================

const placeOrder =
document.getElementById("placeOrder");

placeOrder.addEventListener("click",()=>{

const name =
document.getElementById("customerName").value.trim();

const phone =
document.getElementById("customerPhone").value.trim();

const address =
document.getElementById("customerAddress").value.trim();

const coupon =
document.getElementById("couponCode").value.trim();

if(name==="" || phone==="" || address===""){

alert("Please fill all customer details.");

return;

}

if(cart.length===0){

alert("Your cart is empty.");

return;

}

let total=0;

let medicineList="";

cart.forEach(item=>{

medicineList+=
`• ${item.name} × ${item.quantity} = ₹${item.price*item.quantity}\n`;

total+=item.price*item.quantity;

});

let message=

`🏥 *LIFELINE HEALTHCARE ORDER*%0A%0A`+

`👤 *Customer Name:* ${name}%0A`+

`📞 *Phone:* ${phone}%0A`+

`📍 *Address:* ${address}%0A%0A`+

`💊 *Medicines:*%0A${medicineList}%0A`+

`💰 *Medicine Total:* ₹${total}%0A%0A`+

`🎟 *Coupon Code:* ${coupon || "None"}%0A`+

`(Coupons will be verified by our staff.)%0A%0A`+

`🧾 *Grand Total:* ₹${total}%0A%0A`+

`Thank You ❤️`;

const whatsappURL=

`https://wa.me/918797124365?text=${message}`;

window.open(whatsappURL,"_blank");

});

// ==============================
// Simple Category Filter
// ==============================

const categoryButtons =
document.querySelectorAll(".category");

categoryButtons.forEach(button=>{

button.addEventListener("click",()=>{

const category =
button.innerText
.replace("💊","")
.replace("🧃","")
.replace("💉","")
.replace("🧴","")
.replace("👶","")
.replace("❤️","")
.trim();

const filtered = medicines.filter(medicine=>

medicine.category
.toLowerCase()
.includes(category.toLowerCase())

);

displayMedicines(filtered);

});

});

// ==============================
// End of Script
// ==============================

console.log("Lifeline Healthcare Loaded Successfully ❤️");
