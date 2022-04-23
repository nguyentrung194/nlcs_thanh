import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import {
  Checkbox,
  Paper,
  Typography,
  Toolbar,
  TableSortLabel,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  Box,
  Table,
  TableBody,
  IconButton,
  Button,
  Tooltip,
  FormControlLabel,
  Switch,
  InputBase,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { MenuCustom, SetupCustom, FilterCustom } from "./menu";

import { visuallyHidden } from "@mui/utils";
import {
  stringAvatar,
  DataBooking,
  DataRoom,
  DataRoomType,
  DataStock,
  DataExpenses,
  DataBookingReport,
  DataCustomer,
  DataInvoices,
} from "../../../common/lib";
import { SelectFilter } from "./common";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

const headCellsInvoices: HeadCell<DataInvoices>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "#",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: true,
    label: "Amount",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

const headCellsCustomer: HeadCell<DataCustomer>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "User",
  },
  {
    id: "lastPackage",
    numeric: false,
    disablePadding: false,
    label: "Last Package",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: true,
    label: "Phone",
  },
  {
    id: "verified",
    numeric: false,
    disablePadding: false,
    label: "Verified",
  },
  {
    id: "lastCheckOut",
    numeric: false,
    disablePadding: false,
    label: "Last Check Out",
  },
  {
    id: "group",
    numeric: false,
    disablePadding: true,
    label: "Group",
  },
];

const headCellsRoomType: HeadCell<DataRoomType>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "#",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "rent",
    numeric: true,
    disablePadding: true,
    label: "Rent",
  },
  {
    id: "shortCode",
    numeric: false,
    disablePadding: false,
    label: "Short Code",
  },
  {
    id: "noOfRoom",
    numeric: true,
    disablePadding: false,
    label: "No Of Room",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
];

const headCellsStock: HeadCell<DataStock>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "#",
  },
  {
    id: "productName",
    numeric: false,
    disablePadding: false,
    label: "Product Name",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: true,
    label: "Quantity",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

const headCellsBookingReport: HeadCell<DataBookingReport>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "#",
  },
  {
    id: "roomType",
    numeric: false,
    disablePadding: false,
    label: "Room Type",
  },
  {
    id: "from",
    numeric: false,
    disablePadding: true,
    label: "From",
  },
  {
    id: "to",
    numeric: false,
    disablePadding: false,
    label: "To",
  },
  {
    id: "totalAmount",
    numeric: true,
    disablePadding: false,
    label: "Total Amount",
  },
];

const headCellsExpenses: HeadCell<DataExpenses>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "#",
  },
  {
    id: "supplierName",
    numeric: false,
    disablePadding: false,
    label: "Supplier Name",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "Description",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Amount",
  },
];

const headCellsRoom: HeadCell<DataRoom>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "no",
    numeric: false,
    disablePadding: false,
    label: "Room No.",
  },
  {
    id: "roomType",
    numeric: false,
    disablePadding: true,
    label: "Room Type",
  },
  {
    id: "AC",
    numeric: false,
    disablePadding: false,
    label: "AC/Non AC",
  },
  {
    id: "meal",
    numeric: false,
    disablePadding: false,
    label: "Meal",
  },
  {
    id: "bedCapacity",
    numeric: false,
    disablePadding: false,
    label: "Bed Capacity",
  },
  {
    id: "rent",
    numeric: true,
    disablePadding: true,
    label: "Rent",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
];

const headCells: HeadCell<DataBooking>[] = [
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Customer",
  },
  {
    id: "package_p",
    numeric: false,
    disablePadding: false,
    label: "Package",
  },
  {
    id: "booking",
    numeric: false,
    disablePadding: false,
    label: "Booking",
  },
  {
    id: "roomType",
    numeric: false,
    disablePadding: false,
    label: "Room Type",
  },
  {
    id: "arrive",
    numeric: false,
    disablePadding: true,
    label: "Arrive",
  },
  {
    id: "payment",
    numeric: false,
    disablePadding: true,
    label: "Payment",
  },
];

