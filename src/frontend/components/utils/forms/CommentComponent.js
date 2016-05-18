import React from 'react'
import moment from 'moment'

class CommentComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    onSave(e) {
        this.props.onSave(e)
    }
    
    
    renderComments(comments) {
        
        if(comments) {
            return comments.map((commentNode, key) => {
                var comment = commentNode.node ? commentNode.node : commentNode
                var date = moment(comment.createdAt).format("DD/MM/YYYY")
                return   <div key={"comment-" + key} className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">{comment.author + " - " + date}</h3>
                            </div>
                            <div className="panel-body">
                                {comment.text}
                            </div>
                        </div>
            })
        }
    }

    handleAddComment(e) {

        e.preventDefault()
        var comment = this.refs.commentInputForm.value
        
            console.log("adding comment : " + comment)
        if(comment) {
            this.refs.commentInputForm.value = ""
            this.props.handleCommentPublish(comment)
        }
    }
    

    render() {
        
        var comments = this.renderComments(this.props.comments)

        return  <form>
                    <div>
                        <div className="row">
                            <div className="col-md-10 col-xs-9">
                                <textarea ref="commentInputForm" className="comment-box form-control" 
                                          row="2" placeholder="Enter a comment ..." />
                            </div>
                            <div className="center col-md-2 col-xs-3">
                                <button type="submit" className="btn btn-default" onClick={this.handleAddComment.bind(this)}>Send</button>
                            </div>
                        </div>
                        
                        
                        <div>
                            {comments}
                        </div>
                    </div>
                   
                </form>  
       

    }
}

export default CommentComponent