import './aboutPage.css';

const AboutPage = () => {
  return (
    <div className='aboutWrapperWrapper'>
      <div className='aboutContainer'>
        <div className='mainTitle'>
          <p>Real-Time Commenting Platform- MERN Stack Project</p>
        </div>
        <div className='subTitleContainer'>
          <div className='subTitle'>
            <p>Abstract</p>
          </div>
          <div className='subTitleText'>
            <p>
              Our final bootcamp project,a collaborative effort by Pouria,
              Dmytro and Hugo, Culminates in the creation of a dynamic web
              application using the MERN (MongoDB, Express.js React,js, Node.js)
              stack. The project aims to provide users with a real-time
              commenting platform, where individuals can post comment for public
              viewing and engage in interactive discussions through the
              implementation of websockets.
            </p>
          </div>
        </div>
        <div className='subTitleContainer'>
          <div className='subTitle'>
            <p>Project Overview</p>
          </div>
          <div className='subTitleText'>
            <p>
              The core idea behind our project is to develop a user-friendly
              platform that fosters communication through real-time-commenting.
              Leveraging the MERN stack, we divided out responsibilities to
              ensure a well- rounded and efficient development process.
            </p>
          </div>
        </div>
        <div className='projectSideTitle'>
          <p>Backend Technologies</p>
        </div>
        <div className='backendInfoWrapper'>
          <div className='subTitleContainer'>
            <div className='subTitle'>
              <p>Node.js</p>
            </div>
            <div className='subTitleText'>
              <p>
                Node.js is our the backend runtime environment, enabling us to
                use javascript on the server side. This library contributed to a
                more seemless development experience and enhances the overall
                Performance of the application.
              </p>
            </div>
          </div>
          <div className='subTitleContainer'>
            <div className='subTitle'>
              <p> Express Js</p>
            </div>
            <div className='subTitleText'>
              <p>
                as the backend framework, express.js facilitates the creation of
                robust and scalable APIs. It streamlines the development
                process, making it easier to handle HTTP requests and responses.
              </p>
            </div>
          </div>
          <div className='subTitleContainer'>
            <div className='subTitle'>
              <p>MongoDb</p>
            </div>
            <div className='subTitleText'>
              <p>
                the NoSQL database MongoDB serves as the storage solution for
                out application. It flexibility and scalability align with out
                project's requirements, allowing us to efficiently manage user
                data and comments
              </p>
            </div>
          </div>
          <div className='subTitleContainer'>
            <div className='subTitle'>
              <p>Mongoose</p>
            </div>
            <div className='subTitleText'>
              <p>
                We utilized Mongoose, an ODM(Object Data Modeling) library for
                MongoDB, to simplify database interactions and enhance data
                validation.
              </p>
            </div>
          </div>
          <div className='subTitleContainer'>
            <div className='subTitle'>
              <p>JWT(JsonWebToken)</p>
            </div>
            <div className='subTitleText'>
              <p>
                to secure out application and manage user authentication, we
                implemented JWT. This ensures that only authorized users can
                access and interact with the commenting features.
              </p>
            </div>
          </div>
          <div className='subTitleContainer'>
            <div className='subTitle'>
              <p>Bcrypt</p>
            </div>
            <div className='subTitleText'>
              <p>
                Password hashing is a crucial aspect of user authentication.
                Bcrypt provides a secure and efficient way to hash and compare
                passwords, enhancing the overall security of out application
              </p>
            </div>
          </div>
          <div className='subTitleContainer'>
            <div className='subTitle'>
              <p>Nodemon, Morgen, Cors, Dotenv</p>
            </div>
            <div className='subTitleText'>
              <p>
                Nodemon enables automatic server restarts during development,
                Morgan assists in logging HTTP requests, Cors handles
                cross-origin-resource sharing and Dotenv manages environment
                variables for enhanced security.
              </p>
            </div>
          </div>
          <div className='subTitleContainer'>
            <div className='subTitle'>
              <p>Express-ws</p>
            </div>
            <div className='subTitleText'>
              <p>
                Websocket endpoints for Express applications. It allows us to
                define WebSocket endpoints like any other type of route, and
                applies regular Express middleware. The Websocket support is
                implemented with the help of the WS library.
              </p>
            </div>
          </div>
          <div className='subTitleContainer'>
            <div className='subTitle'>
              <p>Websockets</p>
            </div>
            <div className='subTitleText'>
              <p>
                Websockets provide a real-time, bi-directional communication
                protocol, establishing persistent connection between clients and
                servers. This facilitates instant data exchange, reducing
                latency and enhancing efficiency. Ideal for application
                requiring real-time updates, such as chat platforms, live
                streaming, online gaming, and collaborative tools, websockets
                offer a responsive and scalable solution. Their event-driven
                architecture, efficient resource utilization, and support for
                bi-directional communication makes them a preferred choice for
                creating dynamic and interactive web applications.
              </p>
            </div>
          </div>
        </div>
        <div className='frontEndInfoWrapper'>
          <div className='projectSideTitle'>
            <p>Frontend Technologies</p>
          </div>
          <div className='subTitleContainer'>
            <div className='subTitle'>
              <p>React.js</p>
            </div>
            <div className='subTitleText'>
              <p>
                React.js the frontend of our application is buil using React.js,
                a popular JavaScript library for building user interfaces.
                React's component based architecture enhances the code
                organization and reusability.
              </p>
            </div>
          </div>
          <div className='subTitleContainer'>
            <div className='subTitle'>
              <p>React-Router-Dom</p>
            </div>
            <div className='subTitleText'>
              <p>
                To enable smooth navigation within our single-page application,
                we integrated react router dom. This library allows for dynamic
                routing, ensuring a seamless user experience.
              </p>
            </div>
          </div>
          <div className='subTitleContainer'>
            <div className='subTitle'>
              <p>Dotenv</p>
            </div>
            <div className='subTitleText'>
              <p>
                We used Dotenv in the frontend to manage environment variables,
                enhancing security and flexibility in the development and
                deployment processes.
              </p>
            </div>
          </div>
        </div>
        <div className='conclussionContainer'>
          <div className='subTitle'>
            <p>Conclussion</p>
          </div>
          <div className='subTitleText'>
            <p>
              Our MERN stack real-time commenting platform is the culmination of
              days of hard work, collaboration, and learning. By combining the
              strengths of our backend libraries, we created a feature-rich
              application that provides users with an engaging interactive space
              for sharing their thoughts and opinions. The inclusion of
              websockets ensures that conversations happen in real time,
              enhancing the overall user experience. Our project not only
              showcases our technical skills but also reflects our commitment to
              creating a meaningful and practical web applications
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
