import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './ModalDialog.scss';
interface ModalDialogProps {
  Active: boolean;
  WordAuth: string;
  CloseBox: (arg: any) => any;
}

const ModalDialog: React.FunctionComponent<ModalDialogProps> = (props) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (props.Active) {
      setTimeout(function () {
        navigate('/');
      }, 2000);
    }
  }, [props.Active]);
  return (
    <div className={props.Active ? 'modal fade active-modal' : 'modal fade'}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={() => props.CloseBox(false)}
            >
              ×
            </button>
            <h4 className="modal-title">Thông báo</h4>
          </div>
          <div className="modal-body">
            <p id="pp_notify_content">Bạn đã {props.WordAuth} thành công</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
              onClick={() => props.CloseBox(false)}
            >
              Đóng
            </button>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default ModalDialog;