interface EnhancedTableProps<T> {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell<T>[];
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      // (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {props.headCells.map((headCell: HeadCell<T>, index: any) => (
          <TableCell
            key={index}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell key={"function"} align={"center"} padding={"normal"}>
          Function
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
const EnhancedTableHeadBooking: <DataBooking>(
  props: EnhancedTableProps<DataBooking>
) => JSX.Element = EnhancedTableHead;

const EnhancedTableHeadRoom: <DataRoom>(
  props: EnhancedTableProps<DataRoom>
) => JSX.Element = EnhancedTableHead;

const EnhancedTableHeadRoomType: <DataRoomType>(
  props: EnhancedTableProps<DataRoomType>
) => JSX.Element = EnhancedTableHead;

const EnhancedTableHeadStock: <DataStock>(
  props: EnhancedTableProps<DataStock>
) => JSX.Element = EnhancedTableHead;

const EnhancedTableHeadExpenses: <DataExpenses>(
  props: EnhancedTableProps<DataExpenses>
) => JSX.Element = EnhancedTableHead;

const EnhancedTableHeadBookingReport: <DataBookingReport>(
  props: EnhancedTableProps<DataBookingReport>
) => JSX.Element = EnhancedTableHead;

const EnhancedTableHeadCustomer: <DataCustomer>(
  props: EnhancedTableProps<DataCustomer>
) => JSX.Element = EnhancedTableHead;

const EnhancedTableHeadInvoices: <DataInvoices>(
  props: EnhancedTableProps<DataInvoices>
) => JSX.Element = EnhancedTableHead;

interface EnhancedTableToolbarProps {
  numSelected: number;
  selectOptions: any[];
  selectOptionsLeft: any[];
  selectOptions1: any[];
  selectOptions2?: any[];
  title: string;
  emailVerified?: boolean;
}

const EnhancedTableToolbarCustom = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <div>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        <Typography sx={{ flex: "1 1 100%" }} id="tableTitle" component="div">
          <div className="flex items-center space-x-3 py-3">
            <SelectFilter
              values={props.selectOptionsLeft}
              initValue={""}
              name="Bulk Action"
            />
            <Button variant="contained" disabled={true}>
              Apply
            </Button>
            {numSelected > 0 ? (
              <div className="flex items-center space-x-3">
                <Typography
                  sx={{ flex: "1 1 100%" }}
                  color="inherit"
                  variant="subtitle1"
                  component="div"
                >
                  {numSelected} selected
                </Typography>
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ) : null}
          </div>
        </Typography>
        <div className="flex items-center space-x-3">
          <div className="border border-l-0 border-t-0 border-b-0">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </div>
          <div>
            <FilterCustom {...props} />
          </div>
          <div>
            <SetupCustom />
          </div>
        </div>
      </Toolbar>
    </div>
  );
};

interface Bookings {
  id: string;
  email: string;
  booking: "Pending" | "Active";
  package_p: string;
  roomType: string;
  arrive: string;
  payment: "Paid" | "Due";
  name: string;
}

