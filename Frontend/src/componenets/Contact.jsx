import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        We would love to hear from you! Feel free to reach out to us with any questions, feedback, or inquiries.
      </p>
      <form className="max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium">Name:</label>
          <input type="text" id="name" name="name" className="input input-bordered w-full" placeholder="Your name" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">Email:</label>
          <input type="email" id="email" name="email" className="input input-bordered w-full" placeholder="Your email address" />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block font-medium">Message:</label>
          <textarea id="message" name="message" className="textarea textarea-bordered w-full" rows="4" placeholder="Your message"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
