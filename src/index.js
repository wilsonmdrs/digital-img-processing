import React from 'react';
import ReactDOM from 'react-dom';
import App from './views';

// External Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';

// FontAwesome Component Icons
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

// Internal Styles
import './assets/scss/style.scss'




// Loading all Free Icons Styles
library.add(fas, far, fab);

ReactDOM.render( <App />, document.getElementById('root'))
