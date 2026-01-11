import logo from "@/assets/logo.png";

/**
 * Header component with logo, site title, and tagline
 */
const Header = () => {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container-main py-4">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <img 
            src={logo} 
            alt="NepaliTechHub Logo" 
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
          />
          
          {/* Site title */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              NepaliTechHub
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
