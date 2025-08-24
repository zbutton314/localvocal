import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, Music, User, UsersRound } from "lucide-react";
import { Link } from "wouter";
import type { Organization, Ensemble } from "@shared/schema";

// Inline EnsembleCard component
interface EnsembleCardProps {
  ensemble: Ensemble;
  organization: Organization;
  ensembleCount: number;
}

function EnsembleCard({ ensemble, organization, ensembleCount }: EnsembleCardProps) {
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
    // Only show voice type badges for SA, TB, and SATB
    if (voiceType === "" || voiceType === "Child") {
      return null;
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
              ? 'bg-pink-200 text-pink-900 dark:bg-pink-600 dark:text-white border-2 border-gray-800 dark:border-white' 
              : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
          }`}
        >
          S
        </span>
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${
            hasA 
              ? 'bg-purple-200 text-purple-900 dark:bg-purple-600 dark:text-white border-2 border-gray-800 dark:border-white' 
              : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
          }`}
        >
          A
        </span>
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${
            hasT 
              ? 'bg-blue-200 text-blue-900 dark:bg-blue-600 dark:text-white border-2 border-gray-800 dark:border-white' 
              : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
          }`}
        >
          T
        </span>
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${
            hasB 
              ? 'bg-green-200 text-green-900 dark:bg-green-600 dark:text-white border-2 border-gray-800 dark:border-white' 
              : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
          }`}
        >
          B
        </span>
      </div>
    );
  };

  const getBadgeVariant = (type: string, value: string) => {
    switch (type) {
      case "voiceType":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Card className="bg-white dark:bg-dark-card rounded-xl shadow-sm border-2 border-gray-200 dark:border-gray-700 hover:border-gold dark:hover:border-gold transition-all duration-200 hover:shadow-lg h-full">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Ensemble name as main title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1" data-testid={`text-ensemble-name-${ensemble.id}`}>
          {ensemble.name}
        </h3>
        
        {/* Organization short name as subtitle (only if multiple ensembles in org) */}
        {ensembleCount > 1 && (
          <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4" data-testid={`text-organization-name-${ensemble.id}`}>
            {organization.shortName || organization.name}
          </h4>
        )}

        {/* Spacer to ensure consistent spacing when no org name */}
        {ensembleCount <= 1 && (
          <div className="h-6 mb-4"></div>
        )}

        {/* Ensemble description */}
        <div className="mb-6">
          {ensemble.description && (
            <p className="text-gray-600 dark:text-gray-200" data-testid={`text-ensemble-description-${ensemble.id}`}>
              {ensemble.description}
            </p>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {ensemble.ensembleType && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEnsembleTypeColor(ensemble.ensembleType)}`}>
              {ensemble.ensembleType}
            </span>
          )}
          {ensemble.ensembleType && ensemble.voiceType && getVoiceTypeDisplay(ensemble.voiceType) && (
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
          )}
          {ensemble.voiceType && getVoiceTypeDisplay(ensemble.voiceType) && (
            <div className="flex items-center">
              {getVoiceTypeDisplay(ensemble.voiceType)}
            </div>
          )}
        </div>

        {/* Director info */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-200 mb-4">
          <User className="h-4 w-4 mr-2" />
          <span data-testid={`text-director-${ensemble.id}`}>
            <strong>Director:</strong> {ensemble.director || ""}
          </span>
        </div>

        {/* Age Group info */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-200 mb-4">
          <UsersRound className="h-4 w-4 mr-2" />
          <span data-testid={`text-age-group-${ensemble.id}`}>
            <strong>Age Group:</strong> {ensemble.ageGroup || ""}
          </span>
        </div>

        {/* Location info */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-200 mb-6">
          <MapPin className="h-4 w-4 mr-2" />
          <span data-testid={`text-location-${ensemble.id}`}>
            <strong>Location:</strong> {ensemble.location || ""}
          </span>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        <div className="flex justify-end items-center mt-6">
          <Link href={`/orgs/${organization.urlSlug}`}>
            <Button
              className="bg-gold hover:bg-gold-light text-white font-medium transition-colors duration-200"
              data-testid={`button-view-organization-${ensemble.id}`}
            >
              View Organization
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Directory() {
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('directory-search-query') || "";
  });

  const [organizationFilter, setOrganizationFilter] = useState(() => {
    return localStorage.getItem('directory-organization-filter') || "all";
  });
  const [ageGroupFilter, setAgeGroupFilter] = useState(() => {
    return localStorage.getItem('directory-age-group-filter') || "all";
  });
  const [payLevelFilter, setPayLevelFilter] = useState(() => {
    return localStorage.getItem('directory-pay-level-filter') || "all";
  });
  const [auditionFilter, setAuditionFilter] = useState(() => {
    return localStorage.getItem('directory-audition-filter') || "all";
  });
  const [voiceTypeFilter, setVoiceTypeFilter] = useState(() => {
    return localStorage.getItem('directory-voice-type-filter') || "all";
  });

  // Save filter state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('directory-search-query', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('directory-organization-filter', organizationFilter);
  }, [organizationFilter]);

  useEffect(() => {
    localStorage.setItem('directory-age-group-filter', ageGroupFilter);
  }, [ageGroupFilter]);

  useEffect(() => {
    localStorage.setItem('directory-pay-level-filter', payLevelFilter);
  }, [payLevelFilter]);

  useEffect(() => {
    localStorage.setItem('directory-audition-filter', auditionFilter);
  }, [auditionFilter]);

  useEffect(() => {
    localStorage.setItem('directory-voice-type-filter', voiceTypeFilter);
  }, [voiceTypeFilter]);

  const { data: organizations = [], isLoading: organizationsLoading } = useQuery<Organization[]>({
    queryKey: ["/api/organizations"],
  });

  const { data: ensembles = [], isLoading: ensemblesLoading } = useQuery<Ensemble[]>({
    queryKey: ["/api/ensembles"],
  });

  // Create organization lookup map
  const organizationMap = useMemo(() => {
    const map: Record<string, Organization> = {};
    organizations.forEach(org => {
      map[org.id] = org;
    });
    return map;
  }, [organizations]);

  // Count ensembles per organization
  const ensembleCountByOrg = useMemo(() => {
    const counts: Record<string, number> = {};
    ensembles.forEach(ensemble => {
      counts[ensemble.organizationId] = (counts[ensemble.organizationId] || 0) + 1;
    });
    return counts;
  }, [ensembles]);

  // Filter and sort ensembles
  const filteredEnsembles = useMemo(() => {
    const filtered = ensembles.filter(ensemble => {
      const organization = organizationMap[ensemble.organizationId];
      if (!organization) return false;
      
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesOrg = organization.name.toLowerCase().includes(searchLower) ||
                          (organization.shortName && organization.shortName.toLowerCase().includes(searchLower)) ||
                          (organization.missionStatement && organization.missionStatement.toLowerCase().includes(searchLower));
        const matchesEnsemble = ensemble.name.toLowerCase().includes(searchLower) ||
                               (ensemble.ensembleType && ensemble.ensembleType.toLowerCase().includes(searchLower)) ||
                               (ensemble.director && ensemble.director.toLowerCase().includes(searchLower));
        if (!matchesOrg && !matchesEnsemble) return false;
      }

      // Organization filter
      if (organizationFilter !== "all" && ensemble.organizationId !== organizationFilter) {
        return false;
      }

      // Age group filter
      if (ageGroupFilter !== "all" && ensemble.ageGroup !== ageGroupFilter) {
        return false;
      }

      // Pay level filter
      if (payLevelFilter !== "all" && ensemble.payLevel !== payLevelFilter) {
        return false;
      }

      // Audition filter
      if (auditionFilter !== "all") {
        const auditionValue = auditionFilter === "yes" ? "True" : "False";
        if (ensemble.auditioned !== auditionValue) {
          return false;
        }
      }

      // Voice type filter
      if (voiceTypeFilter !== "all" && ensemble.voiceType !== voiceTypeFilter) {
        return false;
      }

      return true;
    });

    // Sort alphabetically by organization name, then by ensemble name
    return filtered.sort((a, b) => {
      const orgA = organizationMap[a.organizationId];
      const orgB = organizationMap[b.organizationId];
      
      if (!orgA || !orgB) return 0;
      
      // First sort by organization name
      const orgComparison = orgA.name.localeCompare(orgB.name);
      if (orgComparison !== 0) return orgComparison;
      
      // Then sort by ensemble name within the same organization
      return a.name.localeCompare(b.name);
    });
  }, [ensembles, organizationMap, searchQuery, organizationFilter, ageGroupFilter, payLevelFilter, auditionFilter, voiceTypeFilter]);



  const EnsembleSkeleton = () => (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border-2 border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-5 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-12" />
        </div>
        <Skeleton className="h-4 w-32 mb-4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#688799] to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Ensemble Directory
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-6">
              Discover choral ensembles across the Kansas City metro area. 
              Filter by ensemble type, voice type, audition requirements, and more to find your perfect match.
            </p>
            <Link href="/submit-group">
              <Button variant="outline" className="bg-gold border-gold text-white hover:bg-white hover:border-gold hover:text-gold">
                Don't see your group listed? Submit it here!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ensembles Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter Controls */}
          <div className="mb-8 bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search organizations, ensembles, or directors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text focus:ring-2 focus:ring-gold focus:border-gold transition-colors duration-200"
                  data-testid="input-search"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Organization</label>
                <Select value={organizationFilter} onValueChange={setOrganizationFilter}>
                  <SelectTrigger data-testid="select-organization-filter">
                    <SelectValue placeholder="All Organizations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Organizations</SelectItem>
                    {organizations
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((org) => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age Group</label>
                <Select value={ageGroupFilter} onValueChange={setAgeGroupFilter}>
                  <SelectTrigger data-testid="select-age-group-filter">
                    <SelectValue placeholder="All Ages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="Adult">Adult</SelectItem>
                    <SelectItem value="Youth">Youth</SelectItem>
                    <SelectItem value="Children">Children</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pay Level</label>
                <Select value={payLevelFilter} onValueChange={setPayLevelFilter}>
                  <SelectTrigger data-testid="select-pay-level-filter">
                    <SelectValue placeholder="All Pay Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pay Levels</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Volunteer">Volunteer</SelectItem>
                    <SelectItem value="Dues Required">Dues Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Auditioned</label>
                <Select value={auditionFilter} onValueChange={setAuditionFilter}>
                  <SelectTrigger data-testid="select-audition-filter">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Voice Type</label>
                <Select value={voiceTypeFilter} onValueChange={setVoiceTypeFilter}>
                  <SelectTrigger data-testid="select-voice-type-filter">
                    <SelectValue placeholder="All Voices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Voices</SelectItem>
                    <SelectItem value="SATB">SATB</SelectItem>
                    <SelectItem value="SA">SA</SelectItem>
                    <SelectItem value="TB">TB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Ensemble Count */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredEnsembles.length} Ensemble{filteredEnsembles.length !== 1 ? 's' : ''} Found
            </h2>
          </div>

          {/* Ensembles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="ensembles-grid">
            {organizationsLoading || ensemblesLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <EnsembleSkeleton key={i} />
              ))
            ) : (
              filteredEnsembles.map((ensemble) => {
                const organization = organizationMap[ensemble.organizationId];
                return organization ? (
                  <EnsembleCard
                    key={ensemble.id}
                    ensemble={ensemble}
                    organization={organization}
                    ensembleCount={ensembleCountByOrg[ensemble.organizationId] || 0}
                  />
                ) : null;
              })
            )}
          </div>

          {!organizationsLoading && !ensemblesLoading && filteredEnsembles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No ensembles found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}


        </div>
      </section>

      <Footer />
    </div>
  );
}
