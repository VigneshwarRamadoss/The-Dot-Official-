import { motion } from "motion/react";
import Logo from "./logo.svg";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: "blur(10px)",
        scale: 1.05,
        transition: {
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center justify-center">

        {/* Main Bloom Glow */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 0.18, 0.12],
            scale: [0, 1.8, 1.3],
          }}
          transition={{
            duration: 2.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            rounded-full
            bg-neutral-300/40
            blur-3xl

            w-[180px]
            h-[180px]

            sm:w-[260px]
            sm:h-[260px]

            md:w-[320px]
            md:h-[320px]
          "
        />

        {/* Secondary Bloom Ring */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 0.1, 0],
            scale: [0, 2.2, 2.6],
          }}
          transition={{
            duration: 3,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            rounded-full
            border
            border-neutral-300/50

            w-[120px]
            h-[120px]

            sm:w-[180px]
            sm:h-[180px]

            md:w-[240px]
            md:h-[240px]
          "
        />

        {/* Logo Entrance */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.2,
            filter: "blur(20px)",
          }}
          animate={{
            opacity: 1,
            scale: [0.2, 1.08, 1],
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10"
        >
          <motion.img
            src={Logo}
            alt="THE DOT"
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              object-contain
              select-none

              w-[95px]
              h-[95px]

              sm:w-[125px]
              sm:h-[125px]

              md:w-[150px]
              md:h-[150px]

              lg:w-[175px]
              lg:h-[175px]
            "
          />
        </motion.div>

        {/* Typography Sync */}
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
            filter: "blur(10px)",
            letterSpacing: "1em",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            letterSpacing: "0.45em",
          }}
          transition={{
            delay: 0.8,
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-8
            uppercase
            font-medium
            bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-transparent

            text-[10px]
            sm:text-[12px]
            md:text-[14px]
          "
          style={{
            fontFamily:
              "'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          THE DOT
        </motion.div>
      </div>
    </motion.div>
  );
}