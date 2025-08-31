import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({ message: "", type: "" });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ message: "", type: "" });
      return;
    }
    setErrors({});
    setStatus({ message: "Message sent successfully!", type: "success" });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="dark:bg-stone-900/55 backdrop-blur-md border-[1px] border-stone-300 p-6 rounded-2xl  mt-10 dark:border-stone-700  lg:max-w-[600px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 lg:w-[350px] xl:w-[450px] max-w-[600px]"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-slate-400 bg-transparent border-gray-300 dark:border-stone-700 dark:text-stone-100 ${
            errors.name ? "border-red-700" : ""
          }`}
        />
        {errors.name && <p className="text-red-700 text-sm">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-slate-400 bg-transparent border-gray-300 dark:border-stone-700 dark:text-stone-100 ${
            errors.email ? "border-red-700" : ""
          }`}
        />
        {errors.email && <p className="text-red-700 text-sm">{errors.email}</p>}

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className={`w-full p-2 rounded-lg border h-32 min-h-[128px] resize-none focus:outline-none focus:ring-1 focus:ring-slate-400 bg-transparent border-gray-300 dark:border-stone-600 dark:text-stone-100 ${
            errors.message ? "border-red-700" : ""
          }`}
        />
        {errors.message && (
          <p className="text-red-700 text-sm">{errors.message}</p>
        )}

        <button
          type="submit"
          className="w-full dark:bg-stone-800 bg-gray-300 text-stone-950 dark:text-white p-3 rounded-lg font-semibold hover:bg-slate-400 dark:hover:bg-stone-700 transition-colors"
        >
          Send Message
        </button>

        {status.message && (
          <p
            className={`text-base mt-2 ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
