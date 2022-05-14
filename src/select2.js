const getTemplate = (data, placeholder) => {
  const placeholderText = placeholder ?? "Please select option";

  const selectItems = data
    .map(
      (item) =>
        `<li class="select__item" data-type="item" data-id=${item.id}>${item.value}</li>`
    )
    .join("");
  return `
		<div class="select">		
			<div class="select__input" data-type="input">
				<span data-type="value">${placeholderText}</span>
				<i class="fa fa-chevron-up" data-type="arrow"></i>
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
    this.selectedId = null;

    this.render();
    this.setup();
  }

  render() {
    const { placeholder, data } = this.options;
    this.$el.innerHTML = getTemplate(data, placeholder);
  }

  setup() {
    this.$el.addEventListener("click", this.clickHandler.bind(this));
    this.$el.classList.add("select");
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  clickHandler(e) {
    const { type, id } = e.target.dataset;

    if (type === "input") {
      this.toggle();
    } else if (type === "item") {
      this.select(id);
    }
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;

    this.$el
      .querySelectorAll('[data-type="item"]')
      .forEach((item) => item.classList.remove("selected"));
    this.$el.querySelector(`[data-id="${id}"]`).classList.add("selected");
    this.close();
  }

  get current() {
    return this.options.data.find((item) => item.id == this.selectedId);
  }

  isOpen() {
    return this.$el.classList.contains("open");
  }

  open() {
    this.$el.classList.add("open");
    this.$arrow.classList.add("fa-chevron-down");
    this.$arrow.classList.remove("fa-chevron-up");
  }

  close() {
    this.$el.classList.remove("open");
    this.$arrow.classList.add("fa-chevron-up");
    this.$arrow.classList.remove("fa-chevron-down");
  }

  toggle() {
    this.isOpen() ? this.close() : this.open();
  }
}

export default Select2;
