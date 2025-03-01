import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons';


const serverPath = import.meta.env.VITE_BASE_PATH;

const Profile = ({ sidebarOpen }) => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    

    // State for form inputs
    const [formData, setFormData] = useState({
        name: "",
        birthdate: "",
        age: "",
        gender: "",
        address: "",
        contact_number: "",
        role: "",
        image: "",
    });

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
            fetchUserProfile();
        } else {
            navigate('/');
        }
    }, [navigate]);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${serverPath}/api/teacher/profile`, {
                withCredentials: true,
            });

            if (response.data) {
                const updatedData = {
                    name: response.data.fullname || "",
                    birthdate: response.data.birthday ? response.data.birthday.split("T")[0] : "",
                    age: response.data.age || "",
                    gender: response.data.gender || "",
                    address: response.data.address || "",
                    contact_number: response.data.contact_number || "",
                    role: response.data.user_role || "",
                    image: response.data.profile_path || "",
                };
                setFormData(updatedData);
                // console.log("Fetched Data:", updatedData);
                
                // console.log(formData);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevData) => ({ ...prevData, image: file }));
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    // Save profile information including image
    const handleSaveProfile = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("birthdate", formData.birthdate);
        formDataToSend.append("age", formData.age);
        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("contact_number", formData.contact_number);
        formDataToSend.append("role", formData.role);
    
        // ✅ Only append the image if it's a new file
        if (formData.image instanceof File) {
            formDataToSend.append("image", formData.image);
        }
    
        try {
            await axios.post(`${serverPath}/api/teacher/update-profile`, formDataToSend, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Profile updated successfully!");
            fetchUserProfile(); // Refresh profile after update
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
    <div>
        <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
            <h2>Profile</h2>
            <div className='d-flex justify-content-center px-5 gap-5'>
                <div className="w-25 p-3 my-auto position-relative">
                    {/* Profile Image */}
                    <img
                        className="object-fit-contain rounded-circle"
                        src={selectedImage || (formData.image ? `${serverPath}${formData.image}` : "default-profile-image.png")}
                        alt="Profile"
                        // style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />

                    {/* Overlay File Input */}
                    <div className="position-absolute top-100 start-50 translate-middle">
                        <label htmlFor="profile-image-upload" style={{ cursor: "pointer" }}>
                            <span className="btn btn-info btn-sm">
                                <FontAwesomeIcon icon={faAdd} />
                            </span>
                        </label>
                        <input
                            id="profile-image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }} // Hide the default file input
                        />
                    </div>
                </div>
                <div className="w-50 px-5 py-3">
                        <div className="form-group mt-2">
                            <label>Name</label>
                            <input type="text" className="form-control w-75 mt-2" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="form-group mt-2">
                            <label>Birthdate {}</label>
                            <input type="date" className="form-control w-75 mt-2" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                        </div>
                        <div className="form-group mt-2">
                            <label>Age</label>
                            <input type="number" className="form-control w-75 mt-2" name="age" value={formData.age} onChange={handleChange} />
                        </div>
                        <div className="form-group mt-2">
                            <label>Gender</label>
                            <input type="text" className="form-control w-75 mt-2" name="gender" value={formData.gender} onChange={handleChange} />
                        </div>
                        <div className="form-group mt-2">
                            <label>Address</label>
                            <input type="text" className="form-control w-75 mt-2" name="address" value={formData.address} onChange={handleChange} />
                        </div>
                        <div className="form-group mt-2">
                            <label>Contact Number</label>
                            <input type="text" className="form-control w-75 mt-2" name="contact_number" value={formData.contact_number} onChange={handleChange} />
                        </div>
                        <div className="form-group mt-2">
                            <label>Role</label>
                            <input type="text" className="form-control w-75 mt-2" name="role" value={formData.role} readOnly />
                        </div>

                        {/* Save Button */}
                        <button className="btn btn-primary mt-3 w-25" onClick={handleSaveProfile}>Save</button>
                    </div>
            </div>
        </div>
    </div>
    );
}

export default Profile