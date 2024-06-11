import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userInfo);
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [cover_photo, setCover_photo] = useState(null);
  const [name, setName] = useState(user?.name);
  const [sex, setSex] = useState('');
  const [dob, setDob] = useState('');


  const handleCover_photoChange = (event) => {    
    setCover_photo(event.target.files[0]);
  };

  const handleChange = (e) => {
    console.log(e.target.files);
    // setImage(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profile_attributes[image]', image);
    formData.append('profile_attributes[cover_photo]', cover_photo);
    formData.append('name', name);
    formData.append('profile_attributes[sex]', sex);
    formData.append('profile_attributes[dob]', dob);

    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        navigate(`/profile/${id}`);
      } else {
        console.error("Updates failed. Server responded with error:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during Profile updation:", error);
    }
  };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await fetch(`http://localhost:3000/users/${id}`)
        .then(response => response.json())
        .then(data => setProfile(data))
      } catch (error) {
        console.error('Error fetching profile details:', error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <section className="py-10 my-auto dark:bg-gray-900">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div>
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
              User Profile
            </h1>

            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleChange} />
              <img 
                src={profile?.image}
                alt='profile'
              />

              <input type="file" onChange={handleCover_photoChange} />
              <img 
                src={profile?.cover_photo}
                alt='cover'
              />

              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full mb-4 mt-6">
                  <label htmlFor="name" className="mb-2 dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full">
                  <h3 className="dark:text-gray-300 mb-2">Sex</h3>
                  <select
                    className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    value={profile?.profile?.sex}
                    onChange={(e) => setSex(e.target.value)}
                    required
                  >
                    <option disabled value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="w-full">
                  <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
                  <input
                    type="date"
                    className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    value={profile?.profile?.dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                <button type="submit" className="w-full p-4">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
