import { Link } from "react-router-dom";

const Submission = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '30px', color: '#2c3e50' }}>My Submission Page</h2>

      <div style={{
        width: '100%',
        maxWidth: '600px',
        padding: '25px',
        marginBottom: '30px',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <h4 style={{ marginBottom: '15px', color: '#3498db' }}>Access Learning Materials</h4>
        <p style={{ marginBottom: '20px', color: '#555' }}>
          Visit the LMS to access course materials, assignments, and grades.
        </p>
        
        <div style={{ marginTop: '25px' }}>
          <p style={{ marginBottom: '15px', color: '#555' }}>Need to access the LMS?</p>
          <a 
            href="https://lms.horizoncampus.edu.lk/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 25px',
              backgroundColor: '#3498db',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
          >
            Click to Access Horizon LMS
          </a>
        </div>
      </div>
    </div>
  );
};

export default Submission;