export default function Navbar() {
  const links = ["Home", "About", "Projects", "Contact"];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-red-800/30 bg-red-600/95 shadow-md backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-xl font-bold tracking-tight text-white">
          MyLogo
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>

        <button className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm transition hover:scale-105 hover:bg-red-50">
          Sign In
        </button>
      </div>
    </nav>
  );
}