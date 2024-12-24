import { motion } from "framer-motion";

type HamburgerIconProps = {
 readonly isOpen: boolean;
};

export function HamburgerIcon({ isOpen }: HamburgerIconProps) {
  const lineSpacing = 8;
  return (
    <div className="w-6 h-6 flex items-center justify-center">
      <motion.div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Top line */}
        <motion.span
          className="absolute h-[2px] w-full bg-current origin-center"
          style={{ y: -lineSpacing }}
          animate={{
            y: isOpen ? 0 : -lineSpacing,
            rotate: isOpen ? 45 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        {/* Middle line */}
        <motion.span
          className="absolute h-[2px] w-full bg-current"
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? 20 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        {/* Bottom line */}
        <motion.span
          className="absolute h-[2px] w-full bg-current origin-center"
          style={{ y: lineSpacing }}
          animate={{
            y: isOpen ? 0 : lineSpacing,
            rotate: isOpen ? -45 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
