import { useState, useEffect } from "react";
import mergeImages from "merge-images";
import { saveAs } from "file-saver";
import { images } from "./assets/helmets";

function App() {
  const [source, setSource] = useState(null);
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");
  const [team, setTeam] = useState(null);

  const downloadImage = () => {
    saveAs(source, "footballskull.png"); // Put your image url here.
  };
  const handleSearch = (token) => {
    if (!token) {
      return setError("*** Please enter a Token ID ***");
    }
    if (!team) {
      return setError("*** Please choose a team ***");
    }
    const options = { method: "GET" };
    fetch(
      `https://api.opensea.io/api/v1/asset/0xc1caf0c19a8ac28c41fe59ba6c754e4b9bd54de9/${token}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        download(response.image_url);
        setError(null);
      })
      .catch((err) => console.error(err));
  };

  const download = (openseaUrl) => {
    console.log(openseaUrl);
    fetch(openseaUrl, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          console.log(url);
          init(url);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const init = (url) => {
    mergeImages([url, images.jets]).then((b64) => setSource(b64));
  };
  useEffect(() => {
    download();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col justify-center items-center">
      <form class="w-full max-w-lg bg-white rounded-lg py-6 px-3 flex flex-col justify-center shadow-md">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Skull ID
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            name="TokenID"
            value={input}
            onChange={(text) => setInput(text.target.value)}
            placeholder="Token ID"
            autoFocus
            maxLength={4}
          />
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-state"
          >
            Team
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            >
              <option value="49ers.png">49ers</option>
              <option value="bears.png">Bears</option>
              <option value="bengals.png">Bengals</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <p class="text-red-500 text-xs italic">{error}</p>
        </div>
        <div className="flex">
          <a
            onClick={() => handleSearch(input)}
            href="#_"
            class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group mx-auto"
          >
            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg
                class="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg
                class="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
              Search
            </span>
          </a>
        </div>
        {source ? (
          <>
            <div className="flex justify-center py-4">
              <img src={source} className="w-60" crossOrigin="anonymous" />
            </div>
            <div className="flex">
              <button
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mx-auto"
                onClick={downloadImage}
              >
                <svg
                  class="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Download</span>
              </button>
            </div>
          </>
        ) : null}
      </form>
    </div>
  );
}

export default App;
