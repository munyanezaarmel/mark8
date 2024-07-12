import React from 'react';

type RegisterLayoutProps = {
  children: React.ReactNode;
};

const RegisterLayout = ({ children }: RegisterLayoutProps) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};

export default RegisterLayout;
