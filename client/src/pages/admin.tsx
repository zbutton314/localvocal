import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, LogOut } from "lucide-react";
import type { Organization, Ensemble } from "@shared/schema";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"organization" | "ensemble">("organization");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Edit mode states
  const [selectedOrgId, setSelectedOrgId] = useState<string>("");
  const [selectedEnsembleId, setSelectedEnsembleId] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState(false);

  // Form states
  const [orgForm, setOrgForm] = useState({
    name: "",
    shortName: "",
    urlSlug: "",
    website: "",
    socialMedia: "",
    email: "",
    religiousAffiliation: "",
    missionStatement: "",
    goals: ""
  });

  const [ensembleForm, setEnsembleForm] = useState({
    name: "",
    shortName: "",
    organizationId: "",
    organizationName: "",
    website: "",
    director: "",
    ageGroup: "",
    voiceType: "",
    ensembleType: "",
    location: "",
    auditioned: "",
    payLevel: "",
    ageRestrictions: "",
    otherRestrictions: "",
    season: "",
    rehearsalDetails: ""
  });

  const { data: organizations = [] } = useQuery<Organization[]>({
    queryKey: ["/api/organizations"],
  });

  const { data: ensembles = [] } = useQuery<Ensemble[]>({
    queryKey: ["/api/ensembles"],
  });

  // Helper functions for form management
  const resetOrgForm = () => {
    setOrgForm({
      name: "",
      shortName: "",
      urlSlug: "",
      website: "",
      socialMedia: "",
      email: "",
      religiousAffiliation: "",
      missionStatement: "",
      goals: ""
    });
    setSelectedOrgId("");
    setIsEditMode(false);
  };

  const resetEnsembleForm = () => {
    setEnsembleForm({
      name: "",
      shortName: "",
      organizationId: "",
      organizationName: "",
      website: "",
      director: "",
      ageGroup: "",
      voiceType: "",
      ensembleType: "",
      location: "",
      auditioned: "",
      payLevel: "",
      ageRestrictions: "",
      otherRestrictions: "",
      season: "",
      rehearsalDetails: ""
    });
    setSelectedEnsembleId("");
    setIsEditMode(false);
  };

  const populateOrgForm = (org: Organization) => {
    setOrgForm({
      name: org.name || "",
      shortName: org.shortName || "",
      urlSlug: org.urlSlug || "",
      website: org.website || "",
      socialMedia: org.socialMedia || "",
      email: org.email || "",
      religiousAffiliation: org.religiousAffiliation || "",
      missionStatement: org.missionStatement || "",
      goals: org.goals || ""
    });
    setSelectedOrgId(org.id);
    setIsEditMode(true);
  };

  const populateEnsembleForm = (ensemble: Ensemble) => {
    setEnsembleForm({
      name: ensemble.name || "",
      shortName: ensemble.shortName || "",
      organizationId: ensemble.organizationId,
      organizationName: ensemble.organizationName || "",
      website: ensemble.website || "",
      director: ensemble.director || "",
      ageGroup: ensemble.ageGroup || "",
      voiceType: ensemble.voiceType || "",
      ensembleType: ensemble.ensembleType || "",
      location: ensemble.location || "",
      auditioned: ensemble.auditioned || "",
      payLevel: ensemble.payLevel || "",
      ageRestrictions: ensemble.ageRestrictions || "",
      otherRestrictions: ensemble.otherRestrictions || "",
      season: ensemble.season || "",
      rehearsalDetails: ensemble.rehearsalDetails || ""
    });
    setSelectedEnsembleId(ensemble.id);
    setIsEditMode(true);
  };

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/admin/status", {
        credentials: "include"
      });
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
    } catch (error) {
      console.error("Failed to check auth status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setPassword("");
        setMessage({ type: "success", text: "Login successful!" });
      } else {
        const data = await response.json();
        setMessage({ type: "error", text: data.message || "Login failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Login failed" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include"
      });
      setIsAuthenticated(false);
      setMessage({ type: "success", text: "Logged out successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Logout failed" });
    }
  };

  const handleOrgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditMode 
        ? `/api/admin/organizations/${selectedOrgId}`
        : "/api/admin/organizations";
      
      const method = isEditMode ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orgForm),
      });

      if (response.ok) {
        const action = isEditMode ? "updated" : "added";
        setMessage({ type: "success", text: `Organization ${action} successfully!` });
        resetOrgForm();
        // Refresh data
        window.location.reload();
      } else {
        const data = await response.json();
        const action = isEditMode ? "update" : "add";
        setMessage({ type: "error", text: data.message || `Failed to ${action} organization` });
      }
    } catch (error) {
      const action = isEditMode ? "updating" : "adding";
      setMessage({ type: "error", text: `Error ${action} organization` });
    }
  };

  const handleEnsembleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditMode 
        ? `/api/admin/ensembles/${selectedEnsembleId}`
        : "/api/admin/ensembles";
      
      const method = isEditMode ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(ensembleForm),
      });

      if (response.ok) {
        const action = isEditMode ? "updated" : "added";
        setMessage({ type: "success", text: `Ensemble ${action} successfully!` });
        resetEnsembleForm();
        // Refresh data
        window.location.reload();
      } else {
        const data = await response.json();
        const action = isEditMode ? "update" : "add";
        setMessage({ type: "error", text: data.message || `Failed to ${action} ensemble` });
      }
    } catch (error) {
      const action = isEditMode ? "updating" : "adding";
      setMessage({ type: "error", text: `Error ${action} ensemble` });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
        <Header />
        <div className="max-w-md mx-auto mt-20 p-6">
          <Card>
            <CardContent className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
        <Header />
        <div className="max-w-md mx-auto mt-20 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
              {message && (
                <Alert className={message.type === "error" ? "border-red-500" : "border-green-500"}>
                  {message.type === "error" ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
          <div className="flex space-x-4 mb-6">
            <Button
              variant={activeTab === "organization" ? "default" : "outline"}
              onClick={() => {
                setActiveTab("organization");
                resetOrgForm();
              }}
            >
              Organizations
            </Button>
            <Button
              variant={activeTab === "ensemble" ? "default" : "outline"}
              onClick={() => {
                setActiveTab("ensemble");
                resetEnsembleForm();
              }}
            >
              Ensembles
            </Button>
          </div>
        </div>

        {message && (
          <Alert className={`mb-6 ${message.type === "error" ? "border-red-500" : "border-green-500"}`}>
            {message.type === "error" ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {activeTab === "organization" ? (
          <Card>
            <CardHeader>
              <CardTitle>{isEditMode ? "Edit Organization" : "Add New Organization"}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Organization Selector */}
              <div className="mb-6">
                <Label htmlFor="orgSelector">Select Organization to Edit</Label>
                <Select
                  value={selectedOrgId}
                  onValueChange={(value) => {
                    if (value === "new") {
                      resetOrgForm();
                    } else {
                      const org = organizations.find(o => o.id === value);
                      if (org) {
                        populateOrgForm(org);
                      }
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an organization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">➕ Create New Organization</SelectItem>
                    {organizations
                      .sort((a, b) => (a.shortName || a.name).localeCompare(b.shortName || b.name))
                      .map((org) => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.shortName || org.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <form onSubmit={handleOrgSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={orgForm.name}
                      onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shortName">Short Name</Label>
                    <Input
                      id="shortName"
                      value={orgForm.shortName}
                      onChange={(e) => setOrgForm({ ...orgForm, shortName: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="missionStatement">Mission Statement</Label>
                  <Textarea
                    id="missionStatement"
                    value={orgForm.missionStatement}
                    onChange={(e) => setOrgForm({ ...orgForm, missionStatement: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="goals">Goals</Label>
                  <Textarea
                    id="goals"
                    value={orgForm.goals}
                    onChange={(e) => setOrgForm({ ...orgForm, goals: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orgForm.email}
                      onChange={(e) => setOrgForm({ ...orgForm, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={orgForm.website}
                      onChange={(e) => setOrgForm({ ...orgForm, website: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="socialMedia">Social Media</Label>
                    <Input
                      id="socialMedia"
                      type="url"
                      value={orgForm.socialMedia}
                      onChange={(e) => setOrgForm({ ...orgForm, socialMedia: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="urlSlug">URL Slug</Label>
                    <Input
                      id="urlSlug"
                      value={orgForm.urlSlug}
                      onChange={(e) => setOrgForm({ ...orgForm, urlSlug: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="religiousAffiliation">Religious Affiliation</Label>
                  <Select 
                    value={orgForm.religiousAffiliation} 
                    onValueChange={(value) => setOrgForm({ ...orgForm, religiousAffiliation: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select religious affiliation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Christian">Christian</SelectItem>
                      <SelectItem value="Catholic">Catholic</SelectItem>
                      <SelectItem value="Jewish">Jewish</SelectItem>
                      <SelectItem value="Muslim">Muslim</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="flex-1">
                    {isEditMode ? "Update Organization" : "Add Organization"}
                  </Button>
                  {isEditMode && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetOrgForm}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{isEditMode ? "Edit Ensemble" : "Add New Ensemble"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEnsembleSubmit} className="space-y-4">
                {/* Organization Selector - Must be selected first */}
                <div>
                  <Label htmlFor="organizationId">Organization *</Label>
                  <Select
                    value={ensembleForm.organizationId}
                    onValueChange={(value) => {
                      const selectedOrg = organizations.find(org => org.id === value);
                      setEnsembleForm({ 
                        ...ensembleForm, 
                        organizationId: value,
                        organizationName: selectedOrg?.name || ""
                      });
                      // Reset ensemble selection when organization changes
                      setSelectedEnsembleId("");
                      setIsEditMode(false);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizations.map((org) => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Ensemble Selector - Only shows after organization is selected */}
                {ensembleForm.organizationId && (
                  <div>
                    <Label htmlFor="ensembleSelector">Select Ensemble to Edit</Label>
                    <Select
                      value={selectedEnsembleId}
                      onValueChange={(value) => {
                        if (value === "new") {
                          resetEnsembleForm();
                          // Keep the selected organization
                          const selectedOrg = organizations.find(org => org.id === ensembleForm.organizationId);
                          setEnsembleForm(prev => ({
                            ...prev,
                            organizationId: ensembleForm.organizationId,
                            organizationName: selectedOrg?.name || ""
                          }));
                        } else {
                          const ensemble = ensembles.find(e => e.id === value);
                          if (ensemble) {
                            populateEnsembleForm(ensemble);
                          }
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an ensemble or create new" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">➕ Create New Ensemble</SelectItem>
                        {ensembles
                          .filter(ensemble => ensemble.organizationId === ensembleForm.organizationId)
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((ensemble) => (
                            <SelectItem key={ensemble.id} value={ensemble.id}>
                              {ensemble.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Form fields are disabled until organization is selected */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ensembleName">Name *</Label>
                    <Input
                      id="ensembleName"
                      value={ensembleForm.name}
                      onChange={(e) => setEnsembleForm({ ...ensembleForm, name: e.target.value })}
                      required
                      disabled={!ensembleForm.organizationId}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ensembleShortName">Short Name</Label>
                    <Input
                      id="ensembleShortName"
                      value={ensembleForm.shortName}
                      onChange={(e) => setEnsembleForm({ ...ensembleForm, shortName: e.target.value })}
                      disabled={!ensembleForm.organizationId}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ensembleType">Ensemble Type</Label>
                    <Select
                      value={ensembleForm.ensembleType}
                      onValueChange={(value) => setEnsembleForm({ ...ensembleForm, ensembleType: value })}
                      disabled={!ensembleForm.organizationId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select ensemble type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Chamber Choir">Chamber Choir</SelectItem>
                        <SelectItem value="Community Choir">Community Choir</SelectItem>
                        <SelectItem value="Gospel Choir">Gospel Choir</SelectItem>
                        <SelectItem value="Jazz Ensemble">Jazz Ensemble</SelectItem>
                        <SelectItem value="Youth Choir">Youth Choir</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="voiceType">Voice Type</Label>
                    <Select
                      value={ensembleForm.voiceType}
                      onValueChange={(value) => setEnsembleForm({ ...ensembleForm, voiceType: value })}
                      disabled={!ensembleForm.organizationId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select voice type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Child">Child</SelectItem>
                        <SelectItem value="SATB">SATB</SelectItem>
                        <SelectItem value="SA">SA</SelectItem>
                        <SelectItem value="TB">TB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="director">Director</Label>
                    <Input
                      id="director"
                      value={ensembleForm.director}
                      onChange={(e) => setEnsembleForm({ ...ensembleForm, director: e.target.value })}
                      disabled={!ensembleForm.organizationId}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ageGroup">Age Group</Label>
                    <Select
                      value={ensembleForm.ageGroup}
                      onValueChange={(value) => setEnsembleForm({ ...ensembleForm, ageGroup: value })}
                      disabled={!ensembleForm.organizationId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Adult">Adult</SelectItem>
                        <SelectItem value="Children">Children</SelectItem>
                        <SelectItem value="Youth">Youth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="auditioned">Auditioned</Label>
                    <Select
                      value={ensembleForm.auditioned}
                      onValueChange={(value) => setEnsembleForm({ ...ensembleForm, auditioned: value })}
                      disabled={!ensembleForm.organizationId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select audition status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="True">Yes</SelectItem>
                        <SelectItem value="False">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="payLevel">Pay Level</Label>
                    <Select
                      value={ensembleForm.payLevel}
                      onValueChange={(value) => setEnsembleForm({ ...ensembleForm, payLevel: value })}
                      disabled={!ensembleForm.organizationId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pay level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Volunteer">Volunteer</SelectItem>
                        <SelectItem value="Dues Required">Dues Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="season">Season</Label>
                    <Input
                      id="season"
                      value={ensembleForm.season}
                      onChange={(e) => setEnsembleForm({ ...ensembleForm, season: e.target.value })}
                      placeholder="e.g., September-June"
                      disabled={!ensembleForm.organizationId}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rehearsalDetails">Rehearsal Details</Label>
                    <Input
                      id="rehearsalDetails"
                      value={ensembleForm.rehearsalDetails}
                      onChange={(e) => setEnsembleForm({ ...ensembleForm, rehearsalDetails: e.target.value })}
                      placeholder="e.g., Sundays 2-4pm"
                      disabled={!ensembleForm.organizationId}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ageRestrictions">Age Restrictions</Label>
                    <Select
                      value={ensembleForm.ageRestrictions}
                      onValueChange={(value) => setEnsembleForm({ ...ensembleForm, ageRestrictions: value })}
                      disabled={!ensembleForm.organizationId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select age restrictions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="18+">18+</SelectItem>
                        <SelectItem value="21+">21+</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="otherRestrictions">Other Restrictions</Label>
                    <Select
                      value={ensembleForm.otherRestrictions}
                      onValueChange={(value) => setEnsembleForm({ ...ensembleForm, otherRestrictions: value })}
                      disabled={!ensembleForm.organizationId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select other restrictions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="Religious">Religious</SelectItem>
                        <SelectItem value="Gender">Gender</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ensembleWebsite">Website</Label>
                    <Input
                      id="ensembleWebsite"
                      type="url"
                      value={ensembleForm.website}
                      onChange={(e) => setEnsembleForm({ ...ensembleForm, website: e.target.value })}
                      disabled={!ensembleForm.organizationId}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={ensembleForm.location}
                      onChange={(e) => setEnsembleForm({ ...ensembleForm, location: e.target.value })}
                      disabled={!ensembleForm.organizationId}
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={!ensembleForm.organizationId}
                  >
                    {isEditMode ? "Update Ensemble" : "Add Ensemble"}
                  </Button>
                  {isEditMode && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetEnsembleForm}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        )}


      </div>

      <Footer />
    </div>
  );
}