import React from 'react'
import Relay from 'react-relay'
import ReactDOM from 'react-dom'
import useRelay from 'react-router-relay';
import {
    Router,
    useRouterHistory,
    applyRouterMiddleware
} from 'react-router'

import routes from './routes/routes'

import { createHashHistory } from 'history'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render(<Router render={applyRouterMiddleware(useRelay)}
                        history={appHistory}
                        environment={Relay.Store}
                        routes={routes} />, document.getElementById('app'))
