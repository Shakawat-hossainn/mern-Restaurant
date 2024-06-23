import React, { useEffect, useState } from 'react';
import { Table } from "flowbite-react";
import { TiDelete } from "react-icons/ti";

const DashListItems = () => {
  const urlImage = 'http://localhost:5000/images';
  const [products, setProducts] = useState([]);
  const [deleted, setDeleted] = useState(null);
  const url = "https://mern-restaurant-backend-cphh.onrender.com"
  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`${url}/api/v1/product/deleteProduct/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.ok) {
        setDeleted("Product deleted successfully");
        setTimeout(() => {
          setDeleted(null);
        }, 2000);
        setProducts(products.filter((product) => {
          return product._id !== productId;
        }));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`${url}/api/v1/product/getProducts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [products]);

  return (
    <div className="overflow-x-none w-full">
      {products.length > 0 ? (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Product Image</Table.HeadCell>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell className="text-red-500">Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products.map((product) => (
              <Table.Row key={product._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <img src={`${urlImage}/` + product.image} alt={product.title} className="h-12 w-12 rounded-full object-cover" />
                </Table.Cell>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                <Table.Cell>
                  
                    <TiDelete className="text-red-700 relative left-3" onClick={() => deleteProduct(product._id)} />
                 
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p className="text-orange-600 font-bold text-center mt-4">Don't have any products yet!</p>
      )}
      {deleted && (
        <div role="alert" className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{deleted}</span>
        </div>
      )}
    </div>
  );
};

export default DashListItems;
