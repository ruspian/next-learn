import HeroComponent from "@/components/heroComponent";
import MainComponent from "@/components/mainComponent";

export default function Home() {
  return (
    <div>
      <HeroComponent />
      <div className="mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">Room & Rates</h1>
          <p className="py-3 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt.
          </p>

          {/* tampilan card */}
          <MainComponent />
        </div>
      </div>
    </div>
  );
}
