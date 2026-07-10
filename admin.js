let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

function saveMedicines() {
    localStorage.setItem("medicines", JSON.stringify(medicines));
}

function displayMedicines() {
    const list = document.getElementById("medicineList");
    list.innerHTML = "";

    medicines.forEach((medicine, index) => {
        list.innerHTML += `
        <div style="background:#fff;padding:10px;margin:10px 0;border-radius:10px;">
            <h3>${medicine.name}</h3>
            <p>₹${medicine.price}</p>
            <button onclick="deleteMedicine(${index})">🗑 Delete</button>
        </div>
        `;
    });
}

function addMedicine() {
    const name = document.getElementById("medicineName").value.trim();
    const price = document.getElementById("medicinePrice").value;

    if (name === "" || price === "") {
        alert("Please fill all fields.");
        return;
    }

    medicines.push({
        name: name,
        price: Number(price)
    });

    saveMedicines();
    displayMedicines();

    document.getElementById("medicineName").value = "";
    document.getElementById("medicinePrice").value = "";
}

function deleteMedicine(index) {
    medicines.splice(index, 1);
    saveMedicines();
    displayMedicines();
}

displayMedicines();