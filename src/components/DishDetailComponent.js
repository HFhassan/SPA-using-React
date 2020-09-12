import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class Dishdetail extends Component {

    renderDish(dish) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (<div></div>)
        }

    }  
    
    renderComments(comments) {
        
        const comment_ = comments.map(comment => {
            if (comment != null){
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author},
                        &nbsp;
                        {new Intl.DateTimeFormat('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'

                        }).format(new Date(comment.date))}
                        </p>
                    </li>
                )
            }else{
                return (<div></div>)
            }
        })
        return(
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {comment_}
                </ul>

            </div>
        )
    }
    
    
    render() {
        const dish = this.props.dish;

        if (dish == null) {
            return (<div></div>)
        }    

        return(
            <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                   <Card> {this.renderDish(dish)}</Card>
                </div>

                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {this.renderComments(dish.comments)}
                </div>
            </div>             
            </div>
        )
    }

}

export default Dishdetail;