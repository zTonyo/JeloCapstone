import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Announcement({ sidebarOpen }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    picture: null
  });

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      picture: null
    });
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
    const dateObj = new Date(`${formData.date}T${formData.time}`);
    const formattedDate = dateObj.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('dateAndTime', formattedDate); // Use the formatted date and time
    if (formData.picture) {
      data.append('picture', formData.picture);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/announcement', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Announcement created:', response.data);
      handleCloseModal(); // Close the modal after submitting
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false") {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
        <div className='d-flex justify-content-between align-items-center announcement-title'>
          <h2>Announcement</h2>
          <button className='btn btn-primary announcement-create-btn' onClick={handleCreateClick}>
            Create New Announcement
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
          <div className="announcement-modal-container">
            <h3>Create New Announcement</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className='form-control' id="title" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className='form-control' id="description" rows="5" name="description" value={formData.description} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="picture">Picture</label>
                <input type="file" className='form-control' id="picture" name="picture" accept="image/*" onChange={handleFileChange} />
                {formData.picture && (
                  <img src={URL.createObjectURL(formData.picture)} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input type="date" className='form-control' id="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input type="time" className='form-control' id="time" name="time" value={formData.time} onChange={handleInputChange} required />
              </div>
              <div className="form-actions d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Announcement;
