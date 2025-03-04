"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDashboard() {
  const [items, setItems] = useState([]); // State to store items
  const [newItem, setNewItem] = useState({ title: "", author: "", price: "" }); // State for new item form
  const [editItem, setEditItem] = useState(null); // State for editing an item

  // Fetch all items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch items from the API
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/books");
      setItems(response.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  // Handle form input change for new item
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Handle form input change for editing an item
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
  };

  // Add a new item
  const addItem = async () => {
    try {
      const response = await axios.post("http://localhost:5000/books", newItem);
      console.log("API Response:", response.data); // Log the API response
      setItems([...items, response.data]); // Add the new item to the list
      setNewItem({ title: "", author: "", price: "" }); // Reset form
      console.log("Updated Items:", items); // Log the updated items state
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  // Update an existing item
  const updateItem = async () => {
    try {
      await axios.put(`http://localhost:5000/books/${editItem.id}`, editItem);
      const updatedItems = items.map((item) =>
        item.id === editItem.id ? editItem : item
      );
      setItems(updatedItems);
      setEditItem(null); // Reset edit form
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  // Delete an item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      const filteredItems = items.filter((item) => item.id !== id);
      setItems(filteredItems);
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">User Dashboard</h1>

      {/* Add New Item Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newItem.title}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newItem.author}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newItem.price}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <button
            onClick={addItem}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Edit Item Form (Conditional Rendering) */}
      {editItem && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editItem.title}
              onChange={handleEditInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={editItem.author}
              onChange={handleEditInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={editItem.price}
              onChange={handleEditInputChange}
              className="p-2 border rounded"
            />
            <button
              onClick={updateItem}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Update Item
            </button>
            <button
              onClick={() => setEditItem(null)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Display Items */}
      <div   className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-600">Author: {item.author}</p>
            <p className="text-gray-600">Price: ${item.price}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => setEditItem(item)}
                className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}






// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function UserDashboard() {
//   const [items, setItems] = useState([]); // State to store items
//   const [newItem, setNewItem] = useState({ title: "", author: "", price: "" }); // State for new item form
//   const [editItem, setEditItem] = useState(null); // State for editing an item

//   // Fetch all items on component mount
//   useEffect(() => {
//     fetchItems();
//   }, []);

//   // Fetch items from the API
//   const fetchItems = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/books");
//       setItems(response.data);
//     } catch (err) {
//       console.error("Error fetching items:", err);
//     }
//   };

//   // Handle form input change for new item
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewItem({ ...newItem, [name]: value });
//   };

//   // Handle form input change for editing an item
//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditItem({ ...editItem, [name]: value });
//   };

//   // Add a new item
//   const addItem = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/books", newItem);
//       setItems([...items, response.data]);
//       setNewItem({ title: "", author: "", price: "" }); // Reset form
//     } catch (err) {
//       console.error("Error adding item:", err);
//     }
//   };

//   // Update an existing item
//   const updateItem = async () => {
//     try {
//       await axios.put(`http://localhost:5000/books/${editItem.id}`, editItem);
//       const updatedItems = items.map((item) =>
//         item.id === editItem.id ? editItem : item
//       );
//       setItems(updatedItems);
//       setEditItem(null); // Reset edit form
//     } catch (err) {
//       console.error("Error updating item:", err);
//     }
//   };

//   // Delete an item
//   const deleteItem = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/books/${id}`);
//       const filteredItems = items.filter((item) => item.id !== id);
//       setItems(filteredItems);
//     } catch (err) {
//       console.error("Error deleting item:", err);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold text-center mb-6">User Dashboard</h1>

//       {/* Add New Item Form */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
//         <div className="flex flex-col space-y-4">
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             value={newItem.title}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="author"
//             placeholder="Author"
//             value={newItem.author}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="price"
//             placeholder="Price"
//             value={newItem.price}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//           />
//           <button
//             onClick={addItem}
//             className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//           >
//             Add Item
//           </button>
//         </div>
//       </div>

//       {/* Edit Item Form (Conditional Rendering) */}
//       {editItem && (
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
//           <div className="flex flex-col space-y-4">
//             <input
//               type="text"
//               name="title"
//               placeholder="Title"
//               value={editItem.title}
//               onChange={handleEditInputChange}
//               className="p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="author"
//               placeholder="Author"
//               value={editItem.author}
//               onChange={handleEditInputChange}
//               className="p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="price"
//               placeholder="Price"
//               value={editItem.price}
//               onChange={handleEditInputChange}
//               className="p-2 border rounded"
//             />
//             <button
//               onClick={updateItem}
//               className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
//             >
//               Update Item
//             </button>
//             <button
//               onClick={() => setEditItem(null)}
//               className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Display Items */}
//       <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {items.map((item) => (
//           <div key={item.id} className="border p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold">{item.title}</h2>
//             <p className="text-gray-600">{item.description}</p>
//             <div className="mt-4 flex space-x-2">
//               <button
//                 onClick={() => setEditItem(item)}
//                 className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteItem(item.id)}
//                 className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }