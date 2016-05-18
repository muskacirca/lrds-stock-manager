import React from 'react'
import Relay from 'react-relay'
import moment from 'moment'
import _ from 'lodash'

import PageHeader from '../utils/forms/FormHeader'

import UserService from '../utils/AuthService'
import CommentComponent from '../utils/forms/CommentComponent'

import AddEventCommentMutation from '../../mutations/AddEventCommentMutation'

class EventDisplay extends React.Component {

    constructor(props) {
        super(props)
       
    }

    handleCommentPublish(message) {
        
        var addEventCommentMutation = new AddEventCommentMutation({
            text: message,
            author: UserService.getLogin(),
            event: this.props.viewer.event
        });

        var onSuccess = (response) => console.log("Item comment added successfully !");

        var onFailure = (transaction) => console.log("An error occurred when adding new event comment");

        console.log("before commit update")
        Relay.Store.commitUpdate(addEventCommentMutation, {onSuccess, onFailure})
    }

    computeState(state) {
        if(state == "1") {
            return  <i className="fa fa fa-square green" />
        } else if(state == "2") {
            return  <i className="fa fa fa-square yellow" />
        } else if(state == "3") {
            return  <i className="fa fa fa-square orange" />
        } else if(state == "4") {
            return  <i className="fa fa fa-square red" />
        }
    }
    
    renderReservedItems(items) {
     
        if(items) {
            return items.map(itemNode => {
                var item = itemNode.node ? itemNode.node : itemNode
                var state = this.computeState(item.state.severity)
                return  <li className="list-group-item" key={"event-reserved-items-" + item.reference}>
                            <div className="row">
                                <div className="col-md-2">{item.model.name}</div>
                                <div className="col-md-2">{item.model.brand.name}</div>
                                <div className="col-md-2">{item.reference}</div>
                                <div className="col-md-2">{state}</div>
                            </div>
                    
                        </li>
            })
        }
        
    }

    computeEventSubTitle(event) {
        var startDate = moment(event.startDate).format("DD/MM/YYYY");
        var endDate = moment(event.endDate).format("DD/MM/YYYY");
        return  <span>{"from " + startDate + " to " + endDate}</span>
    }
    
    exportToPdf() {
        
        
    }

    renderHeaderToolBar() {
        return <button className="btn btn-primary" type="submit" onClick={this.exportToPdf.bind(this)}>Export BAL</button>
    }
   
    render() {

        var event = this.props.viewer.event;
    
        var reservedItems = this.renderReservedItems(event.reservedItems.edges);

        var computeEventSubTitle = this.computeEventSubTitle(event)
        var headerToolBar = this.renderHeaderToolBar()
        
        return  <div>

                    <PageHeader title={event.name} 
                                subTitle={computeEventSubTitle}
                                content={headerToolBar}/>
            
                    <div className="page-content">

                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <div>
                                    <p>{event.description}</p>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h5>Selected items</h5>
                                            <ul className="list-group">{reservedItems}</ul>
                                        </div>
                                    </div>
                                </div>

                                <CommentComponent handleCommentPublish={this.handleCommentPublish.bind(this)}
                                                  comments={event.comments.edges} />
                            </div>
                        </div>
                        
                    </div>
                    

                </div>
    }


}

export default Relay.createContainer(EventDisplay, {

    initialVariables: {
        id: null,
        limit: 100
    },
    prepareVariables({ id, limit }) {

        return {
            id: id,
            limit: limit
        }
    },
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            
            event(a: $id) {
              ${AddEventCommentMutation.getFragment('event')}
              name,
              description
              startDate,
              endDate,
              reservedItems(first: $limit) {
                edges {
                  node {
                    reference
                    model {
                      name
                      brand {
                        name
                      }
                    }
                    state {
                        severity
                    }
                  }
                }
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
              }
              comments(last: 5) {
                edges {
                  node {
                    text
                    author
                    createdAt
                  }
                }
              } 
            }
          }
        `
    }
});

