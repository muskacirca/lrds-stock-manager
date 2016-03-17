var Relay = require.requireActual('react-relay');

module.exports = {
    QL: Relay.QL,
    Mutation: Relay.Mutation,
    Route: Relay.Route,
    createContainer: (component) => {
        return component
    }
};