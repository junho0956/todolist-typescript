import React from 'react';
import TodoContainer from './todolist/TodoContainer';
import {Provider} from 'react-redux'
import store from './common/store';

const App = () => {
  return (
    <Provider store={store}>
      <TodoContainer />
    </Provider>
  );
}

export default App;
