import React,{ Component } from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImagelinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank';
import FaceRecognition from './components/faceRecognition/faceRecognition';
import SignIn from './components/signIN/signIN';
import Register from './components/register/register'
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particleOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const app = new Clarifai.App({
	apiKey: 'aca3f2475f9340c5b3e09ec06e4c235c'
});

const initialState = {
  input : '',
  imgURL : '',
  box : [],
  route : 'signin',
  isSignedIn : false,
  user : {
    id : '',
    name : '',
    email : '',
    entries : 0,
    joined : ''
  }
}

class App extends Component{
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState ({user : {
        id : data.id,
        name : data.name,
        email : data.email,
        entries : data.entries,
        joined : data.joined
    }});
  }
  
  calculateFacelocation = (data) => {
	  const clarifaiData = data.region_info.bounding_box;
	  const image = document.getElementById('inputImage');
	  const width = Number(image.width);
	  const height = Number(image.height);
	  return({
		  LeftCol : clarifaiData.left_col * width,
		  TopRow : clarifaiData.top_row * height,
		  RightCol :width - (clarifaiData.right_col * width),
		  BottomRow :height -  (clarifaiData.bottom_row * height)
	  })
  }

  displayFaceBox = (face) => {
    this.setState(({
      box: [...this.state.box, face]
    }))
    console.log(this.state.box);
  }

  //using arrow function to have this point to App
  onInputChange = (event) => {
	  this.setState({input : event.target.value});
  }   
  onSubmit = () => {
	  this.setState({imgURL : this.state.input});
    app.models
      .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
        .then(response => {
          if(response){
            fetch('https://fierce-river-21542.herokuapp.com/image' ,{
              method : 'put',
              headers : {'Content-Type' : 'application/json'},
              body : JSON.stringify({
                id : this.state.user.id
              })
            })
              .then(res => res.json())
              .then(count => {
                this.setState(Object.assign(this.state.user , {entries : count}));
              })
          }
          response.outputs[0].data.regions.forEach(element => {
            this.displayFaceBox(this.calculateFacelocation(element));
          });
       })
        .catch(err => console.log(err))
  } 

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);
    }
    else if(route === 'home'){
      this.setState({isSignedIn : true})
    }
    this.setState({route : route});
  }

  render(){
    const { isSignedIn ,route ,imgURL , box } = this.state;
    const faces = box.map((faceloc,index) => {
      return <FaceRecognition key={index} box={faceloc} imgURL = {imgURL}/>
    })
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange}/>
        { route === 'home'
         ?<div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImagelinkForm onInputChange = {this.onInputChange} onSubmit = {this.onSubmit} />   {/*passing function as a prop*/}
            {faces}
          </div>
            :(
              route === 'signin' 
              ? <SignIn  onRouteChange = {this.onRouteChange} loadUser={this.loadUser}/>
              : <Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser} />
            )
        }
      </div>
    );
  }
}

export default App;
