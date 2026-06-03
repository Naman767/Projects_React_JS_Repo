import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const[length, setLength] = useState(8)
  const[numberAllowed, setNumberAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(true)
  const[Password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)
  
  const PasswordGenerator =  useCallback(()=>{
    let pass = ""
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed)  str += "!@#$%^&*"

    for (let i = 1; i <= length; i++) {

      let char  = Math.floor(Math.random() * str.length )

      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() =>{
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0, 8);

      window.navigator.clipboard.writeText(Password.slice(0, 8));
  },[Password])

  useEffect(() => {
      PasswordGenerator()
  } , [length, numberAllowed, charAllowed, PasswordGenerator])

  return (
    <>
    
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 w-full h-full object-cover -z-10">
      <source src="background.mp4/2176-155747466_medium.mp4" type="video/mp4" />
    </video>

    {/* Optional Dark Overlay */}
     <div className="fixed inset-0 bg-black/60 -z-10"></div> 
    <div className="relative z-10 w-full max-w-md mx-auto mt-10"></div>

    {/* Main Content */}
    <div 
        className="relative z-10 w-full max-w-md mx-auto shadow-md rounded-lg my-8 bg-transparent backdrop-blur-md text-white p-4">

      {/* Input field and Tags */}
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg my-8 bg-gray-700 text-orange-500'>
      
      <h1 className='text-white text-center my-3'>Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
              type="text"
              value={Password}
              className='outline-none w-full py-1 px-3 bg-white text-black'
              placeholder='password'
              readOnly
              ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >Copy</button>
        </div>  
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}} 
            />
            <label>Length: {length} </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
             />
             <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
             type="checkbox"
             defaultChecked={charAllowed}
             id='characterInput'
             onChange={() => {
              setCharAllowed((prev) => !prev);
             }} 
          />
          <label htmlFor="characterInput">Characters</label>

          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default App
