import React, { useState, useEffect } from 'react';

const FlashMessage = ({ flash }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        console.log('Flash data:', flash);
        if (flash.success || flash.error) {
            setVisible(true); // แสดงข้อความเมื่อมี Flash Message
            const timer = setTimeout(() => {
                setVisible(false); // ซ่อนข้อความหลังจาก 3 วินาที
            }, 3000);

            return () => clearTimeout(timer); // ลบ Timer เมื่อ Component ถูกลบ
        }
    }, [flash]);

    if (!visible || (!flash.success && !flash.error)) return null;

    return (
        <div
            className={`${
                flash.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            } mb-4 rounded border p-4`}
        >
            <p>{flash.success || flash.error}</p>
        </div>
    );
};

export default FlashMessage;
