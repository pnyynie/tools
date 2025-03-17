import './style.scss';

const Table = ({ columns = [], data = [], dataHeight, selected = {}, onSelect }) => {
  const handleSelect = row => {
    if (selected.id === row.id) return;
    onSelect && onSelect(row);
  };

  const tdsRender = row => {
    return columns.map(item => {
      const style = {};
      item.width && (style['width'] = item.width);
      item.align && (style['textAlign'] = item.align);
      return (
        <td key={item.key} className={`${item.className ? item.className : ''}`} style={style}>
          {item.render ? item.render({ row }) : row[item.key]}
        </td>
      );
    });
  };

  return (
    <table className="table table-hover" data-height={dataHeight}>
      <thead>
        <tr>
          <th scope="col" style={{ textAlign: 'center' }}></th>
          {columns.map(item => (
            <th key={item.key} scope="col">
              {item.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} className={`${selected.id === item.id ? 'table-primary' : ''}`} onClick={handleSelect.bind(this, item)}>
            <td style={{ textAlign: 'center' }}>{index + 1}</td>
            {tdsRender(item)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
