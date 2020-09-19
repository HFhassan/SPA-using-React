import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,
  Breadcrumb, BreadcrumbItem,
  Modal, ModalHeader, ModalBody,
  Label, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = len => val => !(val) || val.length <= len;
const minLength = len => val => !(val) || val.length >= len;

const RenderDish = ({dish}) => {
  return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name}/>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
}

const RenderComments = ({comments}) => {
  if (comments == null)
    return (<div></div>);

  let lcomments = comments.map((comment) => {
    return (
      <li>
        <p>
          {comment.comment}
          <br/>
          <i>--{comment.author}, {new Intl.DateTimeFormat('es-GT',{year: 'numeric', month: 'short', day:'2-digit'}).format(new Date( Date.parse(comment.date)))}</i>
        </p>
      </li>
      );
  });

  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      <ul className="list-unstyled">
      {lcomments}
      </ul>
      <CommentForm />
    </div>
  );
}

const DishDetail = (props) => {
  let dish = props.dish

  if (dish == null)
    return <div></div>

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={dish} />
        </div>
        <RenderComments comments={props.comments} />
      </div>
    </div>);
}


class CommentForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      author: '',
      rating: 0,
      comment: '',
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleComment(values){
    this.toggleModal();
    let state = JSON.stringify(values)
    let msj = 'Current State is: ' + state
    alert(msj);
  }

  render(){
    return (
      <div className="row">
        <Button className='btn-outline-dark' onClick={this.toggleModal}> <span className='fa fa-pencil'/> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit = {(values)=>{this.handleComment(values)}} className="m-2">
              <Row className="form-group">
                <Label htmlFor="rating">Rating</Label><br/>
                <Col md={11}>
                  <Control.select model=".rating" id="rating" name="rating"
                    className="form-control " validators={required}   >
                        <option value='0'/>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </Control.select>
                  <Errors
                    className="text-danger"
                    model=".rating"
                    show="touched"
                    messages={{
                      required: "Required"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author">Your name</Label><br/>
                <Col md={11}>
                <Control.text model=".author" id="author" name="author"
                  className="form-control"
                  validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/> 
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: 'Required ',
                      minLength: 'Must be greater tahn 3 characters',
                      maxLength: 'Must be 15 character or less'
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group" >
                <Label htmlFor="fcomment">Comment</Label><br/><br/>
                <Col md={11}>
                  <Control.textarea model=".comment" id="fcomment"
                    name="fcomment" className="form-control"
                    validators={{required}} row='6'/>
                  <Errors
                    className="text-danger"
                    model='.comment'
                    show="touched"
                    messages={{
                      required: 'Required'
                    }}
                  />
                </Col>
              </Row>
              <Button type="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DishDetail;