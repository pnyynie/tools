import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTent } from '@fortawesome/free-solid-svg-icons';

const Empty = () => {
  return (
    <div className="empty-wrapper d-flex flex-column align-items-center justify-content-center">
      <FontAwesomeIcon icon={faTent} />
      <span style={{ fontSize: '12px', marginTop: '2px' }}>Emol.</span>
    </div>
  );
};

export default Empty;
