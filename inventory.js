class Inventory{
    id;
    date;
    name;
    unit;
    openQuantity;
    importQuantity;
    exportQuantity;
    inventoryQuantity;
    image;
    constructor(id, date, name,unit, openQuantity,importQuantity,exportQuantity,inventoryQuantity, image) {
        this.id = id;
        this.date = date;
        this.name = name;
        this.unit = unit;
        this.openQuantity = openQuantity;
        this.importQuantity = importQuantity;
        this.exportQuantity = exportQuantity;
        this.inventoryQuantity = inventoryQuantity;
        this.image = image;
    }
}