import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bio, setBio] = useState('');
    const [contact, setContact] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [socialLinks, setSocialLinks] = useState({ facebook: '', twitter: '', linkedin: '' });

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setBio(userInfo.bio || '');
        setContact(userInfo.contact || '');
        setSocialLinks(userInfo.socialLinks || { facebook: '', twitter: '', linkedin: '' });
        setProfilePicture(userInfo.profilePicture || null);
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                    bio,
                    contact,
                    socialLinks,
                    profilePicture,
                }).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile updated successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const handleProfilePictureChange = (e) => {
        setProfilePicture(URL.createObjectURL(e.target.files[0]));
    };

    const handleSocialLinksChange = (e) => {
        const { name, value } = e.target;
        setSocialLinks((prevLinks) => ({ ...prevLinks, [name]: value }));
    };

    return (
        <div className="text-white min-h-screen flex flex-col items-center justify-center bg-primary px-4 py-8">
            <div className="w-2/5 mx-auto max-w-4xl bg-black rounded-lg shadow-lg p-8">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-600 mb-4">
                        Profile
                    </h1>
                    <div className="flex flex-col items-center">
                        <label htmlFor="profilePicture" className="text-sm mb-2 font-medium">
                            Profile Picture
                        </label>
                        {profilePicture && <img src={profilePicture} alt="Profile" className="rounded-full h-32 w-32 mb-4" />}
                        <input
                            type="file"
                            id="profilePicture"
                            className="text-sm"
                            onChange={handleProfilePictureChange}
                        />
                    </div>
                </div>
                <form onSubmit={submitHandler} className="flex- flex-wrap space-y-6 items-center">
                    <div className="flex flex-col md:flex-row md:space-x-6">
                        <div className="flex-1 flex flex-col">
                            <label htmlFor="name" className="text-sm mb-2 font-medium">
                                Name
                            </label>
                            <input
                                type="name"
                                id="name"
                                className="rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:border-purple-400 bg-gray-800 text-white"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <label htmlFor="email" className="text-sm mb-2 font-medium">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:border-purple-400 bg-gray-800 text-white"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-6">
                        <div className="flex-1 flex flex-col">
                            <label htmlFor="password" className="text-sm mb-2 font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:border-purple-400 bg-gray-800 text-white"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <label htmlFor="confirmPassword" className="text-sm mb-2 font-medium">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:border-purple-400 bg-gray-800 text-white"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="bio" className="text-sm mb-2 font-medium">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            className="rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:border-purple-400 bg-gray-800 text-white"
                            placeholder="Enter bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="contact" className="text-sm mb-2 font-medium">
                            Contact Information
                        </label>
                        <input
                            type="text"
                            id="contact"
                            className="rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:border-purple-400 bg-gray-800 text-white"
                            placeholder="Enter contact information"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <label className="text-sm mb-2 font-medium">Social Links</label>
                        <input
                            type="text"
                            name="facebook"
                            className="rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:border-purple-400 bg-gray-800 text-white"
                            placeholder="Facebook URL"
                            value={socialLinks.facebook}
                            onChange={handleSocialLinksChange}
                        />
                        <input
                            type="text"
                            name="twitter"
                            className="rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:border-purple-400 bg-gray-800 text-white"
                            placeholder="Twitter URL"
                            value={socialLinks.twitter}
                            onChange={handleSocialLinksChange}
                        />
                        <input
                            type="text"
                            name="linkedin"
                            className="rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:border-purple-400 bg-gray-800 text-white"
                            placeholder="LinkedIn URL"
                            value={socialLinks.linkedin}
                            onChange={handleSocialLinksChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="ml-[40%] bg-purple-600 rounded-full hover:bg-purple-800 text-white font-bold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700"
                    >
                        Update
                    </button>
                    {isLoading && (
                        <div className="text-center mt-2 text-purple-400">Updating profile...</div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProfileScreen;
