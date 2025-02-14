import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    lokacija: Yup.string()
      .required("Molimo odaberite status korisnika")
      .oneOf(["hrvatska", "inozemstvo"], "Morate odabrati lokaciju"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      console.log(values);
      resetForm();
      setSubmitting(false);

      const birthDate = new Date(values.datum);

      if (isNaN(birthDate.getTime())) {
        console.log("Invalid birthdate");
        alert("Unesite ispravan datum rođenja");
        return;
      }

      let age = new Date().getFullYear() - birthDate.getFullYear();
      const monthDiff = new Date().getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && new Date().getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age <= 0) {
        console.log(
          "Age is 0, maybe the user is too young or the birthdate is invalid"
        );
        age = "N/A";
      }

      const slika1Url =
        "https://membership-app-bay.vercel.app/Assets/slika1.png";
      const slika2Url =
        "https://membership-app-bay.vercel.app/Assets/slika2.png";
      const slika3Url =
        "https://membership-app-bay.vercel.app/Assets/slika3.png";

      const selectedImageUrl =
        values.lokacija === "inozemstvo"
          ? slika3Url
          : age < 18
          ? slika1Url
          : slika2Url;

      const obavijestZaInozemstvo =
        values.lokacija === "inozemstvo"
          ? "Uz podatke barcoda morate unijeti i SWIFT CODE: ZABAHR2X."
          : "";

      emailjs
        .send(
          "service_h7k60gm",
          "template_x25qvhl",
          {
            ime: values.ime,
            prezime: values.prezime,
            email: values.email,
            datum: values.datum,
            mobitel: values.mobitel,
            adresa: values.adresa,
          },
          "_Tdxv6Pckg-4Fa88p"
        )
        .then(
          (response) => {
            console.log("SUCCESS! Main email sent.", response);

            emailjs
              .send(
                "service_h7k60gm",
                "template_cm2121i",
                {
                  ime: values.ime,
                  prezime: values.prezime,
                  email: values.email,
                  datum: values.datum,
                  mobitel: values.mobitel,
                  adresa: values.adresa,
                  imageUrl: selectedImageUrl,
                  lokacija: values.lokacija,
                  dob: age,
                  obavijestZaInozemstvo: obavijestZaInozemstvo,
                },
                "_Tdxv6Pckg-4Fa88p"
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

            // Triggering success toast
            toast.success("‚Udruga - Podatci uspješno poslani", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
          },
          (error) => {
            console.log("FAILED... Error sending main email", error);
            toast.error("❌ Nešto je pošlo po krivu. Pokušajte ponovno.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
            });
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={false}
          pauseOnHover
          draggable
          theme="light"
        />
        <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex items-center">
          <div className="w-full space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              UČLANI SE
            </h1>
            <div className="text-gray-300 space-y-4">
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ad
                inventore perferendis aperiam, labore exercitationem dignissimos
                dolores quae iure aut.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                molestiae amet laborum nam accusamus quod ipsum neque cum earum
                ducimus aliquam magni, quasi, eligendi exercitationem in
                perferendis? Autem, officiis dolorum!
              </p>
              <div></div>
              <div>
                <p>
                  Od ove godine uz člansku iskaznicu uvodimo i dodatne
                  pogodnosti:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Nemo, rem.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laudantium, cum?
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore, repudiandae?t
                  </li>
                </ul>
              </div>
              <div>
                <p>Iznos članarine:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>mlađi od 18 - 15€</li>
                  <li>stariji od 18 - 20€</li>
                  <li>za inozemstvo - 25€</li>
                </ul>
              </div>
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
              lokacija: "",
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

                <div>
                  <label className={labelClasses}>Lokacija*</label>
                  <div
                    role="group"
                    aria-labelledby="status"
                    className="flex gap-5"
                  >
                    <label className="inline-flex items-center space-x-3">
                      <Field type="radio" name="lokacija" value="hrvatska" />
                      <span className="text-gray-300">Hrvatska</span>
                    </label>
                    <label className="inline-flex items-center space-x-3">
                      <Field type="radio" name="lokacija" value="inozemstvo" />
                      <span className="text-gray-300">Inozemstvo</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="lokacija"
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
                    Pošaljite podatke
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
