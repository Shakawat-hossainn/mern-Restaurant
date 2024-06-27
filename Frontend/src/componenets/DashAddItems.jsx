import React, { useState } from 'react';
import { Label, TextInput, Textarea, FileInput, Select } from "flowbite-react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';

const DashAddItems = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      try {
        setUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploading(progress.toFixed(0));
          },
          (error) => {
            setUploadError("Couldn't upload file: (The file must be less than 2MB)");
            setImageUploading(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setFormData({
                ...formData,
                image: downloadURL
              });
              setImageUploading(null);
              setUploadError(null);
            });
          }
        );
      } catch (error) {
        setUploadError("Image Upload Failed");
        setImageUploading(null);
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/v1/product/createProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Failed to create product');
      }

      const result = await res.json();
      setSuccess("Product created successfully");

      // Clear the form and image after a successful submission
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        image: ''
      });
      setImage(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    } catch (error) {
      console.error('Error creating product:', error);
      setErrorMessage('Error creating product. Please try again.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className='ml-9'>
      {success && (
        <div role="alert" className="mb-3 alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{success}</span>
        </div>
      )}
      {errorMessage && (
        <div role="alert" className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
      {uploadError && (
        <div role="alert" className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{uploadError}</span>
        </div>
      )}
      {imageUploading && (
        <div role="alert" className="alert alert-info">
          <span>Uploading image... {imageUploading}%</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div id="fileUpload" className="max-w-md mb-6">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload an item" />
          </div>
          <FileInput id="image" onChange={handleImageChange} helperText="Item photo is needed for the buyer to identify the item they are purchasing" />
        </div>
        {image && <img className='h-[10rem]' src={URL.createObjectURL(image)} alt="food" />}

        <div className='mb-6'>
          <p className='font-bold'>Product name:</p>
          <input type="text" id='title' value={formData.title} onChange={handleChange} placeholder="Type here" className="input input-bordered input-success w-full max-w-xs" />
        </div>

        <div className="max-w-md mb-6">
          <div className="mb-2 block">
            <Label htmlFor="description" value="Product description:" />
          </div>
          <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Describe the product..." required rows={4} />
        </div>

        <div className='flex flex-wrap justify-between m-3'>
          <div className="max-w-md mb-6">
            <div className="mb-2 block">
              <Label htmlFor="category" value="Select your category" />
            </div>
            <Select id="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select a category</option>
              <option>Salad</option>
              <option>Rolls</option>
              <option>Deserts</option>
              <option>Sandwich</option>
              <option>Pure veg</option>
              <option>Pasta</option>
              <option>Noodles</option>
            </Select>
          </div>

          <div className="max-w-md mb-6">
            <div className="mb-2 block">
              <Label htmlFor="price" value="Product Price:" />
            </div>
            <TextInput id="price" type="number" value={formData.price} onChange={handleChange} sizing="sm" />
          </div>
        </div>

        <div className='mb-6'>
          <button type="submit" className="btn btn-primary">Add Item</button>
        </div>
      </form>
    </div>
  );
};

export default DashAddItems;
