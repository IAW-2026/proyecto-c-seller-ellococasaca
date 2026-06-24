import { WelcomeSection } from "../components/ui/welcome/welcome-section";
import { WelcomeHero } from "../components/ui/welcome/welcome-hero";

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2"> 
      <WelcomeHero />     
      <WelcomeSection />
    </div>
  )
}