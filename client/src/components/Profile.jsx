import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';
import styled from 'styled-components';
import themeList from '../data/themeList';
import ParagraphText from './paragraphTexts/ParagraphText';

const ProfileContainer = styled.div`
  margin-left: 50px;
  padding-top: calc(var(--header-height) + 30px);
  padding: 3rem;
  max-width: 45rem;
  height: 640px;
  margin: 6rem auto;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 25px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.562);

  h1 {
    color: #111;
    font-size: 2.8rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    input {
      width: 100%;
      height: 40px;
      border: 3px solid #000000;
      padding: 25px 25px;
      font-size: 1.5rem;
      border-radius: 30px;
      background: transparent;
      outline: none;
      transition: 0.3s;

      &::placeholder {
        color: #000000;
      }

      &:focus,
      &:valid {
        border-color: #000000;
      }
    }

    img {
      height: 120px;
      width: 120px; 
      margin-bottom: -1.2rem;
    }


    button {
      display: block;
      width: 100%;
      padding: 15px 15px;
      text-align: center;
      border: 1.5px solid #000000;
      background: #0BDA51;
      outline: none;
      border-radius: 30px;
      font-size: 1.8rem;
      color: #fff;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        transform: translateY(-5px);
        background: #0FFF50;
        color: #000000;
        box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.562);
      }

      &:disabled {
        opacity: 0.8;
      }
    }

   
  }

  .two-button {
    display: block;
    width: 48%;
    padding: 10px 10px;
    margin-right: 4%;
    margin-top: 3rem;
    font-size: 1.2rem;
    background: #dc143c;
    text-align: center;
    border: 1.5px solid #000000;
    outline: none;
    border-radius: 30px;
    color: #fff;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: #ff0000;
      transform: translateY(-5px);
      color: #000000;
      box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.562);
    }
  }

  .two-button1 {
    display: block;
    width: 48%;
    padding: 10px 10px;
    margin-left: 55%;
    margin-top: -3.6rem;
    font-size: 1.2rem;
    background: #3F00FF;
    text-align: center;
    border: 1.5px solid #000000;
    outline: none;
    border-radius: 30px;
    color: #fff;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: #7DF9FF;
      transform: translateY(-5px);
      color: #000000;
      box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.562);
    }
  }

  .mt-5 {
    margin-top: -2.5rem;
    text-align: center;
    color: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--darkBlue_2)' : 'var(--lightBlue_1)'};
  }

  .signin-link:hover {
    color: #0000FF;
  }

  .text-red-700 {
    color: #ff0000;
    margin-top: 1.25rem;
  }

  @media (max-width: 768px) {
    form {
      img {
        margin-bottom: -0.8rem;
      }
    }
  }

  @media (max-width: 430px) {
    width: 300px;

    form {
      img {
        height: 100px;
        width: 100px;
        margin-bottom: -0.5rem;
      }
    }
  }
`;

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileContainer>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div>
        <button onClick={handleDeleteAccount} className='two-button'>Delete Account</button>
        <button onClick={handleSignOut} className='two-button1'>Sign out</button>
        </div>
      <ParagraphText>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess && 'User is updated successfully!'}
      </p>
      </ParagraphText>
    </ProfileContainer>
  );
}
