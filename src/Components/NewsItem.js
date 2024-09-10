import React, { Component } from "react";

class NewsItem extends Component {
  render() {
    let { title, description, imgUrl ,newsUrl ,author,publishedTime} = this.props;
    return (
      <div className="card my-3" >
        <img src={imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small class="text-muted">By {author?author:"Unknown "} at { new Date(publishedTime).toGMTString()}</small></p>
          <a href={newsUrl} className="btn btn-sm btn-dark">
            See More
          </a>

        </div>
      </div>
    );
  }
}

export default NewsItem;
