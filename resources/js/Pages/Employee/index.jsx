import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ employees, query }) {
    const [search, setSearch] = useState(query || '');
    const [sortConfig, setSortConfig] = useState({ key: 'emp_no', direction: 'ascending' });

    //กำหนดการค้นหาพนักงาน
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/employee', { search });
    };
    //กำหนดการเรียงลำดับข้อมูลพนักงาน
    const requestSort = (key) => {
        let direction = 'ascending';//เรียงจากน้อยไปมาก
        //ถ้าเรียงจากน้อยไปมากแล้วกดอีกครั้งจะเปลี่ยนเป็นเรียงจากมากไปน้อย
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';//เรียงจากมากไปน้อย
        }
        setSortConfig({ key, direction });
    };

    //เรียงลำดับข้อมูลพนักงาน
    const sortedEmployees = [...employees.data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const getArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '↑' : '↓';
        }
        return '';
    };

    const renderPaginationButtons = () => {
        const currentPage = employees.current_page;
        const lastPage = employees.last_page;
        const pageNumbers = [];

        for (let i = 1; i <= 3; i++) {
            if (i > lastPage) break;
            pageNumbers.push(i);
        }

        if (currentPage > 4) {
            pageNumbers.push('...');
        }

        for (let i = Math.max(1, currentPage - 1); i <= Math.min(lastPage, currentPage + 1); i++) {
            if (i > 3 && i < lastPage - 2) {
                pageNumbers.push(i);
            }
        }

        if (currentPage < lastPage - 3) {
            pageNumbers.push('...');
        }

        for (let i = lastPage - 2; i <= lastPage; i++) {
            if (i > 3 && i <= lastPage) {
                pageNumbers.push(i);
            }
        }

        //สร้างปุ่มเลขหน้า
        return pageNumbers.map((page, index) => (
            <button
                key={index}
                onClick={() => typeof page === 'number' && router.get(`${employees.path}?page=${page}`, { search })}
                style={{
                    margin: '0 5px',
                    padding: '10px 15px',
                    backgroundColor: page === currentPage ? '#007bff' : '#fff',
                    color: page === currentPage ? '#fff' : '#007bff',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    cursor: page === '...' ? 'not-allowed' : 'pointer',
                }}
            >
                {page}
            </button>
        ));
    };

    //แสดงข้อมูลพนักงาน
    return (
        <div>
            {employees.data.length > 0 && (
                <>
                    <h1 style={{ fontSize: '2.3em', fontWeight: 'bold', textAlign: 'center', margin: '40px 50px', color: '#007bff' }}>Employees List</h1>
                    <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '50px' }}>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search employees..."
                            style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', width: '250px' }}
                        />
                        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
                            Search
                        </button>
                    </form>
                </>
            )}



            {employees.data.length === 0 ? (
                //ไม่พบข้อมูลพนักงานจะขึ้นหน้านี้
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '85vh', position: 'relative' }}>
                    <p style={{ fontSize: '2.6em', fontWeight: 'bold', textAlign: 'center', color: 'gray' }}>Employee Not Found</p>
                    <button style={{ textDecoration: 'underline' }}
                        onMouseOver={(e) => { e.target.style.color = '#007bff'; }}
                        onMouseOut={(e) => { e.target.style.color = 'initial'; }}
                        onClick={() => window.location.href = '/employee'}>
                        Back To Home Page
                    </button>
                </div>
            ) : (
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th onClick={() => requestSort('emp_no')} style={{ borderBottom: '1px solid #ddd', padding: '10px 20px', cursor: 'pointer', textAlign: 'center' }}>Employee ID {getArrow('emp_no')}</th>
                                    <th onClick={() => requestSort('first_name')} style={{ borderBottom: '1px solid #ddd', padding: '10px 20px', cursor: 'pointer', textAlign: 'center' }}>Firstname {getArrow('first_name')}</th>
                                    <th onClick={() => requestSort('last_name')} style={{ borderBottom: '1px solid #ddd', padding: '10px 20px', cursor: 'pointer', textAlign: 'center' }}>Lastname {getArrow('last_name')}</th>
                                    <th onClick={() => requestSort('birth_date')} style={{ borderBottom: '1px solid #ddd', padding: '10px 20px', cursor: 'pointer', textAlign: 'center' }}>Birthdate (dd/mm/yyyy){getArrow('birth_date')}</th>
                                    <th onClick={() => requestSort('gender')} style={{ borderBottom: '1px solid #ddd', padding: '10px 20px', cursor: 'pointer', textAlign: 'center' }}>Gender {getArrow('gender')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedEmployees.map((employee, index) => (
                                    <tr key={employee.emp_no} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                                        <td style={{ borderBottom: '1px solid #ddd', padding: '10px 20px', textAlign: 'center' }}>{employee.emp_no}</td>
                                        <td style={{ borderBottom: '1px solid #ddd', padding: '10px 20px', textAlign: 'center' }}>{employee.first_name}</td>
                                        <td style={{ borderBottom: '1px solid #ddd', padding: '10px 20px', textAlign: 'center' }}>{employee.last_name}</td>
                                        <td style={{ borderBottom: '1px solid #ddd', padding: '10px 20px', textAlign: 'center' }}>
                                            {new Date(employee.birth_date).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td style={{ borderBottom: '1px solid #ddd', padding: '10px 20px', textAlign: 'center' }}>{employee.gender}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', alignItems: 'center' }}>
                            <button
                                onClick={() => router.get(employees.prev_page_url, { search })}
                                disabled={!employees.prev_page_url}
                                style={{
                                    margin: '0 5px',
                                    padding: '10px 15px',
                                    backgroundColor: '#fff',
                                    color: '#007bff',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    cursor: employees.prev_page_url ? 'pointer' : 'not-allowed',
                                    opacity: employees.prev_page_url ? 1 : 0.5,
                                }}
                            >
                                &laquo; Previous
                            </button>

                            {renderPaginationButtons()}

                            <button
                                onClick={() => router.get(employees.next_page_url, { search })}
                                disabled={!employees.next_page_url}
                                style={{
                                    margin: '0 5px',
                                    padding: '10px 15px',
                                    backgroundColor: '#fff',
                                    color: '#007bff',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    cursor: employees.next_page_url ? 'pointer' : 'not-allowed',
                                    opacity: employees.next_page_url ? 1 : 0.5,
                                }}
                            >
                                Next &raquo;
                            </button>
                        </div>

                        {search.length > 0 && (
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <button
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                                    onMouseOver={(e) => { e.target.style.color = '#007bff'; }}
                                    onMouseOut={(e) => { e.target.style.color = 'initial'; }}
                                    onClick={() => window.location.href = '/employee'}>
                                    Back To Home Page
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
