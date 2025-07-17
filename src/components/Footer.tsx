const Footer = () => {
  return (
    <footer className="bg-background py-6 mt-8">
      <div className="container mx-auto px-6">
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Copyright © 2025 The Linux Foundation®. All rights reserved. The Linux Foundation has registered trademarks and uses trademarks. For more information, including terms of use,{' '}
          <a 
            href="https://www.linuxfoundation.org/legal/platform-use-agreement/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Platform Usage
          </a>
          ,{' '}
          <a 
            href="https://www.linuxfoundation.org/legal/privacy-policy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Privacy Policy
          </a>
          , and{' '}
          <a 
            href="https://www.linuxfoundation.org/legal/trademark-usage" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Trademark Usage
          </a>
          , please see our{' '}
          <a 
            href="https://www.linuxfoundation.org/legal/policies" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Policies
          </a>{' '}
          page.
        </p>
      </div>
    </footer>
  );
};

export default Footer;