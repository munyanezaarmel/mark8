
import Head from 'next/head';
type RegisterLayoutProps = {
    children: React.ReactNode;
  };

const LoginLayout = ({ children }:RegisterLayoutProps) => {
 
  return (
    <html lang="en">
         <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
};

export default LoginLayout;
