import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MapPin, Mail, Phone, ExternalLink, Users, Clock, Calendar, Music, User, DollarSign, UsersRound, Mic, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import type { OrganizationWithEnsembles } from "@shared/schema";

export default function OrganizationDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: organization, isLoading } = useQuery<OrganizationWithEnsembles>({
    queryKey: ["/api/orgs", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-10 w-32 mb-6" />
          <Skeleton className="h-64 w-full mb-8 rounded-xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-8" />
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Organization Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The organization you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/directory">
              <Button>Return to Directory</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getEnsembleTypeColor = (ensembleType: string) => {
    switch (ensembleType) {
      case "Chamber Choir":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Community Chorus":
        return "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200";
      case "University Choir":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Children's Choir":
        return "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200";
      case "Church Choir":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
      case "Symphony Chorus":
        return "bg-[#E86C4F]/10 text-[#E86C4F] dark:bg-[#E86C4F]/20 dark:text-[#F07A5F]";
      case "Barbershop":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Jazz":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Show Choir":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200";
      case "A Cappella Pop":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200";
      case "Gospel":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case "Sacred":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      case "Spanish Language":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getVoiceTypeDisplay = (voiceType: string) => {
    if (voiceType === "Child") {
      return (
        <span className="inline-flex items-center justify-center px-2 py-1 rounded text-xs font-bold bg-[#E86C4F]/20 text-[#E86C4F] dark:bg-[#E86C4F] dark:text-white">
          Child
        </span>
      );
    }

    // Define which voice parts are included in this voice type
    const hasS = voiceType === 'SATB' || voiceType === 'SA';
    const hasA = voiceType === 'SATB' || voiceType === 'SA';
    const hasT = voiceType === 'SATB' || voiceType === 'TB';
    const hasB = voiceType === 'SATB' || voiceType === 'TB';

    return (
      <div className="flex gap-0.5">
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${
            hasS 
              ? 'bg-pink-200 text-pink-900 dark:bg-pink-600 dark:text-white' 
              : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
          }`}
        >
          S
        </span>
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${
            hasA 
              ? 'bg-purple-200 text-purple-900 dark:bg-purple-600 dark:text-white' 
              : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
          }`}
        >
          A
        </span>
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${
            hasT 
              ? 'bg-blue-200 text-blue-900 dark:bg-blue-600 dark:text-white' 
              : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
          }`}
        >
          T
        </span>
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${
            hasB 
              ? 'bg-green-200 text-green-900 dark:bg-green-600 dark:text-white' 
              : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
          }`}
        >
          B
        </span>
      </div>
    );
  };

  const getAuditionedBadgeColor = (auditioned: string) => {
    switch (auditioned) {
      case "True":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "False":
        return "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPayLevelBadgeColor = (payLevel: string) => {
    switch (payLevel) {
      case "Paid":
        return "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground";
      case "Volunteer":
        return "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200";
      case "Dues Required":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/directory">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Directory
          </Button>
        </Link>

        {/* Organization Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {organization.name}
          </h1>
          {organization.religiousAffiliation && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                Religious Affiliation: {organization.religiousAffiliation}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Mission Statement */}
            {organization.missionStatement && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Mission Statement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    {organization.missionStatement}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Goals */}
            {organization.goals && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    {organization.goals}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Ensembles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Music className="h-5 w-5 mr-2" />
                  Ensembles ({organization.ensembles.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {organization.ensembles.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-200">
                    No ensembles have been added for this organization yet.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {organization.ensembles.map((ensemble) => (
                      <div key={ensemble.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                              {ensemble.name}
                            </h3>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {ensemble.ensembleType && (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEnsembleTypeColor(ensemble.ensembleType)}`}>
                                {ensemble.ensembleType}
                              </span>
                            )}
                            {ensemble.auditioned && (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAuditionedBadgeColor(ensemble.auditioned)}`}>
                                {ensemble.auditioned === "True" ? "Auditioned" : "Non-Auditioned"}
                              </span>
                            )}
                            {ensemble.payLevel && (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPayLevelBadgeColor(ensemble.payLevel)}`}>
                                {ensemble.payLevel}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-200">
                            <User className="h-4 w-4 mr-2" />
                            <span><strong>Director:</strong> {ensemble.director || ""}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-200">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span><strong>Location:</strong> {ensemble.location || ""}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-200">
                            <UsersRound className="h-4 w-4 mr-2" />
                            <span><strong>Age Group:</strong> {ensemble.ageGroup || ""}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-200">
                            <Mic className="h-4 w-4 mr-2" />
                            <span><strong>Voice Type:</strong> </span>
                            {ensemble.voiceType && getVoiceTypeDisplay(ensemble.voiceType)}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-200">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span><strong>Season:</strong> {ensemble.season || ""}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-200">
                            <Clock className="h-4 w-4 mr-2" />
                            <span><strong>Rehearsals:</strong> {ensemble.rehearsalDetails || ""}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-start text-sm text-gray-600 dark:text-gray-200">
                            <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-semibold">Restrictions:</span>{" "}
                              {[
                                ensemble.ageRestrictions && ensemble.ageRestrictions !== "None" ? ensemble.ageRestrictions : null,
                                ensemble.otherRestrictions && ensemble.otherRestrictions !== "None" ? ensemble.otherRestrictions : null
                              ].filter(Boolean).join(", ") || "None"}
                            </div>
                          </div>
                        </div>

                        {ensemble.website && (
                          <div className="flex gap-2">
                            <a
                              href={ensemble.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-primary hover:text-primary-dark"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Visit Website
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {organization.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <a
                      href={`mailto:${organization.email}`}
                      className="text-primary hover:text-primary-dark"
                    >
                      {organization.email}
                    </a>
                  </div>
                )}

                {organization.website && (
                  <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-gray-500" />
                    <a
                      href={organization.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark"
                    >
                      Visit Website
                    </a>
                  </div>
                )}

                {organization.socialMedia && (
                  <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-gray-500" />
                    <a
                      href={organization.socialMedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark"
                    >
                      Social Media
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
