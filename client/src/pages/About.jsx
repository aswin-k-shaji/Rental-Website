import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>
      <p style={styles.paragraph}>Welcome to [Rental Company Name], your premier destination for reliable and comfortable rental properties. We are committed to providing high-quality rental experiences to our customers.</p>
      
      <h2 style={styles.subtitle}>Our Mission</h2>
      <p style={styles.paragraph}>Our mission is to offer exceptional rental services that meet the diverse needs of our clients. We strive to provide properties that are well-maintained, affordable, and conveniently located.</p>

      <h2 style={styles.subtitle}>Our Values</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}><strong>Customer Satisfaction:</strong> We prioritize our customers' needs and aim to exceed their expectations.</li>
        <li style={styles.listItem}><strong>Integrity:</strong> We operate with honesty, transparency, and professionalism in all our dealings.</li>
        <li style={styles.listItem}><strong>Quality:</strong> We ensure that all our rental properties meet high standards of quality and safety.</li>
        <li style={styles.listItem}><strong>Community:</strong> We believe in fostering a sense of community and contributing positively to the neighborhoods we serve.</li>
      </ul>
      
      <h2 style={styles.subtitle}>Our Story</h2>
      <p style={styles.paragraph}>[Rental Company Name] was founded in [Year] by [Founder's Name], with a vision to simplify the rental process and provide tenants with a stress-free experience. Over the years, we have grown and expanded our portfolio to include a wide range of properties that cater to different preferences and budgets.</p>

      <h2 style={styles.subtitle}>Meet the Team</h2>
      <p style={styles.paragraph}>Our dedicated team of professionals is here to assist you with all your rental needs. From property managers to customer support staff, we are committed to providing you with the best service possible.</p>
      
      <h2 style={styles.subtitle}>Contact Us</h2>
      <p style={styles.paragraph}>If you have any questions or would like to learn more about our rental properties, please don't hesitate to reach out to us. You can contact us at [Contact Information].</p>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    color: '#333',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '20px',
  },
  subtitle: {
    color: '#3498db',
    marginTop: '20px',
    marginBottom: '10px',
  },
  paragraph: {
    marginBottom: '15px',
  },
  list: {
    paddingLeft: '20px',
  },
  listItem: {
    marginBottom: '10px',
  },
};

export default About;
