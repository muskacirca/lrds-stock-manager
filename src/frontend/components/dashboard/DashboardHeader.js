import React from 'react'
import moment from 'moment'

class DashboardHeader extends React.Component {

    constructor(props) {
        super(props)
    }
    

    render() {
        
        return  <div className="sub-bar row">
                    <div className="col-md-6 col-md-offset-2 col-sm-6 col-xs-6 col-xs-offset-1">
                        <h2>Dashboard</h2>
                    </div>
                </div>
    }


}

export default DashboardHeader