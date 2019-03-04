import React, { Component } from 'react'

import api from '../../services/api'
import './style.css'

export default class Main extends Component {
   state = {
      products: [],
      productInfo: {},
      page: 1,
   }

   componentDidMount() {
      this.loadProducts(this.state.page)
   }

   loadProducts = async (page = 1) => {
      const response = await api.get(`/products?page=${page}`)
      const {docs, ...productInfo} = response.data
      this.setState({ products: docs, productInfo, page})
   }

   prevPage = () => {
      const { page, productInfo } = this.state

      if(page === 1) return

      const pageNumber = page - 1
      this.loadProducts(pageNumber)
   }

   nextPage = () => {
      const { page, productInfo } = this.state

      if(page === productInfo.pages) return

      const pageNumber = page + 1
      this.loadProducts(pageNumber)
   }

   render() {
      const {products, page, productInfo} = this.state

      return(
         <div className="product-list">
            { products.map(product => (
               <article key={product._id}>
                  <strong> {product.title} </strong>
                  <p> {product.description} </p>
                  <a href={product.url} target="_blank"> Open repository </a>
               </article>
            )) }

            <div className="paginate">
               <button disabled={page === 1} onClick={this.prevPage}> ⤾ Previous </button>
               <button disabled={page === productInfo.pages} onClick={this.nextPage}> Next ➟ </button>
            </div>
         </div>
      )
   }
}