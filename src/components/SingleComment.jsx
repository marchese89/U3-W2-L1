import { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Trash3Fill } from "react-bootstrap-icons";
import { token } from "../token";
class SingleComment extends Component {
  render() {
    return (
      <ListGroup.Item className="d-flex justify-content-between">
        <div>
          {this.props.comment.comment} - voto: {this.props.comment.rate}
        </div>
        <Button
          variant="danger"
          onClick={async () => {
            try {
              this.props.super.setState({
                isLoading: true,
              });
              const response = await fetch(
                "https://striveschool-api.herokuapp.com/api/comments/" +
                  this.props.comment._id,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  method: "DELETE",
                }
              );
              if (response.ok) {
                this.props.super.setState({
                  isLoading: false,
                });
                this.props.commentArea.setState({ error: false });
                this.props.update();
              } else {
                this.props.super.setState({
                  isLoading: false,
                });
                throw new Error("Errore di rete!");
              }
            } catch (err) {
              console.log("ERRORE", err);
              this.props.commentArea.setState({ error: true });
            }
          }}
        >
          <Trash3Fill />
        </Button>
      </ListGroup.Item>
    );
  }
}

export default SingleComment;
