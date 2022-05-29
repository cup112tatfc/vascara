import * as React from 'react';
import './LoadingPopup.scss';
export interface LoadingPopupProps {
    LoadingBoolean: boolean;
}

export default function LoadingPopup(props: LoadingPopupProps) {
  return (
    <div className={props.LoadingBoolean ? "loading-popup" : "loading-popup no-active"}>
      <div className="loading-dots">
        <div className="bounce"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
}
