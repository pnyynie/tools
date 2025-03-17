import './style.scss';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';

const Panel = ({ title, width, minHeight = 60, loading, children, controls }) => {
  const style = {};
  style.width = width ? `${width}px` : '100%';

  const bodyStyle = {};
  bodyStyle.minHeight = `${minHeight}px`;

  return (
    <div className="panel" style={style}>
      <div className="panel-heading border">
        <div className="panel-title">{title || ''}</div>
        {controls ? <div className="panel-controls">{controls}</div> : null}
      </div>
      <div className="panel-body border" style={bodyStyle}>
        {loading ? <Loading /> : children ? children : <Empty />}
      </div>
    </div>
  );
};

export default Panel;
