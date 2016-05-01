import React from 'react';
import { IndexRoute, Route } from 'react-router';

import authService from '../components/utils/AuthService'

import ViewerQuery from '../queries/ViewerQueries'

import MainApp from '../components/MainApp'
import Stock from '../components/stock/stock'
import Dashboard from '../components/dashboard/Dashboard'
import Item from '../components/stock/Item'
import ItemForm from '../components/stock/admin/ItemForm'
import Event from '../components/event/event'
import EventAdmin from '../components/event/admin/EventAdmin'
import Login from '../components/login'


function prepareItemParam(params, route) {
    return {
        ...params,
        reference: params.reference ? params.reference : "error",
        viewerId: JSON.parse(localStorage.getItem('user')).id
    }
}

function logout(nextState, replace) {
    authService.logout()
    replace('/login')
}

function requireAuth(nextState, replace) {
    if (!JSON.parse(localStorage.getItem('user'))) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

function getUser(){
    return {viewerId: JSON.parse(localStorage.getItem('user')).id }
}

export default  <Route>
                    <Route path="/" component={MainApp} queries={ViewerQuery}>

                        <IndexRoute component={Stock} queries={ViewerQuery} onEnter={requireAuth}
                                    prepareParams={() => getUser()} />
                        
                        <Route path="dashboard" component={Dashboard} queries={ViewerQuery} onEnter={requireAuth}
                               prepareParams={() => getUser()} />

                        <Route path="stock" component={Stock} queries={ViewerQuery} onEnter={requireAuth}
                               prepareParams={() => getUser()} />

                        <Route path="stock/:reference" component={Item} queries={ViewerQuery}
                               prepareParams={prepareItemParam} onEnter={requireAuth} />

                        <Route path="admin/create" component={ItemForm} queries={ViewerQuery} onEnter={requireAuth}
                               prepareParams={() => getUser()} />

                        <Route path="admin/edit/:reference" component={ItemForm} queries={ViewerQuery}
                               prepareParams={prepareItemParam} onEnter={requireAuth} />

                        <Route path="event" component={Event} prepareParams={() => getUser()} 
                               queries={ViewerQuery} onEnter={requireAuth}/>

                        <Route path="event/create" component={EventAdmin} prepareParams={() => getUser()}
                               queries={ViewerQuery} onEnter={requireAuth}/>

                    </Route>

                    <Route path="login" component={Login} />
                    <Route path="logout" component={Login} onEnter={logout} />

                </Route>