import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, feedbackForm } from '../redux/ActionCreators';
import { Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  feedbackForm:  (firstName, lastName, tel, email, feedbackMsg) => dispatch(feedbackForm(firstName, lastName, tel, email, feedbackMsg))
});
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,

  }
}

class Main extends Component {

  constructor(props) {
    super(props);

    this.props = {
      
    };
  }
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  

  render() {
    

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
        />
      );
    };
    const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leaders={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leadersLoading={this.props.leaders.isLoading}
              leadersErrMess={this.props.leaders.errMess}
          />
      );
    }
    return (
      <div>

        <Header />
        <TransitionGroup>
            <CSSTransition key={this.props.location} classNames="page" timeout={300}>
        <Switch location={this.props.location}>
          <Route path ="/home" component= {HomePage} />
          <Route exact path ="/menu" component= {()=> <Menu dishes={this.props.dishes} />} /> 
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route path ="/about" component={()=><About leaders={this.props.leaders} />} />
          <Redirect to ="/home" />
        </Switch>

        </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Main));