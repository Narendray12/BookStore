import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

const Favroutes = ()=>{
    const [FavouriteBooks, setFavouriteBooks] =useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
    useEffect(()=>{
        const fetch = async ()=>{
            const response = await axios.get("http/localhost:5000/api/v1/get-favourite-books",{headers}
            )
            setFavouriteBooks(response.data.data);
        }
        fetch();
    },[])
    return (
        <div className="grid grid-cols-4 gap-4" >
            {FavouriteBooks && FavouriteBooks.map((items,i)=>(<div key={i}><BookCard data={items}></BookCard></div>))}
        </div>
    )
}

export default Favroutes