/**
 * Skip to Content Link - WCAG 2.4.1
 * Allows keyboard users to skip repetitive navigation
 */
const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/50 font-semibold transition-all"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
