import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMessage } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto p-8 bg-white rounded-3xl shadow-xl space-y-8 sm:space-y-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8 sm:mb-12">
          About Us
        </h1>
        <div className="space-y-6 sm:space-y-8">
          <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
            Welcome to our service! We are dedicated to providing you with the best
            delivery and product-related services. Whether you're ordering food,
            products, or just need something delivered, we strive to offer quick and
            reliable services tailored to your needs.
            Our team is committed to delivering quality service, and we value your
            feedback as we continue to grow and improve our offerings.
          </p>
        </div>

        <div className="space-y-10 sm:space-y-14">
          <div>
            <h2 className="text-2xl sm:text-4xl font-semibold text-gray-800 mb-6 animate-bounce">
              Contact Information
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700 text-lg">
                  <FontAwesomeIcon icon={faPhone} className="mr-3 text-blue-500" />
                  <span>0912123434</span>
                </li>
                <li className="flex items-center text-gray-700 text-lg">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-blue-500" />
                  <a href="mailto:mw9334@gmail.com" target='_blank' className="hover:text-blue-600">mw9334@gmail.com</a>
                </li>
                <li className="flex items-center text-gray-700 text-lg">
                  <FontAwesomeIcon icon={faMessage} className="mr-3 text-blue-500" />
                  <span>Telegram: <a href="https://t.me/telegram" target="_blank" className="hover:text-blue-600">@telegram</a></span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
              Need Help?
            </h3>
            <p className="text-lg sm:text-xl text-gray-600">
              If you have any questions or need assistance, feel free to reach out to us via
              phone or email. Our team is here to help you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;