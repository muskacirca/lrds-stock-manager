import React from 'react'

class EventBox extends React.Component {

  render() {
    return (
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3 col-md-2 sidebar">
                Side bar Event
              </div>
            </div>
          </div>
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
           Event
          </div>
        </div>
    )
  }


}

export default EventBox
