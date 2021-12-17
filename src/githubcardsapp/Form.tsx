import React, { Component } from 'react';
// import axios from 'axios';
import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { styles } from './style/GitHubCardsApp';

class Form extends Component<{ onSubmit: Function }> {
  state = {
    username: ''
  };
  handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Below: axios
    // const resp = await axios.get(`https://api.github.com/users/${this.state.username}`);
    // 'onSubmit' is the function reference passed by the parent to update the parent's data
    // this.props.onSubmit(resp.data);
    
    // Below: rxJS
    const url: string = `https://api.github.com/users/${this.state.username}`;
    
    let something3 = ajax.get(url);
    something3.subscribe(
      r => {
        console.log('server response', r);
        console.log('response content', r.response);
        this.props.onSubmit(r.response);
      }
    );
    
    // reset Form's input field
    this.setState({username: ''});  
  };
  render() {
    return (
      <form style={styles.form} onSubmit={this.handleSubmit}>
        <input 
          type="text"
          placeholder="GitHub Username"
          required
          value={this.state.username}
          onChange={event => this.setState({ username: event.target.value })}
        />
        <button>Add card</button>
      </form>
    );
  }
}

export default Form;