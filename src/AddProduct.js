import React, { useState } from 'react';

const AddProduct = () => {
  const initialProductState = {
    name: '',
    description: '',
    category: '',
    quantity: '',
    price: '',
  };

  const [product, setProduct] = useState(initialProductState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedProduct = {
      ...product,
      [name]: value
    };

    setProduct(updatedProduct);

    // Clear errors for the field being updated
    const updatedErrors = { ...errors };
    delete updatedErrors[name];
    setErrors(updatedErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      // Log or process the product data
      console.log('New Product Values:', product);

      // Alert or perform further actions with product data
      const productData = JSON.stringify(product, null, 2);
      alert(`New Product Values:\n${productData}`);

      // Reset form after successful submission
      setProduct(initialProductState);
    } else {
      // Update errors state with validation errors
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const { name, description, category, quantity, price } = product;
    const errors = {};

    if (!name) {
      errors.name = 'Name must be a non-null value.';
    }
    if (!description) {
      errors.description = 'Description must be a non-null value.';
    }
    if (!category) {
      errors.category = 'Category must be a non-null value.';
    }
    if (!quantity) {
      errors.quantity = 'Quantity must be a non-null value.';
    } else if (isNaN(quantity) || !Number.isInteger(Number(quantity)) || quantity < 0) {
      errors.quantity = '*Quantity must be a non-negative integer.';
    }
    if (!price) {
      errors.price = 'Price must be a non-null value.';
    } else if (isNaN(price) || price < 0) {
      errors.price = '*Price must be a non-negative number.';
    }

    return errors;
  };

  const handleCancel = () => {
    setProduct(initialProductState);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Product</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </label>
      {errors.name && <span className="error-message">{errors.name}</span>}
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </label>
      {errors.description && <span className="error-message">{errors.description}</span>}
      <br />
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
        />
      </label>
      {errors.category && <span className="error-message">{errors.category}</span>}
      <br />
      <label>
        Quantity:
        <input
          type="text"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
        />
      </label>
      {errors.quantity && <span className="error-message">{errors.quantity}</span>}
      <br />
      <label>
        Price:
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </label>
      {errors.price && <span className="error-message">{errors.price}</span>}
      <br />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default AddProduct;
