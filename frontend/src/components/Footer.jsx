import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: "17067777-eb0c-4d4b-8039-e3b51331296e",
            subject: "New Blog Newsletter Subscription",
            email: email,
            message: `New newsletter subscriber: ${email}`,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Thanks for subscribing!");
        setEmail("");
      } else {
        toast.error("Subscription failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: "GH",
      href: "https://github.com/Sanchay-Kumar-Singh",
    },
    {
      name: "LinkedIn",
      icon: "in",
      href: "https://www.linkedin.com/in/sanchay-kumar-singh-a48155297/",
    },
    {
      name: "Email",
      icon: "@",
      href: "mailto:sanchaysingh62425@gmail.com",
    },
  ];

  return (
    <footer className="mt-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white text-lg font-bold">
                ✦
              </div>

              <div className="text-2xl font-bold">
                Blog<span className="text-blue-500">Nova</span>
              </div>
            </Link>

            <p className="mt-5 text-sm text-gray-400 leading-7 max-w-sm">
              A simple place to write, publish, discover, and share
              meaningful ideas with the world.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900 text-gray-400 text-xs font-bold hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Navigate
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-500 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/blogs" className="text-gray-400 hover:text-blue-500 transition">
                  All Blogs
                </Link>
              </li>

              <li>
                <Link to="/write" className="text-gray-400 hover:text-blue-500 transition">
                  Write a Blog
                </Link>
              </li>

              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-blue-500 transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Account
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/login" className="text-gray-400 hover:text-blue-500 transition">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="text-gray-400 hover:text-blue-500 transition">
                  Register
                </Link>
              </li>

              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-blue-500 transition">
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-blue-500 text-xs font-semibold tracking-widest uppercase mb-3">
              Newsletter
            </p>

            <h3 className="text-xl font-bold mb-3">
              Stay updated
            </h3>

            <p className="text-sm text-gray-400 leading-6 mb-5">
              Get the latest articles, ideas, and updates directly in your inbox.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder:text-gray-600 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-600 mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-14 pt-7">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-500 text-center">
              © {currentYear} BlogNova. All rights reserved.
            </p>

            <p className="text-sm text-gray-600">
              Built with{" "}
              <span className="text-gray-400 font-medium">
                MERN Stack
              </span>
            </p>

            <button
              type="button"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              aria-label="Back to top"
              title="Back to top"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300"
            >
              ↑
            </button>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;