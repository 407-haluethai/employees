import React , { useEffect }from 'react';
import { useForm,usePage} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FlashMessage from '@/Components/FlashMessage';

export default function Create({ departments }) { //รับข้อมูลจากcreateผ่านprops
    const { data, setData, post, errors } = useForm({ //ใช้ useform เพื่อจัดการข้อมูลในฟอร์ม
        first_name: '',                         //post ใช้ส่งข้อมูลไปหา controller,errors เก็บข้อความที่ผิดพลาดได้จากcontroller หลังตรวจสอบแล้ว
        last_name: '',
        gender: '',
        birth_date: '',
        hire_date: '',
        dept_no: '',
        photo: null,
    });

    const { flash } = usePage().props; // รับ Flash Message ที่ Controller สร้างไว้ผ่าน ใส่

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('employee.store' ), {
            onError: () => {
                // เมื่อเกิดข้อผิดพลาดจะมีข้อความ error จาก flash.js
                console.log('Error occurred');
                console.log(flash);
            }
        });
    };

    // useEffect(() => {
    //     console.log('Flash data from Laravel:', flash); // เช็คค่าของ flash ที่ส่งมาจาก Laravel
    // }, [flash]);

    return (
        <AuthenticatedLayout >
         <FlashMessage flash={flash} /> {/*ใช้ FlashMessage แสดงข้อความสำเร็จหรือข้อผิดพลาด โดยค่า flash มาจากcontroller*/}


        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8">

            <h2 className="text-2xl font-bold mb-4" style={{color: '#c1da92' }}>Create Employee</h2>
            <form onSubmit={handleSubmit}>

                {/* First Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                        First Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter first name"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                    />
                    {errors.first_name && (
                            <p className="text-red-500 text-sm ">
                                {errors.first_name}
                            </p>
                    )}
                </div>

                {/* Last Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                        Last Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter last name"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                    />
                    {errors.last_name && (
                            <p className="text-red-500 text-sm ">
                                {errors.last_name}
                            </p>
                    )}
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                        Gender
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                    {errors.gender && (
                            <p className="text-red-500 text-sm ">
                                {errors.gender}
                            </p>
                    )}
                </div>

                {/* Birth Date */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birth_date">
                        Birth Date
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        value={data.birth_date}
                        onChange={(e) => setData('birth_date', e.target.value)}
                    />
                    {errors.birth_date && (
                            <p className="text-red-500 text-sm ">
                                {errors.birth_date}
                            </p>
                    )}
                </div>

                {/* Hire Date */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hire_date">
                        Hire Date
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        value={data.hire_date}
                        onChange={(e) => setData('hire_date', e.target.value)}

                    />
                    {errors.hire_date && (
                            <p className="text-red-500 text-sm ">
                                {errors.hire_date}
                            </p>
                    )}
                </div>

                {/* Department */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                        Department
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={data.dept_no}
                        onChange={(e) => setData('dept_no', e.target.value)}

                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.dept_no} value={dept.dept_no}>
                                {dept.dept_name}
                            </option>
                        ))}
                    </select>
                    {errors.dept_no && (
                            <p className="text-red-500 text-sm ">
                                {errors.dept_no}
                            </p>
                    )}
                </div>

                 {/* Photo Upload */}
                 <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                        Photo
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="file"
                        onChange={(e) => setData('photo', e.target.files[0])}
                    />
                    {errors.photo && (
                            <p className="text-red-500 text-sm ">
                                {errors.photo}
                            </p>
                    )}
                </div>



                {/* Display Photo */}
                <div className="mb-4">
                    {data.photo && (
                        <img
                            src={URL.createObjectURL(data.photo)}
                            alt="Selected Photo"
                            className="w-32 h-32 object-cover rounded-full mx-auto"
                        />
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Employee
                    </button>
                </div>
            </form>
        </div>
    </AuthenticatedLayout>
    );
}
