import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'



class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedhandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedhandler} />
          <Route path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        </div>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    // ingredient is what I named in reducer, cannot be anyname, but ings is something that i can just come up with
    purchased: state.order.purchased
  }
}



export default connect(mapStateToProps)(Checkout)