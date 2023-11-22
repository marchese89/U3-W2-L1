import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { token } from "../token";
class AddComment extends Component {
  state = {
    comment: {
      comment: "",
      rate: "1",
      elementId: this.props.selectedBook,
    },
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedBook !== this.state.comment.elementId) {
      this.setState({
        comment: {
          ...this.state.comment,
          elementId: this.props.selectedBook,
        },
      });
    }
  }

  sendComment = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: JSON.stringify(this.state.comment),
        }
      );
      if (response.ok) {
        this.setState({
          comment: {
            comment: "",
            rate: "1",
            elementId: this.props.id,
          },
        });
        this.props.update();
      }
    } catch (err) {
      console.log("ERRORE", err);
    }
  };

  submitHandler = async (e) => {
    e.preventDefault();
    this.sendComment();
  };

  handleInputChange(name, value) {
    this.setState({
      comment: {
        ...this.state.comment,
        [name]: value,
      },
    });
  }

  render() {
    return (
      <Form onSubmit={this.submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type="text"
            required
            value={this.state.comment.comment}
            onChange={(e) => this.handleInputChange("comment", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Voto</Form.Label>
          <Form.Select
            onChange={(e) => this.handleInputChange("rate", e.target.value)}
            value={this.state.comment.rate}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default AddComment;
