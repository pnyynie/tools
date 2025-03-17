import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconButton = ({ className = '', icon, width = 26, height = 26, iconSize = 12, onClick }) => {
  const style = {};
  style.width = `${width}px`;
  style.height = `${height}px`;
  style.fontSize = `${iconSize}px`;

  return (
    <div className={`icon-button ${className}`} style={style} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default IconButton;
