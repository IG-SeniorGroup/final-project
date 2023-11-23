import React from 'react';

const AboutPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <h2 className="text-center p-4 text-4xl font-bold">About BrainLink</h2>
      <img src="logo.svg" alt="Top Image" style={{ width: '60%', height: 'auto', marginBottom: '5rem' }} />

      <div style={{ display: 'flex', width: '60%', margin: 'auto' }}>
        <div style={{ flex: 1, textAlign: 'left', marginRight: '1rem' }}>
          <h3 style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '2rem' }}>What is BrainLink ?</h3>
          <p style={{ fontSize: '1.25rem' }}>
            We're redefining the learning experience by providing a dynamic platform, "BrainLink", where students can seamlessly connect, 
            share knowledge, and elevate their academic journey. BrainLink is a space where students can share insights, discuss challenging 
            topics, and collaboratively explore new ideas. 
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="image.png" alt="Image" style={{ width: '55%', height: 'auto' }} />
        </div>
      </div>

      <div style={{ display: 'flex', width: '60%', margin: 'auto', marginTop: '8rem' }}>
        <div style={{ flex: 1, textAlign: 'left', marginRight: '1rem' }}>
          <h3 style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '2rem' }}>Ask Anything !</h3>
          <p style={{ fontSize: '1.25rem' }}>
            A space for curiosity! Post questions across subjects, and our vibrant community of learners and experts will assemble to provide the insights you seek.
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="image.png" alt="Image" style={{ width: '55%', height: 'auto' }} />
        </div>
      </div>

      {/* Additional section */}
      <div style={{ display: 'flex', width: '60%', margin: 'auto', marginTop: '8rem', marginBottom: '8rem'}}>
        <div style={{ flex: 1, textAlign: 'left', marginRight: '1rem' }}>
          <h3 style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '2rem' }}>User-Driven Learning</h3>
          <p style={{ fontSize: '1.25rem' }}>
          Tailor your learning experience. With BrainLink, you're in control. Explore questions, discover new perspectives, and learn at your own pace.
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="image.png" alt="Image" style={{ width: '55%', height: 'auto' }} />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
