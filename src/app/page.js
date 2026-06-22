import HeroSlider from "@/Components/HeroSlider";
import FeaturedLessons from "@/Components/Homepage/FeaturedLessons";
import TopContributors from "@/Components/Homepage/TopContributors";
import WhyLearningFromLife from "@/Components/Homepage/WhyLearningFromLife";
import Image from "next/image";

export default function Home() {
  return (
  <div>
    <HeroSlider></HeroSlider>
    <FeaturedLessons></FeaturedLessons>
    <WhyLearningFromLife></WhyLearningFromLife>
    <TopContributors></TopContributors>
    
  </div>
  );
}
