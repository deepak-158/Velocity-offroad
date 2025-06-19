import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/common/Hero';

const ContactPage: React.FC = () => {
  const contactFormRef = useRef<HTMLDivElement>(null);  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    media: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Function to scroll to contact form
  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  // Set up effect to handle hero button click
  useEffect(() => {
    const heroBtn = document.querySelector('.hero-content .btn');
    if (heroBtn) {
      const clickHandler = (e: Event) => {
        e.preventDefault();
        scrollToContactForm();
      };
      
      heroBtn.addEventListener('click', clickHandler);
      
      // Clean up event listener
      return () => {
        heroBtn.removeEventListener('click', clickHandler);
      };
    }
  }, []);  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      let response;
      
      if (formState.media) {
        // Use FormData for file uploads
        const formData = new FormData();
        formData.append("form-name", "contact");
        formData.append("name", formState.name);
        formData.append("email", formState.email);
        formData.append("phone", formState.phone);
        formData.append("subject", formState.subject);
        formData.append("message", formState.message);
        formData.append("media", formState.media);
        
        response = await fetch("/", {
          method: "POST",
          body: formData
        });
      } else {
        // Use URL encoding for text-only submissions
        const encode = (data: Record<string, string>) => {
          return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
        };
        
        const textData = {
          "form-name": "contact",
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          subject: formState.subject,
          message: formState.message
        };
        
        response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode(textData)
        });
      }

      if (response.ok) {
        // Show success message
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! We will get back to you soon.'
        });        
        // Reset form
        setFormState({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          media: null
        });
        
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormState(prev => ({
        ...prev,
        media: e.target.files![0]
      }));
    }
  };

  return (
    <Layout>
      <Hero
        title="Contact Us"
        subtitle="Get in touch with our team for inquiries, partnerships, or to join us"
        backgroundImage="/images/hero/contact-hero.svg"
        buttonText="CONTACT US"
        buttonLink="#"
        buttonType="primary" 
        buttonSize="lg"
      />
      
      <section className="section">
        <div className="container-custom">
          {/* Contact Information in 3 columns */}
          <div style={{ marginBottom: '3rem' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Location Column */}
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  padding: '1rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(var(--color-primary-600-rgb), 0.1)',
                  color: 'var(--color-primary-600)',
                  marginBottom: '1.5rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 11.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"/>
                  </svg>
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '1rem'
                }}>
                  Our Location
                </h3>
                <address style={{ 
                  fontStyle: 'normal',
                  color: '#4b5563',
                  lineHeight: '1.75'
                }}>
                  VIT Bhopal University<br />
                  Bhopal-Indore Highway<br />
                  Kothrikalan, Sehore<br />
                  Madhya Pradesh – 466114
                </address>
              </div>
              
              {/* Email Column */}
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  padding: '1rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(var(--color-primary-600-rgb), 0.1)',
                  color: 'var(--color-primary-600)',
                  marginBottom: '1.5rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                  </svg>
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '1rem'
                }}>
                  Email Us
                </h3>
                <p style={{ 
                  color: '#4b5563',
                  lineHeight: '1.75'
                }}>
                  <a href="mailto:contact@velocityoffroad.com" style={{ color: 'var(--color-primary-600)' }}>
                    contact@velocityoffroad.com
                  </a>
                </p>
                <p style={{ 
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  marginTop: '1rem'
                }}>
                  We typically respond within 24-48 hours.
                </p>
              </div>
              
              {/* Phone Column */}
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  padding: '1rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(var(--color-primary-600-rgb), 0.1)',
                  color: 'var(--color-primary-600)',
                  marginBottom: '1.5rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 0 0-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/>
                  </svg>
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '1rem'
                }}>
                  Call Us
                </h3>
                <p style={{ 
                  color: '#4b5563',
                  lineHeight: '1.75'
                }}>
                  Contact: <a href="tel:+91 9876543210" style={{ color: 'var(--color-primary-600)' }}>
                    +91 9876543210
                  </a>
                </p>
                <p style={{ 
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  marginTop: '1rem'
                }}>
                  Available Monday-Friday, 9:00 AM - 5:00 PM
                </p>
                <p style={{ 
                  color: '#15803d',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '0.25rem' }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  Also available on WhatsApp
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form Section */}
            <div id="contact-form" ref={contactFormRef} style={{ scrollMarginTop: '80px' }}>
              <h2 style={{
                fontSize: '1.875rem',
                fontFamily: "'Racing Sans One', cursive",
                color: 'var(--color-primary-600)',
                marginBottom: '1rem'
              }}>
                Send Us a Message
              </h2>
              <p style={{
                color: '#4b5563',
                marginBottom: '1.5rem'
              }}>
                Fill out the form below and we'll get back to you as soon as possible.
              </p>              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <input type="hidden" name="form-name" value="contact" />
                <div style={{ display: 'none' }}>
                  <label>
                    Don't fill this out if you're human: 
                    <input name="bot-field" />
                  </label>
                </div>

                {submitStatus.type && (
                  <div
                    style={{
                      padding: '1rem',
                      marginBottom: '1rem',
                      borderRadius: '0.375rem',
                      backgroundColor: submitStatus.type === 'success' ? '#ecfdf5' : '#fef2f2',
                      color: submitStatus.type === 'success' ? '#065f46' : '#991b1b'
                    }}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    htmlFor="name"
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#374151',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.375rem',
                      border: '1px solid #d1d5db',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#374151',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.375rem',
                      border: '1px solid #d1d5db',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    htmlFor="phone"
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#374151',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="[0-9]{10}"
                    placeholder="Enter 10-digit phone number"
                    value={formState.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.375rem',
                      border: '1px solid #d1d5db',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    htmlFor="subject"
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#374151',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.375rem',
                      border: '1px solid #d1d5db',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#374151',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formState.message}
                    onChange={handleInputChange}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.375rem',
                      border: '1px solid #d1d5db',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    htmlFor="media"
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#374151',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    Media Upload (Optional)
                  </label>
                  <input
                    type="file"
                    id="media"
                    name="media"
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.375rem',
                      border: '1px solid #d1d5db',
                      fontSize: '1rem',
                      backgroundColor: 'white'
                    }}
                  />
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    marginTop: '0.25rem'
                  }}>
                    {formState.media ? `Selected: ${formState.media.name}` : 'Supported: Images, Videos, PDF, Word documents (Max 10MB)'}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    borderRadius: '0.375rem',
                    backgroundColor: 'var(--color-primary-600)',
                    color: 'white',
                    border: 'none',
                    cursor: isSubmitting ? 'wait' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
            {/* Map and Social Links */}
            <div>
              <h2 style={{
                fontSize: '1.875rem',
                fontFamily: "'Racing Sans One', cursive",
                color: 'var(--color-primary-600)',
                marginBottom: '1rem'
              }}>
                Find Us
              </h2>
              <p style={{
                color: '#4b5563',
                marginBottom: '2rem'
              }}>
                Visit our workshop or connect with us on social media to stay updated with our latest racing projects and events.
              </p>
                {/* Interactive Map */}
              <div style={{
                width: '100%',
                height: '280px',
                backgroundColor: '#e5e7eb',
                borderRadius: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
                overflow: 'hidden'
              }}>
                <iframe 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.839%2C23.068%2C76.863%2C23.088&layer=mapnik&marker=23.0779%2C76.8505" 
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '0.5rem'
                  }}
                  title="VIT Bhopal University Map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <noscript>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280'
                  }}>
                    <p>Map cannot be displayed.</p>
                    <a 
                      href="https://www.openstreetmap.org/?mlat=23.0779&mlon=76.8505#map=15/23.0779/76.8505" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'var(--color-primary-600)' }}
                    >
                      View map in new tab
                    </a>
                  </div>
                </noscript>
                <p style={{ 
                  color: '#6b7280', 
                  marginTop: '0.5rem', 
                  fontSize: '0.75rem' 
                }}>
                  <a 
                    href="https://www.openstreetmap.org/?mlat=23.0779&amp;mlon=76.8505" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-primary-600)' }}
                  >
                    View larger map
                  </a>
                </p>
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '1rem'
                }}>
                  Follow Us
                </h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="social-icon-large" aria-label="Visit our Facebook page">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon-large" aria-label="Follow us on Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2c-2.716 0-3.056.012-4.123.06-1.064.049-1.791.218-2.427.465a4.902 4.902 0 00-1.772 1.153A4.902 4.902 0 002.525 5.45c-.247.636-.416 1.363-.465 2.427C2.012 8.944 2 9.284 2 12s.012 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 001.153 1.772 4.902 4.902 0 001.772 1.153c.636.247 1.363.416 2.427.465 1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 001.772-1.153 4.902 4.902 0 001.153-1.772c.247-.636.416-1.363.465-2.427.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 00-1.153-1.772 4.902 4.902 0 00-1.772-1.153c-.636-.247-1.363-.416-2.427-.465C15.056 2.012 14.716 2 12 2zm0 1.802c2.67 0 2.986.01 4.04.058.976.045 1.505.207 1.858.344.466.182.8.399 1.15.748.35.35.566.684.748 1.15.137.353.3.882.344 1.857.048 1.055.058 1.37.058 4.041 0 2.67-.01 2.986-.058 4.04-.045.976-.207 1.505-.344 1.858-.182.466-.399.8-.748 1.15-.35.35-.684.566-1.15.748-.353.137-.882.3-1.857.344-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-.976-.045-1.505-.207-1.858-.344a3.09 3.09 0 01-1.15-.748 3.09 3.09 0 01-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.055-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.045-.976.207-1.505.344-1.858.182-.466.399-.8.748-1.15.35-.35.684-.566 1.15-.748.353-.137.882-.3 1.857-.344 1.055-.048 1.37-.058 4.041-.058zm0 3.063A5.135 5.135 0 0012 17.135a5.135 5.135 0 100-10.27zm0 8.468A3.333 3.333 0 1112 6.667a3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-icon-large" aria-label="Follow us on Twitter/X">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5549 21H20.7996L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/>
                    </svg>
                  </a>
                  <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="social-icon-large" aria-label="Subscribe to our YouTube channel">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022zM10 15.5l6-3.5-6-3.5v7z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon-large" aria-label="Connect with us on LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;