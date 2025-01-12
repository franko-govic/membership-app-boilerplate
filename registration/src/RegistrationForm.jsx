import React from "react";
import { Formik, Field, Form } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from "emailjs-com";
function RegistrationForm() {
  const handleSubmit = (values) => {
    console.log("Form submitted with values", values);

    emailjs
      .send(
        "service_h7k60gm",
        "template_8jpche7",
        {
          ime: values.ime,
          prezime: values.prezime,
          datum: values.datum ? values.datum.toLocaleDateString() : "",
          mobitel: values.mobitel,
          adresa: values.adresa,
        },
        "_Tdxv6Pckg-4Fa88p"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response);
          alert("Form submitted successfully!");
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="h-full w-full flex flex-col text-center p-10 bg-gray">
      <h1 className="w-full text-3xl p-5 text-orange-500 font-bold">
        UČLANI SE
      </h1>

      <Formik
        initialValues={{
          ime: "",
          prezime: "",
          datum: null,
          email: "",
          mobitel: "",
          adresa: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex-1 w-full flex flex-col justify-between text-left py-6">
            <div className="w-full">
              <Field
                type="text"
                name="ime"
                placeholder="Ime*"
                className="w-full flex-1 p-2 outline-none rounded border focus:border-orange-500"
              />
            </div>
            <div className="w-full">
              <Field
                type="text"
                name="prezime"
                placeholder="Prezime*"
                className="w-full p-2 outline-none rounded border focus:border-orange-500"
              />
            </div>
            <div className="w-full">
              <Field
                type="email"
                name="email"
                placeholder="Email*"
                className="w-full p-2 outline-none rounded border focus:border-orange-500"
              />
            </div>
            <div className="w-full">
              <Field
                type="text"
                name="adresa"
                placeholder="Adresa*"
                className="w-full p-2 outline-none rounded border focus:border-orange-500"
              />
            </div>
            <div className="w-full">
              <DatePicker
                selected={values.datum}
                onChange={(date) => setFieldValue("datum", date)}
                className="w-full p-2 outline-none rounded border focus:border-red-100"
                wrapperClassName="w-full"
                placeholderText="Datum rođenja*"
              />
            </div>
            <div className="w-full">
              <Field
                type="tel"
                name="mobitel"
                placeholder="Mobitel"
                className="w-full p-2 outline-none rounded border focus:border-orange-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-orange-500 text-white p-2 rounded mt-4"
              >
                Pošalji podatke
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegistrationForm;
