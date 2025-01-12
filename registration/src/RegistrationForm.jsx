import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

function RegistrationForm() {
 const validationSchema = Yup.object().shape({
   ime: Yup.string()
     .required('Ime je obavezno polje')
     .min(2, 'Ime mora sadržavati najmanje 2 znaka'),
   prezime: Yup.string()
     .required('Prezime je obavezno polje')
     .min(2, 'Prezime mora sadržavati najmanje 2 znaka'),
   email: Yup.string()
     .required('Email je obavezno polje')
     .email('Unesite valjanu email adresu'),
   adresa: Yup.string()
     .required('Adresa je obavezno polje')
     .min(5, 'Adresa mora sadržavati najmanje 5 znakova'),
   datum: Yup.date()
     .required('Datum rođenja je obavezno polje')
     .max(new Date(), 'Datum ne može biti u budućnosti')
     .typeError('Unesite valjan datum'),
   mobitel: Yup.string()
     .matches(/^[0-9]+$/, 'Unesite samo brojeve')
 });

 const handleSubmit = (values, { setSubmitting }) => {
   setTimeout(() => {
     console.log(values);
     alert("Podaci uspješno poslani!");
     setSubmitting(false);
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
   <div className="h-full w-full bg-gradient-to-br from-gray-700 via-gray-900 to-gray-800">
     <div className="h-full w-full max-w-2xl mx-auto flex flex-col p-6 md:p-8 overflow-y-auto">
       <div className="text-center mb-6">
         <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400 pb-2">
           UČLANI SE
         </h1>
         <p className="text-gray-400 text-base">Ispunite obrazac za članstvo</p>
       </div>

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
               <label htmlFor="ime" className={labelClasses}>Ime*</label>
               <Field
                 id="ime"
                 type="text"
                 name="ime"
                 placeholder="Unesite vaše ime"
                 className={`${inputClasses} ${touched.ime && errors.ime ? 'border-orange-500' : ''}`}
               />
               <ErrorMessage name="ime" component="div" className={errorClasses} />
             </div>

             <div>
               <label htmlFor="prezime" className={labelClasses}>Prezime*</label>
               <Field
                 id="prezime"
                 type="text"
                 name="prezime"
                 placeholder="Unesite vaše prezime"
                 className={`${inputClasses} ${touched.prezime && errors.prezime ? 'border-orange-500' : ''}`}
               />
               <ErrorMessage name="prezime" component="div" className={errorClasses} />
             </div>

             <div>
               <label htmlFor="email" className={labelClasses}>Email*</label>
               <Field
                 id="email"
                 type="email"
                 name="email"
                 placeholder="vas@email.com"
                 className={`${inputClasses} ${touched.email && errors.email ? 'border-orange-500' : ''}`}
               />
               <ErrorMessage name="email" component="div" className={errorClasses} />
             </div>

             <div>
               <label htmlFor="adresa" className={labelClasses}>Adresa*</label>
               <Field
                 id="adresa"
                 type="text"
                 name="adresa"
                 placeholder="Unesite vašu adresu"
                 className={`${inputClasses} ${touched.adresa && errors.adresa ? 'border-orange-500' : ''}`}
               />
               <ErrorMessage name="adresa" component="div" className={errorClasses} />
             </div>

             <div>
               <label htmlFor="datum" className={labelClasses}>Datum rođenja*</label>
               <Field
                 id="datum"
                 type="date"
                 name="datum"
                 className={`${dateInputClasses} ${touched.datum && errors.datum ? 'border-orange-500' : ''}`}
               />
               <ErrorMessage name="datum" component="div" className={errorClasses} />
             </div>

             <div>
               <label htmlFor="mobitel" className={labelClasses}>Mobitel</label>
               <Field
                 id="mobitel"
                 type="tel"
                 name="mobitel"
                 placeholder="Unesite broj mobitela"
                 className={`${inputClasses} ${touched.mobitel && errors.mobitel ? 'border-orange-500' : ''}`}
               />
               <ErrorMessage name="mobitel" component="div" className={errorClasses} />
             </div>

             <div className="pt-3">
               <button
                 type="submit"
                 disabled={!isValid || !dirty}
                 className={`w-full py-3 px-6 rounded-lg text-base font-semibold transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900
                   ${(!isValid || !dirty) 
                     ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                     : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-orange-500/20'
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
 );
}

export default RegistrationForm;