const getTemplate = ({ data, placeholder }) => {
  const placeholderText = placeholder.length
    ? placeholder
    : "Please select option";

  const selectItems = data
    .map((item) => `<li class="select__item">${item.value}</li>`)
    .join("");
  return `
		<div class="select">		
			<div class="select__input">
				<span>${placeholderText}</span>
				<i class="fa fa-chevron-down"></i>
			</div>
			
			<div class="select__dropdown">
				<input type="text" class="select__search">
				<ul class="select__list">
					${selectItems}
				</ul>
			</div>
	</div>`;
};

class Select2 {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;

    this.render();
    this.setup();
  }

  render() {
    this.$el.innerHTML = getTemplate(this.options);
  }

  setup() {
    this.$el.addEventListener("click", this.clickHandler.bind(this));
  }

  clickHandler(e) {
    if (e.target.classList.contains("select__input")) {
      this.$el.classList.toggle("open");
    }
  }
}

export default Select2;
