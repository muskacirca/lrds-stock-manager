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

    render() {

        var model = this.props.model
        var stateIcon = this.props.stateIcon

        var itemDomains = this.renderItemDomains(model.domains)
        var itemSubCategories = this.renderItemSubCategories(model.subCategories)


        return  <div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-md-11">
                                    <h4><strong>{model.brand.name + ' - ' + model.name}</strong></h4>
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
                                <em>{model.description}</em>
                            </p>
                        </div>
                    </div>
                </div>

    }
}

export default ItemFormDisplay