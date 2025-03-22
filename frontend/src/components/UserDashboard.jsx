// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation"; // Updated import for Next.js 13+
// import { useClerk } from "@clerk/nextjs"; // Import useClerk for sign-out functionality
// import Image from "next/image";

// export default function UserDashboard() {
//   const [items, setItems] = useState([]); // State to store items
//   const [newItem, setNewItem] = useState({ title: "", author: "", price: "", description: "", image: "" }); // State for new item form
//   const [editItem, setEditItem] = useState(null); // State for editing an item

//   const router = useRouter(); // Initialize Next.js router
//   const { signOut } = useClerk(); // Initialize Clerk signOut function

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
//       const addedItem = response.data;

//       // Ensure addedItem has a unique id, even temporarily
//       if (!addedItem.id) {
//         addedItem.id = Date.now(); // Temporary unique id
//       }

//       setItems([...items, addedItem]);
//       setNewItem({ title: "", author: "", price: "", description: "", image: "" }); // Reset form
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

//   // Handle sign out
//   const handleSignOut = async () => {
//     // Sign out the user
//     await signOut(); 
//     // Redirect to the home page
//     router.push("/"); 
//   };

//   // Handle settings navigation
//   const handleSettings = () => {
//     // Redirect to the settings page
//     router.push("/usersettings"); 
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold text-center mb-6">User Dashboard</h1>

//       {/* Sign Out and Settings Buttons */}
//       <div className="flex justify-end space-x-4 mb-6">
//         <button
//           onClick={handleSettings}
//           className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
//         >
//           Settings
//         </button>
//         <button
//           onClick={handleSignOut}
//           className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
//         >
//           Sign Out
//         </button>
//       </div>

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
//           <input
//             type="text"
//             name="short_description"
//             placeholder="Description"
//             value={newItem.short_description || ""}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="cover_image"
//             placeholder="Image URL"
//             value={newItem.cover_image || ""}
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
//             <input
//               type="text"
//               name="short_description"
//               placeholder="Description"
//               value={editItem.short_description}
//               onChange={handleEditInputChange}
//               className="p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="cover_image"
//               placeholder="Image URL"
//               value={editItem.cover_image}
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
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {items.map((item) => (
//           <div key={item.id} className="border p-4 rounded-lg shadow-md">
//              <figure>
//                   <Image
//                       src="/images/book1.jpg" // Image path relative to the 'public' folder
//                        alt="Book 1"
//                        width={500} // Define width
//                        height={500} // Define height
//                        className="h-96 w-full object-cover"
//                       />
//                 </figure>
//                 <div className="p-4">
//                  <h2 className="text-lg font-semibold">{item.title}</h2>
//                   <p className="text-gray-600">Author: {item.author}</p>
//                   <p className="text-gray-600">Price: ${item.price}</p>
//                   <p className="text-gray-600">Description: {item.short_description}</p>
//                 </div>
//                <div className="mt-4 flex space-x-2">
//                  <button
//                    onClick={() => setEditItem(item)}
//                    className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
//                   >
//                     Edit
//                   </button>
//                  <button
//                    onClick={() => deleteItem(item.id)}
//                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
//                   >
//                    Delete
//                  </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// =======================================================================================

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Updated import for Next.js 13+
import { useClerk, useAuth } from "@clerk/nextjs"; // Import useAuth for token
import Image from "next/image";

export default function UserDashboard() {
  const [items, setItems] = useState([]); // State to store items
  const [newItem, setNewItem] = useState({
    title: "",
    author: "",
    price: "",
    short_description: "",
    cover_image: "",
  }); // State for new item form
  const [editItem, setEditItem] = useState({
    id: null,
    title: "",
    author: "",
    price: "",
    short_description: "",
    cover_image: "",
  }); // State for editing an item

  const router = useRouter(); // Initialize Next.js router
  const { signOut } = useClerk(); // Initialize Clerk signOut function
  const { getToken } = useAuth(); // Use useAuth to get the session token

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
      const token = await getToken(); // Get the Clerk session token
      const response = await axios.post(
        "http://localhost:5000/books",
        newItem,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      const addedItem = response.data;

      setItems([...items, addedItem]);
      setNewItem({
        title: "",
        author: "",
        price: "",
        short_description: "",
        cover_image: "",
      }); // Reset form
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Failed to add item. Please try again.");
    }
  };

  // Update an existing item
  const updateItem = async () => {
    try {
      const token = await getToken(); // Get the Clerk session token
      await axios.put(
        `http://localhost:5000/books/${editItem.id}`,
        editItem,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      const updatedItems = items.map((item) =>
        item.id === editItem.id ? editItem : item
      );
      setItems(updatedItems);
      setEditItem({
        id: null,
        title: "",
        author: "",
        price: "",
        short_description: "",
        cover_image: "",
      }); // Reset edit form
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Failed to update item. Please try again.");
    }
  };

  // Delete an item
  const deleteItem = async (id) => {
    try {
      const token = await getToken(); // Get the Clerk session token
      await axios.delete(`http://localhost:5000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      const filteredItems = items.filter((item) => item.id !== id);
      setItems(filteredItems);
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item. Please try again.");
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  // Handle settings navigation
  const handleSettings = () => {
    router.push("/usersettings");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">User Dashboard</h1>

      {/* Sign Out and Settings Buttons */}
      <div className="flex justify-end space-x-4 mb-6">
        <button
          onClick={handleSettings}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Settings
        </button>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      {/* Add New Item Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newItem.title || ""}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newItem.author || ""}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newItem.price || ""}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="short_description"
            placeholder="Description"
            value={newItem.short_description || ""}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="cover_image"
            placeholder="Image URL"
            value={newItem.cover_image || ""}
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
      {editItem.id && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editItem.title || ""}
              onChange={handleEditInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={editItem.author || ""}
              onChange={handleEditInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={editItem.price || ""}
              onChange={handleEditInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="short_description"
              placeholder="Description"
              value={editItem.short_description || ""}
              onChange={handleEditInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="cover_image"
              placeholder="Image URL"
              value={editItem.cover_image || ""}
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
              onClick={() =>
                setEditItem({
                  id: null,
                  title: "",
                  author: "",
                  price: "",
                  short_description: "",
                  cover_image: "",
                })
              }
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Display Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={item.id ||`item-${index}`} className="border p-4 rounded-lg shadow-md">
            <figure>
              <Image
                src="/images/book1.jpg"
                alt={item.title ? `Cover image for ${item.title}` : "Book cover image"}
                width={500}
                height={500}
                className="h-96 w-full object-cover"
              />
            </figure>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">Author: {item.author}</p>
              <p className="text-gray-600">Price: ${item.price}</p>
              <p className="text-gray-600">Description: {item.short_description}</p>
            </div>
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