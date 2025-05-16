
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import TrainersList from "@/components/trainers/TrainersList";
import TrainersHero from "@/components/trainers/TrainersHero";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const FindTrainers = () => {
  return (
    <Layout>
      <TrainersHero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Find Expert Trainers in Egypt</h1>
          <Button asChild className="flex items-center gap-2">
            <Link to="/trainer-signup">
              <User className="h-4 w-4" />
              Become a Trainer
            </Link>
          </Button>
        </div>
        <TrainersList />
      </div>
    </Layout>
  );
};

export default FindTrainers;
