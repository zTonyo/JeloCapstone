import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const serverPath = import.meta.env.VITE_BASE_PATH;

const formatDate = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

function Announcement({ sidebarOpen }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    picture: null
  });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${serverPath}/announcement/get`, {
          withCredentials: true,
        });
        setAnnouncements(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleCreateClick = () => setIsModalOpen(true);;

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      picture: null,
    });
    setEditingAnnouncement(null);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevData => ({
      ...prevData,
      picture: file
    }));
  };

  // Handle form input change (for text inputs)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Combine date and time to format it as "MMM dd, yyyy hh:mm"
    const dateObj = new Date(`${formData.date} ${formData.time}`);
    const formattedDate = formatDate(dateObj);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('dateAndTime', formattedDate);
    console.log(formattedDate);
    if (formData.picture) {
      data.append('image', formData.picture);
    }
    try {
      if (editingAnnouncement) {
        // Update existing announcement
        const response = await axios.put(
          `${serverPath}/announcement/update/${editingAnnouncement.id}`,
          data,
          { withCredentials: true }
        );
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.map((announcement) =>
            announcement.id === editingAnnouncement.id ? response.data : announcement
          )
        );
      } else {
        // Create new announcement
        const response = await axios.post(
          `${serverPath}/announcement/create`,
          data,
          { withCredentials: true }
        );
        setAnnouncements((prevAnnouncements) => [...prevAnnouncements, response.data]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving announcement:', error);
    }
  };  

  // Delete announcement
  const handleDelete = async (announcementDescription) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this announcement?');
    if (!isConfirmed) return;

    try {
      await axios.delete(`${serverPath}/announcement/delete/${id}`, {
        withCredentials: true,
      });
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter((announcement) => announcement.id !== id)
      );
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };  

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      description: announcement.description,
      date: announcement.dateAndTime.split(', ')[0],
      time: announcement.dateAndTime.split(', ')[1],
      picture: announcement.image,
    });
    setIsModalOpen(true);
  };

  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false") {
      navigate('/');
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
        <div className='d-flex justify-content-between align-items-center announcement-title'>
          <h2>Announcement</h2>
          <button className='btn btn-primary announcement-create-btn' onClick={handleCreateClick}>
            Create New Announcement
          </button>
        </div>
        <div className='teacher-div-table'>
          <table className='table table-bordered table-striped table-sm'>
            <thead>
              <tr className='text-center table-head-columns'>
                <th scope='col'>Title</th>
                <th scope='col'>Description</th>
                <th scope='col'>Date & Time</th>
                <th scope='col'>Picture</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <tr key={announcement.upload_date}>
                    <td className='announcement-tbl-center'>{announcement.title}</td>
                    <td className='announcement-tbl-center'>{announcement.description}</td>
                    <td className='announcement-tbl-center'>{announcement.upload_date}</td>
                    <td className='announcement-tbl-center'>{announcement.picture && <img src={`http://localhost:5000${announcement.picture}`} alt="announcement" style={{ width: '80px' }} />}</td>
                    <td className="announcement-tbl-center td-btn">
                      <button className="btn-edit-table" onClick={() => handleEdit(announcement)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button className="btn-delete-table" onClick={() => handleDelete(announcement.description)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No announcements available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="announcement-modal-container">
          <div className="announcement-modal-body">
            <h3>{editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className='form-control form-control-sm' id="title" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className='form-control form-control-sm' id="description" rows="3" name="description" value={formData.description} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="image">Picture</label>
                <input type="file" className='form-control form-control-sm' id="image" name="image" accept="image/*" onChange={handleFileChange} />
                {/* {formData.picture && (
                  <img src={URL.createObjectURL(formData.picture)} alt="Preview" style={{ width: '100px', marginTop: '5px' }} />
                )} */}
              </div>
              <div className="form-group">
                <label htmlFor="date">Date & Time</label>
                <div className='d-flex justify-content-between'>
                  <input type="date" className='form-control form-control-sm' id="date" name="date" value={formData.date} onChange={handleInputChange} required />
                  <input type="time" className='form-control form-control-sm' id="time" name="time" value={formData.time} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-actions d-flex justify-content-between flex-column gap-2">
                <button type="submit" className="btn btn-primary ">Submit</button>
                <button type="button" className="btn btn-secondary px-3" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Announcement;
