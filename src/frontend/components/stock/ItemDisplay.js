import React from 'react'

class ItemDisplay extends React.Component {

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

        var itemDomains = item ? this.renderItemDomains(item.model.domains) : undefined
        var itemSubCategories = item ? this.renderItemSubCategories(item.model.subCategories) : undefined

        var stateIcon = item ? this.computeStateIcon(item.state.severity) : undefined
        var title = item 
            ? <strong>{item.model.brand.name + ' - ' + item.model.name}</strong>
            : <em>Choose a model or create one</em>


        var header = this.props.showHeader
                ?  <div className="panel-heading">
                        <div className="row">
                            <div className="col-md-9">
                                <h4>{title}</h4>
                            </div>
                            <div className="col-md-3">
                                {stateIcon ? "state :" : ""}
                                {stateIcon}
                            </div>
                        </div>
                    </div>
            : null;

        return  <div>
                    <div className="panel panel-default">
                        {header}
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
                                <em>{item ? item.model.description : ""}</em>
                            </p>
                        </div>
                    </div>
                </div>

    }
}

export default ItemDisplay

ItemDisplay.propTypes = { showHeader: React.PropTypes.bool };
ItemDisplay.defaultProps = { showHeader: true };
