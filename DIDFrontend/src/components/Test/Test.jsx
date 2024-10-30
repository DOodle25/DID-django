import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
} from "@nextui-org/react";
import PlusIcon from "../icons/PlusIcon";
import VerticalDotsIcon from "../icons/VerticalDotsIcon";
import SearchIcon from "../icons/SearchIcon";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const API_BASE_URL =
    // "https://didbackend.onrender.com";
    // "http://localhost:5000";
    import.meta.env.VITE_BACKEND_URL;
  const columns = [
    { name: "SR.NO", uid: "srno", sortable: true },
    { name: "SCHEME NAME", uid: "schemename", sortable: true },
    { name: "MINISTRY", uid: "ministry", sortable: true },
    { name: "DESCRIPTION", uid: "desc" },
    { name: "PLACE", uid: "place" },
    { name: "FUND GRANTED", uid: "moneygranted", sortable: true },
    { name: "FUND SPENT", uid: "moneyspent", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
  ];

  const statusOptions = [
    { name: "Approved", uid: "approved" },
    { name: "Pending Approval", uid: "pending-approval" },
    { name: "In Progress", uid: "in-progress" },
    { name: "Completed", uid: "completed" },
    { name: "Pending", uid: "pending" },
  ];

  const statusColorMap = {
    approved: "success",
    "pending-approval": "warning",
    "in-progress": "primary",
    completed: "success",
    pending: "warning",
  };

  const INITIAL_VISIBLE_COLUMNS = [
    "srno",
    "schemename",
    "ministry",
    "desc",
    "place",
    "moneygranted",
    "moneyspent",
    "status",
    "actions",
  ];

  const [schemes, setSchemes] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    INITIAL_VISIBLE_COLUMNS
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "srno",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState({
    isOpen: false,
    schemeDetails: null,
    editMode: false,
    deleteMode: false,
  });
  const [editedScheme, setEditedScheme] = useState({});

  const fetchSchemes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/getschemes`, {
        withCredentials: true,
      });

      console.log(res.data);
      if (res.status !== 200) {
        navigate("/login");
        const error = new Error(res.error);
        throw error;
      }
      setSchemes(res.data.schemes);
      console.log("Schemes:", schemes);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleView = (schemeDetails) => {
    console.log("View Scheme:", schemeDetails);
    setModalData({
      isOpen: true,
      schemeDetails,
    });
  };

  const handleEdit = (schemeDetails) => {
    console.log("Edit Scheme:", schemeDetails);
    setEditedScheme({ ...schemeDetails });
    setModalData({
      isOpen: true,
      schemeDetails,
      editMode: true,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/updatescheme/${editedScheme._id}`,
        editedScheme,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }

      setSchemes((prevSchemes) =>
        prevSchemes.map((scheme) =>
          scheme._id === editedScheme._id ? editedScheme : scheme
        )
      );

      setModalData({
        ...modalData,
        isOpen: false,
      });

      // Use react-hot-toast's promise property to handle toast after it is dismissed
      const successToast = toast.success("Scheme edited successfully!");
      await successToast.promise;

      // Now you can navigate after the toast is dismissed
    } catch (error) {
      toast.error("Error editing scheme!");
      navigate("/login");
    }
  };

  const handleDelete = (schemeDetails) => {
    console.log("Delete Scheme:", schemeDetails);
    setEditedScheme({ ...schemeDetails });
    setModalData({
      isOpen: true,
      schemeDetails,
      deleteMode: true,
    });
  };

  const handleConfirmDelete = async () => {
    console.log("Confirm Delete Scheme:", editedScheme._id);

    if (!editedScheme._id) {
      console.error("Invalid scheme ID for deletion");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/deletescheme/${editedScheme._id}`,
        editedScheme,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setSchemes((prevSchemes) =>
          prevSchemes.filter((scheme) => scheme._id !== editedScheme._id)
        );
        setModalData({
          ...modalData,
          isOpen: false,
        });
        const successToast = toast.success("Scheme deleted successfully!");
        await successToast.promise;
      } else {
        toast.error("Failed to delete scheme.");
      }
    } catch (error) {
      toast.error("Error deleting scheme:", error.message);
    }
  };

  const handleCloseModal = () => {
    console.log("Close Modal");
    setModalData({
      isOpen: false,
      schemeDetails: null,
      editMode: false,
      deleteMode: false,
    });
    setEditedScheme({});
  };

  useEffect(() => {
    console.log("Fetch Schemes");
    fetchSchemes();
  }, []);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter(
      (column) => visibleColumns.includes(column.uid) // Change to array
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredSchemes = [...schemes];

    if (hasSearchFilter) {
      filteredSchemes = filteredSchemes.filter((scheme) =>
        scheme.schemename.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      statusFilter.length !== statusOptions.length
    ) {
      filteredSchemes = filteredSchemes.filter((scheme) =>
        statusFilter.includes(scheme.status)
      );
    }

    return filteredSchemes;
  }, [schemes, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((scheme, columnKey) => {
    const cellValue = scheme[columnKey];

    switch (columnKey) {
      case "srno":
        return <p className="text-bold text-small capitalize">{cellValue}</p>;
      case "schemename":
      case "ministry":
      case "desc":
      case "place":
      case "moneygranted":
      case "moneyspent":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[scheme.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <div onClick={() => handleView(scheme)}>View</div>
                </DropdownItem>
                <DropdownItem>
                  <div onClick={() => handleEdit(scheme)}>Edit</div>
                </DropdownItem>
                <DropdownItem>
                  <div onClick={() => handleDelete(scheme)}>Delete</div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <Toaster />
        </div>
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {schemes.length} schemes
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    schemes.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div>
      {error && (
        <Chip
          variant="dot"
          color="danger"
          className="my-2 flex mx-auto text-red-700 text-medium font-mono"
        >
          Error: {error}
        </Chip>
      )}
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No schemes found"} items={sortedItems}>
          {(item, index) => (
            <TableRow key={item.srno || index}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <SchemeModal
        modalData={modalData}
        editedScheme={editedScheme}
        onEdit={handleSaveEdit}
        onDelete={handleConfirmDelete}
        onClose={handleCloseModal}
        onInputChange={(field, value) =>
          setEditedScheme({ ...editedScheme, [field]: value })
        }
      />
    </div>
  );
}

const SchemeModal = ({
  modalData,
  editedScheme,
  onEdit,
  onDelete,
  onClose,
  onInputChange,
}) => {
  const { isOpen, schemeDetails, editMode, deleteMode } = modalData;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {editMode && (
          <ModalHeader>Edit Scheme: {editedScheme.schemename}</ModalHeader>
        )}
        {deleteMode && <ModalHeader>Delete Scheme</ModalHeader>}
        <ModalBody>
          {schemeDetails && (
            <>
              <p>{schemeDetails.desc}</p>
              <p>Ministry: {schemeDetails.ministry}</p>
              <p>Place: {schemeDetails.place}</p>
              <p>Time of Scheme Added: {schemeDetails.timeOfschemeAdded}</p>
              <p>Date: {schemeDetails.date}</p>
            </>
          )}
          {editMode && (
            <>
              <Input
                label="Scheme Name"
                value={editedScheme.schemename}
                onChange={(e) => onInputChange("schemename", e.target.value)}
              />
              <Input
                label="Ministry"
                value={editedScheme.ministry}
                onChange={(e) => onInputChange("ministry", e.target.value)}
              />
              <Input
                label="Description"
                value={editedScheme.desc}
                onChange={(e) => onInputChange("desc", e.target.value)}
              />
              <Input
                label="Place"
                value={editedScheme.place}
                onChange={(e) => onInputChange("place", e.target.value)}
              />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {editMode && (
            <>
              <Button color="primary" onPress={onEdit}>
                Save Changes
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
            </>
          )}
          {deleteMode && (
            <>
              <Button color="primary" onPress={onDelete}>
                Confirm Delete
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
