"use client"; // Obrigatório pois agora temos interatividade (estado e cliques)

import Image from "next/image";
import React, { useState } from "react";
import {
  Clock3,
  CalendarCheck2,
  Heart,
  MapPin,
  Target,
  Flame,
  Star,
  Award,
  Flower2,
} from "lucide-react";

// 1. Definição do Tipo
type Memory = {
  id: number;
  imageUrl: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

// 2. Dados Locais (Apontando para a pasta public/fotos/)
const memories: Memory[] = [
  {
    id: 1,
    imageUrl: "/fotos/foto1.jpg", // Coloque sua foto1.jpg na pasta public/fotos/
    label: "Especialmente pra você",
    icon: <CalendarCheck2 className="w-4 h-4 text-white" />,
    title: "Parabéns pelo seu dia",
    description:
      "Por ser essa mulher incrível, que me inspira e me faz querer ser melhor a cada dia. Te amo, Aline!",
  },
  {
    id: 2,
    imageUrl: "/fotos/foto-2.jpg", // Coloque sua foto2.jpg na pasta public/fotos/
    label: "Que contagia todos a sua volta",
    icon: <MapPin className="w-4 h-4 text-white" />,
    title: "Aquele Pôr do Sol",
    description:
      "Feliz Dia da Mulher para a mulher que eu admiro, respeito e amo todos os dias. Você é incrível. 🌹.",
  },
  {
    id: 3,
    imageUrl: "/fotos/foto-3.jpg", // Coloque sua foto3.jpg na pasta public/fotos/
    label: "Minha sorte",
    icon: <Target className="w-4 h-4 text-white" />,
    title: "Parceria em tudo",
    description:
      "Dos dias de festa aos domingos cozinhando (e aguarde a costela de hoje!).",
  },
  {
    id: 4,
    imageUrl: "/fotos/ruby-meg.jpg", // Coloque sua foto3.jpg na pasta public/fotos/
    label: "Nossas vidas",
    icon: <Target className="w-4 h-4 text-white" />,
    title: "Obrigado por ser a melhor mãe do mundo ",
    description: "E por nos dar uns biscoito a mais .",
  },
];

export default function SpotifyMemories() {
  // Estado para controlar qual story está ativo
  const [currentIndex, setCurrentIndex] = useState(0);

  // Funções de navegação
  const handleNext = () => {
    if (currentIndex < memories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Se for o último story e ela clicar para avançar, podemos rolar a página até o botão final
      document
        .getElementById("surpresa-final")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Pega o story atual baseado no estado
  const currentMemory = memories[currentIndex];

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-rose-500 pb-10">
      {/* HEADER FIXO */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock3 className="w-5 h-5 text-rose-500" />
          <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            Parabéns pelo dia da mulher
            <Flower2 className="w-5 h-5 text-rose-500" />
          </h1>
        </div>
        <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
      </header>
      {/* ÁREA DO STORY */}
      <section className="pt-20 px-4 w-full max-w-md mx-auto">
        {/* Container Principal do Story */}
        <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-800">
          {/* Barras de Progresso Segmentadas (Estilo Instagram) */}
          <div className="absolute top-3 left-0 w-full flex gap-1 px-3 z-20">
            {memories.map((_, index) => (
              <div
                key={index}
                className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full bg-white transition-all duration-300 ${
                    index < currentIndex
                      ? "w-full"
                      : index === currentIndex
                        ? "w-full"
                        : "w-0"
                  }`}
                  // Nota: Aqui o w-full no current deixa a barra cheia. Para animar preenchendo, precisaríamos de um useEffect com timer.
                ></div>
              </div>
            ))}
          </div>

          {/* Imagem Atual */}
          <Image
            src={currentMemory.imageUrl}
            alt={currentMemory.title}
            fill
            className="object-cover transition-opacity duration-300"
            priority // Força o carregamento rápido
          />

          {/* Gradiente Inferior Escuro para leitura */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>

          {/* Áreas de Clique Invisíveis */}
          <div
            className="absolute top-0 left-0 w-1/3 h-full z-10 cursor-pointer"
            onClick={handlePrev}
            aria-label="Voltar story"
          ></div>
          <div
            className="absolute top-0 right-0 w-2/3 h-full z-10 cursor-pointer"
            onClick={handleNext}
            aria-label="Avançar story"
          ></div>

          {/* Textos e Labels da Memória (Rodapé do Story) */}
          <div className="absolute bottom-0 left-0 w-full p-6 z-20 pointer-events-none">
            <div className="flex items-center gap-2 bg-rose-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full w-max mb-4">
              {currentMemory.icon}
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                {currentMemory.label}
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-2 leading-tight drop-shadow-md">
              {currentMemory.title}
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed drop-shadow-md">
              {currentMemory.description}
            </p>
          </div>
        </div>

        {/* Indicador visual de toque */}
        <div className="flex justify-between text-zinc-500 text-xs mt-3 px-2 font-medium">
          <span>← Toque para voltar</span>
          <span>Toque para avançar →</span>
        </div>
      </section>
      <section className="px-6 py-16 max-w-md mx-auto text-center border-t border-zinc-900 mt-8">
        <h2 className="text-3xl font-extrabold text-white mb-6 leading-tight">
          À mulher que me <span className="text-rose-500">inspira</span>
        </h2>
        <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
          <p>
            Hoje é o Dia da Mulher, mas a verdade é que eu celebro a sua força
            todos os dias. Eu acompanho de perto a sua garra, a sua resiliência
            e o coração gigante que você tem.
          </p>
          <p>
            Essas memórias aqui em cima são só uma parte da nossa história. A
            outra parte é a minha admiração por quem você é quando está buscando
            seus sonhos. Você é incrível, Aline.
          </p>
        </div>
      </section>
      ;{/* 2. GRID: OS "SUPERPODERES" DELA */}
      <section className="px-6 pb-16 max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-center shadow-lg">
            <Flame className="w-8 h-8 text-rose-500 mx-auto mb-3" />
            <h3 className="text-white font-bold text-sm mb-1">Determinação</h3>
            <p className="text-zinc-500 text-xs">Nunca desiste do que quer.</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-center shadow-lg">
            <Heart className="w-8 h-8 text-rose-500 mx-auto mb-3" />
            <h3 className="text-white font-bold text-sm mb-1">Empatia</h3>
            <p className="text-zinc-500 text-xs">
              Um coração que não cabe no peito.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-center shadow-lg">
            <Star className="w-8 h-8 text-rose-500 mx-auto mb-3" />
            <h3 className="text-white font-bold text-sm mb-1">Luz Própria</h3>
            <p className="text-zinc-500 text-xs">Ilumina qualquer ambiente.</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-center shadow-lg">
            <Award className="w-8 h-8 text-rose-500 mx-auto mb-3" />
            <h3 className="text-white font-bold text-sm mb-1">Parceira</h3>
            <p className="text-zinc-500 text-xs">
              A melhor dupla que eu poderia ter.
            </p>
          </div>
        </div>
      </section>
      {/* --------------------------------------------------------- */}
      {/* SEÇÃO: AVALIAÇÕES 5 ESTRELAS (REVIEWS DA ALINE) */}
      {/* --------------------------------------------------------- */}
      <section className="px-6 py-20 max-w-md mx-auto text-center border-t border-zinc-900 mt-12 relative overflow-hidden">
        {/* Efeito de brilho de fundo opcional */}
        <div className="absolute top-10 right-0 w-32 h-32 bg-rose-950 blur-[100px] rounded-full -z-10"></div>

        <div className="flex items-center justify-center gap-2.5 mb-6">
          <Star className="w-7 h-7 text-yellow-400 fill-yellow-400" />
          <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Nossa Cliente <span className="text-rose-500">VIP</span>
          </h2>
          <Star className="w-7 h-7 text-yellow-400 fill-yellow-400" />
        </div>

        <p className="text-zinc-400 text-sm mb-12 leading-relaxed">
          O que dizem os maiores especialistas (eu, e nossas meninas!) sobre a
          mulher mais incrível do mundo. Spoiler: 100% de aprovação.
        </p>

        {/* Grade de Depoimentos (Grid) */}
        <div className="grid grid-cols-1 gap-6">
          {/* Card 1: Lucas (Marido) */}
          <article className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 text-left shadow-xl backdrop-blur-sm relative hover:border-rose-800 transition-colors duration-300">
            {/* As 5 Estrelas */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            {/* Texto do Depoimento */}
            <p className="text-zinc-100 text-sm mb-6 leading-relaxed">
              Produto excelente, entregou muito mais do que prometeu, e muito
              mais mesmo. A doida que eu mais amo nessa vida. A melhor parceira
              de todos os tempos! Superou todas as expectativas. Recomendo de
              olhos fechados (apenas pra mim) !
            </p>
            {/* Quem Assina (Avatar e Nome) */}
            <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
              <div className="relative w-18 h-18 rounded-full overflow-hidden border-2 border-rose-500 shadow-inner">
                <Image
                  src="/fotos/lucas-avata.jpg" // Sua foto aqui (em public/fotos/)
                  alt="Lucas - Marido"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-base">Lucas</h4>
                <p className="text-rose-400 text-xs font-medium">
                  Seu Marido (Fã nº 1)
                </p>
              </div>
            </div>
          </article>

          {/* Card 2: ruby  */}
          <article className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 text-left shadow-xl backdrop-blur-sm relative hover:border-rose-800 transition-colors duration-300">
            <div className="flex gap-1 mb-4">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>

            <p className="text-zinc-100 text-sm mb-6 leading-relaxed">
              Eu amo o jeito que minha mãe me mima, me cuida, me abraça e me
              agarra. Mas amo ainda mais quando eu ganho uns petiscos a mais,
              inclusive ela me colocou de dieta. Por isso 4 estrelas.
            </p>

            <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
              <div className="relative w-18 h-18 rounded-full overflow-hidden border-2 border-rose-500 shadow-inner">
                <Image
                  src="/fotos/rubylui.jpg"
                  alt="Ruby"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h4 className="text-white font-bold text-base">Ruby</h4>
                <p className="text-rose-400 text-xs font-medium">
                  Filha mais amorosa e comilona do mundo
                </p>
              </div>
            </div>
          </article>
          {/* Card 3: Meg */}
          <article className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 text-left shadow-xl backdrop-blur-sm relative hover:border-rose-800 transition-colors duration-300">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>

            <p className="text-zinc-100 text-sm mb-6 leading-relaxed">
              Minha mãe é perfeita. Dá carinho, dá colo, protege e ainda deixa
              eu dormir grudada e ainda acorda as 5 da manhã pra me dar comida.
              Claramente merece 5 estrelas.
            </p>

            <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
              <div className="relative w-18 h-18 rounded-full overflow-hidden border-2 border-rose-500 shadow-inner">
                <Image
                  src="/fotos/megsaura.jpg"
                  alt="Meg"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h4 className="text-white font-bold text-base">Meg</h4>
                <p className="text-rose-400 text-xs font-medium">
                  Fiscal e vigia oficial da casa
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section
        id="surpresa-final"
        className="px-6 py-20 max-w-md mx-auto text-center border-t border-zinc-900 relative overflow-hidden"
      >
        {/* Glow de fundo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-950/40 blur-[120px] rounded-full"></div>
        </div>

        {/* Ícone */}
        <div className="relative z-10 flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shadow-lg">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
        </div>

        {/* Título */}
        <h2 className="relative z-10 text-3xl font-extrabold text-white leading-tight mb-6">
          E no fim de tudo...
          <br />
          <span className="text-rose-500">é você</span>
        </h2>

        {/* Texto principal */}
        <div className="relative z-10 space-y-4 text-zinc-300 text-sm leading-relaxed">
          <p>
            Entre todos os dias comuns que viram lembranças, entre todas as
            fases, risadas, planos, desafios e percausos... o que faz tudo valer
            a pena é ter você comigo.
          </p>

          <p>
            Hoje é o seu dia, mas a verdade é que eu agradeço por você existir
            em todos eles. Pela sua força, pelo seu carinho, pela sua luz e por
            tudo que você é.
          </p>

          <p className="text-white font-medium">
            Feliz Dia da Mulher, meu amor. Você é a parte mais bonita da minha
            vida.
          </p>
        </div>

        {/* Assinatura */}
        <div className="relative z-10 mt-10">
          <p className="text-zinc-500 text-xs uppercase tracking-[0.25em] mb-2">
            Com amor
          </p>
          <p className="text-2xl font-bold text-rose-500">Lucas</p>
        </div>

        {/* Botão final */}
        <div className="relative z-10 mt-10">
          <button
            onClick={() => alert("Te amo, Mozão. Obrigado por viver comigo ❤️")}
            className="px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors text-white font-bold shadow-lg shadow-rose-950/40 active:scale-[0.98]"
          >
            Toque aqui, meu amor ❤️
          </button>
        </div>
      </section>
      ;
    </main>
  );
}
