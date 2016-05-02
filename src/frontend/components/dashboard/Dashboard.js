import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'

import DashboardHeader from './DashboardHeader'

class DashboardComponent extends React.Component {

    constructor(props) {
        super(props)

    }

    countItemBySeverity(items, severity) {
        return items.edges.filter(item => {
            return item.node.state.severity == severity
        }).length
    }

    computeItemPercentage(total, subTotal) {
        var number = (subTotal * 100) / total;

        var numberStr = _.toString(number)
        var splitNumber = _.split(numberStr, '.', 2);

        if(splitNumber[1]) {
            return parseInt(splitNumber[1].substring(0, 1)) < 5
                ? splitNumber[0]
                : _.ceil(number)
        }
        
        return splitNumber[0]
    }

    render() {

        var items = this.props.viewer.items

        var itemCount = items.edges.length
        var goodItemsCount = this.countItemBySeverity(items, 1)
        var quiteGoodItemsCount = this.countItemBySeverity(items, 2)
        var quiteBadItemsCount = this.countItemBySeverity(items, 3)
        var badItemsCount = this.countItemBySeverity(items, 4)

        var goodItemsPercentage = this.computeItemPercentage(itemCount, goodItemsCount)
        var needAttentionItemsPercentage = this.computeItemPercentage(itemCount, quiteBadItemsCount + quiteGoodItemsCount)
        var badItemsPercentage = this.computeItemPercentage(itemCount, badItemsCount)

        return  <div>
            
                    <DashboardHeader />
            
                    <div className="page-content row">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="row">
                                <div className="center col-md-12">
                                    <h1>Stock overall status</h1>
                                </div>
                            </div>
                            <br />
                            <div className="progress">
                                <div className="progress-bar progress-bar-success" style={{width: goodItemsPercentage +"%"}}>
                                    <span className="sr-only">{goodItemsPercentage + "% Complete (success)"}</span>
                                </div>
                                <div className="progress-bar progress-bar-warning" style={{width: needAttentionItemsPercentage +"%"}}>
                                    <span className="sr-only">{needAttentionItemsPercentage + "% Complete (warning)"}</span>
                                </div>
                                <div className="progress-bar progress-bar-danger" style={{width: badItemsPercentage +"%"}}>
                                    <span className="sr-only">{badItemsPercentage + "% Complete (danger)"}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="center col-md-4">
                                    <h3>{goodItemsCount} items in good shape</h3>
                                </div>
                                <div className="center col-md-4">
                                    <h3>{quiteGoodItemsCount + quiteBadItemsCount} items need attention</h3>
                                </div>
                                <div className="center col-md-4">
                                    <h3>{badItemsCount} items to repair</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    }
}

export default Relay.createContainer(DashboardComponent, {

    initialVariables: {severity: undefined},

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
            items(first: 10000, severity: $severity) {
              edges {
                node {
                  state {
                    severity
                  }
                }
              }
            }
          }
        `
    }
})

