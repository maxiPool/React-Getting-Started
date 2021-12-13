import React, { Component } from 'react';
import { styles } from './style/GitHubCardsApp';
import { Profile } from './model/Profile';

class Card extends Component<{ key: number, profile: Profile }> {
  render() {
    const profile = this.props.profile;
    return (
      <div style={styles.githubProfile}>
        <img style={styles.githubProfile.img} src={profile.avatar_url} alt="profile avatar" />
        <div style={styles.githubProfile.info}>
          <div style={styles.githubProfile.info.name}>
            {profile.name}
          </div>
          <div style={styles.githubProfile.info.company}>
            {profile.company}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;