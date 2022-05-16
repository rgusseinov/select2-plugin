const getTemplate = (data, placeholder) => {
  const text = placeholder ?? "Please select option";
  const selectItems = data
    .map(
      (item) =>
        `<li class="select__item" data-type="item" data-id=${item.id}>${item.value}</li>`
    )
    .join("");
  return `
		<div class="select">
			<div class="select__input" data-type="input">
				<span data-type="value">${text}</span>
				<i class="fa fa-chevron-up" data-type="arrow"></i>
			</div>
			
			<div class="select__dropdown">
				<input type="text" class="select__search" data-type="search">
				<ul class="select__list" data-type="list-item">
					${selectItems}
				</ul>
			</div>

	</div>`;
};

const getFilteredItems = (data, value) => {
  return data.filter((item) => {
    if (item.value.toLowerCase().includes(value)) {
      return item;
    }
  });
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
    this.$el.classList.add("select");

    document.addEventListener("click", this.documentClickHandler.bind(this));
    this.$el.addEventListener("keyup", this.keyupHandler.bind(this));

    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
    this.$listItems = this.$el.querySelector('[data-type="list-item"]');
    this.$input = this.$el.querySelector('[data-type="search"]');
  }

  documentClickHandler(e) {
    const { type, id } = e.target.dataset;

    if (["input", "value", "arrow"].includes(type)) {
      this.toggle();
    } else if (type === "item") {
      this.select(id);
    } else if (type !== "search") {
      this.close();
    }
  }

  keyupHandler(e) {
    const value = e.target.value.toLowerCase();
    const { data } = this.options;
    const filteredItems = getFilteredItems(data, value);

    if (!filteredItems.length) {
      this.$listItems.innerHTML = `<li class="select__item">No items found</li>`;
      return;
    }

    this._renderItems(filteredItems);
  }

  _renderItems(data) {
    const listItemMarkup = data
      .map((item) => {
        return `<li class="select__item ${
          item.id == this.selectedId ? "selected" : ""
        }" data-type="item" data-id=${item.id}>${item.value}</li>`;
      })
      .join("");
    this.$listItems.innerHTML = listItemMarkup;
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;
    this.$input.value = "";

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
    const { data } = this.options;

    this.$el.classList.add("open");
    this.$arrow.classList.add("fa-chevron-down");
    this.$arrow.classList.remove("fa-chevron-up");

    this._renderItems(data);
  }

  close() {
    const { data } = this.options;

    this.$el.classList.remove("open");
    this.$arrow.classList.add("fa-chevron-up");
    this.$arrow.classList.remove("fa-chevron-down");

    if (this.$input.value) {
      this._renderItems(data);
      this.$input.value = "";
    }
  }

  toggle() {
    this.isOpen() ? this.close() : this.open();
  }
}

export default Select2;
