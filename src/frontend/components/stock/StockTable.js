import React from 'react'
import Relay from 'react-relay'
import StockTableHeader from './StockTableHeader'
import StockTableRow from './StockTableRow'

class StockTable extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        var filterText = this.props.filterText.toLowerCase()
        var filterTags = this.props.tags

        var counter = 0

        console.log("FilterTags: " + JSON.stringify(filterTags))
        var items = this.props.viewer.items

        var taggedFilteredRows = []
        if (filterTags.length !== 0) {
            taggedFilteredRows = items.edges.map((item) => {

                if (counter < 35) {
                    var hasTags = false
                    for(var i = 0; i < filterTags.length; i++) {
                        if (item.node.model.name.toLowerCase().indexOf(filterTags[i].toLowerCase()) != -1) {
                            counter += 1
                            hasTags = true
                        }
                    }

                    return hasTags ? item : undefined
                }
            })
        }

        var t = taggedFilteredRows.filter((element) => {
            return element !== undefined;
        })

        counter = 0

        var rowsToShow = t.length === 0 ? items.edges : t
        var rows = rowsToShow.map((product, key) => {

            if(counter < 35 ) {
                if (filterText === "" || filterText.length <= 2 ) {
                    counter += 1
                    return <StockTableRow key={key} product={product.node}/>

                } else if (filterText.length > 2 && product.node.model.name.toLowerCase().indexOf(filterText) != -1) {
                    counter += 1
                    return <StockTableRow key={key} product={product.node}/>
                }
            }
        })

        return (
            <table className="table">
                <StockTableHeader />
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}


export default Relay.createContainer(StockTable, {
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            items(first: 100) {
              edges {
                node {
                  reference,
                  isInStock,
                  model {
                    name
                    description
                    brand {
                      name
                      description
                    }
                    subCategories {
                      name
                      description
                    }
                    domains {
                      name
                      description
                    }
                  },
                  comments(first: 5) {
                    edges {
                      node {
                        text
                      }
                    }
                  }
                }
              }
            }
          }
        `
    }
});