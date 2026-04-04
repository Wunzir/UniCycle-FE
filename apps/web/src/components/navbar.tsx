export default function WhiteNavbar() {
  const links = ["Home", "About", "Projects", "Contact"];

  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-xl font-semibold text-gray-900">MyLogo</div>

        <div className="hidden gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              {link}
            </a>
          ))}
        </div>

        <button className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
          Sign In
        </button>
      </div>
    </nav>
  );
}
