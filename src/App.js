import React, { Component } from 'react';
import './App.css';
const list = [
  {
      title: 'React',
      url: 'https://facebook.github.io/react/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
   },
   {
      title: 'Redux',
      url: 'https://github.com/reactjs/redux',				              author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
   },
];



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: "",
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  };

  onDismiss(id) {
    function isNotId(item) {
      return item.objectID !== id;
    }
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  };

  isSearched(searchTerm) {
    return (item)=> {
      return (item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }
  };

  render() {
    const { searchTerm, list} = this.state;
    return (
      <div className="App">
        <Search
	  value={searchTerm}
	  onChange={this.onSearchChange}
	>
	  Search
	</Search>
	<Table
	  list={list}
	  pattern={searchTerm}
	  onDismiss={this.onDismiss}
	  isSearched={this.isSearched}
	/>
      </div>
    );
  }
};

const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>


const Table = ({ list, pattern, onDismiss, isSearched }) =>
  <div>
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID}>
	<span>
	  <a href={item.url}>{item.title}</a>
	</span>
	<span>{item.author}</span>
	<span>{item.num_comments}</span>
	<span>{item.points}</span>
	<span>
	  <Button
	    onclick={()=> onDismiss(item.objectID)}
	    type="button"
	  >
	    Dismiss
	  </Button>
	</span>
      </div>
    )}
  </div>

const Button = ({ onClick, className, children }) => 
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

export default App;
