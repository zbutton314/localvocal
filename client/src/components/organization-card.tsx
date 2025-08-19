import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Music, User, DollarSign } from "lucide-react";
import { Link } from "wouter";
import type { Organization, Ensemble } from "@shared/schema";

interface OrganizationCardProps {
  organization: Organization;
  ensembles: Ensemble[];
}

export function OrganizationCard({ organization, ensembles }: OrganizationCardProps) {
  // Get unique ensemble types, voice types, pay levels, and directors
  const ensembleTypes = Array.from(new Set(ensembles.map(e => e.ensembleType).filter(Boolean)));
  const voiceTypes = Array.from(new Set(ensembles.map(e => e.voiceType).filter(Boolean)));
  const auditionTypes = Array.from(new Set(ensembles.map(e => e.auditioned).filter(Boolean)));
  const payLevels = Array.from(new Set(ensembles.map(e => e.payLevel).filter(Boolean)));
  const directors = Array.from(new Set(ensembles.map(e => e.director).filter(Boolean)));

  const getBadgeVariant = (type: string, value: string) => {
    switch (type) {
      case "ensembleType":
        if (value === "Chamber Choir") return "default";
        if (value === "Community Choir") return "secondary";
        if (value === "Gospel Choir") return "destructive";
        if (value === "Jazz Ensemble") return "outline";
        return "default";
      case "audition":
        return value === "True" ? "default" : "destructive";
      case "voiceType":
        return "secondary";
      case "payLevel":
        if (value === "Paid") return "default";
        if (value === "Volunteer") return "outline";
        if (value === "Dues Required") return "secondary";
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Card className="bg-white dark:bg-dark-card rounded-xl shadow-sm border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-light transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2" data-testid={`text-organization-name-${organization.id}`}>
          {organization.shortName || organization.name}
        </h4>
        {organization.missionStatement && (
          <p className="text-gray-600 dark:text-gray-400 mb-4" data-testid={`text-organization-mission-${organization.id}`}>
            {organization.missionStatement.length > 150 
              ? `${organization.missionStatement.substring(0, 150)}...` 
              : organization.missionStatement}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {ensembleTypes.slice(0, 2).map((type) => (
            <Badge
              key={type}
              variant={getBadgeVariant("ensembleType", type)}
              className="text-xs font-medium"
            >
              {type}
            </Badge>
          ))}
          {auditionTypes.slice(0, 1).map((type) => (
            <Badge
              key={type}
              variant={getBadgeVariant("audition", type)}
              className="text-xs font-medium"
            >
              {type === "True" ? "Auditioned" : "Non-Auditioned"}
            </Badge>
          ))}
          {voiceTypes.slice(0, 1).map((type) => (
            <Badge
              key={type}
              variant={getBadgeVariant("voiceType", type)}
              className="text-xs font-medium"
            >
              {type}
            </Badge>
          ))}
          {payLevels.slice(0, 1).map((level) => (
            <Badge
              key={level}
              variant={getBadgeVariant("payLevel", level)}
              className="text-xs font-medium"
            >
              {level}
            </Badge>
          ))}
        </div>

        {directors.length > 0 && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <User className="h-4 w-4 mr-2" />
            <span data-testid={`text-director-${organization.id}`}>
              Director: {directors.slice(0, 2).join(", ")}
              {directors.length > 2 && ` +${directors.length - 2} more`}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Users className="h-4 w-4 mr-2" />
            <span>{organization.name}</span>
          </div>
          <Link href={`/orgs/${organization.urlSlug}`}>
            <Button
              className="bg-primary hover:bg-blue-700 text-white font-medium transition-colors"
              data-testid={`button-view-organization-${organization.id}`}
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
