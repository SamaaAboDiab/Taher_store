import HeroBanner from "../components/HeroBanner";
import TrustStrip from "../components/TrustStrip";
import CategoryStrip from "../components/CategoryStrip";
import FeaturedProducts from "../components/FeaturedProducts";
import SocialFeed from "../components/SocialFeed";
import ReviewScreens from "../components/ReviewScreens";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <TrustStrip />
      <CategoryStrip />
      <FeaturedProducts />
      <SocialFeed />
      <ReviewScreens />
    </>
  );
}
