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

/**
 * Prompts the user to delete a row from a DataTable
 * @param {Event} event the event that triggered this deletion request
 * @param {DataTables} table the table containing the row to be deleted
 * @param {string} endpoint the location to which the deletion request will be sent
 * @return {Promise<void>} a promise that resolves when the deletion is complete
 */
async function deleteRow(event, table, endpoint) {
  if(confirm('Are you sure you would like to delete this row? This action cannot be undone.')) {
    const response = await fetch(endpoint, {
      method: 'DELETE',
    });

    if(response.status === 200) {
      // If the deletion is successful then remove the row and re-draw the table
      table.row($(event.target).parents('tr')).remove().draw();
    }
  }
}