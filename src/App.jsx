"use client"

import { useState, useRef } from "react"

function App() {
  const [text, setText] = useState("Type something cool...")
  const [fontName, setFontName] = useState("sans-serif")
  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef(null)

  const handleFontLoad = async (file) => {
    const arrayBuffer = await file.arrayBuffer()
    const name = file.name.split(".")[0]
    const font = new FontFace(name, arrayBuffer)

    try {
      await font.load()
      document.fonts.add(font)
      setFontName(name)
      setFileName(file.name)
    } catch (err) {
      console.error("Failed to load font:", err)
      alert("Couldn't load that font. Try a .ttf or .otf file.")
    }
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) await handleFontLoad(file)
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (file) await handleFontLoad(file)
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="min-h-screen flex flex-col items-center justify-center bg-black p-8"
    >
      <div className="flex flex-col items-center justify-center max-w-2xl w-full gap-8">
        {/* Text area */}
        <textarea
          className="w-full p-6 text-5xl text-center grid items-center resize-none text-gray-100 shadow-lg placeholder:text-gray-500 bg-transparent outline-none focus:ring-0 focus:border-none"
          style={{ fontFamily: fontName }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Upload area */}
        <div
          className="p-8 w-full text-center rounded-lg cursor-pointer bg-[#111010] text-white"
          onClick={() => fileInputRef.current.click()}
        >
          {fileName
            ? ` Loaded font: ${fileName}`
            : "Click or drag & drop a font file (.ttf / .otf)"}
          <input
            ref={fileInputRef}
            type="file"
            accept=".ttf,.otf"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {/* Font info */}
        <p className="text-sm text-white">
          Current font: <span className="text-white">{fontName}</span>
        </p>
      </div>

      <p className="text-gray-500 pt-10">Hi. I'm Oribi. I built this tool because I was annoyed with crosschecking fonts when working on projects. </p>
      <a href="https://github.com/ifubaraboye/quicktext" target="_blank" className="text-gray-500 py-3 hover:text-white">View Github</a>
    </div>
  )
}

export default App
