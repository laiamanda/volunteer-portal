/**
 * Initialize a DataTable
 */
function initializeDataTable(el, columns, opts ={}, callback) {
  const searchable = [];
  const columnDefaults = {
    visible: [],
    hidden: [],
  };
  for (let index = 0; index < columns.length; ++index) {
    const column = columns[index];
    if (column.searchable !== false ) {
      searchable.push(index);
    }
    if (column.Default) {
      columnDefaults.visible.push(index);
    } else {
      columnDefaults.hidden.push(index);
    }
  }
  let table;
  $(function() {
    table = $(el).DataTable({
      buttons: [
        'colvis',
        {
          text: 'Show all columns',
          action(e, dt) {
            dt.columns(columns.map((column, idx) => idx)).visible(true, false);
            dt.columns.adjust().draw(false);
          },
        },
        {
          text: 'Reset',
          action(e, dt){
            dt.columns(columnDefaults.hidden).visible(false,false);
            dt.columns(columnDefaults.visible).visible(true,false);

            if('order' in opts) {
              dt.order(opts.order);
            }
            dt.columns.adjust().draw(false);
            location.reload();
          },
        },
      ],
      dom: '<"datatables-advanced-search"Q><"datatables-btns"B>' +
          '<"datatables-search"f><"datatables-length"l>rtip',
      language: {
        searchBuilder: {
          title: {
            0: 'Advanced Search',
            _: 'Advanced Search (%d)',
          },
        },
      },
      lengthMenu: [[5, 10, 20, 50, -1], [5, 10, 20, 50, 'All']],
      searchBuilder: {
        columns: searchable,
      },
      stateSave: true,
      ...opts,
      columnsDefs: [
        {visible: true, targets: columnDefaults.visible},
        {visible: false, targets: columnDefaults.hidden},
        ...opts.columnDefs || [],
      ],
    });
    if (callback !== undefined) {
      callback(table);
    }
  });
}