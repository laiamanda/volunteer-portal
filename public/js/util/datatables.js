/**
 * Initialize a DataTable
 */
function initializeDataTable(el, columns, opts ={}, callback) {
  const searchable = [];
  for (let index = 0; index < columns.length; ++index) {
    const column = columns[index];
    if (column.searchable !== false ) {
      searchable.push(index);
    }
    if (column.default) {
      columnDefaults.visible.push(index);
    } else {
      columnDefaults.hidden.push(index);
    }
  }
}