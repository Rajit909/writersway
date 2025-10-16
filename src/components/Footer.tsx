import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-12">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
        <Logo />
        <p className="text-sm text-muted-foreground mt-4 md:mt-0">
          © {new Date().getFullYear()} Visionary Voice. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
