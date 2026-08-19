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
  Copy,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/shadcn-ui/button"
import { Input } from "@/components/ui/shadcn-ui/input"
import { Bean } from "@/types/bean"
import { getPlaceholderImage } from "@/lib/PlaceholderPreview"
import Image from "next/image"

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
// Columns
// ---------------------------------------------------------------------------

const columnHelper = createColumnHelper<DataTableFeatures, Bean>()

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Name",
    filterFn: "includesString",
    size: 220,
    minSize: 150,
    cell: (info) => {
      const bean = info.row.original
      const imageUrl = bean.imageUrl
      const imageOrPlaceholder = imageUrl
        ? imageUrl
        : getPlaceholderImage(bean.id)

      return (
        <div className="flex items-center gap-2">
          <div className="relative size-10 shrink-0 overflow-hidden rounded bg-neutral-800">
            {imageOrPlaceholder ? (
              <Image
                src={imageOrPlaceholder}
                alt={info.getValue()}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <span className="size-5 rounded-full border border-red-300 bg-red-700 text-center text-xs font-black text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.8),0_0_20px_rgba(239,68,68,0.4),0_0_30px_rgba(239,68,68,0.2)]">
                  !
                </span>
              </div>
            )}
          </div>
          <span className="pl-2 truncate">{info.getValue()}</span>
        </div>
      )
    },
  }),

  columnHelper.accessor("roaster", {
    header: "Roaster",
    filterFn: "includesString",
    size: 130,
    minSize: 80,
  }),
  columnHelper.accessor("roastLevel", {
    header: "Roast Level",
    cell: (info) => {
      const level = info.getValue()
      if (!level) return "—"
      return level.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
    },
    size: 110,
    minSize: 80,
  }),
  columnHelper.accessor("process", {
    header: "Process",
    cell: (info) => {
      const process = info.getValue()
      if (!process) return "—"
      return process.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
    },
    size: 110,
    minSize: 80,
  }),
  columnHelper.accessor("packageWeight", {
    header: "Package (g)",
    cell: (info) => info.getValue() ?? "—",
    enableGlobalFilter: false,
    size: 90,
    minSize: 70,
  }),
  columnHelper.accessor("roastDate", {
    header: "Roast Date",
    cell: (info) => {
      const date = info.getValue()
      if (!date) return "—"
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    },
    enableGlobalFilter: false,
    size: 110,
    minSize: 80,
  }),
  columnHelper.display({
    id: "duplicate",
    header: () => <div className="text-right">Duplicate</div>,
    enableGlobalFilter: false,
    size: 70,
    minSize: 70,
  }),
])

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ArchivedBeansTableProps {
  beans: Bean[]
  onDuplicate: (bean: Omit<Bean, "id" | "imageUrl" | "archived">) => void
  onEditBean: (bean: Bean) => void
}

export function ArchivedBeansTable({ beans, onDuplicate, onEditBean }: ArchivedBeansTableProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useTable({
    features,
    data: beans,
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
          placeholder="Search archived beans..."
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
                    className="h-14 text-white"
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
                  className="bg-black/90 hover:bg-mauve-900/40 cursor-pointer"
                  onClick={(e) => {
                    // Don't open modal if clicking the duplicate button
                    if ((e.target as HTMLElement).closest("button")) return
                    onEditBean(row.original)
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id === "duplicate" ? (
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const bean = row.original
                              onDuplicate({
                                name: bean.name,
                                roaster: bean.roaster,
                                roastLevel: bean.roastLevel,
                                packageWeight: bean.packageWeight,
                                currentWeight: bean.packageWeight,
                                decaf: bean.decaf,
                                process: bean.process,
                                descriptors: bean.descriptors,
                                notes: bean.notes,
                                roastDate: null,
                              })
                            }}
                          >
                            <Copy className="size-4" />
                          </Button>
                        </div>
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
                  No archived beans.
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
