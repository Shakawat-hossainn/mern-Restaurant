import { Avatar } from 'flowbite-react'
import React from 'react'

const Categories = ({ filterItems, categories }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category, index) => (
       <button className="btn btn-outline btn-warning" key={index} onClick={()=>filterItems(category)
      }>{category}</button>
      ))}
    </div>
  )
}

export default Categories
