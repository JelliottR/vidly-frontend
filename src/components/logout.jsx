import { Component } from 'react';
import auth from '../services/authService';
class Logout extends Component {
	componentDidMount() {
		auth.logout();
		window.location = process.env.REACT_APP_SERVER_ROOT_URL;
	}

	render() {
		return null;
	}
}

export default Logout;
