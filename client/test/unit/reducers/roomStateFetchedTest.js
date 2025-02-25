import uuid from '../../../src/services/uuid';
import {ROOM_STATE_FETCHED} from '../../../src/state/actions/eventActions';
import rootReducer from '../../../src/state/rootReducer';
import initialState from '../../../src/state/initialState';
import {
  getActiveStories,
  getSelectedStoryId,
  getStoriesById
} from '../../../src/state/stories/storiesSelectors';
import {roomInitialState} from '../../../src/state/room/roomReducer';
import {getEstimations} from '../../../src/state/estimations/estimationsSelectors';
import {getCardConfigInOrder} from '../../../src/state/room/roomSelectors';

test(ROOM_STATE_FETCHED + ' should correctly be reduced to state ', () => {
  const roomId = uuid();
  const startingState = {...initialState(), room: {...roomInitialState, roomId: roomId}};

  const storyId = '67c84311-924d-4fd7-9938-81e63c2477a1';
  const userId = '3a7baa33-b516-40e0-b499-e3f85d023edd';
  const action = {
    type: ROOM_STATE_FETCHED,
    room: {
      autoReveal: false,
      id: roomId,
      selectedStory: storyId,
      stories: [
        {
          id: storyId,
          title: 'Welcome to your Poinz room!',
          estimations: {
            [userId]: 0.5
          },
          createdAt: 1613281970621,
          description: 'description'
        }
      ],
      users: [
        {
          disconnected: false,
          id: userId,
          avatar: 11,
          username: 'Sergio2'
        }
      ],
      passwordProtected: true,
      cardConfig: [
        {
          label: '?',
          value: -2,
          color: '#bdbfbf'
        },
        {
          label: '1/2',
          value: 0.5,
          color: '#667a66'
        }
      ]
    }
  };
  const modifiedState = rootReducer(startingState, action);

  expect(getActiveStories(modifiedState).length).toBe(1);
  expect(getStoriesById(modifiedState)[action.room.stories[0].id]).toEqual({
    id: storyId,
    title: 'Welcome to your Poinz room!',
    // without the estimations
    createdAt: 1613281970621,
    description: 'description'
  });
  expect(getSelectedStoryId(modifiedState)).toBe(action.room.selectedStory);

  expect(getEstimations(modifiedState)).toEqual({
    [storyId]: {
      [userId]: {value: 0.5, confidence: 0}
    }
  });

  expect(getCardConfigInOrder(modifiedState)).toEqual(action.room.cardConfig);

  expect(modifiedState.room.autoReveal).toBe(false);
  expect(modifiedState.room.passwordProtected).toBe(true);
});
