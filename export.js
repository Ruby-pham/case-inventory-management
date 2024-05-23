class Export {
    id;
    date;
    name;
    unit;
    quantity;
    price;
    amount;
    image;

    constructor(id, date, name, unit, quantity, price, amount, image) {
        this.id = id;
        this.date = date;
        this.name = name;
        this.unit = unit;
        this.quantity = quantity;
        this.price = price;
        this.amount = amount;
        this.image = image;
    }
}