import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login } from '../authActions';
import * as types from '../actionTypes';
import api from '../../../utils/api';

jest.mock('../../../utils/api');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  it('creates LOGIN_SUCCESS when login has been done', () => {
    const mockResponse = { token: 'fake-token', user: { id: 1, username: 'testuser' } };
    api.post.mockResolvedValue({ data: mockResponse });

    const expectedActions = [
      { type: types.LOGIN_REQUEST },
      { type: types.LOGIN_SUCCESS, payload: mockResponse }
    ];

    const store = mockStore({});

    return store.dispatch(login('test@example.com', 'password123')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates LOGIN_FAILURE when login fails', () => {
    const error = new Error('Invalid credentials');
    api.post.mockRejectedValue({ response: { data: { message: error.message } } });

    const expectedActions = [
      { type: types.LOGIN_REQUEST },
      { type: types.LOGIN_FAILURE, payload: error.message }
    ];

    const store = mockStore({});

    return store.dispatch(login('test@example.com', 'wrongpassword')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
