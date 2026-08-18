import React, { useCallback, useMemo, useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Input,
    Dropdown,
    DropdownTrigger,
    User,
    DropdownItem,
    DropdownMenu,
    Button,
    Pagination,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Tooltip,
} from "@nextui-org/react";
import { BiDotsVertical, BiEdit, BiSearch } from "react-icons/bi";
import { capitalize } from "./../../utils/utils";
import AddProduct from "./AddProduct";
import { IoTrashBinOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import ModalProduct from "./ModalProduct";
import { deleteProductById } from "../../services/productService";
import { deleteImage } from "../../services/storage";
import CardProduct from "./CardProduct";

const columns = [
    { name: "NOMBRE", uid: "nombre", sortable: true },
    { name: "CANTIDAD", uid: "cantidad", sortable: true },
    { name: "PRECIO", uid: "precio", sortable: true },
    { name: "ACCIONES", uid: "acciones" },
];

const TableProduct = ({ products, fetchProducts }) => {
    const {
        isOpen: isModalViewOpen,
        onOpen: openModalView,
        onOpenChange: onOpenChangeView,
    } = useDisclosure();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [productModal, setProductModal] = useState();
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "nombre",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);
    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...products];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.nombre.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (
            statusFilter !== "all" &&
            Array.from(statusFilter).length !== statusOptions.length
        ) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status),
            );
        }

        return filteredUsers;
    }, [products, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = useCallback((product, columnKey) => {
        const cellValue = product[columnKey];

        switch (columnKey) {
            case "nombre":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: product.imageUrl }}
                        name={product.nombre}
                        description={product.descripcion}
                    />
                );
            case "cantidad":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            {product.stock}
                        </p>
                    </div>
                );
            case "precio":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            {product.precio}
                        </p>
                    </div>
                );
            case "acciones":
                return (
                    <div className="flex flex-row gap-3">
                        <Tooltip content="Ver">
                            <Button
                                isIconOnly
                                color="success"
                                className="text-white"
                                onPress={() => {
                                    setProductModal(product);
                                    openModalView();
                                }}
                            >
                                <BsEye />
                            </Button>
                        </Tooltip>
                        <Tooltip content="Editar">
                            <Button
                                isIconOnly
                                color="primary"
                                onPress={() => {
                                    setProductModal(product);
                                    onOpen();
                                }}
                            >
                                <BiEdit />
                            </Button>
                        </Tooltip>
                        <Tooltip content="Eliminar">
                            <Button
                                isIconOnly
                                color="danger"
                                onPress={async () => {
                                    await deleteImage(product.imageUrl);
                                    await deleteProductById(product.id);
                                    fetchProducts();
                                }}
                            >
                                <IoTrashBinOutline />
                            </Button>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex items-end justify-between gap-3">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<BiSearch />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <AddProduct />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-small text-default-400">
                        Total {products.length} productos
                    </span>
                    <label className="flex items-center text-small text-default-400">
                        Filas por pagina:
                        <select
                            className="bg-transparent text-small text-default-400 outline-none"
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
        onRowsPerPageChange,
        products.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="flex items-center justify-between px-2 py-2">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "Se han seleccionado todos los items"
                        : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
                </span>
                {console.log(selectedKeys)}
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden w-[30%] justify-end gap-2 sm:flex">
                    <Button
                        isDisabled={pages === 1}
                        size="sm"
                        variant="flat"
                        onPress={onPreviousPage}
                    >
                        Anterior
                    </Button>
                    <Button
                        isDisabled={pages === 1}
                        size="sm"
                        variant="flat"
                        onPress={onNextPage}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <>
            <Table
                aria-label="Productos"
                className="w-fit"
                isHeaderSticky
                bottomContent={bottomContent}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
                classNames={{
                    wrapper: "max-h-[550px]",
                }}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={
                                column.uid === "actions" ? "center" : "start"
                            }
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    emptyContent={"No hay productos"}
                    items={sortedItems}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <ModalProduct
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                defaultValues={productModal}
                fetchProducts={fetchProducts}
            />
            <Modal isOpen={isModalViewOpen} onOpenChange={onOpenChangeView}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Preview de producto
                            </ModalHeader>
                            <ModalBody>
                                <CardProduct product={productModal} />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default TableProduct;
