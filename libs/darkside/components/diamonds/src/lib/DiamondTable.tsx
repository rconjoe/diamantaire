import { DarksideButton, HideTopBar, UIString } from '@diamantaire/darkside/components/common-ui';
import { useDiamondTableData, useInfiniteDiamondsData, useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedCarat, getFormattedPrice } from '@diamantaire/shared/constants';
import { getDiamondType } from '@diamantaire/shared/helpers';
import { DiamondDataTypes, DiamondPairDataTypes, isDiamondPairType } from '@diamantaire/shared/types';
import { PaginationState, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

import { DiamondPairActiveRow, DiamondPairCell } from './DiamondPairs';
import { StyledDiamondTable } from './DiamondTable.style';
import DiamondTableCfyPromoCard from './DiamondTableCfyPromoCard';
import DiamondTableRow from './DiamondTableRow';

type Info =
  | {
      getValue: () => string;
      row: { original: DiamondDataTypes };
    }
  | {
      getValue: () => string;
      row: { original: DiamondPairDataTypes };
    };

type DiamondTableProps = {
  activeRow?: DiamondDataTypes | DiamondPairDataTypes;
  setActiveRow?: (item: DiamondDataTypes | DiamondPairDataTypes) => void;
  initialDiamonds: DiamondDataTypes[] | DiamondPairDataTypes[];
  initialPagination: {
    currentPage?: number;
    perPage?: number;
  };
  initialOptions: any;
  updateOptions: (options: any) => void;
  updateLoading: (newState: boolean) => void;
  clearOptions: () => void;
  isBuilderFlowOpen?: boolean;
  isTableView?: boolean;
  ranges: Record<string, any>;
  isDiamondPairs?: boolean;
  settingSlugs?: {
    [key: string]: string;
  };
  settingProductType?: string;
  updateSettingSlugs?: (_obj) => void;
};

const DiamondTable = (props: DiamondTableProps) => {
  const {
    initialDiamonds,
    initialPagination,
    initialOptions,
    updateOptions,
    updateLoading,
    clearOptions,
    isBuilderFlowOpen,
    isTableView = true,
    isDiamondPairs,
    settingProductType,
  } = props;

  const { asPath, locale } = useRouter();

  const tableHead = useRef<HTMLDivElement>(null);
  const tableBody = useRef<HTMLDivElement>(null);
  const loadTrigger = useRef<HTMLDivElement>(null);

  const [activeRow, setActiveRow] = useState<DiamondDataTypes | null>(null);

  // PAGINATION;
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
    limit: initialPagination?.perPage || 20,
  };

  if (asPath.includes('toi-moi')) {
    options['view'] = 'toimoi';
  }

  // DIAMONDS
  const queryDiamond = useInfiniteDiamondsData(options);

  const flatDiamonds = useMemo(() => {
    return queryDiamond.data?.pages?.flatMap((v) => {
      return v.diamonds;
    });
  }, [queryDiamond.data]);

  // STRINGS
  const {
    data: {
      diamondTable: {
        cannotFindDiamondSentence1,
        // cannotFindDiamondSentence2,
        bottomPromoContentLargerCarat,
        bottomPromoContentNoShape,
        bottomPromoContentCtaCopy,
        bottomPromoContentCtaLink,
        bottomPromoContent,
        clearFiltersButtonCopy,
      } = {},
    } = {},
  } = useDiamondTableData(locale);

  // COLUMNS
  const singleDiamondColumns = useMemo(
    () => [
      {
        accessorKey: 'diamondType',
        cell: (info: Info) => {
          const shape = info.getValue();

          const diamondTypeHandle = shape || (shape && getDiamondType(shape)?.slug) || info.getValue();

          return <UIString>{diamondTypeHandle}</UIString>;
        },
        header: () => <UIString>shape</UIString>,
      },
      {
        accessorKey: 'carat',
        cell: (info: Info) => {
          const caratValue = Number(info.getValue());

          return getFormattedCarat(caratValue, locale);
        },
        header: () => <UIString>carat</UIString>,
      },
      {
        accessorKey: 'color',
        cell: (info: Info) => <UIString>{info.getValue()}</UIString>,
        header: () => <UIString>color</UIString>,
      },
      {
        accessorKey: 'clarity',
        cell: (info: Info) => info.getValue(),
        header: () => <UIString>clarity</UIString>,
      },
      {
        accessorKey: 'cut',
        cell: (info: Info) => (
          <>
            <span className="mobile-only">
              <UIString>{info.getValue().replace('+', '+ ')}</UIString>
            </span>
            <span className="tablet-and-up">
              <UIString>{info.getValue()}</UIString>
            </span>
          </>
        ),
        header: () => <UIString>cut</UIString>,
      },
      {
        accessorKey: 'price',
        cell: (info: Info) => {
          const amount = info.getValue();

          return getFormattedPrice(Number(amount), locale, true);
        },
        header: () => <UIString>price</UIString>,
      },
    ],
    [locale],
  );

  const { _t: translateDiamondShape } = useTranslations(locale, ['DIAMOND_SHAPES']);

  const diamondPairColumns = useMemo(
    () => [
      {
        accessorKey: 'diamondType',
        cell: (info: Info) => {
          if (isDiamondPairType(info.row.original)) {
            const diamonds = info.row.original.diamonds;

            return (
              <DiamondPairCell
                diamonds={diamonds}
                accessorKey="diamondType"
                renderValue={(v: unknown): string => {
                  if (typeof v === 'string') {
                    return `${translateDiamondShape(v)}`;
                  } else {
                    return 'Invalid Diamond Type';
                  }
                }}
              />
            );
          }
        },
        header: () => <UIString>shape</UIString>,
      },
      {
        accessorKey: 'carat',
        cell: (info: Info) => {
          if (isDiamondPairType(info.row.original)) {
            const diamonds = info.row.original.diamonds;

            return (
              <DiamondPairCell
                diamonds={diamonds}
                accessorKey="carat"
                renderValue={(v) => {
                  return getFormattedCarat(Number(v), locale);
                }}
              />
            );
          }
        },
        header: () => <UIString>carat</UIString>,
      },
      {
        accessorKey: 'color',
        cell: (info: Info) => info.getValue(),
        header: () => <UIString>color</UIString>,
      },
      {
        accessorKey: 'clarity',
        cell: (info: Info) => {
          if (isDiamondPairType(info.row.original)) {
            const diamonds = info.row.original.diamonds;

            return <DiamondPairCell diamonds={diamonds} accessorKey="clarity" />;
          }
        },
        header: () => <UIString>clarity</UIString>,
      },
      {
        accessorKey: 'cut',
        cell: (info: Info) => {
          if (isDiamondPairType(info.row.original)) {
            const diamonds = info.row.original.diamonds;

            return <DiamondPairCell diamonds={diamonds} accessorKey="cut" />;
          }
        },
        header: () => <UIString>cut</UIString>,
      },
      {
        accessorKey: 'price',
        cell: (info: Info) => {
          const amount = info.getValue();

          return getFormattedPrice(Number(amount), locale, true);
        },
        header: () => <UIString>price</UIString>,
      },
    ],
    [locale],
  );

  // TABLE
  const table = useReactTable<DiamondDataTypes | DiamondPairDataTypes>({
    columns: isDiamondPairs ? diamondPairColumns : singleDiamondColumns,
    data: flatDiamonds ?? (initialDiamonds || []),
    getCoreRowModel: getCoreRowModel(),
    state: { pagination },
  });

  // METHODS
  const onLoadMore = () => {
    if (queryDiamond.hasNextPage && !queryDiamond.isFetching && !queryDiamond.isLoading) {
      queryDiamond.fetchNextPage();
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

    table.resetPageIndex();

    setActiveRow(null);

    // props.setActiveRow(null);
  };

  const onHeaderClick = (header) => {
    const newSortBy = header.id;
    const currentSortOrder = options.sortOrder || 'asc';
    const newSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';

    if (!queryDiamond.isFetching) {
      updateOptions({
        sortBy: newSortBy,
        sortOrder: options.sortBy !== header.id ? 'desc' : newSortOrder,
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

      if (tableHeadHeight && rowElement) {
        const rowElementPosition: number = rowElement?.offsetTop - 55 - tableHeadHeight || 0;

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

  const shouldShowCFYPromo =
    !settingProductType ||
    (settingProductType === 'Engagement Ring' && !asPath.includes('toi-moi') && !asPath.includes('pairs'));

  // ELEMENTS HEIGHT (used for sticky and scroll)
  const tableHeadHeight = tableHead?.current?.offsetHeight || 0;
  const triggerOffset = tableBody?.current?.offsetHeight / queryDiamond.data?.pages?.length;

  // CFY PROMO CARD
  const cfyPromoCard = (
    <DiamondTableCfyPromoCard
      content={{
        bottomPromoContentLargerCarat,
        bottomPromoContentNoShape,
        bottomPromoContentCtaCopy,
        bottomPromoContentCtaLink,
        bottomPromoContent,
      }}
      options={options}
    />
  );

  return isTableView ? (
    <StyledDiamondTable
      className={clsx('vo-table', {
        'flow-page': isBuilderFlowOpen,
      })}
      triggerOffset={triggerOffset}
      tableHeadHeight={tableHeadHeight}
    >
      <HideTopBar />
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
          {table.getRowModel().rows.map((row, idx) => {
            const active = activeRow?.id === row.id;
            let diamonds;

            // Diamond Pair Typeguard
            if (isDiamondPairType(row.original)) {
              diamonds = row.original.diamonds;
            }

            return (
              <Fragment key={row.id}>
                {idx === 10 && shouldShowCFYPromo && cfyPromoCard}

                <div
                  className={clsx('vo-table-row', {
                    active: active,
                    'pair-row': isDiamondPairs,
                  })}
                  data-id={row.id}
                >
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
                      {isDiamondPairs ? (
                        <DiamondPairActiveRow isBuilderFlowOpen={isBuilderFlowOpen} diamonds={diamonds} />
                      ) : (
                        <DiamondTableRow isBuilderFlowOpen={isBuilderFlowOpen} product={row?.original} />
                      )}
                    </div>
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>

        {/* TABLE FOOT */}
        <div className="vo-table-foot">
          <div className="vo-table-trigger" ref={loadTrigger} />

          {(!isBuilderFlowOpen || shouldShowCFYPromo) && cfyPromoCard}

          {(table.getRowModel().rows.length === 0 && (
            <div className="vo-table-no-result">
              <div className="vo-table-no-result-container">
                <ul>
                  <li>
                    <p>{cannotFindDiamondSentence1}</p>{' '}
                    <DarksideButton
                      type="underline"
                      colorTheme="teal"
                      className="vo-table-clear-button"
                      onClick={clearOptions}
                    >
                      {clearFiltersButtonCopy}
                    </DarksideButton>
                  </li>
                  {/* <li>
                    <Markdown withStyles={false}>{cannotFindDiamondSentence2}</Markdown>
                  </li> */}
                </ul>
              </div>
            </div>
          )) || (
            <div className="vo-table-no-result">
              <div className="vo-table-no-result-container">
                <DarksideButton type="underline" colorTheme="teal" className="vo-table-clear-button" onClick={clearOptions}>
                  {clearFiltersButtonCopy}
                </DarksideButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledDiamondTable>
  ) : (
    ''
    // <DiamondGrid items={initialDiamonds} flowIndex={flowIndex} />
  );
};

export { DiamondTable };

export default DiamondTable;
