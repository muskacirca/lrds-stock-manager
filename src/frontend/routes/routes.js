import React from 'react';
import { IndexRoute, Route } from 'react-router';

import authService from '../components/controllers/auth'

import ViewerQuery from '../queries/ViewerQueries'

import MainApp from '../components/MainApp'
import LoginBox from '../components/login'
import Stock from '../components/stock/stock'
import Item from '../components/stock/Item'
import ItemForm from '../components/stock/admin/ItemForm'
import Product from '../components/product'
import Profile from '../components/profile'
import Event from '../components/event'
import NavBarBox from '../components/navbar'


function prepareItemParam(params, route) {
    return {
        ...params,
        reference: params.reference ? params.reference : "error"
    }
}


export default  <Route path="/" component={MainApp} queries={ViewerQuery}>
                    <IndexRoute component={Stock} queries={ViewerQuery}/>
                    <Route path="profile" component={Profile} queries={ViewerQuery}/>
                    <Route path="events" component={Event} queries={ViewerQuery}/>

                    <Route path="stock" component={Stock} queries={ViewerQuery}/>
                    <Route path="stock/:reference" component={Item} queries={ViewerQuery} prepareParams={prepareItemParam}/>
                    <Route path="admin/create" component={ItemForm} queries={ViewerQuery}/>
                    <Route path="admin/edit/:reference" component={ItemForm} queries={ViewerQuery} prepareParams={prepareItemParam}/>

                </Route>

//function prepareWidgetListParams(params, route) {
//    return {
//        ...params,
//        id: params.id ? params.id : "1"
//    }
//}
//
//function requireAuth(nextState, replaceState) {
//    if(!authService.loggedIn()) {
//        replaceState({ nextPathname: nextState.location.pathname }, '/jeestock/login')
//    }
//}
//
//function logout(nextState, replaceState) {
//    authService.logout()
//    replaceState({ nextPathname: nextState.location.pathname }, '/')
//}



//export default <Route path="/jeestock" component={MainApp}>
//    <IndexRoute component={MainApp} />
//    <Route path="profile" component={Profile} onEnter={requireAuth}/>
//    <Route path="stock" component={Stock} onEnter={requireAuth}>
//        <Route path="product/:id" component={Product} onEnter={requireAuth} />
//    </Route>
//    <Route path="event" component={Event} onEnter={requireAuth}/>
//    <Route path="login" component={LoginBox}/>
//    <Route path="logout" component={LoginBox} onEnter={logout} />
//</Route>

//export default <Route path="/" component={MainApp} queries={WreckQueries} >
//                    <IndexRoute component={MainApp} queries={WreckQueries}/>
//                    <Route path="wreck(/:id)" component={Wreck} queries={WreckUnitQuery}
//                            prepareParams={prepareWidgetListParams} />
//
//                    <Route path="advice" component={Advice} />
//                    <Route path="team" component={Team} />
//
//                    <Route path="admin" component={Admin} queries={WreckQueries} />
//
//                    <Route path="admin/wreck/create" component={WreckForm} />
//                    <Route path="admin/wreck/edit/:id" component={WreckForm} queries={WreckUnitQuery}
//                           prepareParams={prepareWidgetListParams} />/>
//                </Route>
