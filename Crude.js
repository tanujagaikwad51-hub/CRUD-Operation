let data = [
    { id: 1, name: "sami", email: "sami@gmail.com" },
    { id: 2, name: "khan", email: "khan@gmail.com" }
];


// READ
function readAll() {

    let storedData = localStorage.getItem("object");

    if (storedData) {
        data = JSON.parse(storedData);
    } else {
        localStorage.setItem("object", JSON.stringify(data));
    }

    let tabledata = document.querySelector(".data_table");

    let elements = "";

    data.map(record => {

        elements += `
        <tr>
            <td>${record.name}</td>
            <td>${record.email}</td>
            <td>
                <button class="edit" onclick="edit(${record.id})">
                    Edit
                </button>

                <button class="delete" onclick="removeData(${record.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

    tabledata.innerHTML = elements;
}


// CREATE FORM
function create() {

    document.querySelector(".create_form").style.display = "block";

    document.querySelector(".add_div").style.display = "none";
}


// ADD
function add() {

    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;

    if (name === "" || email === "") {
        alert("Please enter name and email");
        return;
    }

    let newObj = {
        id: Date.now(),
        name: name,
        email: email
    };

    data.push(newObj);

    localStorage.setItem("object", JSON.stringify(data));

    document.querySelector(".name").value = "";
    document.querySelector(".email").value = "";

    document.querySelector(".create_form").style.display = "none";

    document.querySelector(".add_div").style.display = "block";

    readAll();
}


// DELETE
function removeData(id) {

    data = data.filter(record => record.id !== id);

    localStorage.setItem("object", JSON.stringify(data));

    readAll();
}


// EDIT
function edit(id) {

    document.querySelector(".update_form").style.display = "block";

    let obj = data.find(record => record.id === id);

    document.querySelector(".uname").value = obj.name;

    document.querySelector(".uemail").value = obj.email;

    document.querySelector(".id").value = obj.id;
}


// UPDATE
function update() {

    let id = Number(document.querySelector(".id").value);

    let name = document.querySelector(".uname").value;

    let email = document.querySelector(".uemail").value;

    if (name === "" || email === "") {
        alert("Please enter name and email");
        return;
    }

    let index = data.findIndex(record => record.id === id);

    data[index] = {
        id: id,
        name: name,
        email: email
    };

    localStorage.setItem("object", JSON.stringify(data));

    document.querySelector(".update_form").style.display = "none";

    readAll();
}