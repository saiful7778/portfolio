import {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeadCell,
  TableMain,
  TableRow,
} from "./TableComponent";

const Table = Object.assign(TableMain, {
  caption: TableCaption,
  head: TableHead,
  headCell: TableHeadCell,
  body: TableBody,
  row: TableRow,
  cell: TableCell,
});

export default Table;
