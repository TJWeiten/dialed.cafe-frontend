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
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  tableFeatures,
  useTable,
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
  Search,
  ThumbsUp,
  Minus,
  ThumbsDown,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/shadcn-ui/button"
import { Input } from "@/components/ui/shadcn-ui/input"
import { BrewEntry, Rating } from "@/types/brew"

// ---------------------------------------------------------------------------
// Table features
// ---------------------------------------------------------------------------

const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  columnSizingFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { includesString: filterFn_includesString },
})

type DataTableFeatures = typeof features

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function RatingIcon({ rating }: { rating: Rating | null }) {
  if (rating === "THUMBS_UP") return <ThumbsUp className="size-4 text-green-400" />
  if (rating === "NEUTRAL") return <Minus className="size-4 text-yellow-400" />
  if (rating === "THUMBS_DOWN") return <ThumbsDown className="size-4 text-red-400" />
  return <span className="text-muted-foreground">—</span>
}

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
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    },
    size: 130,
  }),
  columnHelper.accessor("beanName", {
    header: "Bean",
    filterFn: "includesString",
    size: 180,
  }),
  columnHelper.accessor("grinderName", {
    header: "Grinder",
    filterFn: "includesString",
    size: 110,
  }),
  columnHelper.accessor("grindSetting", {
    header: "Grind",
    filterFn: "includesString",
    size: 70,
  }),
  columnHelper.accessor("doseIn", {
    header: "Dose",
    cell: (info) => `${info.getValue()}g`,
    size: 65,
  }),
  columnHelper.accessor("yieldOut", {
    header: "Yield",
    cell: (info) => `${info.getValue()}g`,
    size: 65,
  }),
  columnHelper.display({
    id: "ratio",
    header: "Ratio",
    cell: (info) => {
        const { doseIn, yieldOut } = info.row.original;
        if (!doseIn || !yieldOut) return "—";
        return `${(yieldOut / doseIn).toFixed(2)}`;
    },
    size: 60,
  }),
  columnHelper.accessor("timeTaken", {
    header: "Time",
    cell: (info) => `${info.getValue()}s`,
    size: 60,
  }),
  columnHelper.accessor("rating", {
    header: () => <div className="text-right">Rating</div>,
    cell: (info) => (
      <div className="flex justify-end">
        <RatingIcon rating={info.getValue()} />
      </div>
    ),
    enableGlobalFilter: false,
    size: 65,
  }),
])

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface BrewLedgerTableProps {
  entries: BrewEntry[]
  onSelectEntry: (entry: BrewEntry) => void
}

export function BrewLedgerTable({ entries, onSelectEntry }: BrewLedgerTableProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useTable({
    features,
    data: entries,
    columns,
    state: {
      pagination,
      globalFilter,
    },
    onPaginationChange: (updater) => {
      setPagination(
        typeof updater === "function" ? updater(pagination) : updater,
      )
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
  })

  const currentPage = table.state.pagination.pageIndex
  const pageSize = table.state.pagination.pageSize
  const rowCount = table.getRowCount()
  const startRow = currentPage * pageSize + 1
  const endRow = Math.min(startRow + pageSize - 1, rowCount)

  return (
    <div className="w-full space-y-4">
      {/* Search input */}
      <div className="w-xs relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search brews..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="w-full overflow-hidden rounded-md border">
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-black hover:!bg-black">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
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
                  className="bg-black/90 hover:bg-black/60 cursor-pointer"
                  onClick={() => onSelectEntry(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id === "baristaCopilotComment" ? (
                        cell.getValue() ? (
                          <MessageSquare className="size-4 text-muted-foreground" />
                        ) : null
                      ) : (
                        <div className="truncate">
                          <table.FlexRender cell={cell} />
                        </div>
                      )}
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
                  No brew entries yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between gap-8">
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

        <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
          <p className="text-muted-foreground text-sm whitespace-nowrap">
            <span className="text-foreground">
              {startRow}-{endRow}
            </span>{" "}
            of{" "}
            <span className="text-foreground">{rowCount}</span>
          </p>
        </div>

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
