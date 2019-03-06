import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import api from '../../services/api'

import './style.css'

export default class Product extends Component{
   state = {
      product: {},
   }

   async componentDidMount(){
      const { id } = this.props.match.params

      const response = await api.get("/products/"+id)
      this.setState( { product: response.data })
   }

   render(){
      const { product } = this.state

      return (
         <div className="product-info">
         <Link to="/" className="return"><button>⤾ Previous</button></Link>
            <h1> {product.title} </h1>
            <p> {product.description} </p>
            <a href={product.url} className="linkRepositorio" target="_blank">Acessar repositório</a>
         </div>
      )
   }
}