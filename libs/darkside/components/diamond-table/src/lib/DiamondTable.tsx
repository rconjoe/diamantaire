import { Heading } from '@diamantaire/darkside/components/common-ui';
import { UIString } from '@diamantaire/darkside/core';
import { useDiamondsData, useDiamondTableData } from '@diamantaire/darkside/data/hooks';
import { shopifyNumberToHumanPrice } from '@diamantaire/shared/helpers';
import { flexRender, getCoreRowModel, PaginationState, useReactTable } from '@tanstack/react-table';
import { useState, useEffect, useMemo, useRef } from 'react';

import DiamondDetail from './DiamondDetail';
import { StyledDiamondTable } from './DiamondTable.style';

// TODO: Move to diamond lib DIA-168
interface DiamondVariantTypes {
  dangerousInternalShopifyVariantId: string;
  isForSale: boolean;
  price: number;
  title: string;
  variantId: string;
  variantSku: string;
  variantTitle: string;
}

export interface DiamondProductTypes {
  availableForSale: boolean;
  carat: number;
  clarity: string;
  color: string;
  cut: string;
  dangerousInternalProductId: string;
  description: string;
  dfCertificateUrl: string;
  diamondType: string;
  handle: string;
  lotId: string;
  productTitle: string;
  slug: string;
  type: string;
  variants: DiamondVariantTypes[];
  _id: string;
}

interface Info {
  getValue: () => string;
  row: { original: DiamondProductTypes };
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

  const [activeRow, setActiveRow] = useState(null);
  const tableHead = useRef<HTMLDivElement>(null);
  const tableBody = useRef<HTMLDivElement>(null);

  // DOCUMENT ELEMENTS HEIGHT (used for sticky and scrollTo)
  const [headerHeight, setHeaderHeight] = useState(0);
  const tableHeadHeight = tableHead?.current?.offsetHeight || 0;

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

  // DIAMONDS
  const queryDiamond = useDiamondsData(options);

  // STRINGS
  const queryDiamondTable = useDiamondTableData(locale);
  const noResultString = queryDiamondTable?.data?.diamondTable?.cannotFindDiamondSentence1;

  // COLUMNS
  const columns = useMemo(
    () => [
      {
        accessorKey: 'type',
        cell: (info: Info) => {
          return info.getValue();
        },
        header: () => <UIString>shape</UIString>,
      },
      {
        accessorKey: 'carat',
        cell: (info: Info) => Number(info.getValue()),
        header: () => <UIString>carat</UIString>,
      },
      {
        accessorKey: 'color',
        cell: (info: Info) => info.getValue(),
        header: () => <UIString>color</UIString>,
      },
      {
        accessorKey: 'clarity',
        cell: (info: Info) => info.getValue(),
        header: () => <UIString>clarity</UIString>,
      },
      {
        accessorKey: 'cut',
        cell: (info: Info) => info.getValue(),
        header: () => <UIString>cut</UIString>,
      },
      {
        accessorKey: 'price',
        cell: (info: Info) => {
          const amount = info.row?.original?.variants?.[0]?.price;

          return shopifyNumberToHumanPrice(amount, locale, currencyCode, countryCode, {}, false, false, '');
        },
        header: () => <UIString>price</UIString>,
      },
    ],
    [],
  );

  // TABLE
  const table = useReactTable({
    data: queryDiamond.data?.diamonds ?? initialDiamonds,
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

    if (!queryDiamond.isFetching) {
      updateOptions({
        sortBy: newSortBy,
        sortOrder: newSortOrder,
      });
    }
  };

  const onHeaderHeightReset = (e) => {
    setHeaderHeight(e.detail.headerHeight);
  };

  const onRowClick = (row) => {
    if (row?.id === activeRow?.id) {
      setActiveRow(null);
    } else {
      setActiveRow(row);
    }
  };

  // LOADING
  useEffect(() => {
    updateLoading(queryDiamond.isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryDiamond.isFetching]);

  // PAGE
  useEffect(() => {
    updateOptions({
      page: pageIndex,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  // ACTIVE ROW
  useEffect(() => {
    if (activeRow) {
      const { id } = activeRow;

      const rowElement: HTMLDivElement = tableBody?.current?.querySelector(`[data-id="${id}"]`);

      if (headerHeight && tableHeadHeight && rowElement) {
        const rowElementPosition: number = rowElement?.offsetTop - headerHeight - tableHeadHeight || 0;

        window.scrollTo({ top: rowElementPosition });
      }
    }
  }, [activeRow]);

  useEffect(() => {
    window.addEventListener('RESET_TABLE_PAGINATION', onPaginationreset);
    window.addEventListener('RESET_HEADER_HEIGHT', onHeaderHeightReset);

    return () => {
      window.removeEventListener('RESET_TABLE_PAGINATION', onPaginationreset);
      window.removeEventListener('RESET_HEADER_HEIGHT', onHeaderHeightReset);
    };
  });

  return (
    <StyledDiamondTable className="vo-table" headerHeight={headerHeight}>
      <div className="vo-table-container">
        {/* TABLE HEAD */}
        <div ref={tableHead} className="vo-table-head">
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
                    {queryDiamond.isFetching && <div className="vo-table-cell-loading" />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* TABLE BODY */}
        <div ref={tableBody} className="vo-table-body">
          {table.getRowModel().rows.map((row) => {
            const active = activeRow?.id === row.id;

            return (
              <div key={row.id} className={`vo-table-row${active ? ' active' : ''}`} data-id={row.id}>
                <div className="vo-table-row-head" onClick={() => onRowClick(row)}>
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id} className="vo-table-cell">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      {queryDiamond.isFetching && <div className="vo-table-cell-loading" />}
                    </div>
                  ))}
                </div>

                {active && (
                  <div className="vo-table-row-body">
                    <DiamondDetail product={row?.original} />
                  </div>
                )}
              </div>
            );
          })}
          {table.getRowModel().rows.length === 0 && (
            <div className="vo-table-no-result">
              <div className="vo-table-no-result-container">
                <Heading type="h4">{noResultString}</Heading>
                <button className="vo-table-clear-button" onClick={clearOptions}>
                  <UIString>clear</UIString>
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
                onClick={() => !queryDiamond.isFetching && table.setPageIndex(1)}
                disabled={pageIndex < 2}
              >
                {'<<'}
              </button>

              <button
                className="vo-table-pagi-button"
                onClick={() => !queryDiamond.isFetching && table.previousPage()}
                disabled={pageIndex < 2}
              >
                {'<'}
              </button>

              <button
                className="vo-table-pagi-button"
                onClick={() => !queryDiamond.isFetching && table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {'>'}
              </button>

              <button
                className="vo-table-pagi-button"
                onClick={() => !queryDiamond.isFetching && table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {'>>'}
              </button>
            </div>

            <div className="vo-table-pagi-cell">
              <p>
                <UIString>Showing</UIString> {table.getState().pagination.pageIndex} <UIString>of</UIString>{' '}
                {table.getPageCount() - 1}
              </p>
            </div>
          </div>

          {queryDiamond.isFetching && <div className="vo-table-pagi-loading" />}
        </div>
      </div>

      {/* LOADER */}
      {queryDiamond.isFetching && (
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
