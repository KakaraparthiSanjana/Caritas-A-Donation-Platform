// import { faFileAudio } from '@fortawesome/free-solid-svg-icons';
import React ,{useCallback} from 'react';
import { useParams } from 'react-router-dom';
import './OtherReq.css'
import { useNavigate } from 'react-router-dom'
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';


const donorPhoneNumber = localStorage.getItem('donorMobileNumber');
const donorName = localStorage.getItem('donorName');


const OtherReq = () => {
    console.log(donorPhoneNumber)
    const { title,phoneNo } = useParams();
    let history = useNavigate();
    const handleSendMessage = async () => {
        try {

            

            const message = `Thank you ${donorName} for your generosity towards ${title}. Your donation is greatly appreciated. For any inquiries, please contact us at ${phoneNo}. Your support means the world to us!`;
            
            const response = await fetch('http://localhost:5000/api/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message,donorPhoneNumber }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Success message
                history('/')
                
            } else {
                console.error('Failed to send SMS');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
      }, []);
    
      const particlesLoaded = useCallback(async container => {
        await console.log(container);
      }, []);
    

   

    return (
        <>
                <div className="backg">
          <Particles
          id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#ffffff",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.7,
              },
            },
          },
          particles: {
            color: {
              value: "#000000",
            },
            links: {
              color: "#000000",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
          }}
          />
        </div>
        
        <div class="container-fluid message">
           <h5>Thank You for choosing caritas as platofrom for making a right and valuable donation</h5>
           <br></br>
           <h5>To get Message Please click on Notify</h5>
           <br></br>
           <button onClick={handleSendMessage}>Notify</button>

        </div>
        

        {/* <button onClick={handleSendMessage}>Send SMS</button> */}

        </>
    );
};

export default OtherReq;
