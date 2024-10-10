import React from "react";
import NewsItem from "./NewsItem.js";
import Spinner from "./Spinner.js";
import InfiniteScroll from "react-infinite-scroll-component";
import Searchbar from "./Searchbar.js";

class News extends React.Component {
    static defaultProps = {
      country:"us",
      pagesize:8,
      category:'general',
      
    }
    //  static PropTypes ={
    //   country: PropTypes.string,
    //   pagesize: PropTypes.number,
    //   category: PropTypes.string
    // }
     capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
  }

  
  constructor(props) {
    super(props);
    this.state = {
      articles:[],
      loading: true,
      page:1,
      totalResults:0
      
    };
    document.title = `${this.capitalize(this.props.category)} NewsMonkey`
  }
  async updateNews(news){
    this.props.setProgress(10);
    this.setState({loading:true})
    var url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    const data = await fetch(url);
    console.log(data);
    this.props.setProgress(30);
    const parsedData = await(data.json());
    console.log(parsedData)
    this.props.setProgress(70);
    this.setState({
    articles:parsedData.articles,
    totalResults:parsedData.totalResults,
    loading:false
})
    this.props.setProgress(100);
    setTimeout(()=>{ this.props.setProgress(0);},300)
  }
  
  async componentDidMount(){

    this.updateNews();
    // this.setState({loading:true})
    // var url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=73fce31f76494190b76adbbb7ced7d44&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    // const data = await fetch(url);
    // const parsedData = await(data.json());
    // console.log(parsedData)
    // this.setState({
    //   articles:parsedData.articles,
    //   totalResults:parsedData.totalResults,
    //   loading:false
    // })
    // console.log(parsedData);
  }
  async handleNextClick(){
    //   this.setState({loading:true})
    //     var url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=73fce31f76494190b76adbbb7ced7d44&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
    // const data = await fetch(url);
    // const parsedData = await(data.json());
    // this.setState({
    //   articles:parsedData.articles,
    //   page:this.state.page+1,
    //   loading:false
    // })
    this.setState({
      page:this.state.page+1
    })
    this.updateNews();
    
    
  }
  async handlePreviousClick(){
    // this.setState({loading:true})
    // var url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=73fce31f76494190b76adbbb7ced7d44&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
    // const data = await fetch(url);
    // const parsedData = await(data.json());
    // this.setState({
    //   articles:parsedData.articles,
    //   page:this.state.page-1,
    //   loading:false
    // })
    this.setState({
      page:this.state.page-1
    })
    this.updateNews();
  }
  fetchData = async(searchInput) => {
      this.setState({ page:this.state.page +1});
      // this.setState({loading:true})
      if(searchInput.length !==0){
        var url = `https://newsapi.org/v2/top-headlines?q=${searchInput}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`
      }
      else{
        var url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
      }
      const data = await fetch(url);
      const parsedData = await(data.json());
      this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
      loading:false
  })
}
handleSearch = (searchInput)=>{
      this.fetchData(searchInput)
}
  render() {
    
    return (
      
      <>
        <h1 className="text-danger  text-center my-3">NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>
        <div className="text-center my-4">
        {this.state.loading && <Spinner  />}
        </div>
        <Searchbar handleSearch={this.handleSearch}/>
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
             next={this.fetchData}
             hasMore={this.state.articles.length !== this.state.totalResults}
             loader={<Spinner/>}
             endMessage={
             <p style={{ textAlign: 'center' }}>
               <b>Yay! You have seen it all</b>
             </p>
             }
             >
             <div className="container">
                   <div className="row my-3">
                        { this.state.articles.map((element,index) => {
                           return  <div className="col-md-4" key={index}>
                                     <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.content?element.content.slice(0,88):""} imgUrl={element.urlToImage?element.urlToImage:"https://th.bing.com/th/id/OIP.idOfy8wJEv8xLzKv3zrv9wAAAA?rs=1&pid=ImgDetMain"} author={element.author} newsUrl={element.url} publishedTime={element.publishedAt} />
                                   </div>        
                        })}
                   </div>
             </div>
             </InfiniteScroll>
          {/* <div className="button-container d-flex justify-content-between">
                  <button className="btn btn-dark"  disabled={this.state.page<=1} onClick={()=>this.handlePreviousClick()}>&larr; Previous Page</button>
                  

                  <button className="btn btn-dark" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize)}  onClick={()=>this.handleNextClick()}>Next Page &rarr;</button>
          </div> */}

      </>
    )
  }
}

export default News;
