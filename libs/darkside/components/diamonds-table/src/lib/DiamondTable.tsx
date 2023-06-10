import { Heading } from '@diamantaire/darkside/components/common-ui';
import { useDiamondsData } from '@diamantaire/darkside/data/hooks';
import { shopifyNumberToHumanPrice } from '@diamantaire/shared/helpers';
import { flexRender, getCoreRowModel, PaginationState, useReactTable } from '@tanstack/react-table';
import { useState, useEffect, useMemo } from 'react';

import { StyledDiamondTable } from './DiamondTable.style';

interface Variants {
  price: {
    amount: string;
  };
}

interface Info {
  getValue: () => string;
  row: {
    original: {
      variants: Variants[];
    };
  };
}

const DiamondTable = (props) => {
  const {
    currencyCode,
    countryCode,
    locale,
    initialDiamonds,
    initialPagination,
    initialOptions,
    updateOptions,
    updateLoading,
    clearOptions,
  } = props;

  // COLUMNS
  const columns = useMemo(
    () => [
      {
        accessorKey: 'type',
        cell: (info: Info) => {
          return info.getValue();
        },
        header: () => <span>Shape</span>,
      },
      {
        accessorKey: 'carat',
        cell: (info: Info) => Number(info.getValue()),
        header: () => <span>Carat</span>,
      },
      {
        accessorKey: 'color',
        cell: (info: Info) => info.getValue(),
        header: () => <span>Color</span>,
      },
      {
        accessorKey: 'clarity',
        cell: (info: Info) => info.getValue(),
        header: () => <span>Clarity</span>,
      },
      {
        accessorKey: 'cut',
        cell: (info: Info) => info.getValue(),
        header: () => <span>Cut</span>,
      },
      {
        accessorKey: 'price',
        cell: (info: Info) => {
          const amount = info.row?.original?.variants?.[0]?.price;

          return shopifyNumberToHumanPrice(amount, locale, currencyCode, countryCode, {}, false, false, '');
        },
        header: () => <span>Price</span>,
      },
    ],
    [],
  );

  // PAGINATION
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: initialPagination?.currentPage,
    pageSize: initialPagination?.perPage,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  // OPTIONS
  const options = {
    ...initialOptions,
    page: pageIndex,
    limit: pageSize,
  };

  // QUERY
  const query = useDiamondsData(options);

  // TABLE
  const table = useReactTable({
    data: query.data?.diamonds ?? initialDiamonds,
    columns,
    pageCount: initialPagination?.pageCount,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  // EVENTS
  const onPaginationreset = () => {
    table.setPageIndex(1);
  };

  const onHeaderClick = (header) => {
    const currentSortOrder = options.sortOrder || 'asc';
    const newSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
    const newSortBy = header.id;

    if (!query.isFetching) {
      updateOptions({
        sortBy: newSortBy,
        sortOrder: newSortOrder,
      });
    }
  };

  // LOADING
  useEffect(() => {
    updateLoading(query.isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isFetching]);

  // PAGE
  useEffect(() => {
    updateOptions({
      page: pageIndex,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  // RESET PAGINATION
  useEffect(() => {
    window.addEventListener('RESET_TABLE_PAGINATION', onPaginationreset);

    return () => {
      window.removeEventListener('RESET_TABLE_PAGINATION', onPaginationreset);
    };
  });

  return (
    <StyledDiamondTable className="vo-table">
      <div className="vo-table-container">
        {/* TABLE HEAD */}
        <div className="vo-table-head">
          {table.getHeaderGroups().map((headerGroup: any) => (
            <div key={headerGroup.id} className="vo-table-row">
              {headerGroup.headers.map((header: any) => {
                return (
                  <div key={header.id} className="vo-table-cell" onClick={() => onHeaderClick(header)}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <div className="vo-sort-icon">
                      {options.sortBy === header.id && options.sortOrder === 'asc' && <span>🔼</span>}
                      {options.sortBy === header.id && options.sortOrder === 'desc' && <span>🔽</span>}
                    </div>
                    {query.isFetching && <div className="vo-table-cell-loading" />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* TABLE BODY */}
        <div className="vo-table-body">
          {table.getRowModel().rows.map((row) => (
            <div key={row.id} className="vo-table-row">
              <div className="vo-table-row-head">
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="vo-table-cell">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {query.isFetching && <div className="vo-table-cell-loading" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {table.getRowModel().rows.length === 0 && (
            <div className="vo-table-no-result">
              <div className="vo-table-no-result-container">
                <Heading type="h4">No diamond meets your filter criteria.</Heading>
                <button className="vo-table-clear-button" onClick={clearOptions}>
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* TABLE PAGINATION */}
        <div className="vo-table-pagination">
          <div className="vo-table-pagi-container">
            <div className="vo-table-pagi-cell">
              <button
                className="vo-table-pagi-button"
                onClick={() => !query.isFetching && table.setPageIndex(1)}
                disabled={pageIndex < 2}
              >
                {'<<'}
              </button>

              <button
                className="vo-table-pagi-button"
                onClick={() => !query.isFetching && table.previousPage()}
                disabled={pageIndex < 2}
              >
                {'<'}
              </button>

              <button
                className="vo-table-pagi-button"
                onClick={() => !query.isFetching && table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {'>'}
              </button>

              <button
                className="vo-table-pagi-button"
                onClick={() => !query.isFetching && table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {'>>'}
              </button>
            </div>

            <div className="vo-table-pagi-cell">
              <p>
                Page {table.getState().pagination.pageIndex} of {table.getPageCount() - 1}
              </p>
            </div>
          </div>

          {query.isFetching && <div className="vo-table-pagi-loading" />}
        </div>
      </div>

      {/* LOADER */}
      {query.isFetching && (
        <div className="vo-table-loading">
          <span className="vo-loader-icon"></span>
          <span>Loading...</span>
        </div>
      )}
    </StyledDiamondTable>
  );
};

export { DiamondTable };

export default DiamondTable;
