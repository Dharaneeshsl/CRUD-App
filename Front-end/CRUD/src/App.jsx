import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import { FaSearch } from "react-icons/fa";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      if (err?.response?.status === 404) {
        setUsers([]);
      } else {
        console.error("Error fetching users:", err);
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (userData) => {
    try {
      await axios.post("/api/user", userData);
      showNotification("User added successfully!");
      fetchUsers();
    } catch (err) {
      showNotification(err?.response?.data?.message || "Failed to add user", "danger");
    }
  };

  const updateUser = async (id, userData) => {
    try {
      await axios.put(`/api/user/update/${id}`, userData);
      showNotification("User updated successfully!");
      fetchUsers();
    } catch (err) {
      showNotification(err?.response?.data?.message || "Failed to update user", "danger");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/user/delete/${id}`);
      showNotification("User deleted successfully!", "warning");
      fetchUsers();
      if (editingUser && editingUser._id === id) {
        setEditingUser(null);
      }
    } catch (err) {
      showNotification("Failed to delete user", "danger");
    }
  };

  const handleFormSubmit = async (formData) => {
    if (editingUser) {
      await updateUser(editingUser._id, formData);
      setEditingUser(null);
    } else {
      await addUser(formData);
    }
  };

  const handleStartEdit = async (user) => {
    try {
      const res = await axios.get(`/api/user/${user._id}`);
      setEditingUser(res.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      showNotification("Failed to load user details", "danger");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <div className="container">
      <h1 className="text-center">CRUD APP</h1>

      {notification && (
        <div className={`alert alert-${notification.type} fixed-top m-3 shadow-lg`} style={{ zIndex: 1050, maxWidth: '400px', marginLeft: 'auto' }}>
          {notification.message}
        </div>
      )}

      <div className="mb-4">
        <UserForm
          onSubmit={handleFormSubmit}
          initialData={editingUser}
          onCancel={() => setEditingUser(null)}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h3 className="mb-0">User Directory <small className="text-muted fs-6">({filteredUsers.length} total)</small></h3>
        <div className="position-relative" style={{ minWidth: '250px' }}>
          <FaSearch className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <UserTable
        users={filteredUsers}
        onDelete={deleteUser}
        isLoading={isLoading}
        onEdit={handleStartEdit}
      />
    </div>
  );
}


export default App;
