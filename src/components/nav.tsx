import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

const Nav = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      <nav className="footer items-center p-1 text-neutral-content">
        <div className="items-center grid-flow-col">
          <a
            className="btn btn-ghost"
            href="https://www.superkeys.app/"
            rel="noreferrer"
            target="_blank"
          >
            <Image
              src="/brand/logo_text.png"
              width={100}
              height={20}
              alt="Flowgpt Logo"
            />
            <div className="badge badge-sm self-end">alpha</div>
          </a>
        </div>
        <div className="grid-flow-col gap-2 md:place-self-center md:justify-self-end mr-4 font-serif">
          <span>Made with ❤️ by</span>
          <a
            href="https://twitter.com/nil_ooy"
            target="_blank"
            rel="noreferrer"
          >
            <Icon
              icon="akar-icons:twitter-fill"
              className="text-xl text-[#1DA1F2]"
            />
          </a>
          <a
            href="https://github.com/nilooy/flowgpt"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon="akar-icons:github-fill" className="text-lg" />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
