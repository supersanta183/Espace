'use client'
import React from 'react'
import { useState, useEffect } from 'react'

import IStandardUser from '@/interfaces/IStandardUser'

const page = () => {
    const [user, setUser] = useState<IStandardUser | null>(null);

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    const getUser = async () => {
        try {
            let accessToken = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:5064/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                credentials: 'include',
            });
            const result = await response.json();
            setUser(result);
        } catch (error) {
            console.error('Error:', error);
        }
    }


  return (
    <div>{user !== null && <div>username: {user?.firstName}</div>}</div>
  )
}

export default page