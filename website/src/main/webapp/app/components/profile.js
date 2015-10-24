import React from 'react'

class ProfileBox extends React.Component {

  render() {
    return (
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3 col-md-2 sidebar">
                Side bar Profile
              </div>
            </div>
          </div>
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            Profile
          </div>
        </div>
    );
  }


};

export default ProfileBox
