import { Component } from 'react';
import GitHubCardsApp from './githubcardsapp/GitHubCardsApp'

class App extends Component {
  render() {
    return (
      <div>
        <GitHubCardsApp title={'GitHubCardsApp'} />
      </div>
    );
  }
}

export default App;
