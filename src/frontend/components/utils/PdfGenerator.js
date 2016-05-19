import jsPDF from 'jspdf'

const marginLeft = 20;
const marginTop = 20;
const marginBottom = 280;

const pageLength = 190

const reservedItemTitleHeigt = 90;
const reservedItemsHeight = 100;

function displayRentedItems(doc, items) {

    doc.setFontSize(25)
    doc.text(marginLeft, reservedItemTitleHeigt, "Reserved items");
    doc.setLineWidth(0.5);
    doc.line(marginLeft, reservedItemTitleHeigt + 2, pageLength, reservedItemTitleHeigt + 2);

    let height = reservedItemsHeight;

    items.forEach(item => {
        doc.setFontSize(14)
        doc.text(marginLeft, height, item.node.model.brand.name + " - " + item.node.model.name);
        height += 5
    })
}

function toDataUrl(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var reader  = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
}

function renderHeader(doc, event, image) {

    doc.addImage(image, 'JPEG', 5, 5, 37.5, 29.5);
    
    doc.setFontSize(40)
    doc.text(marginLeft + 27.5, marginTop, event.name);
    

    
}

function renderFooter(doc, event) {
    doc.setFontSize(14)
    doc.text(marginLeft, marginBottom - 10, "Fait à .................. le ....................");
    doc.setLineWidth(0.5);
    doc.line(marginLeft, marginBottom, pageLength, marginBottom);
}


export function exportToPdf(event) {
    
    let doc = new jsPDF();

    toDataUrl('/style/images/lrds-logo-300px.jpg', (image) => {
        
        renderHeader(doc, event, image);

        displayRentedItems(doc, event.reservedItems.edges);

        renderFooter(doc, event);

        doc.save(event.name + '.pdf');
    });

}