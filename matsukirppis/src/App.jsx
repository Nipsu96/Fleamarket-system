import { useState,useEffect,useReducer } from 'react'
import './App.css'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PrintingList from './components/PrintingList'
import ProductListing from './components/ProductListing'
import AddItems from './components/AddItems'
import axios from 'axios';
import Login_SignUp_page from './components/Login-Signup'

function reducer(state, action) {
  let deepCopy = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'MOVE_RIDE':
      return deepCopy
    case 'INIT_DATA':
      return action.data
    default:
      throw new Error();
  }
}


function App() {
   const [value, setValue] = useState('1');
  const [state, dispatch] = useReducer(reducer, []);
  const [isloggedIn, setIsloggedIn] = useState(false);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

   const createData = async () => {
      try {
        let result =  await axios.get("http://localhost:8081/api/products");
        console.log("result", result.data[0])
        if (result.data.length > 0) {
          dispatch({ type: "INIT_DATA", data: result.data })
        }
      } catch (e) {
        console.log("Tietokannan alustaminen epäonnistui",e)
      }
    }


  useEffect(() => {
    createData();
  },[])

  return (
    <>
      {!isloggedIn ?
      <Login_SignUp_page/>
     :
        <>
        <h2>
          MatsuKirppis
        </h2>
       <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Ilmoita Tavarat" value="1" />
            <Tab label="TavaraLuettelo" value="2" />
            <Tab label="Tulosta Hintalaput" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><AddItems/></TabPanel>
        <TabPanel value="2"><ProductListing data={state}/></TabPanel>
        <TabPanel value="3"><PrintingList data={state}/></TabPanel>
         </TabContext>
        </Box>

         </>
    }
    </>
)
}


export default App
