import React, { forwardRef, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import './App.css'

const Slider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const geserRef = useRef(null);

  const goToPreviousSlide = () => {
    const newIndex = (currentSlide - 1 + images.length) % images.length;
    setCurrentSlide(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = (currentSlide + 1) % images.length;
    setCurrentSlide(newIndex);
  };

  useEffect(() => {
    if (geserRef.current) {
      setTimeout(() => {
        geserRef.current.classList.remove("hidden");
        geserRef.current.classList.add("block");
      }, 3000);
      setTimeout(() => {
        geserRef.current.classList.remove("opacity-0");
        geserRef.current.classList.add("opacity-100");
      }, 3100);
    }
  }, []);

  const closeGeser = (e) => {
    if (geserRef.current.contains(e.target)) {
      geserRef.current.classList.remove("opacity-100");
      geserRef.current.classList.add("opacity-0");
      setTimeout(() => {
        geserRef.current.classList.remove("block");
        geserRef.current.classList.add("hidden");
      }, 100);
    }
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="slider-mobile flex rounded-xl transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index}`} className="w-full h-full" />
          ))}
        </div>
      </div>
      <div onClick={closeGeser} ref={geserRef} className="opacity-0 hidden transition duration-300 absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-12 bg-black/50 rounded-xl text-nowrap text-center text-white">
        <i className="absolute top-4 end-4 fa fa-fw fa-close"/>
        <i className="animasi-geser fa fa-fw text-5xl fa-hand-pointer mb-4"/>
        <p>Silahkan geser gambar ini</p>
      </div>
      {/* <button onClick={goToPreviousSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-l focus:outline-none">
        Previous
      </button>
      <button onClick={goToNextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-r focus:outline-none">
        Next
      </button> */}
    </div>
  );
};

const Page = forwardRef((props, ref) => {
  return (
    <div className={`overflow-hidden rounded-xl lg:rounded-none shadow-xl shadow-black/25 h-full w-full`} ref={ref}>
      <div className="group/book realtive bg-gradient-to-b from-blue-900 to-blue-950 text-white flex justify-center items-center h-full w-full">
        <img src={props.src} alt={props.alt} className="w-full h-full" />
        <div className="absolute inset-0 shadow-ke-dalam">
          {/* {props.nextButton && <span className={`hidden lg:block group-hover/book:opacity-100 opacity-0 transition-opacity duration-300 bg-black/25 text-white rounded-lg p-2 absolute cursor-pointer ${props.number % 2 === 0 ? 'end-4' : 'start-4'} top-1/2`}>{props.number % 2 === 0 ? <i className="fa fa-fw fa-arrow-right"/> : <i className="fa fa-fw fa-arrow-left"/>}</span>} */}
          <span className={`absolute ${props.number % 2 === 0 ? 'end-4' : 'start-auto end-4 sm:start-4 sm:end-auto'} bottom-4 text-xs text-white`}>Halaman {props.number}</span>
        </div>
      </div>
    </div>
  );
});

