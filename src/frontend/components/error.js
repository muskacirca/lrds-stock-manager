var ErrorBox = React.createClass({

    render: function() {
        return (
            <div>
                <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    Error
                </div>
            </div>
        );
    }


});

React.render(
    <ErrorBox/>,
    document.body
)
