let input = document.querySelector("#input-part");
let button = document.querySelector("#btn-part");
let boxes = document.querySelectorAll(".box");

let getItem = null;

function holdDataDropped() {
    if (input.value != '') {
        boxes[0].innerHTML += `<p class="item" draggable="true">${input.value}</p>`;
        clearInput();
        draggingTOItem();
    } else {
        alert("please add your want!");
    }
}

function clearInput() {
    input.value = '';
}

function draggingTOItem() {
    let items = document.querySelectorAll(".item");

    items.forEach((item) => {
        // once user selects the item
        item.addEventListener("dragstart", function () {
            getItem = item; // first step to get item
            this.style.opacity = '0.5';
        })

        // once user releases the item
        item.addEventListener("dragend", function () {
            getItem = null;
            this.style.opacity = '1';
        })

        boxes.forEach((box) => {
            // second step
            // dragover: when item is moved to the box
            box.addEventListener("dragover", function (event) {
                // solving hold problem when dropping the item
                event.preventDefault(); // this part to hold the item after dropping

                this.style.backgroundColor = "green";
                this.style.color = "white";
            })

            // dragleave: when item is moved from the box
            box.addEventListener("dragleave", function () {
                this.style.backgroundColor = "white";
                this.style.color = "black";
            })

            // when user sends the item to the box to hold this item in this box
            box.addEventListener("drop", function () {
                this.append(getItem);
                this.style.backgroundColor = "white";
                this.style.color = "black";
            })
        })
    })
}

button.onclick = holdDataDropped;

input.onkeyup = function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        holdDataDropped();
    }
};
