import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import Newsitem from './Newsitem'
import Load from './Load'
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  document.title=`${capitalizeFirstLetter(props.category)}--News app`
  News.defaultProps={
    country:'in',
    category:'general'
  }
  const[load,setLoad]=useState(true)
  const[page,setPage]=useState(1)
  const[arr,setArr]=useState([])
  const[totalResults,setTotalResults]=useState(0)

    const updateNews = async ()=> {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ebabb398a86a4afbbbda08f23d460213&page=${page}&pageSize=10`; 
      setLoad(true)
      let data = await fetch(url);

      let parsedData = await data.json()

      setArr(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoad(false)

    }
    useEffect(()=>{
      document.title = `${capitalizeFirstLetter(props.category)} - News`;
        updateNews(); 
        // eslint-disable-next-line
    },[])

    const fetchMoreData = async () => {   
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ebabb398a86a4afbbbda08f23d460213&page=${page}&pageSize=10`;
      setPage(page+1) 
      let data = await fetch(url);
      let parsedData = await data.json()
      setArr(arr.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
    };

  return (
    <>
        <h1 className='text-center' style={{margin:'40px 0px;' ,marginTop:'90px'}}>News--Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {load && <Load/>}
        <InfiniteScroll
            dataLength={arr.length}
            next={fetchMoreData}
            hasMore={arr.length!==totalResults}
            loader={load&&<Load/>}
          >
            <div className='container'>
              <div className='row'>
                {!load&&arr.map((element)=>{
                    return <div className='col-md-4' key={element.url}>
                    <Newsitem title={element.title?element.title.slice(0,30):""} description={element.description?element.description.slice(0,70):""} imageUrl={element.urlToImage?element.urlToImage:""} newsUrl={element.url?element.url:""} author={element.author?element.author:""} date={element.publishedAt?element.publishedAt:" "}/>
                    </div>
                })}
            </div>
            </div>
        </InfiniteScroll>    
    </>
  )
}

