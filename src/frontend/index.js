import React from 'react'
import ReactDOM from 'react-dom'
import {RelayRouter} from 'react-router-relay'

import routes from './routes/routes'

import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render(<RelayRouter history={appHistory} routes={routes} />, document.getElementById('app'))
