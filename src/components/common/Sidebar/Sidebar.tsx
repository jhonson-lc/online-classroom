import NextLink from "next/link";
import React, { useState } from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "../Header/components/Logo";
import Tooltip from "../Tooltip";

import { LOGGED_IN_LINKS } from "./constants";

interface Props {
  role: string;
}

const Sidebar: React.FC<Props> = ({ role }) => {
  const [showTitles, setShowTitles] = useState(true);
  const links = LOGGED_IN_LINKS[role];

  if (!links) return null;

  return (
    <AnimatePresence initial={false}>
      <motion.nav
        animate={{
          width: showTitles ? 240 : 80,
        }}
        className="relative flex h-full min-h-[100vh] flex-col justify-center border-2 bg-white"
        initial={"false"}
        transition={{
          duration: 0.3,
        }}
      >
        <div className="flex h-[100px] items-center justify-center border-b-2 text-[24px] font-[900] text-neutral-900">
          {showTitles ? (
            <motion.div
              animate={{
                opacity: showTitles ? 1 : 0,
              }}
              initial={{
                opacity: 0,
              }}
              transition={{
                delay: 0.2,
              }}
            >
              <Logo />
            </motion.div>
          ) : (
            <span className="text-2xl">V</span>
          )}
        </div>
        <motion.ul
          animate={{
            justifyContent: showTitles ? "flex-start" : "space-between",
          }}
          className="flex flex-1 flex-col gap-4 py-6"
          initial={{
            justifyContent: "flex-start",
          }}
        >
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NextLink key={link.id} legacyBehavior passHref href={link.href}>
                {showTitles ? (
                  <motion.a
                    animate={{
                      opacity: showTitles ? 1 : 0,
                    }}
                    className={`flex w-full items-center gap-4 py-4 ${
                      showTitles ? "justify-start pl-6" : "justify-center"
                    }`}
                    initial={{
                      opacity: 0,
                    }}
                    transition={{
                      delay: 0.2,
                    }}
                  >
                    <div>
                      <Icon className="text-2xl text-gray-900" />
                    </div>
                    {showTitles && (
                      <motion.span className="text-sm font-medium text-gray-900">
                        {link.name}
                      </motion.span>
                    )}
                  </motion.a>
                ) : (
                  <a
                    className={`flex w-full items-center gap-4 py-4 ${
                      showTitles ? "justify-start pl-6" : "justify-center"
                    } transition duration-100 ease-in-out hover:scale-110`}
                  >
                    <Tooltip title={link.name}>
                      <Icon className="text-2xl text-gray-900" />
                    </Tooltip>
                  </a>
                )}
              </NextLink>
            );
          })}
        </motion.ul>
        <div className="sticky bottom-0 border-t-2">
          <div
            className="flex cursor-pointer flex-row items-center justify-center gap-2 p-4  text-red-600"
            onClick={() => setShowTitles(!showTitles)}
          >
            <BsArrowBarLeft className={`${showTitles ? "rotate-0" : "rotate-180"}`} fontSize={20} />
            {showTitles && <span className="text-xs font-medium">Ocultar barra lateral</span>}
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Sidebar;
