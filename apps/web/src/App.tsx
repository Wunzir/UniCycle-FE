import { useState } from 'react'
import './App.css'

// Import the DATA and the TYPE from your shared library
// Notice the word 'type' before User
import { SHARED_TEXT, type User } from '@unicycle/shared';

function App() {
    // 1. Create a user object typed with the Interface from shared!
    const currentUser: User = {
        id: "101",
        username: "rpi_student",
        email: "student@rpi.edu",
        role: "student" // Try changing this to "teacher" -> TS should error!
    }

    return (
        <div className="App">
            <h1>UniCycle Web (TypeScript)</h1>
            <div className="card">
                <h3>Shared Logic Test:</h3>
                <p style={{ color: 'green', fontWeight: 'bold' }}>
                    {SHARED_TEXT}
                </p>

                <h3>Shared Type Test:</h3>
                <p>User: {currentUser.username}</p>
                <p>Role: {currentUser.role}</p>
            </div>
        </div>
    )
}

export default App