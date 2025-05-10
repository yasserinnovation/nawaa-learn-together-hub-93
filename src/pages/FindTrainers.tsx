
import Layout from "@/components/layout/Layout";
import TrainersList from "@/components/trainers/TrainersList";
import TrainersHero from "@/components/trainers/TrainersHero";

const FindTrainers = () => {
  return (
    <Layout>
      <TrainersHero />
      <div className="container mx-auto px-4 py-8">
        <TrainersList />
      </div>
    </Layout>
  );
};

export default FindTrainers;
