import React,{Component} from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';


class App extends Component {
  constructor() {
    super()
    this.state = {
       robots: [],
       searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=> response.json())
      .then(users=> this.setState({robots: users}));

  }

  onsearchchange = (event) => {
    this.setState({ searchfield: event.target.value})
   }

  render(){
    const filteredrobots = this.state.robots.filter(robot =>{
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());})
    if(!this.state.robots.length){
      return <h1>Loading</h1>
    }
    else{
      return(
      <div className='tc'>

        <h1> RoboFriends</h1>
        <Searchbox searchchange={this.onsearchchange}/>
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredrobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
      );
     }
  }  
}
export default App;