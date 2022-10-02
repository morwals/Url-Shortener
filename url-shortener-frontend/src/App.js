import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import {Button, Card, CardContent, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material"
import InsertLinkIcon from '@mui/icons-material/InsertLink';
 
function App() {
  const[url,seturl]=useState();
  const[alldata,setall]=useState([]);
  const[refresh,setrefresh] = useState(0);
  const handleChange = (e)=>{
    seturl(e.target.value);
    console.log(url)
  }
  const data = {
    full:url,
  }
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(validURL(url)){
    axios({
      method: "POST",
        url: "http://localhost:3001/shortUrls",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: JSON.stringify(data),
        success: window.alert("Shortened Successfully"),
    }).then(res=>{
      setrefresh(1);
      console.log(res);
    })
  }else{
    alert("enter valid url");
  }
    }
    
    useEffect(()=>{
      axios.get("http://localhost:3001/").then(response=>{
        if(response.data)
        setall(response.data);
        console.log(response.data);
      });
    },[refresh]);
    
  return (
    <div className="App page">
        <h1>URL Shortener</h1>
        <Card sx={{ width:"30%",margin:"auto" }}>
        <CardContent>

        <form onSubmit={handleSubmit}>
          <div className='form'>
        <TextField  label="Enter Link" variant="outlined" onChange={handleChange}/>
          <Button variant='contained' type='submit' sx={{my:1}}>shortUrl</Button>
          </div>
        </form>
        <div className='links'>

          <List>
        {
          alldata.map((d,i)=>
          <ListItem disablePadding key={i}>
            <a href={d.full} target="_blank">            
              <ListItemButton>
              <ListItemIcon>
                <InsertLinkIcon />
              </ListItemIcon>
              <ListItemText primary={`http:localhost:3001/${d.short}`} />
            </ListItemButton>
            </a>
          </ListItem>
      )}
      </List>
      </div>
      </CardContent>
      </Card>
    </div>
  );
}

export default App;
