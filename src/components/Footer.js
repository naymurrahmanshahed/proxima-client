const Footer = () => {
  return (
    <div className="py-10 flex justify-center">
      <p className="text-gray-400">
        &copy;{new Date().getFullYear()} Proxima, All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
