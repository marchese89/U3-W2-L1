import { Component } from "react";
import SingleBook from "./SingleBook";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    search: "",
    selectedBook: null,
  };

  setSelectedBook = (asin) => {
    this.setState({ selectedBook: asin });
  };

  render() {
    return (
      <>
        <Container className="mb-6 book-list">
          <Container className="book-list-search flex-grow-1">
            <Row className="text-center d-flex justify-content-start">
              <Col className="col-3">
                <Form.Group className="mb-3">
                  <Form.Label>Ricerca</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.search}
                    onChange={(e) => {
                      this.setState({ search: e.target.value });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Row className="gy-4">
            <Col className="col-6 left">
              <Row className="gy-4">
                {this.props.genre
                  .filter((book) => {
                    return book.title
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase());
                  })
                  .map((book) => {
                    return (
                      <Col xs={12} lg={6} key={book.asin}>
                        <SingleBook
                          book={book}
                          setSelectedBook={this.setSelectedBook}
                          selectedBook={this.state.selectedBook}
                        />
                      </Col>
                    );
                  })}
              </Row>
            </Col>
            <Col className="col-6 right">
              <CommentArea selectedBook={this.state.selectedBook} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default BookList;
