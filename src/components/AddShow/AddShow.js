import React, { Component } from 'react';

import { getSearchEndpoint, formatSearchResults } from '../../helpers/tv-maze';
import Heading from '../Heading';
import TextInput from '../TextInput';
import ShowSearchResult from '../ShowSearchResult';
import ShowSearchResults from '../ShowSearchResults';


class AddShow extends Component {
  state = {
    status: 'idle',
    // TEMP
    shows: [
      {
        "id": 15599,
        "name": "Counterfeit Cat",
        "image": "http://static.tvmaze.com/uploads/images/medium_portrait/63/158175.jpg",
        "status": "Running",
        "type": "Animation",
        "summary": "Gark is a naive 9-year old alien with superpowers that it can't control is destined to save the universe, whilst Max is a anxious housecat who'd rather save himself. Gark mistakes Max for a tiger who can teach him everything he needs to know about been a hero, so he can save the universe. But Max knows nothing about been brave, however Gark's instincts force Max to act like the tiger Gark believes he is."
      },
      {
        "id": 20033,
        "name": "CAT. 8",
        "image": "http://static.tvmaze.com/uploads/images/medium_portrait/70/176872.jpg",
        "status": "Ended",
        "type": "Scripted",
        "summary": "A research program abandoned by the best solar physicist when the Pentagon wanted to put it to military use has been resumed by his former deputy. Her incompetence and the Defense secretary's haste cause it to be tested too soon, stirring unprecedented solar flares, ultimately a plasma causing disasters on all continents. Only the genius can think of a way out, only to be victimized by the secretary, who needs to cover up. Even when it turns out the earth's core has stopped spinning, spelling an unimaginable seismic apocalypse, the genius must still evade special forces to stay free and save the world again."
      },
      {
        "id": 3723,
        "name": "T.H.E. Cat",
        "image": "http://static.tvmaze.com/uploads/images/medium_portrait/19/47559.jpg",
        "status": "Ended",
        "type": "Scripted",
        "summary": "Out of the night comes a man who saves lives at the risk of his own. Once a circus performer; an aerialist who refused the net. Once a cat burglar; a master among jewel thieves. And now, a professional bodyguard. Primitive, savage, in love with danger--The Cat!Part Gypsy by birth, Thomas Hewitt Edward Cat lives up to his name, having worked as a circus acrobat and a cat burglar. Now he works as a bodyguard, hiring his services out to those who can afford him. But it's not just money that The Cat is after: it's the thrill of danger and the challenge of the chase."
      },
      {
        "id": 12430,
        "name": "My Cat from Hell",
        "image": "http://static.tvmaze.com/uploads/images/medium_portrait/42/106222.jpg",
        "status": "Running",
        "type": "Reality",
        "summary": "My Cat from Hell is an American reality television series that airs on Animal Planet and premiered in May 2011. It stars Jackson Galaxy, a cat behaviorist by morning (and a musician by night) who visits the homes of cat owners in order to resolve conflicts or behavior issues between the owners and their cats or between pets."
      },
      {
        "id": 29775,
        "name": "Nora, Princess, and Stray Cat",
        "image": "http://static.tvmaze.com/uploads/images/medium_portrait/118/295976.jpg",
        "status": "Running",
        "type": "Animation",
        "summary": "Nora Handa is a high school boy who meets a girl named Patricia in a park who claims to be a princess of the underworld. Patricia and Nora accidentally kiss, and this act turns Nora into a black cat. Patricia takes Nora to her home, and a few days later Nora turns back into a human. However, Nora keeps turning into a cat and back into a human."
      },
      {
        "id": 22430,
        "name": "My Cat from Hell: Worst Cat-astrophes",
        "image": "http://static.tvmaze.com/uploads/images/medium_portrait/82/206331.jpg",
        "status": "Running",
        "type": "Reality",
        "summary": "My Cat from Hell: Worst Cat-astrophes is a series that airs extended enhanced episodes with extra information, deleted scenes and bonus unseen footage from the show \"My Cat from Hell\" that also airs on Animal Planet."
      },
      {
        "id": 22409,
        "name": "Attic Cat",
        "image": "http://static.tvmaze.com/uploads/images/medium_portrait/82/205944.jpg",
        "status": "Ended",
        "type": "Scripted",
        "summary": "Marriage is thought to be the final conclusion of love: the most precious value in this world. But in reality, the marriage is not so sweet as recklessly imagined. Instead of being a sweet dream, the marriage in reality is a commitment and a promise to live among many kinds of obligation and sacrifice. It is rather the end of love than a sweet beginning. This is not what the lovers are aiming about. It's not marriage but living love they are shooting for. This is a drama of couple who has found a new way of living happily in love."
      },
      {
        "id": 5764,
        "name": "Top Cat",
        "image": "http://static.tvmaze.com/uploads/images/medium_portrait/22/57457.jpg",
        "status": "Ended",
        "type": "Animation",
        "summary": "Top Cat, known as T.C. to his alley cat friends, is a mischievous prankster who lives in a trash can in the alley ways of New York City. He and his alley-cat cohorts think of get rich schemes and assorted pranks which are mostly involving and aimed at Officer Dibble, their nemesis and friend. T.C. manages to get out of his tight situations with hilarity and charm and even helps Dibble on occasion."
      },
      {
        "id": 698,
        "name": "Peg + Cat",
        "image": "http://static.tvmaze.com/uploads/images/medium_portrait/5/14998.jpg",
        "status": "Running",
        "type": "Animation",
        "summary": "Peg + Cat inspires preschool children to see math as exciting, accessible, and fun."
      },
      {
        "id": 20491,
        "name": "Dog and Cat",
        "image": "http://static.tvmaze.com/uploads/images/medium_portrait/72/181074.jpg",
        "status": "Ended",
        "type": "Scripted",
        "summary": "Sgt. Jack Ramsey, an undercover detective with the Los Angeles Police Department, found himself teamed with a very green partner named J.Z. Kane. Together they formed a relationship based on friendship and trust (completely platonic) that led to them capturing many of L.A.'s criminals."
      }
    ],
  }

  handleSearch = (query) => {
    this.setState({
      status: 'loading',
    });

    // NOTE: The "right" way to do this would be to use redux, and proxy through
    // the API. This seems faster and simpler, though. May need to be refactored
    // if the complexity increases.
    const tvMazeEndpoint = getSearchEndpoint(query);

    fetch(tvMazeEndpoint)
      .then(res => res.json())
      .then(formatSearchResults)
      .then(shows => {
        this.setState({
          status: 'done',
          shows: shows,
        });
      })
      .catch(console.error);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Heading>Add New Show</Heading>

        <TextInput
          placeholder="eg. Game of Thrones"
          onChange={this.handleSearch}
          changeDebounceTime={300}
        />

        <ShowSearchResults
          status={this.state.status}
          shows={this.state.shows}
        />
      </div>
    );
  }
}

export default AddShow;
