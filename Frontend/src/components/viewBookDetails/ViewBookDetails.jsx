import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

import { useParams } from "react-router-dom";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      {Data && (
        <div className="px-8 md:px-12 py-8 bg-zinc-900 flex gap-8 flex-col md:flex-row ">
          <div className="bg-zinc-800 rounded p-4 h-[70vh] md:h-[88vh] w-full lg:w-3/6 flex items-center justify-center">
            {" "}
            <img
              src={Data.url}
              alt="/"
              className=" h-[50vh] lg:h-[70vh] rounded"
            />
            <div>
                <button><FaHeart /></button>
                <button></button>
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
