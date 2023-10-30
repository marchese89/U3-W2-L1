import { Component } from "react";
import Card from "react-bootstrap/Card";

function reduceText(testo, lunghezzaMassima) {
  // Verifica se la lunghezza del testo supera quella massima
  if (testo.length > lunghezzaMassima) {
    // Accorcia il testo e aggiunge puntini alla fine
    return testo.slice(0, lunghezzaMassima) + "...";
  } else {
    // Restituisci il testo inalterato se non supera la lunghezza massima
    return testo;
  }
}

class SingleBook extends Component {
  render() {
    return (
      <>
        <Card
          className={
            this.props.selectedBook === this.props.book.asin ? "selected" : ""
          }
          onClick={() => {
            this.props.setSelectedBook(this.props.book.asin);
          }}
        >
          <Card.Img
            variant="top"
            src={this.props.book.img}
            className="card-img"
          />
          <Card.Body>
            <Card.Title>{reduceText(this.props.book.title, 20)}</Card.Title>
            <Card.Text>
              Categoria:&nbsp;
              {this.props.book.category}
            </Card.Text>
            <Card.Text>
              Prezzo:&nbsp;
              {this.props.book.price}
              <strong>$</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default SingleBook;
