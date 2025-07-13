import CardComponent from "@/components/cardComponent";

const MainComponent = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-6 pb-20 px-4">
      <div className="grid gap-7 md:grid-cols-3">
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
    </div>
  );
};

export default MainComponent;
