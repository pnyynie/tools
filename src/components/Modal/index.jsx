import './style.scss';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@/components/IconButton';

const Modal = props => {
  const {
    open = false,
    title = ' ',
    width = 380,
    className = '',
    okText = '确定',
    cancelText = '取消',
    onOk = () => {},
    onCancel = () => {},
  } = props;

  if (!open) return null;

  const style = {
    width: `${width}px`,
  };

  let slotHeader, slotFooter, body;

  if (Array.isArray(props.children)) {
    slotHeader = props.children.find(i => i.props.slot === 'header');
    slotFooter = props.children.find(i => i.props.slot === 'footer');
    body = props.children.find(i => !i.props.slot);
  } else {
    body = props.children;
  }

  const header = slotHeader ? (
    slotHeader
  ) : (
    <>
      <h1 className="modal-title fs-5" id="exampleModalLabel">
        {title}
      </h1>
      <IconButton icon={faClose} iconSize={20} onClick={onCancel} />
    </>
  );

  const footer = slotFooter ? (
    slotFooter
  ) : (
    <>
      <button type="button" className="btn btn-primary" onClick={onOk}>
        {okText}
      </button>
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onCancel}>
        {cancelText}
      </button>
    </>
  );

  return (
    <>
      <div
        className={`modal fade show ${className}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={style}>
          <div className="modal-content">
            <div className="modal-header">{header}</div>
            <div className="modal-body">{body}</div>
            <div className="modal-footer">{footer}</div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default Modal;
