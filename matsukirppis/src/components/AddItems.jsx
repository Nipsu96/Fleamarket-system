/* eslint-disable react/prop-types */
import { useState,useEffect } from 'react'
import '../App.css'
import axios from 'axios';


// let nextId = 0;


function AddItems(props) {
  //  const[categories,setCategories]= useState([])
  const [productData, setProductData] = useState({
        product_name: '',
        product_price: 0,
        is_k18: null,
        category_id: 0,
        user_id: 1,

    })

    useEffect(() => {
      // TODO: Add category fetch from the backend!
      // TODO: Sentit hintaan!
      // TODO: Testaa rekisteröinnin validointi (tietojen oikeellisuuus + onko tunnus jo olemassa (sähköposti))
      // TODO: Lisää käyttäjän koko nimi (Myös kantaan)
      // TODO: Pop up "Käyttäjä luotu onnistuneesti!" -> kirjatumisikkunaan


      // Nice to have: Nappi joka merkitsee listan valmiiksi
      // Nice to have for now : token poistuu tietyn ajan jälkeen
      // setCategories()

      },[])
    const categories = [
      {category_id:1,name:'Vaatteet'},
      {category_id:2,name:'Manga'},
       {category_id:3,name:'Pehmolelut'},
       {category_id:4,name:'Peruukit'},
       {category_id:5,name:'Figuurit'},
       {category_id:6,name:'Cosplay'},
       {category_id:7,name:'Kortit'},
       {category_id:8,name:'Pikkusälä'}
      ];
    let storage = window.localStorage;
    let userToken = storage.getItem("user_token")
      const onChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })

    }
    console.log("Products:",productData)
 const doSubmit = async (e) => {
        e.preventDefault()
        var server_is_k18;
      if (productData.is_k18 === "true"){
       server_is_k18 = 1
        }else if (productData.is_k18 === "false"){
           server_is_k18= 0
        }else{
           server_is_k18= null
        }
           const dataToServer = {
            ...productData,
            user_id: Number(productData.user_id),
            product_price:Number(productData.product_price),
            category_id: Number(productData.category_id),
            is_k18: server_is_k18
        }

        console.log("data to server:",dataToServer)
        const dataToReducer = {
           ...productData,
            product_price:Number(productData.product_price),
            category_id: Number(productData.category_id),
            is_k18:productData.is_k18,
            product_name: String(productData.product_name),
        }

       try {
            let results= await axios.post('http://localhost:8081/api/products/add',dataToServer,{ headers: { "authorization": `Token ${userToken}` } });
            if(results.status === 200){
              console.log("data",results.data)
                props.dispatch({ type: "ADD_PRODUCT", data: { newProduct: dataToReducer,id: results.data.productID} })
            }
        }
        catch (e) {
           console.log("fronttierror",e)
        }
    }
  return (
    <>
     <div className = "addProducts">
        <h2>
          MatsuKirppis
        </h2>
        <h4>Ilmoita tavarat</h4>
        <form className="addProduct_form" onSubmit={e => doSubmit(e)}>

          <label className="label_add" htmlFor="product_name">Tuotteen Nimi:</label>
           <input type="text" id="product_name" name="product_name" onChange={onChange} placeholder="Tuotteen nimi" required></input><span className="validity"></span> <br className="desktop-break" /><br/>
           <label className="label_add" htmlFor="product_price">Tuotteen Hinta:</label>
           <input type="number" id="product_price" name="product_price" onChange={onChange} placeholder="Tuotteen hinta" required></input><span className="validity"></span> € <br className="desktop-break" /><br/>
            <select id="category_id" name="category_id" onChange={onChange} defaultValue={'DEFAULT'}>
      <option value='DEFAULT' disabled > Valitse Kategoria</option>
      {categories.map((category) => <option key={category.name} value={category.category_id}>{category.name}</option>)}
    </select><br/><br/>
            <label className="label_add" htmlFor="is_k18">Onko tuote K18:</label><br/>
             <label htmlFor="Yes">Kyllä</label>
  <input type="radio"  name="is_k18" value="true"onChange={onChange}></input><br/>
   <label htmlFor="No">Ei</label>
  <input type="radio"  name="is_k18" value="false" onChange={onChange}></input><br/>
           <input type="submit" id="gradient_Button" value="Lisää tuote" />

        </form>
         </div>
    </>
  )
}

export default AddItems