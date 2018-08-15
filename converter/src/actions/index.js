import { ipcRenderer as ipc } from 'electron';

import videoArray from '../selectors';

import {
  ADD_VIDEO,
  ADD_VIDEOS,
  REMOVE_VIDEO,
  REMOVE_ALL_VIDEOS,
  VIDEO_PROGRESS,
  VIDEO_COMPLETE
} from './types';

// Communicate to MainWindow process that videos
// have been added and are pending conversion
export const addVideos = videos => dispatch => {
  ipc.send('videos:add', videos);

  ipc.on('videos:info', (_, videosWithData) =>
    dispatch({ type: ADD_VIDEOS, videos: videosWithData })
  );
};

// Communicate to MainWindow that the user wants
// to start converting videos.  Also listen for feedback
// from the MainWindow regarding the current state of
// conversion.
export const convertVideos = () => (dispatch, getState) => {
  ipc.send(
    'videos:convert',
    videoArray(getState().videos).filter(video => !video.complete)
  );

  ipc.on('videos:convert:progress', (_, { video, timemark }) => {
    dispatch({ type: VIDEO_PROGRESS, video, timemark });
  });

  ipc.on('videos:convert:end', (_, { video, outputPath }) => {
    dispatch({ type: VIDEO_COMPLETE, video, outputPath });
  });
};

// TODO: Open the folder that the newly created video
// exists in
export const showInFolder = outputPath => dispatch => {
  ipc.send('video:open', outputPath);
};

export const addVideo = video => {
  return {
    type: ADD_VIDEO,
    payload: { ...video }
  };
};

export const setFormat = (video, format) => {
  return {
    type: ADD_VIDEO,
    payload: { ...video, format, err: '' }
  };
};

export const removeVideo = video => {
  return {
    type: REMOVE_VIDEO,
    payload: video
  };
};

export const removeAllVideos = () => {
  return {
    type: REMOVE_ALL_VIDEOS
  };
};
