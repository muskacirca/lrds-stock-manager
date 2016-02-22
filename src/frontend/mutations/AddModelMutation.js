import Relay from 'react-relay';

export default class AddModelMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id,
          }
        `,
    };

    getMutation() {
        return Relay.QL`mutation{addModel}`;
    }
    getFatQuery() {
        //return Relay.QL`
        //  fragment on AddTodoPayload {
        //    todoEdge,
        //    viewer {
        //      todos,
        //      totalCount,
        //    },
        //  }
        //`;
    }
    getConfigs() {
        return [{
            type: 'RANGE_ADD',
            parentName: 'viewer',
            parentID: this.props.viewer.id,
            //connectionName: 'todos',
            //edgeName: 'todoEdge',
            //rangeBehaviors: {
            //    '': 'append',
            //    'status(any)': 'append',
            //    'status(active)': 'append',
            //    'status(completed)': null,
            //},
        }];
    }
    getVariables() {
        return {
            name: this.props.modelName,
            brandName: this.props.brandName,
        };
    }
    getOptimisticResponse() {
        return {
            id: model.id,
            name: this.props.modelName,
            viewer: {
                id: this.props.viewer.id,
            },
        }
    }
}
