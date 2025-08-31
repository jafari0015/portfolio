
const ResumeButton: React.FC = () => {

  return (
    <a
      href="/resume.pdf"
      download
      className="bg-transparent border-[1px] dark:border-[#c8f31d] border-stone-400 text-stone-900 flex font-semibold 
                 items-center justify-center px-4 py-[10px] sm:px-6 sm:py-4 dark:text-stone-100 text-sm rounded-md cursor-pointer"
    >
      Download CV
    </a>
  );
};

export default ResumeButton;
