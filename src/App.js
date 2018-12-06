import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

library.add(faHeartRegular, faHeartSolid);

class App extends Component {
	state = {};

	render() {
		return (
			<React.Fragment>
				<main className='container'>
					<Movies />
				</main>
			</React.Fragment>
		);
	}
}

export default App;
