import React from 'react';
import Card from './Card'
import { Profile } from './model/Profile';

const CardList = (props: { profiles: Profile[] }) => {
  return (
    <div>
      {props.profiles.map((profile: Profile) => 
                          <Card key={profile.id} profile={profile} />)}
    </div>
  );
};

export default CardList;