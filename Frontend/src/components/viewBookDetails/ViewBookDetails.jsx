import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const role = useSelector((state)=>state.auth.role)
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id
  };
   const submitFavourites =async ()=>{
    const response = await axios.put("http/localhost:5000/api/v1/add-book-to-favourite",{},{headers})
    alert(response.data.message)
   }
   const handleCart = async ()=>{
    const response = await axios.put("http/localhost:5000/api/v1/add-to-cart",{},{headers})
    alert(response.data.message)
   }
  return (
    <>
      {Data && (
        <div className="px-8 md:px-12 py-8 bg-zinc-900 flex gap-8 flex-col md:flex-row gap-8">
          <div className="  px-4 py-12 h-[70vh] md:h-[88vh] w-full lg:w-3/6 ">
            {" "}
            <div className="flex rounded justify-around bg-zinc-800 p-12 ">
            <img
              src={Data.url}
              alt="/"
              className=" h-[50vh] lg:h-[70vh] rounded"
            />
           
           {
              isLoggedIn===true && role==="user" && (
                <div className="flex md:flex-col">
                <button  className="bg-white rounded-full text-3xl  text-red-500 p-2 m-3" onClick={submitFavourites}><FaHeart />
                <span className="as-4 block lg:hidden">Favourites</span></button>
                <button className="bg-white rounded-full text-3xl text-blue-500 p-2 m-3 " onClick={handleCart}><FaCartPlus />
                <span className="as-4 block lg:hidden">Add to Cart</span>
              </button>
            </div>
              )
            }
            {
              isLoggedIn===true && role==="admin" && (
                <div className="flex md:flex-col">
                <button  className="bg-white rounded-full text-3xl  text-red-500 p-2 m-3"><FaEdit />
                <span className="as-4 block lg:hidden">Edit</span></button>
                <button className="bg-white rounded-full text-3xl text-blue-500 p-2 m-3"><MdDelete />
                <span className="as-4 block lg:hidden">Delete</span>
              </button>
            </div>
              )
            }
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 fon-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {Data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl"> {Data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              {" "}
              Price; ${Data.price}
              {""}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader></Loader>{" "}
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
