import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import * as actions from '../actions';

class VideoSelectScreen extends Component {
  state = {
    hovering: false
  };

  onDrop = files => {
    // invalid file types are not added to files object
    const videos = files.map(({ name, path, size, type }) => {
      return { name, path, size, type };
    });

    if (videos.length) {
      this.props.addVideos(videos);

      if (!this.props.small) {
        this.props.history.push('/convert');
      }
    }
  };

  renderChildren({ isDragActive, isDragReject }) {
    if (isDragActive) {
      return <h5 className="drop-message">Videos to process!</h5>;
    } else if (isDragReject) {
      return <h5 className="drop-message">Only video files can be converted</h5>;
    } else {
      return (
        <h5 className="drop-message">
          Drag and drop some files here, or click to select.
        </h5>
      );
    }
  }

  render() {
    return (
      <div
        className={
          this.props.small ? 'video-select-screen-small' : 'video-select-screen'
        }
      >
        <Dropzone
          onDrop={this.onDrop}
          multiple
          accept="video/*"
          className="dropzone"
          activeClassName="dropzone-active"
          rejectClassName="dropzone-reject"
        >
          {this.renderChildren}
        </Dropzone>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(VideoSelectScreen);
