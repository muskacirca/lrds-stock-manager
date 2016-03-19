import React from 'react'

class ItemFormDisplay extends React.Component {

    constructor(props) {
        super(props)
    }

    renderItemDomains(modelDomains) {

        return modelDomains.map(elt => {
            return <li key={elt.name} className="model-tag">{elt.name}</li>
        })
    }

    renderItemSubCategories(modelSubCategories) {

        return modelSubCategories.map(elt => {
            return <li key={elt.name} className="model-tag">{elt.name}</li>
        })
    }

    computeStateIcon(state) {

        if(state == "1") {
            return  <i className="fa fa-2x fa-thumbs-up green" />
        } else if(state == "2") {
            return  <i className="fa fa-2x fa-thumbs-up yellow" />
        } else if(state == "3") {
            return  <i className="fa fa-2x fa-thumbs-down orange" />
        } else if(state == "4") {
            return  <i className="fa fa-2x fa-thumbs-down red" />
        }
    }

    render() {

        var item = this.props.item

        var itemDomains = this.renderItemDomains(item.model.domains)
        var itemSubCategories = this.renderItemSubCategories(item.model.subCategories)

        var stateIcon = this.computeStateIcon(item.state.severity)

        return  <div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-md-11">
                                    <h4><strong>{item.model.brand.name + ' - ' + item.model.name}</strong></h4>
                                </div>
                                <div className="col-md-1">
                                    {stateIcon}
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-5">
                                    <em>Domaine: </em>
                                    <ul>{itemDomains}</ul>
                                </div>
                                <div className="col-md-5">
                                    <em>Sous Catégories: </em>
                                    <ul>{itemSubCategories}</ul>
                                </div>
                            </div>
                            <p>
                                <em>{item.model.description}</em>
                            </p>
                        </div>
                    </div>
                </div>

    }
}

export default ItemFormDisplay
