function filter(filterText, textToFilter) {
    return textToFilter.toLowerCase().replace(' ', '').indexOf(filterText) != -1
}

export function filterByText(filterText, rowsRoFilter) {

    var counter = 0

    var rows = rowsRoFilter.map((product, key) => {

        if(counter < 35 ) {
            if (filterText === "" || filterText.length <= 1 ) {
                counter += 1
                return product.node

            } else if (filterText.length > 1 && (
                                        filter(filterText, product.node.model.name) ||
                                        filter(filterText, product.node.model.brand.name) ||
                                        filter(filterText, product.node.reference) )) {
                counter += 1
                return product.node
            }
        }
    })

    var goodRows = rows.filter(function (element) {
        return element !== undefined;
    })

    return goodRows
}