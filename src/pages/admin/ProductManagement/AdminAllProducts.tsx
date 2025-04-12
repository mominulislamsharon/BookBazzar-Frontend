import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteProductMutation,
  useGetAllBooksQuery,
} from "@/redux/features/admin/productBookManajment.api";
import { TQueryParams } from "@/types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AdminAllProducts = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const limit = 5;

  const [deleteProduct] = useDeleteProductMutation();

  const queryParams: TQueryParams[] = [];

  if (category) {
    queryParams.push({ category: "category", value: category });
  }

  queryParams.push({ category: "page", value: String(page) });
  queryParams.push({ category: "limit", value: String(limit) });

  const { data: productData, refetch } = useGetAllBooksQuery(queryParams);
  const bookDataTable = Array.isArray(productData?.data)
    ? productData.data
    : [];
  const totalPages = productData?.meta?.totalPages || 1;

  // 🟦 Delete Handler
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("✅ Book deleted successfully");
      refetch();
    } catch (err) {
      toast.error("❌ Failed to delete the book");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-4">
        <select
          className="border p-2 rounded"
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          value={category}
        >
          <option value="">All</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="SelfDevelopment">Self Development</option>
          <option value="Poetry">Poetry</option>
          <option value="Religious">Religious</option>
        </select>
      </div>

      <Table>
        <TableCaption>A list of all books in your collection.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookDataTable.length > 0 ? (
            bookDataTable.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell className="text-right">
                  ${book.price ? book.price.toFixed(2) : "0.00"}
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Link
                    to={`/admin/products/updateProducts/${book._id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No books available.</TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              $
              {bookDataTable
                .reduce((total, book) => total + (book.price || 0), 0)
                .toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-end gap-2">
        <button
          className="px-3 py-1 border rounded"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span className="px-2 py-1">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminAllProducts;
