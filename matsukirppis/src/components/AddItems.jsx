/* eslint-disable react/prop-types */
import { useState } from 'react'
import '../App.css'
// import Barcode from 'react-barcode';
import axios from 'axios';


// let nextId = 0;


function AddItems() {
  const [productData, setProductData] = useState({
        product_name: '',
        product_price: 0,
        is_k18: false,
        category_id: 0,
        user_id: 1,

    })

    const categorys = [
      {category_id:1,name:'Vaatteet'},
      {category_id:2,name:'Manga'},
       {category_id:3,name:'Pehmolelut'},
       {category_id:4,name:'Peruukit'},
       {category_id:5,name:'Figuurit'},
       {category_id:6,name:'Cosplay'},
       {category_id:7,name:'Kortit'},
       {category_id:8,name:'Pikkusälä'}
      ];

      const onChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })

    }
console.log("Products:",productData)
 const doSubmit = async (e) => {
        e.preventDefault()
        // console.log( productData.productPrice)
        // console.log("Tuotetiedot:" , productData)
        //  products.push({
        //   id: nextId++,
        //   productName: productData.productName,
        // productPrice:Number(productData.productPrice),
        // is_k18:productData.is_k18
        // });
        // setProducts([...products])
var server_is_k18;
      if (productData.is_k18 === "true"){
       server_is_k18 = 1
        }else{
           server_is_k18= 0
        }
           const dataToServer = {
            ...productData,
            user_id: Number(productData.user_id),
            product_price:Number(productData.product_price),
            category_id: Number(productData.category_id),
            is_k18: Number(server_is_k18)
        }

        console.log("data to server:",dataToServer)
       try {

            await axios.post('http://localhost:8081/api/products/add',dataToServer,{ headers: {
          'Content-Type': 'application/json' //this must be set to a json type
      },});
        }
        catch (e) {
           console.log("fronttierror",e)
        }
    }
  return (
    <>
        <h2>
          MatsuKirppis
        </h2>
        <h4>Ilmoita tavarat</h4>
        <form className="addProduct_form" onSubmit={e => doSubmit(e)}>
          <label className="label_add" htmlFor="product_name">Tuotteen Nimi:</label>
           <input type="text" id="product_name" name="product_name" onChange={onChange} placeholder="Tuotteen nimi" required></input><span className="validity"></span> <br className="desktop-break" />
           <label className="label_add" htmlFor="product_price">Tuotteen Hinta:</label>
           <input type="number" id="product_price" name="product_price" onChange={onChange} placeholder="Tuotteen hinta" required></input><span className="validity"></span> <br className="desktop-break" />
            <select id="category_id" name="category_id" onChange={onChange} defaultValue={'DEFAULT'}>
      <option value='DEFAULT' disabled > Valitse Kategoria</option>
      {categorys.map((category) => <option key={category.name} value={category.category_id}>{category.name}</option>)}
    </select><br/>
            <label className="label_add" htmlFor="is_k18">Onko tuote K18:</label><br/>
             <label htmlFor="Yes">Kyllä</label>
  <input type="radio"  name="is_k18" value="true"onChange={onChange}></input><br/>
   <label htmlFor="No">Ei</label>
  <input type="radio"  name="is_k18" value="false" onChange={onChange}></input><br/>
           <input type="submit" id="gradient_Button" value="Lisää tuote" />
        </form>
{/*
        <ul className='productListing'>
        {products.map(product => (
          <li key={product.id}>{product.productName},{product.productPrice},{product.is_k18 === 'true' ? "K-18 tuote": "Tuote ei ole K-18" }<br/>
          <Barcode value={product.productName} /></li>
        ))}
      </ul> */}

    </>
  )
}

export default AddItems