

const AuthPageHeader = () => {
  return (
    <div>
      <div className=" flex items-center mb-4  gap-3 text-center justify-center">
        <img src="/logo.png" className="w-[40px] h-[40px]" alt="" />
        <h2 className="text-3xl font-bold  text-center text-gray-800">
          Connectify
        </h2>
      </div>
      <p className="text-lg mb-8 text-center text-gray-600">
        Your go-to contact management app
      </p>
    </div>
  );
};

export default AuthPageHeader;