function App() {

  const [zoom, setZoom] = useState(100);
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.zoom = `${zoom}%`;

    // Tambahkan event listener ke elemen konten untuk menanggapi keyboard input
    const content = contentRef.current;
    content.addEventListener('keydown', handleKeyDown);

    // Hapus event listener saat komponen dibongkar
    return () => {
      content.removeEventListener('keydown', handleKeyDown);
    };

  }, [zoom, contentRef]);

  const handleKeyDown = (event) => {
    const content = contentRef.current;
    if (content) {
      switch (event.key) {
        case 'ArrowUp':
          content.scrollTop -= 50; // Sesuaikan jumlah scroll
          break;
        case 'ArrowDown':
          content.scrollTop += 50; // Sesuaikan jumlah scroll
          break;
        case 'ArrowLeft':
          content.scrollLeft -= 50; // Sesuaikan jumlah scroll
          break;
        case 'ArrowRight':
          content.scrollLeft += 50; // Sesuaikan jumlah scroll
          break;
        default:
          break;
      }
    }
  };

  const scrollContent = (direction) => {
    const content = contentRef.current;
    if (content) {
      if (direction === 'up') {
        content.scrollTop -= 50; // Sesuaikan jumlah scroll
      } else if (direction === 'down') {
        content.scrollTop += 50; // Sesuaikan jumlah scroll
      } else if (direction === 'left') {
        content.scrollLeft -= 50; // Sesuaikan jumlah scroll
      } else if (direction === 'right') {
        content.scrollLeft += 50; // Sesuaikan jumlah scroll
      }
    }
  };

  const images = [
    '/img/2024/1.jpg',
    '/img/2024/2.jpg',
    '/img/2024/3.jpg',
    '/img/2024/4.jpg',
    '/img/2024/5.jpg',
    '/img/2024/6.jpg',
    '/img/2024/7.jpg',
    '/img/2024/8.jpg',
  ];

  return (
    <div className='overflow-x-hidden overflow-y-auto h-screen bg-gradient-to-r from-blue-950 to-blue-700 flex justify-center lg:items-center'>
        <div className="w-full lg:flex flex-row px-4">
          <div className="lg:basis-1/3 flex items-center">
            <div className="text-white p-8">
              {/* <h1 className="mb-3 font-semibold text-2xl">Tips</h1> */}
              {/* <ul className="text-zinc-300 list-discXX px-8XX">
                <li className="text-sm mb-3">Klik di area gambar bagian kiri atau kanan untuk menuju ke halaman selanjutnya maupun ke halaman sebelumnya.</li>
                <li className="text-sm mb-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, veritatis ipsam hic sapiente deleniti facilis!</li>
                <li className="text-sm mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolorem.</li>
              </ul> */}
              <div>
                {/* <h6 className="mb-8 lg:text-xl font-semibold">Kuliah Singkat Cepat dapat Kerja?<br />hanya di Alfa Prima.<br />Ayo daftar sekarang! Temukan potensimu<br />dan raih masa depan gemilang bersama kami!</h6> */}
                <h6 className="mb-8 lg:text-xl font-semibold">Kuliah Singkat Cepat dapat Kerja?<br />Ayo daftar sekarang! Temukan potensimu<br />dan raih masa depan gemilang bersama kami!</h6>
                <a target="blank_" href="https://dev.alfaprima.id/form" className="bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-bold text-lg px-4 py-2">Daftar sekarang!</a>
                {/* <p className="mt-8 text-sm text-zinc-300"><i className="fa fa-fw fa-circle-info text-cyan-400"/> Klik di area gambar bagian kiri atau kanan untuk menuju ke halaman selanjutnya maupun ke halaman sebelumnya.</p> */}
                <p className="mt-8 text-sm text-zinc-300"><i className="fa fa-fw fa-circle-info text-cyan-400"/> Geser gambar ke kiri atau kanan untuk menuju ke halaman selanjutnya / sebelumnya.</p>
              </div>
              <p className="hidden lg:block mt-8 text-sm text-zinc-300">Copyright © Alfa Prima {new Date().getFullYear()}</p>
            </div>
          </div>
          <div tabIndex={0} ref={contentRef} className={`hidden lg:block lg:basis-2/3 pb-4 lg:pb-0 relative ${zoom > 100 ? "overflow-scroll aspect-[2/3] md:aspect-auto" : "overflow-hidden"}`}>
            <div className="relative">
              {/* {zoom > 100 && <div className="absolute w-full h-full z-50 bg-red-500/50"/>} */}
              <HTMLFlipBook
                  // className="shadow-ke-dalam bg-blue-950/25"
                  width={450}
                  height={600}
                  size="stretch"
                  minWidth={280}
                  maxWidth={500}
                  minHeight={380}
                  maxHeight={800}
                  maxShadowOpacity={0.5}
                  showCover={true}
                  mobileScrollSupport={true}
                  // autoSize={true}
                  // disableFlipByClick
                  // clickEventForward
                  onFlip={false}
                  useMouseEvents
              >
                <Page nextButton={false} number="1" src="/img/2024/1.jpg" alt="Brosur_Halaman_1"/>
                <Page nextButton number="2" src="/img/2024/2.jpg" alt="Brosur_Halaman_2"/>
                <Page nextButton number="3" src="/img/2024/3.jpg" alt="Brosur_Halaman_3"/>
                <Page nextButton number="4" src="/img/2024/4.jpg" alt="Brosur_Halaman_4"/>
                <Page nextButton number="5" src="/img/2024/5.jpg" alt="Brosur_Halaman_5"/>
                <Page nextButton number="6" src="/img/2024/6.jpg" alt="Brosur_Halaman_6"/>
                <Page nextButton number="7" src="/img/2024/7.jpg" alt="Brosur_Halaman_7"/>
                <Page nextButton={false} number="12" src="/img/2024/8.jpg" alt="Brosur_Halaman_8"/>
              </HTMLFlipBook>
            </div>
          </div>
          <div className="block lg:hidden max-w-xl mx-auto">
            <Slider images={images} />
          </div>
          <div className="block lg:hidden">
            <p className="py-4 text-center text-sm text-zinc-300">Copyright © Alfa Prima {new Date().getFullYear()}</p>
          </div>
          <div className="hidden lg:block scale-75 md:scale-90 fixed start-1/2 -translate-x-1/2 bottom-0 flex items-center bg-zinc-900 rounded-lg p-2">
            <button onClick={() => setZoom(zoom + 15)} disabled={zoom < 190 ? false : true} type="button" className={`${zoom < 190 ? 'hover:bg-zinc-700/75' : 'opacity-50'} px-3 py-2 rounded text-nowrap text-xs font-medium text-white bg-zinc-800 transition duration-200 mx-1`}><i className="fa fa-fw fa-plus"/> Zoom In</button>
            <button onClick={() => setZoom(zoom - 15)} disabled={zoom > 100 ? false : true} type="button" className={`${zoom > 100 ? 'hover:bg-zinc-700/75' : 'opacity-50'} px-3 py-2 rounded text-nowrap text-xs font-medium text-white bg-zinc-800 transition duration-200 mx-1`}><i className="fa fa-fw fa-minus"/> Zoom Out</button>
            <button onClick={() => setZoom(100)} disabled={zoom > 100 ? false : true} type="button" className={`${zoom > 100 ? 'hover:bg-zinc-700/75' : 'opacity-50'} px-3 py-2 rounded text-nowrap text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700/75 transition duration-200 mx-1`}><i className="fa fa-fw fa-rotate-right"/> Reset</button>

            <button onClick={() => scrollContent("left")} disabled={zoom > 100 ? false : true} type="button" className={`${zoom > 100 ? 'hover:bg-zinc-700/75' : 'opacity-50'} px-3 py-2 rounded text-nowrap text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700/75 transition duration-200 mx-1`}><i className="fa fa-fw fa-left-long"/></button>
            <button onClick={() => scrollContent("up")} disabled={zoom > 100 ? false : true} type="button" className={`${zoom > 100 ? 'hover:bg-zinc-700/75' : 'opacity-50'} px-3 py-2 rounded text-nowrap text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700/75 transition duration-200 mx-1`}><i className="fa fa-fw fa-up-long"/></button>
            <button onClick={() => scrollContent("down")} disabled={zoom > 100 ? false : true} type="button" className={`${zoom > 100 ? 'hover:bg-zinc-700/75' : 'opacity-50'} px-3 py-2 rounded text-nowrap text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700/75 transition duration-200 mx-1`}><i className="fa fa-fw fa-down-long"/></button>
            <button onClick={() => scrollContent("right")} disabled={zoom > 100 ? false : true} type="button" className={`${zoom > 100 ? 'hover:bg-zinc-700/75' : 'opacity-50'} px-3 py-2 rounded text-nowrap text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700/75 transition duration-200 mx-1`}><i className="fa fa-fw fa-right-long"/></button>
          </div>
        </div>
      </div>
  );
}

export default App