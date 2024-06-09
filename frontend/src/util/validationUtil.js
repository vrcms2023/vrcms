export const fieldValidation = {
  isRequired: {
    required: "Please enter Value",
  },
  firstName: {
    required: "Please enter First Name.",
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
};
