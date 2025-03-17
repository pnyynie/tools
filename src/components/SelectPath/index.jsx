import './style.scss';
import IconButton from '@/components/IconButton';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function SelectPath({ value, wrapClassName = '', className = '', required = false, placeholder = '', onChange }) {
  let handleClick = () => {
    window.WebContex.apis.dialog.showOpenDialog().then(resp => {
      if (resp.code === 200 && resp.data) {
        onChange && onChange(resp.data);
      }
    });
  };

  const handleChange = () => {};

  return (
    <div className={`select-path ${wrapClassName}`}>
      <input
        className={`${className}`}
        type="text"
        value={value}
        disabled={false}
        required={required}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <IconButton icon={faUpload} width={36} height={36} iconSize={18} />
      <div className="select-path-mc" onClick={handleClick}></div>
    </div>
  );
}

export default SelectPath;
