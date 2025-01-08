import React from "react";
import logo from "/src/assets/img/pngwing.png";

function Hero() {
  // Função para rolar até a próxima seção
  const scrollToSection = () => {
    const nextSection = document.getElementById("next-section");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <div>
          {/* Adicione a classe de rotação contínua */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="250"
            height="250"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0CC89C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-cpu animate-spin w-32"
          >
            <rect width="16" height="16" x="4" y="4" rx="2" />
            <rect width="6" height="6" x="9" y="9" rx="1" />
            <path d="M15 2v2" />
            <path d="M15 20v2" />
            <path d="M2 15h2" />
            <path d="M2 9h2" />
            <path d="M20 15h2" />
            <path d="M20 9h2" />
            <path d="M9 2v2" />
            <path d="M9 20v2" />
          </svg>
        </div>
        <div>
          <h1 className="text-[#0CC89C] text-[45px] w-[90%] m-auto text-center font-bold">
            Dashboard <span className="text-terciary">Products</span>
          </h1>
        </div>

        <div className="mt-4">
          <button
            onClick={scrollToSection} // Adiciona a função de scroll ao clique
            className="p-4 bg-background border rounded-full border-primary hover:scale-110 duration-300 transition-all hover:bg-primary hover:border-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-down text-primary hover:text-white"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* A próxima seção para onde o scroll vai */}
      {/* <div id="next-section" className="h-screen bg-gray-200 flex justify-center items-center">
        <h2 className="text-3xl">Esta é a próxima seção!</h2>
      </div> */}
    </>
  );
}

export default Hero;
