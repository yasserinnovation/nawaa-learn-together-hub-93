import { useEffect, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-500 ease-out ${
      isVisible 
        ? 'opacity-100 transform translate-y-0' 
        : 'opacity-0 transform translate-y-4'
    }`}>
      {children}
    </div>
  );
};

export default PageTransition;