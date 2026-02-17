import { createCategory } from "@/api/CreateCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    else if (formData.description.trim().length < 10)
      newErrors.description = "Description must be at least 10 characters";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    else if (
      !/^https?:\/\/.+\.(jpg|jpeg|png)$/i.test(
        formData.image,
      )
    )
      newErrors.image = "Invalid image URL";

    // if error exist

    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors);
      return;
    }

    console.log("Form Submitted",formData);

    // reset form
    setFormData({
      name : "",
      description : "",
      image : ""
    })
    setErrors({});
  };
  return (
    <div className="w-full min-h-screen flex justify-start items-start pr-12">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Add New Category
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Fill in the details below to create a new category.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 transition`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter category description"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 transition resize-none`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.image
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 transition`}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
