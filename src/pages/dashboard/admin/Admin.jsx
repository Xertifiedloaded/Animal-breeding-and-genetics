
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminsPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('/api/auth/login');
        setAdmins(response.data);
      } catch (error) {
        console.error('Failed to fetch admins', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const deleteAdmin = async (id) => {
    try {
      await axios.delete(`/api/admin/${id}`);
      setAdmins(admins.filter(admin => admin._id !== id));
    } catch (error) {
      console.error('Failed to delete admin', error);
    }
  };

  return (
    <div className="min-h-screen  my-3 bg-gra">
      <div className=" bg-white rounded-lg overflow-hidden">
      
        <main className="">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <span className="text-gray-600 text-lg">Loading...</span>
            </div>
          ) : (
            <>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                <thead className="bg-gray-600 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.length > 0 ? (
                    admins.map(admin => (
                      <tr key={admin._id} className="border-b">
                        <td className="py-2 px-4">{admin.name}</td>
                        <td className="py-2 px-4">{admin.email}</td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => deleteAdmin(admin._id)}
                            className="text-red-500 hover:text-red-700 font-semibold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="py-4 px-4 text-center text-gray-600">
                        No admins found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminsPage;