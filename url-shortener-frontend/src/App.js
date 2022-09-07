import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

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
    <div className="App">
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-control" onChange={handleChange}></input>
          <button type='submit'>shortUrl</button>
        </form>
        <div className="table">
        {
          alldata.map((d,i)=>
            <div key={i}>
                <a href={d.full}>http:localhost:3001/{d.short}</a>
            </div>
      )}
        </div>
    </div>
  );
}

export default App;
