import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown } from "lucide-react";
import * as React from "react";

import { PlanetDataType } from "@/components/Planets";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { isEqual, uniqWith } from "lodash";

export type Payment = {
  id: string;
  amount: number;
  plName: "pending" | "processing" | "success" | "failed";
  releaseDate: string;
};

export const getColumns = ({ sorting }: { sorting: SortingState }) => {
  const sortingData = (sorting && sorting.length > 0 && sorting[0]) ?? [];

  return [
    {
      accessorKey: "plName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Planet Name
            {sortingData && sortingData.id === "plName" && sortingData.desc ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : sortingData &&
              sortingData.id === "plName" &&
              !sortingData.desc ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row.getValue("plName")}</div>,
    },
    {
      accessorKey: "releaseDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Release Date
            {!sortingData ||
            (sortingData.id === "releaseDate" && sortingData.desc) ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : sortingData.id === "releaseDate" && !sortingData.desc ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("releaseDate")}</div>
      ),
    },
    {
      accessorKey: "plRade",
      header: ({ column }) => {
        return (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              className=""
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Radius
              {sortingData &&
              sortingData.id === "plRade" &&
              sortingData.desc ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : sortingData &&
                sortingData.id === "plRade" &&
                !sortingData.desc ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("plRade"));

        return <div className="text-right font-medium">{amount}</div>;
      },
    },
  ] as ColumnDef<PlanetDataType>[];
};

export function DataTable({ data }: { data: PlanetDataType[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [tableData, setTableData] = React.useState<PlanetDataType[]>(
    uniqWith(data, isEqual)
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: tableData,
    columns: getColumns({ sorting }),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 flex-wrap-reverse md:flex-nowrap">
        <Input
          placeholder="Filter Planets..."
          value={(table.getColumn("plName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("plName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex justify-between w-full mb-2 md:mb-0 md:w-auto md:justify-end space-x-6">
          <div className="flex items-center space-x-2">
            <Label htmlFor="duplicates">Show Duplicates</Label>
            <Switch
              onCheckedChange={(e) => {
                if (e) {
                  setTableData(data);
                } else {
                  setTableData(uniqWith(data, isEqual));
                }
              }}
              id="duplicates"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {config.find((x) => x.id === column.id)?.displayName ??
                        column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-base">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={getColumns({ sorting }).length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between md:justify-end md:space-x-10 py-4">
        <div className="flex-1 text-sm text-muted-foreground hidden md:block">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() < 1 ? "1" : table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="text-sm text-muted-foreground md:hidden flex items-center justify-center mb-4 w-full">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>
    </div>
  );
}

const config = [
  {
    id: "plName",
    displayName: "Planet Name",
  },
  {
    id: "releaseDate",
    displayName: "Release Date",
  },
  {
    id: "plRade",
    displayName: "Planet Radius",
  },
];
