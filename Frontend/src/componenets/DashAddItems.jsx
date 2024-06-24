import React, { useState } from 'react';
import { Label, TextInput, Textarea, FileInput, Select } from "flowbite-react";

const DashAddItems = () => {
 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('category', formData.category);
    form.append('price', formData.price);
    if (image) {
      form.append('image', image);
    }

    try {
      const res = await fetch(`/api/v1/product/createProduct`, {
        method: 'POST',
        body: form
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
        price: ''
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
      <form onSubmit={handleSubmit}>
        <div id="fileUpload" className="max-w-md mb-6">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload an item" />
          </div>
          <FileInput id="image" onChange={handleImageChange} helperText="Item photo is needed for the buyer to identify the item they are purchasing" />
        </div>
        {image && <img className='h-[10rem] ' src={URL.createObjectURL(image)} alt="food" />}

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
    </div>
  );
};

export default DashAddItems;
