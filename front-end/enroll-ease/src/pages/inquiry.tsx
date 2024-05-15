"use client"
import React, {useState} from 'react';
import axios from 'axios';
import styles from './inquiry.module.css'
// import '../app/globals.css'
import QueryResult from '../app/components/query-result';

export default function Inquiry() {
  const [data, setData] = useState([{question: "Question", answer: "This is a sample answer"}]);
  const [queryString, setQueryString] = useState("");

  const handleQuery = async (query: string) => {
    try {
      const url = new URL("http://localhost:4000/llm/inquiry");
      url.searchParams.append("query", query);
      const response = await fetch(url, {
        mode: "cors",
      });
      const result = await response.text();
      setData([{question: query, answer: result.toString()}, ...data,]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return(
    <div className='flex' style={{ height:'100%'}}>
      <div style={{width: 1000}} className="mx-auto w-full rounded overflow-hidden shadow-lg bg-green-300">
        <div className="mx-auto px-6 py-4" style={{width: 1000}}>
          <div className="font-bold text-xl">Inquiries</div>
          <br/>
          <p className="text-gray-700 text-base">
            Please enter your inquiries in the textbox below.
          </p>
          <input
            type="search"
            id="query"
            style={{width: 300}}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            placeholder="Please enter your query"
            aria-label="Search"
            aria-describedby="search-addon"
            value={queryString} 
            onChange={(e) => setQueryString(e.target.value)}
          />
          <button
            type="button"
            className="shadow bg-blue-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            style={{fontWeight:'bold'}}
            onClick={() => queryString && handleQuery(queryString)}
            data-mdb-ripple-init
          >
            search
          </button>
        </div>
        {data.map(query => (
          <div className="my-2">
            <QueryResult data={query}/>
          </div>
        ))}
      </div>
    </div>

  );
}