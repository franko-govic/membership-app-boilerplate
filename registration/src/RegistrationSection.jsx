import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";

function RegistrationSection() {
  const validationSchema = Yup.object().shape({
    ime: Yup.string()
      .required("Ime je obavezno polje")
      .min(2, "Ime mora sadržavati najmanje 2 znaka"),
    prezime: Yup.string()
      .required("Prezime je obavezno polje")
      .min(2, "Prezime mora sadržavati najmanje 2 znaka"),
    email: Yup.string()
      .required("Email je obavezno polje")
      .email("Unesite valjanu email adresu"),
    adresa: Yup.string()
      .required("Adresa je obavezno polje")
      .min(5, "Adresa mora sadržavati najmanje 5 znakova"),
    datum: Yup.date()
      .required("Datum rođenja je obavezno polje")
      .max(new Date(), "Datum ne može biti u budućnosti")
      .typeError("Unesite valjan datum"),
    mobitel: Yup.string().matches(/^[0-9]+$/, "Unesite samo brojeve"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      console.log(values);
      resetForm();
      setSubmitting(false);

      // Calculate age from the birthdate (datum)
      const birthDate = new Date(values.datum);
      let age = new Date().getFullYear() - birthDate.getFullYear();

      // If the user hasn't had their birthday this year yet, subtract one from their age
      const monthDiff = new Date().getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && new Date().getDate() < birthDate.getDate())
      ) {
        age--;
      }

      // Choose image URL based on age
      const image1Url =
        "https://membership-app-bay.vercel.app/Assets/image1.png"; // Image for under 18
      const image2Url =
        "https://membership-app-bay.vercel.app/Assets/image2.png"; // Image for 18 and over

      // If the user is under 18, send image1; otherwise, send image2
      const selectedImageUrl = age < 18 ? image1Url : image2Url;

      // Send the main email with the selected image URL
      emailjs
        .send(
          "service_h7k60gm", // service ID
          "template_8jpche7", // template ID for admin email
          {
            ime: values.ime,
            prezime: values.prezime,
            email: values.email,
            datum: values.datum,
            mobitel: values.mobitel,
            adresa: values.adresa,
            image1Url, // Send the first image URL (for use in the template if needed)
            image2Url, // Send the second image URL (for use in the template if needed)
          },
          "_Tdxv6Pckg-4Fa88p" // public key
        )
        .then(
          (response) => {
            console.log("SUCCESS! Main email sent.", response);

            // Send auto-reply with the selected image
            emailjs
              .send(
                "service_h7k60gm", // service ID
                "template_krlln3k", // Template for auto-reply
                {
                  ime: values.ime,
                  prezime: values.prezime,
                  email: values.email,
                  datum: values.datum,
                  mobitel: values.mobitel,
                  adresa: values.adresa,
                  imageUrl: selectedImageUrl, // Send the selected image URL in the auto-reply
                },
                "_Tdxv6Pckg-4Fa88p" // public key
              )
              .then(
                (autoReplyResponse) => {
                  console.log(
                    "Auto-reply sent successfully!",
                    autoReplyResponse
                  );
                },
                (error) => {
                  console.log("Auto-reply failed...", error);
                  alert(
                    "Nešto je pošlo po krivu prilikom slanja automatskog odgovora."
                  );
                }
              );
          },
          (error) => {
            console.log("FAILED... Error sending main email", error);
            alert("Nešto je pošlo po krivu. Pokušajte ponovno.");
          }
        );
    }, 500);
  };

  const inputClasses = `
    w-full p-3 rounded-lg
    bg-black/20
    border border-orange-700/30
    text-gray-100 text-base
    placeholder:text-gray-500
    focus:border-orange-500 focus:outline-none
    transition-colors duration-200
  `;

  const dateInputClasses = `
    ${inputClasses}
    [color-scheme:light]
    [&::-webkit-calendar-picker-indicator]:invert
    [&::-webkit-calendar-picker-indicator]:opacity-70
    [&::-webkit-calendar-picker-indicator]:hover:opacity-100
  `;

  const labelClasses = "block text-gray-300 font-medium mb-2 text-base";
  const errorClasses = "text-orange-500 text-sm mt-1";

  return (
    <div
      className="min-h-dvh w-full bg-gradient-to-br from-gray-700 via-gray-900 to-gray-800 overflow-hidden"
      id="registration-section"
    >
      <div className="min-h-full w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex items-center">
          <div className="w-full space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              UČLANI SE
            </h1>
            <div className="text-gray-300 space-y-4">
              <p className="text-lg">
                UN Funcuti Šibenik započinje s učlanjivanjem za 2025. godinu.
              </p>
              <p>
                Već dugi niz godina financiramo se i sve troškove rada pokrivamo
                iz vlastitih sredstava. Kroz članarinu direktno pomažete radu
                Udruge, a dužnost svakog tko se naziva Funcutom je da ima
                vlastitu člansku iskaznicu.
              </p>
              <p>
                Od ove godine uz člansku iskaznicu uvodimo i dodatne pogodnosti:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Ulaznice za našu tribinu moći će se kupiti isključivo uz
                  predočenje članske iskaznice, i to po povoljnijoj cijeni
                </li>
                <li>
                  Uz iskaznicu dobivate poklon bon za 10% popusta u našem
                  webshopu koji uskoro otvaramo
                </li>
                <li>Svaki član dobiva i prigodni poklon paket</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16">
          <Formik
            initialValues={{
              ime: "",
              prezime: "",
              datum: "",
              email: "",
              mobitel: "",
              adresa: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty, touched, errors }) => (
              <Form className="space-y-5 bg-gradient-to-b from-gray-800/30 to-black/30 p-6 md:p-8 rounded-xl border border-orange-800/20 shadow-xl">
                <div>
                  <label htmlFor="ime" className={labelClasses}>
                    Ime*
                  </label>
                  <Field
                    id="ime"
                    type="text"
                    name="ime"
                    placeholder="Unesite vaše ime"
                    className={`${inputClasses} ${
                      touched.ime && errors.ime ? "border-orange-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="ime"
                    component="div"
                    className={errorClasses}
                  />
                </div>

                <div>
                  <label htmlFor="prezime" className={labelClasses}>
                    Prezime*
                  </label>
                  <Field
                    id="prezime"
                    type="text"
                    name="prezime"
                    placeholder="Unesite vaše prezime"
                    className={`${inputClasses} ${
                      touched.prezime && errors.prezime
                        ? "border-orange-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="prezime"
                    component="div"
                    className={errorClasses}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email*
                  </label>
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    placeholder="vas@email.com"
                    className={`${inputClasses} ${
                      touched.email && errors.email ? "border-orange-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={errorClasses}
                  />
                </div>

                <div>
                  <label htmlFor="adresa" className={labelClasses}>
                    Adresa*
                  </label>
                  <Field
                    id="adresa"
                    type="text"
                    name="adresa"
                    placeholder="Unesite vašu adresu"
                    className={`${inputClasses} ${
                      touched.adresa && errors.adresa ? "border-orange-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="adresa"
                    component="div"
                    className={errorClasses}
                  />
                </div>

                <div>
                  <label htmlFor="datum" className={labelClasses}>
                    Datum rođenja*
                  </label>
                  <Field
                    id="datum"
                    type="date"
                    name="datum"
                    max={new Date().toISOString().split("T")[0]}
                    className={`${dateInputClasses} ${
                      touched.datum && errors.datum ? "border-orange-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="datum"
                    component="div"
                    className={errorClasses}
                  />
                </div>

                <div>
                  <label htmlFor="mobitel" className={labelClasses}>
                    Mobitel
                  </label>
                  <Field
                    id="mobitel"
                    type="tel"
                    name="mobitel"
                    placeholder="Unesite broj mobitela"
                    className={`${inputClasses} ${
                      touched.mobitel && errors.mobitel
                        ? "border-orange-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="mobitel"
                    component="div"
                    className={errorClasses}
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={!isValid || !dirty}
                    className={`w-full py-3 px-6 rounded-lg text-base font-semibold transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900
                    ${
                      !isValid || !dirty
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-orange-500/20"
                    }`}
                  >
                    Pošalji podatke
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSection;
