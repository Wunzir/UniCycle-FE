import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Basic FAQ just to have like a tutorial if people need it
const FAQS = [
    {
        id: 1,
        question: "How do I purchase an item?",
        answer: "UniCycle works as a middle man to help locate people and items. The way to purchase an item would be to message the seller and meet with them to further negotiate price as well as complete any transactions utilizing whichever currency you would like."
    },
    {
        id: 2,
        question: "Do I have to be a student to use UniCycle?",
        answer: "Absolutely! UniCycle is made by students for the students. To use and log into UniCycle requires a functional student email with a .edu making for a safe and trusted environment for students to buy and sell their items."
    },
    {
        id: 3,
        question: "How do I report a suspicious listing?",
        answer: "If there is anything that seems suspicious or unsafe, even if a meetup felt unsafe please go down below and reach out to UniCycle and put in a report so that we can further look into anything."
    },
    {
        id: 4,
        question: "I forgot my password, how do I reset it?",
        answer: "If in the future you have forgotten your password, please go to Login and click on reset password and we will email your student email to allow for a smooth reset."
    }
];

const Help = () => {
    const navigate = useNavigate();

    // Remembers if FAQ is open
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // A temp contact form
    const [ticket, setTicket] = useState({ name: '', email: '', message: '' });

    const handleToggle = (id: number) => {

        setOpenFaq(openFaq === id ? null : id);
    };

    const handleSubmitTicket = (e: React.FormEvent) => {
        e.preventDefault();
        if (!ticket.message) return alert("Please describe your issue!");

        alert("Thank you! Your support ticket has been sent to the UniCycle team.");
        setTicket({ name: '', email: '', message: '' }); // Clear form
    };

    return (
        <div style={pageLayout}>
            {/* Top Navigation Bar */}
            <header style={topBarStyle}>
                <h1 style={navLogoStyle} onClick={() => navigate('/marketplace')}>UniCycle</h1>
                <button onClick={() => navigate('/marketplace')} style={backButtonStyle}>
                    &larr; Back to Marketplace
                </button>
            </header>

            <main style={mainContentStyle}>
                <div style={contentMaxWidth}>

                    <h1 style={pageTitleStyle}>Help Center</h1>
                    <p style={pageSubtitleStyle}>Find answers to common questions or reach out to our team.</p>


                    <section style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>Frequently Asked Questions</h2>
                        <div style={faqContainerStyle}>
                            {FAQS.map((faq) => (
                                <div key={faq.id} style={faqItemStyle}>
                                    <div
                                        style={faqQuestionStyle}
                                        onClick={() => handleToggle(faq.id)}
                                    >
                                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{faq.question}</h3>
                                        <span style={{ fontSize: '1.5rem', color: '#007bff' }}>
                                            {openFaq === faq.id ? '−' : '+'}
                                        </span>
                                    </div>


                                    {openFaq === faq.id && (
                                        <div style={faqAnswerStyle}>
                                            <p style={{ margin: 0 }}>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* This is more on the contact form */}
                    <section style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>Contact Support</h2>
                        <p style={{ color: '#666', marginBottom: '20px' }}>Experiencing a glitch or need account help? Send us a message.</p>

                        <form onSubmit={handleSubmitTicket} style={formStyle}>
                            <div style={formRowStyle}>
                                <div style={formGroupStyle}>
                                    <label style={labelStyle}>Name</label>
                                    <input
                                        type="text"
                                        value={ticket.name}
                                        onChange={(e) => setTicket({...ticket, name: e.target.value})}
                                        style={inputStyle}
                                        placeholder="Your name"
                                    />
                                </div>
                                <div style={formGroupStyle}>
                                    <label style={labelStyle}>Student Email</label>
                                    <input
                                        type="email"
                                        value={ticket.email}
                                        onChange={(e) => setTicket({...ticket, email: e.target.value})}
                                        style={inputStyle}
                                        placeholder="you@university.edu"
                                    />
                                </div>
                            </div>

                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Describe the issue</label>
                                <textarea
                                    value={ticket.message}
                                    onChange={(e) => setTicket({...ticket, message: e.target.value})}
                                    style={{ ...inputStyle, height: '120px', resize: 'vertical', fontFamily: 'sans-serif' }}
                                    placeholder="Please provide as much detail as possible..."
                                />
                            </div>

                            <button type="submit" style={submitButtonStyle}>Send Message</button>
                        </form>
                    </section>

                </div>
            </main>
        </div>
    );
};

// The style and what it looks like on the website below
const pageLayout: React.CSSProperties = { display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' };

// Navigation to this
const topBarStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '15px 30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 };
const navLogoStyle: React.CSSProperties = { color: '#007bff', fontSize: '1.8rem', margin: 0, fontWeight: '900', cursor: 'pointer' };
const backButtonStyle: React.CSSProperties = { padding: '8px 16px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#555' };


const mainContentStyle: React.CSSProperties = { flexGrow: 1, padding: '40px 20px', display: 'flex', justifyContent: 'center' };
const contentMaxWidth: React.CSSProperties = { width: '100%', maxWidth: '800px' };

const pageTitleStyle: React.CSSProperties = { fontSize: '2.5rem', color: '#333', margin: '0 0 10px 0' };
const pageSubtitleStyle: React.CSSProperties = { fontSize: '1.1rem', color: '#666', margin: '0 0 40px 0' };

// how the sections look
const sectionStyle: React.CSSProperties = { backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '30px' };
const sectionTitleStyle: React.CSSProperties = { marginTop: 0, color: '#333', borderBottom: '2px solid #f0f2f5', paddingBottom: '15px', marginBottom: '20px' };

// FAQ how it looks and its style
const faqContainerStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '15px' };
const faqItemStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' };
const faqQuestionStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: '#f8fbff', cursor: 'pointer', userSelect: 'none', transition: 'background-color 0.2s' };
const faqAnswerStyle: React.CSSProperties = { padding: '20px', backgroundColor: 'white', color: '#555', lineHeight: '1.6', borderTop: '1px solid #eee' };

// how the forms look like
const formStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '20px' };
const formRowStyle: React.CSSProperties = { display: 'flex', gap: '20px', flexWrap: 'wrap' };
const formGroupStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: '250px' };
const labelStyle: React.CSSProperties = { fontWeight: 'bold', color: '#444', fontSize: '0.95rem' };
const inputStyle: React.CSSProperties = { padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', outline: 'none' };
const submitButtonStyle: React.CSSProperties = { alignSelf: 'flex-start', padding: '12px 24px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' };

export default Help;