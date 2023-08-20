import React from 'react'

export default function Newsitem(props) {
  return (
    <div className='my-3'>
        <div className="card">
            <img src={props.imageUrl}className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{props.title}....</h5>
                <p className="card-text">{props.description}....</p>
                <p class="card-text"><small class="text-body-secondary">By {props.author} on {props.date}</small></p>
                <a href={props.newsUrl} className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
    </div>
  )
}
