import React from 'react';

const Board = () => {
  // Sample data
  const stats = [
    { icon: '📚', title: 'Active Courses', value: '5' },
    { icon: '📝', title: 'Pending Assignments', value: '3' },
    { icon: '✅', title: 'Completed', value: '12' },
    { icon: '🏆', title: 'Current GPA', value: '3.8' }
  ];

  const quickActions = [
    { icon: '🎓', label: 'LMS Portal', link: 'https://lms.horizoncampus.edu.lk/' },
    { icon: '💻', label: 'Microsoft Teams', link: 'https://teams.microsoft.com/' },
    { icon: '📧', label: 'Student Email', link: 'https://outlook.office.com' },
    { icon: '🏛️', label: 'University Site', link: 'https://horizoncampus.edu.lk/' }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>Student Dashboard</h1>
      
      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '20px', 
        marginBottom: '30px'
      }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '10px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
            <div>
              <h3 style={{ margin: 0, color: '#3498db' }}>{stat.value}</h3>
              <p style={{ margin: '5px 0 0', color: '#7f8c8d' }}>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Section */}
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Quick Access</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '15px'
        }}>
          {quickActions.map((action, index) => (
            <a 
              key={index} 
              href={action.link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#2c3e50',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{action.icon}</span>
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;