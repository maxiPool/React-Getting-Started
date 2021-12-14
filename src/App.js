import { Component } from 'react';
import GitHubCardsApp from './githubcardsapp/GitHubCardsApp'
import StarMatch from './starmatchapp/starmatchapp'

class App extends Component {
  render() {
    return (
      <div>
        <StarMatch></StarMatch>
        <GitHubCardsApp title={'GitHubCardsApp'} />
      </div>
    );
  }
}

export default App;
