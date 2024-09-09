import InvoiceList from "./components/InvoiceList";

function App() {
  return (
    <>
      
      <div className="flex flex-col h-[800px] mt-20 w-[1280px] bg-white border justify-start items-start mx-auto gap-10">
        
        <div className="flex justify-center w-full items-center">
          <InvoiceList />
        </div>
      </div>
    </>
  );
}

export default App;
