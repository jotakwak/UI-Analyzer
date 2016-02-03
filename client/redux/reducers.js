const buttonInitialState = {
  activeContentComponent: 'Dashboard',
}

const noteInitialState = {
  notes: []
}

const projectInitialState = {
  confirm: { projectName: null, projectDescription: null },
  projects: []
}

const authenticationInitialState = {
  appState: 'not_authenticated'
}

const modalInitialState = {
  login: false,
  getStarted: false
}

const loginInitialState = {
  email : null
}

const registrationInitialState = {
  firstName: null,
  lastName: null,
  company: null,
  email : null
}

const imageUpdateInitialState = {
  image: null
}

const initialImageState = {
  appState: 'not_authenticated'
}

const userInitialState = {
  firstName: null,
  lastName: null,
  company: null,
  email : null
};

const projectsInitialState = {
  list: [],
  error: (e) => e ? e : null
};

const testsInitialState = {
  list: [],
  error: (e) => e ? e : null
};

const commentsInitialState = {
  list: [],
  error: (e) => e ? e : null
};

const imagesInitialState = {
  list: [],
  error: (e) => e ? e : null
};

const mouseTrackingsInitialState = {
  list: [],
  error: (e) => e ? e : null
};

export function user(state = userInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'GET_USER':
      return
    case 'POST_USER':
      return
    case 'UPDATE_USER':
      return
    case 'DELETE_USER':
      return
    case 'ERROR_USER':
      return
  }
};

export function projects(state = projectsInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'GET_PROJECT':
      newState.list = action.data;
      return newState;
    case 'POST_PROJECT':
      var newList = newState.list.slice();
      newList.push(action.data);
      newState.list = newList;
      return newState;
    case 'UPDATE_PROJECT':
      var newList = newState.list.map(item => item.id === data.id ? item = data : item);
      newState.list = newList;
      return newState;
    case 'DELETE_PROJECT':
      var newList = newState.list.filter(item => item.id !== data.projectId);
      newState.list = newList;
      return newState;
    case 'ERROR_PROJECT':
      return state.error(action.data);
  }
};

export function tests(state = testsInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'GET_TEST':
      newState.list = action.data;
      return newState;
    case 'POST_TEST':
      var newList = newState.list.slice();
      newList.push(action.data);
      newState.list = newList;
      return newState;
    case 'UPDATE_TEST':
      var newList = newState.list.map(item => item.id === data.id ? item = data : item);
      newState.list = newList;
      return newState;
    case 'DELETE_TEST':
      var newList = newState.list.filter(item => item.id !== data.testId);
      newState.list = newList;
      return newState;
    case 'ERROR_TEST':
      return state.error(action.data);
  }
};

export function comments(state = commentsInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'GET_COMMENT':
      newState.list = action.data;
      return newState;
    case 'POST_COMMENT':
      var newList = newState.list.slice();
      newList.push(action.data);
      newState.list = newList;
      return newState;
    case 'UPDATE_COMMENT':
      var newList = newState.list.map(item => item.id === data.id ? item = data : item);
      newState.list = newList;
      return newState;
    case 'DELETE_COMMENT':
      var newList = newState.list.filter(item => item.id !== data.commentId);
      newState.list = newList;
      return newState;
    case 'ERROR_COMMENT':
      return state.error(action.data);
  }
};

export function images(state = imagesInitialState, action) {
  var newState = Object.assign({}, state);
  switch (action.type) {
    case 'GET_IMAGE':
      newState.list = action.data;
      return newState;
    case 'POST_IMAGE':
      var newList = newState.list.slice();
      newList.push(action.data);
      newState.list = newList;
      return newState;
    case 'UPDATE_IMAGE':
      var newList = newState.list.map(item => item.id === data.id ? item = data : item);
      newState.list = newList;
      return newState;
    case 'DELETE_IMAGE':
      var newList = newState.list.filter(item => item.id !== data.imageId);
      newState.list = newList;
      return newState;
    case 'ERROR_IMAGE':
      return state.error(action.data);
  }
};

export function mouseTrackings(state = mouseTrackingsInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'GET_MOUSETRACKING':
      newState.list = action.data;
      return newState;
    case 'POST_MOUSETRACKING':
      var newList = newState.list.slice();
      newList.push(action.data);
      newState.list = newList;
      return newState;
    case 'UPDATE_MOUSETRACKING':
      var newList = newState.list.map(item => item.id === data.id ? item = data : item);
      newState.list = newList;
      return newState;
    case 'DELETE_MOUSETRACKING':
      var newList = newState.list.filter(item => item.id !== data.mouseTrackingId);
      newState.list = newList;
      return newState;
    case 'ERROR_MOUSETRACKING':
      return state.error(action.data);
  }
};

export function authReducer (state = authenticationInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'AUTHENTICATED_USER':
      newState.appState = action.auth;
      return newState;
  }
  return state
}

export function showImageReducer (state = initialImageState, action) {
  var newState = Object.assign({}, state);
  switch (action.type) {
    case 'SHOW_TEST_IMAGE':
      newState.appState = action.auth;
      return newState;
  }
  return state;
}

export function buttonReducer (state = buttonInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'SWITCH_VISIBILITY':
    console.log(state)
      return newState[action.button] = !newState[action.button];
    case 'TOGGLE_CONTENT_COMPONENT':
      newState.activeContentComponent = action.targetComponent;
      return newState;
    default:
      return state;
  }
  return state
}

export function noteReducer (state = noteInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'ADD_NOTE':
      var newComments = state['notes'].slice();
      newComments.push(action.note);
      newState['notes'] = newComments;
      return newState;
    default:
      return state;
  }
  return state
}

export function projectReducer (state = projectInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'ADD_PROJECT':
      var newProjects = state.projects.slice();
      newProjects.push(action.project);
      newState.projects = newProjects;
      return newState;
    case 'CONFIRM_PROJECT':
      console.log('confirm', action)
      newState.confirm = action.project;
      return newState;
    default:
      return state;
  }
  return state
}

export function loginReducer (state = loginInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'USER_LOGIN':
      newState.email = action.email;
      return newState;
  }
  return state;
}

export function registrationReducer (state = registrationInitialState, action) {
  var newState = Object.assign({}, state)
  console.log('logging from registration reduce ',action)
  switch (action.type) {
    case 'REGISTER_USER' :
      newState.firstName = action.user.firstName;
      newState.lastName = action.user.lastName;
      newState.company = action.user.company;
      newState.email = action.user.emailField;
      return newState;
  }
  return state;
}

export function imageUpdateReducer (state = imageUpdateInitialState, action) {
  var newState = Object.assign({}, state);
  switch (action.type) {
    case 'UPDATE_IMAGE' :
      newState.image = action.image.data;
      return newState;
  }
  return state;
}

export function modalStateReducer (state = modalInitialState, action) {
  var newState = Object.assign({}, state);
  console.log(action)
  switch(action.type) {
    case 'SHOW_LOGIN':
      newState.login = true;
      newState.getStarted = false;
      return newState;
    case 'SHOW_GET_STARTED':
      newState.getStarted = true;
      newState.login = false;
      return newState;
    case 'HIDE_LOGIN':
      newState.login = false;
      return newState;
    case 'HIDE_GET_STARTED':
      newState.getStarted = false;
      return newState;
    case 'MODAL_RESET':
      newState.login = false;
      newState.getStarted = false;
      return newState;
  }
  return state;
}
