import * as React from 'react';
import './Loading.scss';

interface LoadingProps {
    loadingBoolean:boolean
}

const Loading: React.FunctionComponent<LoadingProps> = (props) => {
  return (
    <div className={props.loadingBoolean ? 'loading' : 'loading hide-loading'}>
      <div className="center">
        <div className="ring"></div>
        <div className="load-text">
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
