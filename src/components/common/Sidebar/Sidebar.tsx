import NextLink from "next/link";
import React from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "../Header/components/Logo";
import Tooltip from "../Tooltip";
import { useComponentsStore } from "../store";

import { LOGGED_IN_LINKS } from "./constants";

import { useSession } from "@/libs/useSession";

interface Props {
  role: string;
}

const Sidebar: React.FC<Props> = ({ role }) => {
  const showTitles = useComponentsStore((state) => state.showTitles);
  const setShowTitles = useComponentsStore((state) => state.setShowTitles);
  const links = LOGGED_IN_LINKS[role];
  const session = useSession();

  if (!links) return null;

  return (
    <AnimatePresence initial={false}>
      <motion.nav
        animate={{
          width: showTitles ? 240 : 80,
        }}
        className="sticky top-4 m-4 flex h-full max-h-[95vh] min-h-[95vh] flex-col justify-center rounded-3xl bg-white shadow-md shadow-primary/20 drop-shadow-2xl"
        initial={"false"}
        transition={{
          duration: 0.3,
        }}
      >
        <div className="flex h-[100px] items-center justify-center text-[24px] font-[900] text-primary/90">
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
            <NextLink
              className="cursor-pointer text-2xl"
              href={
                session.data
                  ? session.data?.user?.role === "teacher"
                    ? "/classrooms"
                    : "/dashboard"
                  : "/"
              }
            >
              V
            </NextLink>
          )}
        </div>
        <motion.ul
          animate={{
            justifyContent: showTitles ? "flex-start" : "space-around",
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
                      <Icon className="text-xl text-primary" />
                    </div>
                    {showTitles && (
                      <motion.span className="text-sm font-medium text-primary/80">
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
                      <Icon className="text-2xl text-primary" />
                    </Tooltip>
                  </a>
                )}
              </NextLink>
            );
          })}
        </motion.ul>
        {showTitles ? (
          <motion.div
            animate={{
              opacity: showTitles ? 1 : 0,
            }}
            className="flex cursor-pointer flex-row items-center justify-center gap-2 p-4 text-secondary"
            initial={{
              opacity: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            onClick={() => setShowTitles(!showTitles)}
          >
            <BsArrowBarLeft className={`rotate-0 text-2xl font-extrabold`} />
            {showTitles && <span className="text-xs font-medium">Ocultar barra lateral</span>}
          </motion.div>
        ) : (
          <div
            className="flex cursor-pointer flex-row items-center justify-center gap-2 p-4 text-secondary"
            onClick={() => setShowTitles(!showTitles)}
          >
            <BsArrowBarLeft className={`rotate-180 text-2xl font-extrabold`} />
          </div>
        )}
      </motion.nav>
    </AnimatePresence>
  );
};

export default Sidebar;
