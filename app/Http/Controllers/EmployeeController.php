<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\Employee;




class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) //เพิ่มพารามิเตอร์ $request โดยรับข้อมูลจากหน้าเว็บผ่าน
    {
        $query = $request->input('search'); //รับค่าจาก input ที่ชื่อ search จากหน้าเว็บ มาเก็บไว้ในตัวแปร query


        $employees = DB::table('employees')
        ->where('first_name', 'like', '%' . $query . '%') //ค้นหาข้อมูลจากตาราง employees โดยค้นหาจากชื่อ นามสกุล และรหัสพนักงาน
        ->orWhere('last_name', 'like', '%' . $query . '%')
        ->orWhere('emp_no', '=',  $query ) //ขึ้นเฉพาะ
        ->orWhere('birth_date', 'like',  $query . '%')//
        ->paginate(20)
        ->appends(['search' => $query]); //นำค่าที่ได้จากการค้นไปแนบไว้กับ URL เพื่อที่ตอนผู้ใช้กดไปหน้าอื่น ข้อมูลจากค่าที่ค้นจะยังคงอยู่

        //Log::info($employees);

        return Inertia::render('Employee/index', [ //ส่งข้อมูลไปแสดงที่หน้าเว็บ ผ่านตัวแปร employeesและ query
            'employees' => $employees,
            'query' => $query,
        ]);

        //return response($employees); //ส่งข้อมูลกลับไปเป็น JSON

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
