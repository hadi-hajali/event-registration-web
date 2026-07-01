import { useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Technology",
      description: "Tech events",
      isActive: true,
    },
    {
      id: 2,
      name: "Business",
      description: "Business events",
      isActive: false,
    },
    {
      id: 3,
      name: "Design",
      description: "Design workshops",
      isActive: true,
    },
  ]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5081/api/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 409) {
        alert(
          "Cannot delete this category because it is being used."
        );
        return;
      }

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setCategories((prev) =>
        prev.filter((cat) => cat.id !== id)
      );
    } catch {
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Categories
          </h1>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            + New Category
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Description</th>
                <th className="border p-3 text-center">Active</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="border p-3">{cat.name}</td>

                  <td className="border p-3">
                    {cat.description}
                  </td>

                  <td className="border p-3 text-center">
                    {cat.isActive ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="border p-3">
                    <div className="flex justify-center gap-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}