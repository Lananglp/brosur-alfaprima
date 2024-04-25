import React, { forwardRef, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import './App.css'

const Page = forwardRef((props, ref) => {
  return (
    <div className={`overflow-hidden ${props.number % 2 === 0 ? 'lg:rounded-r-xl' : 'lg:rounded-l-xl'} rounded-xl lg:rounded-none shadow-xl shadow-black/25 h-full w-full`} ref={ref}>
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
  const bookRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.zoom = `${zoom}%`;

    if (zoom > 100) {
      const backdrop = document.querySelector('.backdrop');
      const contentWidth = bookRef.current.innerWidth;
      const contentHeight = bookRef.current.innerHeight;
      backdrop.style.width = `${contentWidth}px`;
      backdrop.style.height = `${contentHeight}px`;
    }

  }, [zoom, contentRef, bookRef]);

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
          <div ref={contentRef} className={`lg:basis-2/3 pb-4 lg:pb-0 relative ${zoom > 100 ? "overflow-scroll" : "overflow-hidden"}`}>
            {zoom > 100 && <div className="backdrop absolute z-50 bg-red-500/50"></div>}
            <HTMLFlipBook
                ref={bookRef}
                width={450}
                height={600}
                size="stretch"
                minWidth={280}
                maxWidth={500}
                minHeight={380}
                maxHeight={800}
                maxShadowOpacity={0.5}
                showCover={false}
                mobileScrollSupport={true}
                // autoSize={true}
                // disableFlipByClick
                // clickEventForward={false}
            >
              <Page nextButton={false} number="1" src="/img/1.JPG" alt="Brosur_Halaman_1"/>
              <Page nextButton number="2" src="/img/2.JPG" alt="Brosur_Halaman_2"/>
              <Page nextButton number="3" src="/img/3.JPG" alt="Brosur_Halaman_3"/>
              <Page nextButton number="4" src="/img/4.JPG" alt="Brosur_Halaman_4"/>
              <Page nextButton number="5" src="/img/5.JPG" alt="Brosur_Halaman_5"/>
              <Page nextButton number="6" src="/img/6.JPG" alt="Brosur_Halaman_6"/>
              <Page nextButton number="7" src="/img/7.JPG" alt="Brosur_Halaman_7"/>
              <Page nextButton number="8" src="/img/8.JPG" alt="Brosur_Halaman_8"/>
              <Page nextButton number="9" src="/img/9.JPG" alt="Brosur_Halaman_9"/>
              <Page nextButton number="10" src="/img/10.JPG" alt="Brosur_Halaman_10"/>
              <Page nextButton number="11" src="/img/11.JPG" alt="Brosur_Halaman_11"/>
              <Page nextButton={false} number="12" src="/img/12.JPG" alt="Brosur_Halaman_12"/>
            </HTMLFlipBook>
          </div>
          <div className="block lg:hidden">
            <p className="py-4 text-center text-sm text-zinc-300">Copyright © Alfa Prima {new Date().getFullYear()}</p>
          </div>
          <div className="fixed start-0 bottom-0">
            <button onClick={() => setZoom(zoom + 15)} type="button" className="p-2 bg-red-500">{"+"}</button>
            <button onClick={() => setZoom(zoom - 15)} type="button" className="p-2 bg-green-500">{"-"}</button>
            <button onClick={() => setZoom(100)} type="button" className="p-2 bg-yellow-500">{"reset"}</button>
          </div>
        </div>
      </div>
  );
}

export default App
