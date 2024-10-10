
import React from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import TopLoader from "react-top-loader";
import { BrowserRouter,Routes,Route  } from 'react-router-dom';


export class App extends React.Component {
      apiKey=process.env.REACT_APP_NEWS_API
       size=6;
        state ={
          progress :0,
          search:false,
          seacrchInput:""
        }
        setProgress= (progress)=>{
          this.setState({progress:progress})
        }
     
      render(){
        return (
    
          <div className="App">
            <BrowserRouter>
              
              <Navbar  />
              
              <TopLoader show color="red" progress={this.state.progress} />
              <Routes>
                   
                   <Route exact path="/"  element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="home" pagesize={this.size} category="general"/>}></Route> 
        
                   <Route exact path='/general'  element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="general" pagesize={this.size} category="general"/>}></Route>
                   <Route exact path="/business"   element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="business" pagesize={this.size} category="business"/>}> </Route> 
                   <Route exact path="/entertainment"   element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="entertainment" pagesize={this.size} category="entertainment"/>}> </Route>
                   <Route exact path="/health"  element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="health" pagesize={this.size} category="health"/>}> </Route>
                   <Route exact path="/science"   element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="science" pagesize={this.size} category="science"/>}> </Route>
                   <Route exact path="/sports"  element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="sports" pagesize={this.size} category="sports"/>}> </Route>
                   <Route exact path="/technology"  element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="technology" pagesize={this.size} category="technology"/>}> </Route>
              </Routes>
      
            </BrowserRouter>
      
            </div>
        )
      }
 
    }

export default App;
