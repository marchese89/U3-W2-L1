import { Component } from "react";
import CommentList from "./CommentsList";
import AddComment from "./AddComment";
import Error from "./Error";
import { token } from "../token";

class CommentArea extends Component {
  state = {
    listOfComments: [],
    error: false,
  };
  componentDidMount() {
    if (this.props.selectedBook != null) {
      this.getComments();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedBook !== this.props.selectedBook) {
      this.getComments();
    }
  }

  getComments = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.selectedBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        this.setState({
          listOfComments: data,
        });
      }
    } catch (err) {
      console.log("ERRORE", err);
      this.setState({ error: true });
    }
  };
  render() {
    return (
      <div className="comment-area">
        {this.state.error && <Error />}
        <CommentList
          listOfComments={this.state.listOfComments}
          update={this.getComments}
          commentArea={this}
        />
        <AddComment
          selectedBook={this.props.selectedBook}
          update={this.getComments}
          commentArea={this}
        />
      </div>
    );
  }
}

export default CommentArea;
