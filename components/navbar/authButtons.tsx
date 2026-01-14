import { Button } from "../ui/button";
import Link from "next/link";

const AuthButtons = () => {
  return (
    <div className="hidden md:flex space-x-2">
      <Button variant="outline" asChild className="rounded-2xl">
        <Link href="/register">Register</Link>
      </Button>
      <Button asChild className="rounded-2xl">
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
