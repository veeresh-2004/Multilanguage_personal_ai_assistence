import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Section - Menu */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Menu</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/loan-eligibility" className="hover:text-blue-400 transition-colors">
                Loan Eligibility
              </Link>
            </li>
            <li>
              <Link to="/Dashboard" className="hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/financial-tips" className="hover:text-blue-400 transition-colors">
                Financial Tips
              </Link>
            </li>
            <li>
              <Link to="/banklists" className="hover:text-blue-400 transition-colors">
                Bank Lists
              </Link>
            </li>
          </ul>
        </div>

        {/* Middle Section - Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect with Us</h3>
          <div className="flex space-x-4 text-2xl">
            <a 
              href="https://linkedin.com/in/your-profile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-green-500 transition-colors"
            >
              <FaWhatsapp />
            </a>
            <a 
              href="mailto:veereshhedderi18@gmail.com"
              className="hover:text-red-500 transition-colors"
            >
              <MdEmail />
            </a>
            <a 
              href="tel:+918880717978"
              className="hover:text-yellow-400 transition-colors"
            >
              <MdPhone />
            </a>
            <a 
              href="https://github.com/your-github" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              <FaGithub />
            </a>
          </div>
          
          {/* Contact Info */}
          <div className="mt-4 text-sm text-gray-300">
            <p className="flex items-center gap-2">
              <MdEmail className="text-lg" />
              veereshhedderi18gmail.com
            </p>
            <p className="flex items-center gap-2 mt-1">
              <MdPhone className="text-lg" />
              +91 888-071-7978
            </p>
          </div>
        </div>

        {/* Right Section - App Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">LoanMate App</h3>
          <p className="text-gray-300 text-sm mb-4">
            Get personalized loan recommendations and financial guidance right in your pocket.
          </p>
          
          {/* App Features */}
          <ul className="text-sm text-gray-300 space-y-1">
            <li>✓ Instant loan eligibility check</li>
            <li>✓ AI-powered recommendations</li>
            <li>✓ Compare bank offers</li>
            <li>✓ Financial planning tools</li>
          </ul>

          {/* Download Button */}
          <div className="mt-4">
            <button 
              onClick={() => {
                // You can add download functionality here
                alert("APK download will be available soon!");
              }}
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm font-semibold"
            >
              📱 Download App
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            <p>© {new Date().getFullYear()} LoanMate. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/support" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
