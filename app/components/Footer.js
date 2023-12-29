
const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`bg-${isDarkMode ? 'gray-800' : 'pink-200'} py-8 text-center`}>
      <div className="max-w-4xl mx-auto">
        <p className={`text-${isDarkMode ? 'white' : 'black'} text-lg mb-4`}>
          Ready for your next adventure?
        </p>
        <p className={`mt-8 text-${isDarkMode ? 'white' : 'black'} text-sm`}>
          &copy; 2023 Webtech Inchirah Jabir. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
