import { Heading } from '@diamantaire/darkside/components/common-ui';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { UIString } from '@diamantaire/darkside/core';
import { useDiamondTableData, useInfiniteDiamondsData } from '@diamantaire/darkside/data/hooks';
import { getDiamondType, makeCurrency } from '@diamantaire/shared/helpers';
import { DiamondDataTypes } from '@diamantaire/shared/types';
import { flexRender, getCoreRowModel, PaginationState, useReactTable } from '@tanstack/react-table';
import { useContext, useState, useEffect, useMemo, useRef } from 'react';

import { StyledDiamondTable } from './DiamondTable.style';
import DiamondTableRow from './DiamondTableRow';

interface Info {
  getValue: () => string;
  row: { original: DiamondDataTypes };
}

const DiamondTable = (props) => {
  const {
    currencyCode,
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
  const loadTrigger = useRef<HTMLDivElement>(null);

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
    page: initialPagination?.currentPage,
    limit: initialPagination?.perPage,
  };

  // DIAMONDS
  const queryDiamond = useInfiniteDiamondsData(options);
  const flatDiamonds = useMemo(() => {
    return queryDiamond.data?.pages?.flatMap((v) => v.diamonds);
  }, [queryDiamond.data]);

  // STRINGS
  const queryDiamondTable = useDiamondTableData(locale);
  const noResultString = queryDiamondTable?.data?.diamondTable?.cannotFindDiamondSentence1;

  // COLUMNS
  const columns = useMemo(
    () => [
      {
        accessorKey: 'type',
        cell: (info: Info) => {
          return getDiamondType(info.getValue()).title;
        },
        header: () => <UIString>shape</UIString>,
      },
      {
        accessorKey: 'carat',
        cell: (info: Info) => Number(info.getValue()).toFixed(2),
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
          const amount = info.getValue();

          return makeCurrency(Number(amount), locale, currencyCode);
        },
        header: () => <UIString>price</UIString>,
      },
    ],
    [],
  );

  // TABLE
  const table = useReactTable({
    columns,
    data: flatDiamonds ?? initialDiamonds,
    getCoreRowModel: getCoreRowModel(),
    state: { pagination },
  });

  // METHODS
  const onLoadMore = () => {
    if (queryDiamond.hasNextPage && !queryDiamond.isFetching && !queryDiamond.isLoading) {
      queryDiamond.fetchNextPage();

      setPagination((prevPagination) => ({
        ...prevPagination,
        pageIndex: prevPagination.pageIndex + 1,
      }));
    }
  };

  const onRowClick = (row) => {
    if (row?.id === activeRow?.id) {
      setActiveRow(null);
    } else {
      setActiveRow(row);
    }
  };

  const onPaginationReset = () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      pageIndex: 1,
    }));

    table.setPageIndex(1);

    window?.scrollTo(0, 0);
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

  // EFFECTS
  useEffect(() => {
    const trig = loadTrigger.current;

    if (!trig) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0 },
    );

    observer.observe(trig);

    return () => {
      observer.unobserve(trig);
    };
  }, [queryDiamond.hasNextPage, queryDiamond.isFetching, queryDiamond.isLoading, queryDiamond.fetchNextPage]);

  useEffect(() => {
    updateLoading(queryDiamond.isLoading);
  }, [queryDiamond.isLoading]);

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
    window.addEventListener('RESET_TABLE_PAGINATION', onPaginationReset);

    return () => {
      window.removeEventListener('RESET_TABLE_PAGINATION', onPaginationReset);
    };
  });

  // ELEMENTS HEIGHT (used for sticky and scroll)
  const { headerHeight } = useContext(GlobalContext);
  const tableHeadHeight = tableHead?.current?.offsetHeight || 0;
  const triggerOffset = tableBody?.current?.offsetHeight / queryDiamond.data?.pages?.length;

  return (
    <StyledDiamondTable
      className="vo-table"
      headerHeight={headerHeight}
      triggerOffset={triggerOffset}
      tableHeadHeight={tableHeadHeight}
    >
      <div className="vo-table-container">
        {/* TABLE HEAD */}
        <div ref={tableHead} className="vo-table-head">
          {table.getHeaderGroups().map((headerGroup: any) => (
            <div key={headerGroup.id} className="vo-table-row">
              {headerGroup.headers.map((header: any) => {
                return (
                  <div key={header.id} className="vo-table-cell" onClick={() => onHeaderClick(header)}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <div className={'vo-sort-icon' + (options.sortBy === header.id ? ' has-active' : '')}>
                      <span
                        className={
                          'arrow-up' + (options.sortBy === header.id && options.sortOrder === 'asc' ? ' active' : '')
                        }
                      />
                      <span
                        className={
                          'arrow-down' + (options.sortBy === header.id && options.sortOrder === 'desc' ? ' active' : '')
                        }
                      />
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
                    <DiamondTableRow product={row?.original} />
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

        {/* TABLE FOOT */}
        <div className="vo-table-foot">
          <div className="vo-table-trigger" ref={loadTrigger} />

          {queryDiamond.isFetching && (
            <div className="vo-table-loading">
              <span className="vo-loader-icon"></span>
              <span>Loading...</span>
            </div>
          )}
        </div>

        {/* TABLE HOVER */}
        {queryDiamond.isFetching && <div className="vo-table-pagi-loading" />}
      </div>
    </StyledDiamondTable>
  );
};

export { DiamondTable };

export default DiamondTable;
