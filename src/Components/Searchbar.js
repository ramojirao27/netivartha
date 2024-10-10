import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Searchbar = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const handleSubmit =()=>{
        props.handleSearch(searchInput);
  }
  return (
    <Link to={`/q=${searchInput}`}>
      <div className="container w-50" onSubmit={handleSubmit}>
      <form className="d-flex justufy-content-center align-items-center gap-5 form-inline my-2 my-lg-0">
      <input value={searchInput} onChange={(e)=>{setSearchInput(e.target.value); }} className="form-control form-control-outline-dark mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-dark my-2 my-sm-0 " type="submit">Search</button>
    </form>
    </div>
    </Link>
    
  )
}

export default Searchbar