import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            Built with ❤️ on Solana
          </div>
          <div className="flex space-x-4">
            <a 
              href="https://solana.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Solana
            </a>
            <a 
              href="https://github.com/solana-labs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              GitHub
            </a>
            <a 
              href="https://docs.solana.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;