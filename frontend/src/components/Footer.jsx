function Footer() {
  return (
    <footer className="bg-gray-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-xl font-bold mb-3">✦ Blog</h2>
          <p className="text-gray-400 text-sm">
            A simple place to write, publish and discover blogs.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Navigate</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>Home</p>
            <p>All Blogs</p>
            <p>Write a Blog</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Account</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>Login</p>
            <p>Register</p>
            <p>Dashboard</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-5 text-sm text-gray-500">
        © 2026 Blog Platform. Built with MERN.
      </div>
    </footer>
  );
}

export default Footer;
