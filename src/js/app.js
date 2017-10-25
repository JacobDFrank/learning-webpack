import React, { Component } from 'react';
import { render } from 'react-dom';

import '../styles/style.css';
import '../styles/please.scss';

import starfishImage from '../assets/starFish.jpg'; // Importing image -> ADDED IN THIS STEP

export default class Hello extends Component {
  render() {
    return (
      <div>
        Hello from react

        {/* ADDED IN THIS STEP */}
        <img className="image" src={ starfishImage } alt='Commander Keen' />
      </div>
    );
  }
}

render(<Hello />, document.getElementById('app'));
