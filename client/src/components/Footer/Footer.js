import "./Footer.scss";
import axios from "axios";
import { useState, useEffect } from "react";

function Footer() {
  const [quote, setQuote] = useState([]);

  //used chrome extension for CORS to access it. 
  useEffect(() => {
    axios
      .get(`https://zenquotes.io/api/random`)
      .then((res) => {
        setQuote(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <>
      <div className="quote__quote">{quote.q}</div>
      <div className="quote__author">{quote.a}</div>
      </>
  );
}

export default Footer;
