import { Component } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import SingleComment from "./SingleComment";

class CommentList extends Component {
  state = {
    isLoading: false,
  };

  render() {
    return (
      <ListGroup>
        <h4 className="text-center">Commenti</h4>
        {this.state.isLoading && (
          <div className="text-center mb-2">
            <Spinner animation="border" variant="info" />
          </div>
        )}
        {this.props.listOfComments.map((comment, i) => {
          return (
            <SingleComment
              comment={comment}
              key={i}
              update={this.props.update}
              super={this}
              commentArea={this.props.commentArea}
            />
          );
        })}
      </ListGroup>
    );
  }
}

export default CommentList;
