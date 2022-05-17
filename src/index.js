import "./sass/select2.sass";
import Select2 from "./select2";

const select2 = new Select2("#select", {
  placeholder: "Please select item",
  allowSearch: true,
  data: [
    { id: 1, value: "Milk" },
    { id: 2, value: "Water" },
    { id: 3, value: "Bread" },
    { id: 4, value: "Orange" },
    { id: 5, value: "Cucumber" },
    { id: 6, value: "Pumpkins" },
    { id: 7, value: "Onion" },
    { id: 8, value: "Meat" },
  ],
});

window.s = select2;
