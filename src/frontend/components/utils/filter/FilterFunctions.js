function minimize(item) {
    return item.toLowerCase().replace(' ', '')
}

function filter(filterText, textToFilter) {
    return minimize(textToFilter).indexOf(minimize(filterText)) != -1
}

export function filterByText(filterText, rowsRoFilter) {

    var counter = 0
    var rows = rowsRoFilter.map(productNode => {

        var product = productNode.node
        if(counter < 35 ) {
            if (filterText === "" || filterText.length <= 1 ) {
                counter += 1
                return product
                


            } else if (filterText.length > 1 && (
                                        filter(filterText, product.model.name) ||
                                        filter(filterText, product.model.brand.name) ||
                                        filter(filterText, product.reference) )) {
                counter += 1
                return product
            }
        }
    })

    var goodRows = rows.filter(function (element) {
        return element !== undefined;
    })

    return goodRows
}