/* eslint-disable react/prop-types */
import { useRef  } from 'react'
import '../App.css'
import Barcode from 'react-barcode';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from "react-to-print";



function PrintingList(props) {

  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <>
        <h3>Tuotteet</h3>

          <button onClick={() => handlePrint()}><PrintIcon/></button>
          <div ref={contentRef}>
        <ul className='productListing'  >
               {props.data[0].map(product => (
                 <li key={product.product_id}>{product.product_name},{product.product_price},{product.is_k18 === 1 ? "K-18 tuote": "Tuote ei ole K-18" }<br/>
                 <Barcode value={product.product_name} /></li>
               ))}
        </ul>
        </div>
    </>
  )
}

export default PrintingList
