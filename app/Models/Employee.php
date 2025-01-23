<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Employees extends Model
{
    use HasFactory;

    // กำหนดฟิลด์ที่สามารถกรอกข้อมูลได้ผ่านการสร้างหรืออัพเดต
    protected $fillable = [
        'emp_no',
        'first_name',
        'last_name',
        'gender',
        'birth_date',
        'hire_date',
        'photo', // เพิ่มฟิลด์ photo
    ];
}
