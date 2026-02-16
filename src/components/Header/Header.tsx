import logo from './img/logo.svg'
// import burger from './img/burger.svg'

const Header = () => {
  return (
    <>
      <header className='mb-8'>
        <div className="flex justify-center p-4 cursor-pointer" onClick={() => window.location.reload()}>
          {/* <div className="w-[40px]"></div> */}
          <img src={logo} alt="" className="w-52"/>
          {/* <div className="burger cursor-pointer w-[40px]">
            <img src={burger} alt="" />
          </div> */}
        </div>
      </header>
    </>
  );
};

export default Header;
