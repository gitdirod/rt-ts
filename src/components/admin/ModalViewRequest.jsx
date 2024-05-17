export default function ModalViewRequest({icon, text, spin=true}) {
    return (
      <div className="center-c h-screen w-screen gap-y-4 drop-shadow-2xl z-20">
          <div className="relative">
          <img src={icon} className="w-24 h-24 white animate-ping" alt="update" />
          <img src={icon} className={`absolute top-0 w-24 h-24 white ${spin?'animate-spin':''}`} alt="update" />
          </div>
          <span className=" text-xl font-bold text-white">{text}</span>
      </div>
    )
  }
  