export const BookingTable = ({ rows }: { rows: Bookings[] }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof DataBooking>("id");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataBooking
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbarCustom
          emailVerified
          numSelected={selected.length}
          selectOptionsLeft={[
            { value: "1", text: "Send Email" },
            { value: "2", text: "Delete Booking" },
          ]}
          selectOptions={[
            { key: "Send Email", text: "Send Email", path: "" },
            { key: "Edit", text: "Edit", path: "" },
          ]}
          selectOptions1={[
            { value: "0", text: "Any Status" },
            { value: "1", text: "Paid" },
            { value: "2", text: "Due" },
          ]}
          selectOptions2={[
            { value: "0", text: "Any Type" },
            { value: "1", text: "Single" },
            { value: "2", text: "Double" },
            { value: "3", text: "Delux" },
            { value: "4", text: "Super Delux" },
          ]}
          title={"Filter Bookings"}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHeadBooking
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                     
                      <TableCell align="right">
                        <div className="flex items-center space-x-1">
                          <div>
                            <Avatar
                              className=""
                              {...stringAvatar(
                                { name: row.name, url: "" },
                                {
                                  width: 30,
                                  height: 30,
                                  fontSize: "15px",
                                }
                              )}
                              variant="circular"
                            />
                          </div>
                          <div>
                            <Typography
                              sx={{
                                fontSize: 12,
                                fontWeight: 700,
                                margin: "4px 0 0 0",
                              }}
                              color=""
                              gutterBottom
                            >
                              {row.name}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 11, margin: "4px 0 0 0" }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {row.email}
                            </Typography>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell align="center">{row.package_p}</TableCell>
                      <TableCell align="center">{row.booking}</TableCell>
                      <TableCell align="center">{row.roomType}</TableCell>
                      <TableCell align="center">{row.arrive}</TableCell>
                      <TableCell align="center">{row.payment}</TableCell>
                      <TableCell align="center">
                        <MenuCustom
                          optionsBooking={[
                            { key: "Send Email", text: "Send Email", path: "" },
                            {
                              key: "Edit Booking",
                              text: "Edit Booking",
                              path: `/admin/bookings/edit-booking/${row.id}`,
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export const RoomTable = ({ rows }: { rows: DataRoom[] }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof DataRoom>("no");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataRoom
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbarCustom
          numSelected={selected.length}
          selectOptionsLeft={[
            { value: "1", text: "Send Email" },
            { value: "2", text: "Delete Booking" },
          ]}
          selectOptions={[
            {
              key: "Add Room",
              text: "Add Room",
              path: `/admin/rooms/add-room`,
            },
            {
              key: "Import Room",
              text: "Import Room",
              path: `/admin/rooms/import-rooms`,
            },
          ]}
          selectOptions1={[
            { value: "0", text: "Any Status" },
            { value: "1", text: "Paid" },
            { value: "2", text: "Due" },
          ]}
          selectOptions2={[
            { value: "0", text: "Any Type" },
            { value: "1", text: "Single" },
            { value: "2", text: "Double" },
            { value: "3", text: "Delux" },
            { value: "4", text: "Super Delux" },
          ]}
          title={"Filter Rooms"}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHeadRoom
              headCells={headCellsRoom}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.no}</TableCell>
                      <TableCell align="center">{row.roomType}</TableCell>
                      <TableCell align="center">{row.AC}</TableCell>
                      <TableCell align="center">{row.meal}</TableCell>
                      <TableCell align="center">{row.bedCapacity}</TableCell>
                      <TableCell align="center">{row.rent}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        <MenuCustom
                          optionsBooking={[
                            {
                              key: "Edit Room",
                              text: "Edit Room",
                              path: `/admin/rooms/edit-room/${row.id}`,
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export const RoomTypeTable = ({ rows }: { rows: DataRoomType[] }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof DataRoomType>("id");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataRoomType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbarCustom
          numSelected={selected.length}
          selectOptionsLeft={[
            { value: "1", text: "Send Email" },
            { value: "2", text: "Delete Booking" },
          ]}
          selectOptions={[
            {
              key: "Add Room Type",
              text: "Add Room Type",
              path: `/admin/rooms/add-room-type`,
            },
            {
              key: "Import Room Type",
              text: "Import Room Type",
              path: `/admin/rooms/import-rooms-type`,
            },
          ]}
          selectOptions1={[
            { value: "", text: "Any Status" },
            { value: "Active", text: "Active" },
            { value: "Inactive", text: "Inactive" },
          ]}
          // selectOptions2={[
          //   { value: "0", text: "Any Type" },
          //   { value: "1", text: "Single" },
          //   { value: "2", text: "Double" },
          //   { value: "3", text: "Delux" },
          //   { value: "4", text: "Super Delux" },
          // ]}
          title={"Filter Rooms Types"}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHeadRoomType
              headCells={headCellsRoomType}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.rent}</TableCell>
                      <TableCell align="center">{row.shortCode}</TableCell>
                      <TableCell align="center">{row.noOfRoom}</TableCell>
                      <TableCell align="center">
                        {[...Array.from(Array(parseInt(row.type)).keys())].map(
                          (el) => {
                            return (
                              <StarIcon
                                sx={{ width: "16px" }}
                                className="text-yellow-400/80"
                              />
                            );
                          }
                        )}
                        {[
                          ...Array.from(Array(5 - parseInt(row.type)).keys()),
                        ].map((el) => {
                          return (
                            <StarBorderOutlinedIcon
                              sx={{ width: "16px" }}
                              className="text-yellow-400/80"
                            />
                          );
                        })}
                      </TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        <MenuCustom
                          optionsBooking={[
                            {
                              key: "Edit Room Type",
                              text: "Edit Room Type",
                              path: `/admin/rooms/edit-room-type/${row.id}`,
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export const StockTable = ({ rows }: { rows: DataStock[] }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof DataStock>("id");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataStock
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbarCustom
          numSelected={selected.length}
          selectOptionsLeft={[
            { value: "1", text: "Edit Selected" },
            { value: "2", text: "Delete Selected" },
          ]}
          selectOptions={[
            {
              key: "Add Stock",
              text: "Add Stock",
              path: `/admin/reports/stocks/add-stock`,
            },
            {
              key: "Import Stocks",
              text: "Import Stocks",
              path: `/admin/reports/stocks/import-stocks`,
            },
          ]}
          selectOptions1={[
            { value: "", text: "Any Status" },
            { value: "Available", text: "Available" },
            { value: "Low", text: "Low" },
            { value: "Out of Stock", text: "Out of Stock" },
          ]}
          title={"Filter Stocks"}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHeadStock
              headCells={headCellsStock}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.productName}</TableCell>
                      <TableCell align="center">
                        {row.quantity + " " + row.unit}
                      </TableCell>
                      <TableCell align="center">{row.price} $</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        <MenuCustom
                          optionsBooking={[
                            {
                              key: "Edit Stock",
                              text: "Edit Stock",
                              path: `/admin/reports/stocks/edit-stock/${row.id}`,
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export const ExpensesTable = ({ rows }: { rows: DataExpenses[] }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof DataExpenses>("id");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataExpenses
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbarCustom
          numSelected={selected.length}
          selectOptionsLeft={[
            { value: "1", text: "Edit Selected" },
            { value: "2", text: "Delete Selected" },
          ]}
          selectOptions={[
            {
              key: "Add Expenses",
              text: "Add Expenses",
              path: `/admin/reports/expenses/add-expenses`,
            },
            {
              key: "Import Expenses",
              text: "Import Expenses",
              path: `/admin/reports/expenses/import-expenses`,
            },
          ]}
          selectOptions1={[
            { value: "", text: "Any Status" },
            { value: "Available", text: "Available" },
            { value: "Low", text: "Low" },
            { value: "Out of Stock", text: "Out of Stock" },
          ]}
          title={"Filter Expenses"}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHeadExpenses
              headCells={headCellsExpenses}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.supplierName}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.amount} $</TableCell>
                      <TableCell align="center">
                        <MenuCustom
                          optionsBooking={[
                            {
                              key: "Edit Expenses",
                              text: "Edit Expenses",
                              path: `/admin/reports/expenses/edit-expenses/${row.id}`,
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export const BookingReportTable = ({ rows }: { rows: DataBookingReport[] }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof DataBookingReport>("id");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataBookingReport
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbarCustom
          numSelected={selected.length}
          selectOptionsLeft={[
            { value: "1", text: "Edit Selected" },
            { value: "2", text: "Delete Selected" },
          ]}
          selectOptions={[
            {
              key: "Add Booking",
              text: "Add Booking",
              path: `/admin/reports/booking/add-booking`,
            },
            {
              key: "Import Booking",
              text: "Import Booking",
              path: `/admin/reports/booking/import-booking`,
            },
          ]}
          selectOptions1={[
            { value: "", text: "Any Status" },
            { value: "Available", text: "Available" },
            { value: "Low", text: "Low" },
            { value: "Out of Stock", text: "Out of Stock" },
          ]}
          title={"Filter Booking"}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHeadBookingReport
              headCells={headCellsBookingReport}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.roomType}</TableCell>
                      <TableCell align="center">{row.from}</TableCell>
                      <TableCell align="center">{row.to}</TableCell>
                      <TableCell align="center">{row.totalAmount} $</TableCell>
                      <TableCell align="center">
                        <MenuCustom
                          optionsBooking={[
                            {
                              key: "Edit Booking",
                              text: "Edit Booking",
                              path: `/admin/reports/booking/edit-booking/${row.id}`,
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export const CustomerTable = ({ rows }: { rows: DataCustomer[] }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof DataCustomer>("id");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataCustomer
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbarCustom
          emailVerified
          numSelected={selected.length}
          selectOptionsLeft={[
            { value: "1", text: "Send Email" },
            { value: "2", text: "Delete Booking" },
          ]}
          selectOptions={[
            { key: "Send Email", text: "Send Email", path: "" },
            { key: "Edit", text: "Edit", path: "" },
          ]}
          selectOptions1={[
            { value: "0", text: "Any Status" },
            { value: "1", text: "Paid" },
            { value: "2", text: "Due" },
          ]}
          selectOptions2={[
            { value: "0", text: "Any Type" },
            { value: "1", text: "Single" },
            { value: "2", text: "Double" },
            { value: "3", text: "Delux" },
            { value: "4", text: "Super Delux" },
          ]}
          title={"Filter Bookings"}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHeadCustomer
              headCells={headCellsCustomer}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="right">
                        <div className="flex items-center space-x-1">
                          <div>
                            <Avatar
                              className=""
                              {...stringAvatar(
                                { name: "A A", url: "" },
                                {
                                  width: 30,
                                  height: 30,
                                  fontSize: "15px",
                                }
                              )}
                              variant="circular"
                            />
                          </div>
                          <div>
                            <Typography
                              sx={{
                                fontSize: 12,
                                fontWeight: 700,
                                margin: "4px 0 0 0",
                              }}
                              color=""
                              gutterBottom
                            >
                              {row.name}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 11, margin: "4px 0 0 0" }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {row.email}
                            </Typography>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="center">{row.lastPackage}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.verified}</TableCell>
                      <TableCell align="center">{row.lastCheckOut}</TableCell>
                      <TableCell align="center">{row.group}</TableCell>
                      <TableCell align="center">
                        <MenuCustom
                          optionsBooking={[
                            { key: "Send Email", text: "Send Email", path: "" },
                            {
                              key: "Edit User",
                              text: "Edit User",
                              path: `/admin/customers/edit-customer/${row.id}`,
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export const InvoicesTable = ({ rows }: { rows: DataInvoices[] }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof DataInvoices>("id");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataInvoices
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbarCustom
          numSelected={selected.length}
          selectOptionsLeft={[
            { value: "1", text: "Edit Selected" },
            { value: "2", text: "Delete Selected" },
          ]}
          selectOptions={[
            {
              key: "Add Invoices",
              text: "Add Invoices",
              path: `/admin/payment/invoices-list/add-invoices`,
            },
            {
              key: "Import Invoices",
              text: "Import Invoices",
              path: `/admin/payment/invoices-list/import-invoices`,
            },
          ]}
          selectOptions1={[
            { value: "", text: "Any Status" },
            { value: "Available", text: "Available" },
            { value: "Low", text: "Low" },
            { value: "Out of Stock", text: "Out of Stock" },
          ]}
          title={"Filter Invoices"}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHeadInvoices
              headCells={headCellsInvoices}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.amount} $</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        <MenuCustom
                          optionsBooking={[
                            {
                              key: "Edit Invoices",
                              text: "Edit Invoices",
                              path: `/admin/payment/invoices-list/edit-invoices/${row.id}`,
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};
