export const fieldValidation = {
  isRequired: {
    required: "Please enter Value",
  },
  firstName: {
    required: "Please enter First Name.",
  },
  password: {
    required: "Please enter Password.",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long.",
    },
  },
  confirmPassword: {
    validate: (value, formData) => {
      if (value !== (formData.password || formData.new_password)) {
        return "Passwords do not match.";
      }
    },
  },
  location_title: {
    required: "Please enter Country name.",
  },
  city: {
    required: "Please enter City name",
  },
  postcode: {
    required: "Please enter Postcode.",
  },
  email: {
    required: "Please enter Email",
    pattern: {
      value:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Please enter valid Email format",
    },
  },
  emailid: {
    required: "Please enter Email",
    pattern: {
      value:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Please enter valid Email format",
    },
  },
  emailid_2: {
    pattern: {
      value:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Please enter valid Email format",
    },
  },
  phoneNumber: {
    required: "Please enter Phone Number.",
    pattern: {
      value: /\d+/,
      message: "Please enter valid Phone number only.",
    },
  },
  phonen_number: {
    required: "Please enter Phone Number.",
    pattern: {
      value: /\d+/,
      message: "Please enter valid Phone number only.",
    },
  },
  phonen_number_2: {
    pattern: {
      value: /\d+/,
      message: "Please enter valid Phone number only.",
    },
  },
  description: {
    required: "Please enter Description",
  },
  company_name: {
    required: "Please enter Company",
  },
  about_company: {
    maxLength: {
      value: 100,
      message: "Max 100 Characters only",
    },
  },
  job_title: {
    required: "Please enter Job Title",
  },
  name: {
    required: "Please enter Name.",
  },
  country: {
    required: "Please select Country",
  },
  path: [
    {
      type: "required",
      message: "Please upload the file",
    },
    {
      type: "maxSize",
      message: "File size must be ≤ 5MB",
    },
    {
      type: "allowedTypes",
      message: "Only PDF, DOCX, and RTF files are allowed",
    },
  ],
  URL: {
    pattern: {
      value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
      message: "Please enter valid URL format",
    },
  },
  title: {
    required: "Please enter  Title",
  },
  counters_title: {
    required: "Please enter counters Title",
  },
  counters_number: {
    required: "Please enter counters Number",
  },
  projectTitle: {
    required: "Please enter Project Title",
  },
};

const getValues = (formData, fieldName) => {
  return formData[fieldName];
};
