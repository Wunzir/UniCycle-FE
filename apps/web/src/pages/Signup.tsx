const Signup = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Create UniCycle Account</h1>
            <p>Fill out the basics to get started.</p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="text" placeholder="University" />
                <input type="email" placeholder="Email" />
                <button type="button">Next Steps</button>
            </form>
        </div>
    );
};

export default Signup;