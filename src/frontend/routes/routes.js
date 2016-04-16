import React from 'react';
import { IndexRoute, Route } from 'react-router';

import authService from '../components/utils/AuthService'

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

                        <Route path="stock" component={Stock} queries={ViewerQuery} onEnter={requireAuth}
                               prepareParams={() => getUser()} />

                        <Route path="stock/:reference" component={Item} queries={ViewerQuery}
                               prepareParams={prepareItemParam} onEnter={requireAuth} />

                        <Route path="admin/create" component={ItemForm} queries={ViewerQuery} onEnter={requireAuth}
                               prepareParams={() => getUser()} />

                        <Route path="admin/edit/:reference" component={ItemForm} queries={ViewerQuery}
                               prepareParams={prepareItemParam} onEnter={requireAuth} />

                    </Route>

                    <Route path="login" component={Login} />
                    <Route path="logout" component={Login} onEnter={logout} />

                </Route>


//function prepareWidgetListParams(params, route) {
//    return {
//        ...params,
//        id: params.id ? params.id : "1"
//    }
//}
//

//




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
