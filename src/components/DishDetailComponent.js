import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";


class DishDetail extends Component {
  renderDish(dish) {
    if (dish != null)
    return dish.map((dishh) => {

      return (
        <Card>
          <CardImg top src={dishh.image} alt={dishh.name} />
          <CardBody>
            <CardTitle>{dishh.name}</CardTitle>
            <CardText>{dishh.description}</CardText>
          </CardBody>
        </Card>);
    });
    else return <div></div>;
 }
  renderComments(commnts) {
    if (commnts != null)
      return commnts.map((comnt) => {
        return (
          <div>
            <ul className="list-unstyled">
              <li className="mb-2" key={comnt.id}>
                {comnt.comment}
              </li>
              <li>
                
              </li>
            </ul>
          </div>
        );
      });
    else return <div></div>;
  }

  renderHeading(props) {
    if (props.length <= 0) {
      return [];
    } else {
      return <h1 className="mb-2">Comments</h1>;
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.selectedDish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.renderHeading(this.props.comments)}
          {this.renderComments(this.props.comments)}
        </div>
      </div>
    );
  }
}

export default DishDetail;