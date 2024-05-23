class Storage {
    importQuantity;
    exportQuantity;
    inventoryQuantity;
    name;

    constructor(nameInput) {
        this.name = nameInput;
        let importQuantityLocal = localStorage.getItem('importQuantity');
        if (importQuantityLocal) {
            this.importQuantity = JSON.parse(importQuantityLocal);
        } else {
            this.importQuantity = [];
            localStorage.setItem('importQuantity', JSON.stringify([]));
        }

        let exportQuantityLocal = localStorage.getItem('exportQuantity');
        if(exportQuantityLocal){
            this.exportQuantity = JSON.parse(exportQuantityLocal);
        }
        else{
            this.exportQuantity=[];
            localStorage.setItem('exportQuantity', JSON.stringify([]));
        }
        let inventoryQuantityLocal = localStorage.getItem('inventoryQuantity');
        if(inventoryQuantityLocal){
            this.inventoryQuantity = JSON.parse(inventoryQuantityLocal);
        }
        else{
            this.inventoryQuantity=[];
            localStorage.setItem('inventoryQuantity', JSON.stringify([]));
        }
    }

    addImport(newImport) {
        this.importQuantity.push(newImport);
        localStorage.setItem('importQuantity', JSON.stringify(this.importQuantity));
    }

    updateImport(index, updateImport) {
        this.importQuantity[index]= updateImport;
        localStorage.setItem('importQuantity', JSON.stringify(this.importQuantity));
    }
    removeImport(index) {
        this.importQuantity.splice(index,1);
        localStorage.setItem('importQuantity', JSON.stringify(this.importQuantity));
    }
    searchimport(searchItem) {
        if(searchItem.name){
            return this.importQuantity.filter(item => item.name.toUpperCase().includes(searchItem.name.toUpperCase()));
        }
        return this.importQuantity;
    }
    addExport(newExport) {
        this.exportQuantity.push(newExport);
        localStorage.setItem('exportQuantity', JSON.stringify(this.exportQuantity));
    }
    updateExport(index, updateExport) {
        this.exportQuantity[index]= updateExport;
        localStorage.setItem('exportQuantity', JSON.stringify(this.exportQuantity));
    }
    removeExport(index) {
        this.exportQuantity.splice(index,1);
        localStorage.setItem('exportQuantity', JSON.stringify(this.exportQuantity));
    }
    searchExport(searchItem) {
        if(searchItem.name){
            return this.exportQuantity.filter(item => item.name.toUpperCase().includes(searchItem.name.toUpperCase()));
        }
        return this.exportQuantity

    }

}
