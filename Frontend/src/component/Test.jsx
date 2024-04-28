import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState('');

    const schools = {
        "SCHOOL OF ENGINEERING": ["B.TECH (CSE)", "B.TECH (CSE-AI)", "B.TECH (CSE-CCML)", "B.TECH (CSE-IOTBC)", "M.TECH (COMPUTER NETWORK)", "M.TECH (SOFTWARE ENGINEERING)", "PH.D (CSE)"],
        "SCHOOL OF MANAGEMENT": ["B.COM. (HONS.)", "BBA", "BBA (LOGISTICS AND SUPPLY CHAIN MANAGEMENT)", "BBA - BUSINESS ANALYTICS (IN COLLABORATION WITH IBM)", "MBA", "PH.D", "IMBA"],
        "SCHOOL OF COMPUTER APPLICATIONS": ["BCA", "MCA", "PH.D", "BCA IN DATA SCIENCE & ARTIFICIAL INTELLIGENCE (IN COLLABORATION WITH IBM)", "BCA IN CYBER SECURITY & FORENSICS (IN COLLABORATION WITH IBM)", "MCA IN DATA SCIENCE & ARTIFICIAL INTELLIGENCE (IN COLLABORATION WITH IBM)"],
        "SCHOOL OF PHARMACY": ["Bachelor of Pharmacy", "Ph.D. Pharmacy"],
        "SCHOOL OF ARCHITECTURE AND PLANNING": ["BACHELOR OF ARCHITECTURE", "MASTERS OF PLANNING (URBAN PLANNING)", "Bachelor of Interior Design"],
        "SCHOOL OF HOTEL MANAGEMENT": ["BACHELOR OF HMCT"],
        "SCHOOL OF LEGAL STUDIES": ["BBA+LL.B (INTEGRATED)", "BA+LL.B (INTEGRATED)", "LLM", "PH.D"],
        "SCHOOL OF BASIC SCIENCES": ["B.SC. (HONS.)", "M.SC.", "PH. D"],
        "SCHOOL OF HUMANITIES & SOCIAL SCIENCES": ["PH. D"],
        "SCHOOL OF EDUCATION": ["PH. D"],
        "BABU BANARASI DAS COLLEGE OF DENTAL SCIENCES": ["DDS", "Ph.D. Dental Sciences"]
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            school: '',
            course: '',
            duration: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required').min(8, 'Must be 8 characters or more'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required'),
            school: Yup.string().required('Required'),
            course: Yup.string().required('Required'),
            duration: Yup.string().required('Required')
        }),
        onSubmit: values => {
            console.log(values);
        },
    });

    const handleSchoolChange = (event) => {
        const { value } = event.target;
        setSelectedSchool(value);
        formik.setFieldValue('school', value);
        formik.setFieldValue('course', '');
    };

    const getCoursesOptions = () => {
        return schools[selectedSchool] || [];
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <h2 className="text-xl font-bold text-center">Sign Up</h2>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-sm text-red-600">{formik.errors.name}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-sm text-red-600">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </span>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-sm text-red-600">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirm_password}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </span>
                        </div>
                        {formik.touched.confirm_password && formik.errors.confirm_password ? (
                            <div className="text-sm text-red-600">{formik.errors.confirm_password}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="school" className="block text-sm font-medium text-gray-700">School</label>
                        <select
                            id="school"
                            name="school"
                            onChange={handleSchoolChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.school}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select School</option>
                            {Object.keys(schools).map((school) => (
                                <option key={school} value={school}>{school}</option>
                            ))}
                        </select>
                        {formik.touched.school && formik.errors.school ? (
                            <div className="text-sm text-red-600">{formik.errors.school}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
                        <select
                            id="course"
                            name="course"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.course}
                            disabled={!selectedSchool}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Course</option>
                            {getCoursesOptions().map((course) => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                        {formik.touched.course && formik.errors.course ? (
                            <div className="text-sm text-red-600">{formik.errors.course}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                        <input
                            id="duration"
                            name="duration"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.duration}
                            placeholder="e.g., 2021-2024"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {formik.touched.duration && formik.errors.duration ? (
                            <div className="text-sm text-red-600">{formik.errors.duration}</div>
                        ) : null}
                    </div>

                    <div className="flex justify-between">
                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                            Sign Up
                        </button>
                        <a href="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            I am already a member
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
