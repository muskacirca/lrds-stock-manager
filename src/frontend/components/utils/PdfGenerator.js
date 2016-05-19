import jsPDF from 'jspdf'

const marginLeft = 20;
const reservedItemTitleHeigt = 90;
const reservedItemsHeight = 100;

function displayRentedItems(doc, items) {

    doc.text(marginLeft, reservedItemTitleHeigt, "Reserved items");
    doc.setLineWidth(0.5);
    doc.line(marginLeft, reservedItemTitleHeigt + 2, 200, reservedItemTitleHeigt + 2);

    let height = reservedItemsHeight;

    items.forEach(item => {
        doc.setFontSize(14)
        doc.text(marginLeft, height, item.node.model.brand.name + " - " + item.node.model.name);
        height += 5
    })
}

function renderHeader(doc, event) {
    doc.text(20, 20, event.name);
}


export function exportToPdf(event) {

    let doc = new jsPDF();

    renderHeader(doc, event)
    
    displayRentedItems(doc, event.reservedItems.edges)
    
    doc.save(event.name + '.pdf');
}