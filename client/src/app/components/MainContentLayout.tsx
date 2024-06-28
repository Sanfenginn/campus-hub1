const MainContentLayout: React.FC = () => {
  const currentPage = localStorage.getItem("currentPage");
  console.log("currentPage: ", currentPage);

  return (
    <div className="border-2 border-black   flex flex-1">
      <div>ddd</div>
    </div>
  );
};

export default MainContentLayout;
