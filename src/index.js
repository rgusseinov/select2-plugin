import "./sass/select2.sass";
import Select2 from "./select2";

const select2 = new Select2("#select", {
  placeholder: "Please select city name",
  data: [
    { id: 1, value: "Almaty" },
    { id: 2, value: "Astana" },
    { id: 3, value: "Atyrau" },
    { id: 4, value: "Kazaganda" },
    { id: 5, value: "Shymkent" },
    { id: 6, value: "Akmola" },
    { id: 7, value: "Zharkent" },
    { id: 8, value: "Slavyanka" },
  ],
});

window.s = select2;
