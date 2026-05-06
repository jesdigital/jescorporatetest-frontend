import React, { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    captcha: ""
  });

  const [errors, setErrors] = useState({});
  const [captchaValue] = useState(
    Math.floor(1000 + Math.random() * 9000) // simple 4 digit captcha
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    if (form.captcha !== captchaValue.toString())
      newErrors.captcha = "Captcha incorrect";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form Data:", form);
      alert("Form submitted successfully");
    }
  };

  return (
    <div className="container my-5">      

      <form onSubmit={handleSubmit} className="row g-3">

        {/* Name */}
        <div className="col-12">
          <label className="form-label fw-bold">Your Name*</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>

        {/* Email */}
        <div className="col-12">
          <label className="form-label fw-bold">Your Email*</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        {/* Subject */}
        <div className="col-12">
          <label className="form-label fw-bold">Subject*</label>
          <input
            type="text"
            name="subject"
            className="form-control"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
          />
          {errors.subject && <small className="text-danger">{errors.subject}</small>}
        </div>

        {/* Message */}
        <div className="col-12">
          <label className="form-label fw-bold">Message*</label>
          <textarea
            name="message"
            rows="5"
            className="form-control"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && <small className="text-danger">{errors.message}</small>}
        </div>


        {/* Submit */}
        <div className="col-12">
          <button type="submit" className="btn btn-warning rounded-pill fw-bold px-4 py-2">
            Submit
          </button>
        </div>

      </form>
    </div>
  );
};

export default ContactForm;