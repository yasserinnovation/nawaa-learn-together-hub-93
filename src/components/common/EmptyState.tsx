import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

const EmptyState = ({ icon: Icon, title, description, action, secondaryAction }: EmptyStateProps) => {
  return (
    <Card className="shadow-md border-2 border-dashed">
      <CardContent className="pt-12 pb-12">
        <div className="text-center max-w-md mx-auto space-y-6">
          <div className="flex justify-center">
            <div className="h-20 w-20 bg-muted rounded-2xl flex items-center justify-center">
              <Icon className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              {description}
            </p>
          </div>

          {(action || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              {action && (
                <Button variant="cta" size="lg" asChild>
                  <Link to={action.href}>{action.label}</Link>
                </Button>
              )}
              {secondaryAction && (
                <Button variant="outline" size="lg" asChild>
                  <Link to={secondaryAction.href}>{secondaryAction.label}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
