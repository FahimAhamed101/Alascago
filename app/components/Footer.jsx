import { MdLocalPhone, MdLocationOn, MdOutlineEmail } from "react-icons/md";
import Image from "next/image";
import { FiFacebook, FiLinkedin } from "react-icons/fi";
import { PiWhatsappLogo } from "react-icons/pi";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full space-y-5 mt-60 py-20 bg-[#174A00] px-6">
      <div className="space-y-5 pl-30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="relative pl-10" style={{ width: '180px', height: '180px' }}>
            <Image 
              src="/logo.svg" 
              alt="logo" 
              layout="fill"
              objectFit="contain"
            />
          </div>
          
          <div className="pt-5"> 
            <h1 className="text-2xl font-semibold text-white text-center md:text-start">
              Explore
            </h1>
            <ul className="flex flex-col text-center md:text-start gap-4 mt-5">
              <li>
                <Link href="https://play.google.com/store">
                  <button
                    className="h-16 px-6 bg-white text-black border-black hover:bg-gray-800 rounded-lg flex items-center gap-3"
                  >
                    <div className="w-12 h-12">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <path
                          fill="#EA4335"
                          d="M3.609 1.814L13.792 12 3.609 22.186a1.966 1.966 0 01-.09-0.582V2.396c0-.204.031-.4.09-.582z"
                        />
                        <path
                          fill="#FBBC04"
                          d="M20.683 10.747l-2.85-1.588-4.041 2.841 4.041 2.841 2.85-1.588a1.966 1.966 0 000-2.506z"
                        />
                        <path
                          fill="#4285F4"
                          d="M3.519 1.232C3.82 0.95 4.24 0.95 4.541 1.232l10.142 10.768L3.519 22.768C3.218 23.05 2.798 23.05 2.497 22.768a1.966 1.966 0 01-.09-0.582V2.396c0-.204.031-.4.09-.582z"
                        />
                        <path
                          fill="#34A853"
                          d="M14.683 12L3.519 1.232a1.966 1.966 0 01.09 0.582v19.372c0 .204-.031.4-.09.582L14.683 12z"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-black uppercase tracking-wide">Android App On</div>
                      <div className="text-lg font-medium">Google Play</div>
                    </div>
                  </button>
                </Link>
              </li>
            </ul>
          </div>

          <div className="pt-5">
            <h1 className="text-2xl font-semibold text-white text-center md:text-start">
              Support
            </h1>
            <ul className="flex flex-col gap-4 mt-5 text-center md:text-start">
              <li>
                <Link href="https://www.apple.com/app-store/" >
                  <button
                    className="h-16 px-6 bg-white text-black border-black hover:bg-gray-800 rounded-lg flex items-center gap-3"
                  >
                    <div className="w-8 h-8">
                      <svg viewBox="0 0 24 24" className="w-full h-full fill-black">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-medium">Download on the</div>
                      <div className="text-xl font-semibold">App Store</div>
                    </div>
                  </button>
                </Link>
              </li>
            </ul>
          </div>

          <div className="pt-5">
            <h1 className="text-2xl font-semibold text-white text-center md:text-start">
              Contact
            </h1>
            <ul className="flex flex-col gap-4 mt-5 text-center md:text-start">
              <li className="flex justify-center md:justify-start items-center gap-2 text-white">
                <MdOutlineEmail size={20} />
                <span className="ml-2">info@example.com</span>
              </li>
              <li className="flex justify-center md:justify-start items-center gap-2 text-white">
                <MdLocalPhone size={20} />
                <span className="ml-2">+8801319101179</span>
              </li>
              <li className="flex justify-center md:justify-start items-center gap-2 text-white">
                <MdLocationOn size={20} />
                <span className="ml-2">Dhaka Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;