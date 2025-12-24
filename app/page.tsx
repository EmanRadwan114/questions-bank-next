import Image from "next/image";
import AddForm from "./components/AddForm";
import heroImg from "@/app/images/man-working-home-concept-flat-style.png";
import QuestionsList from "./components/QuestionsList";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl px-4 py-12">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16 relative">
          {/* AddForm */}
          <div className="">
            <div className="lg:sticky lg:start-0 lg:top-5 flex flex-col gap-8 lg:gap-1">
              <AddForm />
              <Image
                src={heroImg}
                alt="man working from home using laptop"
                className="rounded-sm mx-auto order-first lg:order-last"
                width={280}
              />
            </div>
          </div>

          {/* questions */}
          <div>
            <QuestionsList />
          </div>
        </section>
      </div>
    </main>
  );
}
