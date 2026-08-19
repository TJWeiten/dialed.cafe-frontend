"use client"

import { useState } from "react"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  columnSizingFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  tableFeatures,
  useTable,
  type RowData,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn-ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn-ui/select"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { Button } from "@/components/ui/shadcn-ui/button"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type BrewEntry = {
  id: string
  datetime: string
  beanName: string
  grinder: string
  grindSetting: string
  doseIn: number
  yieldOut: number
  timeTaken: number
  rating: number | null
}

// ---------------------------------------------------------------------------
// Table features
// ---------------------------------------------------------------------------

const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  columnSizingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { includesString: filterFn_includesString },
})

type DataTableFeatures = typeof features

// ---------------------------------------------------------------------------
// Columns
// ---------------------------------------------------------------------------

const columnHelper = createColumnHelper<DataTableFeatures, BrewEntry>()

const columns = columnHelper.columns([
  columnHelper.accessor("datetime", {
    header: "Date",
    cell: (info) => {
      const date = new Date(info.getValue())
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    },
    size: 140,
  }),
  columnHelper.accessor("beanName", {
    header: "Bean",
    filterFn: "includesString",
    size: 220,
  }),
  columnHelper.accessor("grinder", {
    header: "Grinder",
    filterFn: "includesString",
    size: 120,
  }),
  columnHelper.accessor("grindSetting", {
    header: "Grind",
    filterFn: "includesString",
    size: 80,
  }),
  columnHelper.accessor("doseIn", {
    header: "Dose (g)",
    size: 80,
  }),
  columnHelper.accessor("yieldOut", {
    header: "Yield (g)",
    size: 80,
  }),
  columnHelper.accessor("timeTaken", {
    header: "Time (s)",
    size: 80,
  }),
  columnHelper.accessor("rating", {
    header: () => <div className="text-right">Rating</div>,
    cell: (info) => {
      const rating = info.getValue()
      if (rating === null) return <div className="text-right">—</div>
      return (
        <div className="text-right">
          {"★".repeat(rating) + "☆".repeat(5 - rating)}
        </div>
      )
    },
    size: 100,
  }),
])

// ---------------------------------------------------------------------------
// Placeholder data
// ---------------------------------------------------------------------------

const brewEntries: BrewEntry[] = [
  {
    id: "b1",
    datetime: "2025-07-15T08:30:00",
    beanName: "Ethiopia Yirgacheffe",
    grinder: "Niche Zero",
    grindSetting: "18",
    doseIn: 18.0,
    yieldOut: 36.5,
    timeTaken: 28,
    rating: 4,
  },
  {
    id: "b2",
    datetime: "2025-07-14T09:15:00",
    beanName: "Colombia Huila",
    grinder: "DF64",
    grindSetting: "5",
    doseIn: 18.2,
    yieldOut: 40.0,
    timeTaken: 31,
    rating: 5,
  },
  {
    id: "b3",
    datetime: "2025-07-13T07:45:00",
    beanName: "Brazil Santos",
    grinder: "Niche Zero",
    grindSetting: "20",
    doseIn: 17.5,
    yieldOut: 35.0,
    timeTaken: 26,
    rating: 3,
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PlaceholderTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useTable({
    features,
    data: brewEntries,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: (updater) => {
      setPagination(
        typeof updater === "function" ? updater(pagination) : updater,
      )
    },
  })

  const currentPage = table.state.pagination.pageIndex
  const pageSize = table.state.pagination.pageSize
  const rowCount = table.getRowCount()
  const startRow = currentPage * pageSize + 1
  const endRow = Math.min(startRow + pageSize - 1, rowCount)

  return (
    <div className="w-full space-y-4">
      <div className="w-full overflow-hidden rounded-md border">
        <Table className="table-auto w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-black hover:!bg-black">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 text-white"
                  >
                    {!header.isPlaceholder && (
                      <span className="truncate">
                        <table.FlexRender header={header} />
                      </span>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="bg-black/90 hover:bg-mauve-900/70"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <div className="truncate">
                        <table.FlexRender cell={cell} />
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between gap-8">
        {/* Page size selector */}
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-sm whitespace-nowrap">
            Rows per page
          </span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 25, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page info */}
        <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
          <p className="text-muted-foreground text-sm whitespace-nowrap">
            <span className="text-foreground">
              {startRow}-{endRow}
            </span>{" "}
            of{" "}
            <span className="text-foreground">{rowCount}</span>
          </p>
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8 p-0"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 p-0"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
