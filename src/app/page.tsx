'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleRegister = () => {
    router.push('/register');
  };
  return (
    <main>
      <h1>home page</h1>
    <button onClick={handleLogin}>Login</button>
    <button onClick={handleRegister}>Register</button>
    </main>
  );
}
