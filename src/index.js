import React from 'react';
import ReactDOM from 'react-dom';
import PageView from 'View/PageView';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PageView />, document.getElementById('root'));
registerServiceWorker();
