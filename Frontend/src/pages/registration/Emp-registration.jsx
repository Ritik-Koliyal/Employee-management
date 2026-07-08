import React, { useState } from "react";
import "../../styles/form.css"; // adjust path as needed
import api from "../../services/api.js";
// ===== Single source of truth for all fields =====
// Add/remove/edit fields here only — nothing else needs to change.
const empFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email address",
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternError: "Enter a valid email",
  },
  {
    name: "fatherName",
    label: "Father's Name",
    type: "text",
    placeholder: "Enter father's name",
    required: false,
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "10-digit mobile number",
    required: true,
    pattern: /^\d{10}$/,
    patternError: "Enter a valid 10-digit number",
  },
  {
    name: "alterNatePhoneNumber",
    label: "Alternate Phone Number",
    type: "tel",
    placeholder: "Optional",
    required: false,
  },

  {
    name: "department",
    label: "Department",
    type: "select",
    required: true,
    options: ["Nursing", "Administration", "Pharmacy", "HR", "IT"],
  },
  {
    name: "designation",
    label: "Designation",
    type: "text",
    placeholder: "e.g. Staff Nurse",
    required: true,
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: ["Admin", "Manager", "Employee"],
  },

  {
    name: "aadhar",
    label: "Aadhar",
    type: "number",
    placeholder: "Aadhar number",
    required: true,
  },

  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter full address",
    required: true,
    fullWidth: true,
  },
];

// Build initial state dynamically from the field config
const buildInitialState = (fields) =>
  fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

const EmpRegistration = () => {
  const [formData, setFormData] = useState(buildInitialState(empFields));
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};

    empFields.forEach((field) => {
      const value = formData[field.name]?.trim?.() ?? formData[field.name];

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }
      if (value && field.pattern && !field.pattern.test(value)) {
        newErrors[field.name] = field.patternError || `Invalid ${field.label}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await api.post("create", formData);
      if (response.status === 201) {
        alert(response.data.message || response.message || "Employee ");
      }
    } catch (error) {
      console.error("something went wrong", error);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      value: formData[field.name],
      onChange: handleChange,
      placeholder: field.placeholder,
    };

    if (field.type === "select") {
      return (
        <select
          {...commonProps}
          className={`form-select ${errors[field.name] ? "error" : ""}`}
        >
          <option value="">Select {field.label.toLowerCase()}</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          {...commonProps}
          rows={1}
          className={`form-textarea ${errors[field.name] ? "error" : ""}`}
        />
      );
    }

    return (
      <input
        {...commonProps}
        type={field.type}
        className={`form-input ${errors[field.name] ? "error" : ""}`}
      />
    );
  };

  return (
    <div className="emp-registration-wrapper">
      <form onSubmit={handleSubmit} noValidate>
        <h2 className="form-section-title">Employee Registration</h2>

        <div className="form-grid">
          {empFields.map((field) => (
            <div
              key={field.name}
              className={`form-group ${field.fullWidth ? "form-full-width" : ""}`}
            >
              <label className="form-label" htmlFor={field.name}>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>

              {renderField(field)}

              {errors[field.name] && (
                <span className="form-error-text">{errors[field.name]}</span>
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="form-submit-btn">
          Register Employee
        </button>
      </form>
    </div>
  );
};

export default EmpRegistration;
