import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import logo from "../assets/logo.png";

const SITEMAP = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Our Team", "Projects"],
  },
  {
    title: "Help Center",
    links: ["Discord", "Twitter", "GitHub", "Contact Us"],
  },
  {
    title: "Resources",
    links: ["Blog", "Newsletter", "Free Products", "Affiliate Program"],
  },
  {
    title: "Products",
    links: ["Templates", "UI Kits", "Icons", "Mockups"],
  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="relative w-full bg-transparent text-white ">
      <div className="mx-auto w-full max-w-7xl px-8 py-12">
        <div className="flex flex-col md:flex-row md:justify-between mb-8">
          <div className=" space-y-4 mb-8 md:mb-0">
            <div className="flex items-center space-x-4 mb-8">
              <img src={logo} alt="Logo" className="w-12 h-12" />
              <Typography variant="h3" className="font-bold">Project-X</Typography>
            </div>
            <div className="inline">
              <Typography variant="h6" className="font-bold mb-2 md:mb-4">Newsletter</Typography>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="rounded-full px-4 py-2 text-black"
              />
              <button
                onClick={handleSubscribe}
                className="mt-2 md:mt-0 ml-4 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {SITEMAP.map(({ title, links }, key) => (
              <div key={key} className="w-full">
                <Typography variant="small" className="mb-4 font-bold uppercase">
                  {title}
                </Typography>
                <ul className="space-y-1">
                  {links.map((link, key) => (
                    <Typography key={key} as="li" className="text-gray-400 font-normal">
                      <a
                        href="#"
                        className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                      >
                        {link}
                      </a>
                    </Typography>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center border-t border-gray-700 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal md:mb-0"
          >
            &copy; {currentYear} <a href="https://material-tailwind.com/">Project-X</a>. All Rights Reserved.
          </Typography>
          <div className="flex gap-4">
            <Typography as="a" href="https://www.facebook.com/praneethchandra123/" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
            <Typography as="a" href="https://www.instagram.com/praneeth.swarna/" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058h-.468zm5.878 2.001a1.067 1.067 0 100 2.134 1.067 1.067 0 000-2.134zm-5.31 1.309a4.896 4.896 0 100 9.793 4.896 4.896 0 000-9.793zm0 1.802a3.094 3.094 0 110 6.188 3.094 3.094 0 010-6.188z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
            <Typography as="a" href="https://github.com/PraneethPanchakshari" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.01-1.02-.015-1.85-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.46-1.11-1.46-.907-.62.068-.608.068-.608 1.002.07 1.53 1.029 1.53 1.029.891 1.527 2.34 1.086 2.91.83.091-.646.35-1.086.637-1.336-2.22-.252-4.555-1.11-4.555-4.944 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.268.098-2.643 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.8c.85.004 1.705.115 2.504.338 1.91-1.294 2.749-1.025 2.749-1.025.546 1.375.202 2.39.1 2.643.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.688-4.565 4.936.359.308.678.918.678 1.85 0 1.335-.012 2.415-.012 2.742 0 .269.18.58.688.482A10.005 10.005 0 0022 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
            <Typography as="a" href="https://www.linkedin.com/in/praneeth-panchakshari-165445217/" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M6.94 2.5a2.691 2.691 0 110 5.382 2.691 2.691 0 010-5.382zM2.78 21.178V8.607H6.94v12.571H2.78zm8.692-12.571h-4.16v12.571h4.16V14.28c0-3.272 4.232-3.54 4.232 0v6.898h4.16V13.28c0-6.975-7.762-6.755-8.392-3.305v-1.368z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}
