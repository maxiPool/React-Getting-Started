import { Component } from 'react';
import Form from './Form';
import CardList from './CardList'
import { styles } from './style/GitHubCardsApp';
import { Profile } from './model/Profile';

class GitHubCardsApp extends Component<{ title: string }> {
  state = {
    profiles: []
  };
  addNewProfile = (profileData: Profile) => {
    console.log('GitHubCardsApp', profileData);
    this.setState((previousState: { profiles: Profile[] }) => ({
      profiles: [...previousState.profiles, profileData]
    }));
  };
  render() {
    return (
      <div>
        <div style={styles.header}>{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default GitHubCardsApp;
