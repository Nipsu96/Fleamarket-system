/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState,useEffect } from 'react'
import '../App.css'

function ProductListing(props) {
  const [totalSum, setTotalSum] = useState(0);
  const [products, setProducts] = useState([]);
  var total = 0;
  var lengthOfData = 0;

  useEffect(() => {
      if(lengthOfData<props.data[0].length){
        for (let i = 0; i < props.data[0].length; i++) {
             total += parseInt(props.data[0][i].product_price);
            setTotalSum(total)
            lengthOfData++;
        }
    }
    if(props.data != undefined){
        setProducts(props.data[0])
    }

  },[])

  console.log("Tuotteet:",props)
  return (
    <>
        <h3>Ilmoitetut Tuotteet</h3>
        {products.length == 0 ? <><h3>Ei Yhtään ilmoitettua tuotetta</h3></>:
             <table id="productTable">
            <thead>
            <tr>
                <th className='tableheader'>Tuotenumero</th>
                <th className='tableheader'>Kategoria</th>
                <th className='tableheader'>Tuotteen nimi</th>
                <th className='tableheader'>Hinta</th>
            </tr>
            </thead>

         {products.map((product,index) => (
                <tbody key ={index}>
                    <tr>
                    <td>{product.product_id}</td>
                    <td>{product.category_id}</td>
                 <td>{product.product_name}</td>
                <td>{product.product_price}€</td>
                </tr>
            </tbody>
        ))}
        <tfoot>
            <tr>
                <th></th>
                <th>Yhteensä</th>
                <th>{totalSum}€</th>
            </tr>
        </tfoot>
    </table>
    }
    </>
  )
}

export default ProductListing
