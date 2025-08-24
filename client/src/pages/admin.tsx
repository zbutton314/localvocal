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
import { CheckCircle, AlertCircle, LogOut, ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import type { Organization, Ensemble } from "@shared/schema";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  const [selectedOrgId, setSelectedOrgId] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [expandedEnsembles, setExpandedEnsembles] = useState<Set<string>>(new Set());

  const [orgForm, setOrgForm] = useState({
    name: "",
    shortName: "",
    urlSlug: "",
    website: "",
    socialMedia: "",
    email: "",
    religiousAffiliation: "",
    missionStatement: ""
  });

  const [ensembles, setEnsembles] = useState<Array<{
    id: string;
    name: string;
    shortName: string;
    website: string;
    director: string;
    ageGroup: string;
    voiceType: string;
    ensembleType: string;
    location: string;
    auditioned: string;
    payLevel: string;
    ageRestrictions: string;
    otherRestrictions: string;
    season: string;
    rehearsalDetails: string;
    description: string;
    isNew?: boolean;
  }>>([]);

  const { data: organizations = [] } = useQuery<Organization[]>({
    queryKey: ["/api/organizations"],
  });

  const { data: allEnsembles = [] } = useQuery<Ensemble[]>({
    queryKey: ["/api/ensembles"],
  });

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

  const resetForm = () => {
    setSelectedOrgId("");
    setIsEditMode(false);
    setExpandedEnsembles(new Set());
    setOrgForm({
      name: "",
      shortName: "",
      urlSlug: "",
      website: "",
      socialMedia: "",
      email: "",
      religiousAffiliation: "",
      missionStatement: ""
    });
    setEnsembles([]);
  };

  const handleOrganizationChange = (orgId: string) => {
    if (orgId === "new") {
      // Create new organization
      resetForm();
      setSelectedOrgId("new");
      setIsEditMode(false);
    } else {
      // Edit existing organization
      const org = organizations.find(o => o.id === orgId);
      if (org) {
        setSelectedOrgId(orgId);
        setIsEditMode(true);
        setOrgForm({
          name: org.name || "",
          shortName: org.shortName || "",
          urlSlug: org.urlSlug || "",
          website: org.website || "",
          socialMedia: org.socialMedia || "",
          email: org.email || "",
          religiousAffiliation: org.religiousAffiliation || "",
          missionStatement: org.missionStatement || ""
        });
        
        // Load ensembles for this organization
        const orgEnsembles = allEnsembles.filter(e => e.organizationId === orgId);
        setEnsembles(orgEnsembles.map(e => ({
          id: e.id,
          name: e.name || "",
          shortName: e.shortName || "",
          website: e.website || "",
          director: e.director || "",
          ageGroup: e.ageGroup || "",
          voiceType: e.voiceType || "",
          ensembleType: e.ensembleType || "",
          location: e.location || "",
          auditioned: e.auditioned || "",
          payLevel: e.payLevel || "",
          ageRestrictions: e.ageRestrictions || "",
          otherRestrictions: e.otherRestrictions || "",
          season: e.season || "",
          rehearsalDetails: e.rehearsalDetails || "",
          description: e.description || ""
        })));
      }
    }
  };

  const addNewEnsemble = () => {
    const newEnsemble = {
      id: `new-${Date.now()}`,
      name: "",
      shortName: "",
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
      rehearsalDetails: "",
      description: "",
      isNew: true
    };
    setEnsembles([...ensembles, newEnsemble]);
    setExpandedEnsembles(new Set(Array.from(expandedEnsembles).concat(newEnsemble.id)));
  };

  const updateEnsemble = (id: string, updates: Partial<typeof ensembles[0]>) => {
    setEnsembles(ensembles.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const removeEnsemble = (id: string) => {
    setEnsembles(ensembles.filter(e => e.id !== id));
    const newExpanded = new Set(expandedEnsembles);
    newExpanded.delete(id);
    setExpandedEnsembles(newExpanded);
  };

  const toggleEnsembleExpanded = (id: string) => {
    const newExpanded = new Set(expandedEnsembles);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedEnsembles(newExpanded);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!orgForm.name.trim()) {
      setMessage({ type: "error", text: "Organization name is required" });
      return;
    }
    
    if (ensembles.length === 0) {
      setMessage({ type: "error", text: "At least one ensemble is required" });
      return;
    }

    try {
      if (isEditMode) {
        // Update existing organization
        const orgResponse = await fetch(`/api/admin/organizations/${selectedOrgId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(orgForm),
        });

        if (!orgResponse.ok) {
          throw new Error("Failed to update organization");
        }

        // Update existing ensembles and create new ones
        for (const ensemble of ensembles) {
          if (ensemble.isNew) {
            // Create new ensemble
            await fetch("/api/admin/ensembles", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                ...ensemble,
                organizationId: selectedOrgId,
                organizationName: orgForm.name
              }),
            });
          } else {
            // Update existing ensemble
            await fetch(`/api/admin/ensembles/${ensemble.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(ensemble),
            });
          }
        }

        setMessage({ type: "success", text: "Organization and ensembles updated successfully!" });
      } else {
        // Create new organization
        const orgResponse = await fetch("/api/admin/organizations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(orgForm),
        });

        if (!orgResponse.ok) {
          throw new Error("Failed to create organization");
        }

        const newOrg = await orgResponse.json();

        // Create ensembles
        for (const ensemble of ensembles) {
          await fetch("/api/admin/ensembles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              ...ensemble,
              organizationId: newOrg.id,
              organizationName: orgForm.name
            }),
          });
        }

        setMessage({ type: "success", text: "Organization and ensembles created successfully!" });
      }

      // Reset form after successful submission
      resetForm();
      
      // Refresh data
      window.location.reload();
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save organization and ensembles" });
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

        <Card>
          <CardHeader>
            <CardTitle>{isEditMode ? "Edit Organization" : "Add New Organization"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization Selector */}
              <div>
                <Label htmlFor="orgSelector">Select Organization</Label>
                <Select
                  value={selectedOrgId}
                  onValueChange={handleOrganizationChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an organization or create new" />
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

              {/* Organization Form - Only show if organization is selected */}
              {selectedOrgId && (
                <>
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

                  {/* Ensembles Section */}
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Ensembles</h3>
                      <Button
                        type="button"
                        onClick={addNewEnsemble}
                        className="flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add New Ensemble</span>
                      </Button>
                    </div>

                    {ensembles.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No ensembles yet. Click "Add New Ensemble" to get started.</p>
                    ) : (
                      <div className="space-y-4">
                        {ensembles.map((ensemble, index) => (
                          <Card key={ensemble.id} className="border-2">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleEnsembleExpanded(ensemble.id)}
                                  >
                                    {expandedEnsembles.has(ensemble.id) ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <span className="font-medium">
                                    {ensemble.name || `Ensemble ${index + 1}`}
                                  </span>
                                  {ensemble.isNew && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">New</span>
                                  )}
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeEnsemble(ensemble.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardHeader>
                            
                            {expandedEnsembles.has(ensemble.id) && (
                              <CardContent className="pt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor={`ensemble-name-${ensemble.id}`}>Name *</Label>
                                    <Input
                                      id={`ensemble-name-${ensemble.id}`}
                                      value={ensemble.name}
                                      onChange={(e) => updateEnsemble(ensemble.id, { name: e.target.value })}
                                      required
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`ensemble-shortName-${ensemble.id}`}>Short Name</Label>
                                    <Input
                                      id={`ensemble-shortName-${ensemble.id}`}
                                      value={ensemble.shortName}
                                      onChange={(e) => updateEnsemble(ensemble.id, { shortName: e.target.value })}
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor={`ensemble-type-${ensemble.id}`}>Ensemble Type</Label>
                                    <Select
                                      value={ensemble.ensembleType}
                                      onValueChange={(value) => updateEnsemble(ensemble.id, { ensembleType: value })}
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
                                    <Label htmlFor={`ensemble-voiceType-${ensemble.id}`}>Voice Type</Label>
                                    <Select
                                      value={ensemble.voiceType}
                                      onValueChange={(value) => updateEnsemble(ensemble.id, { voiceType: value })}
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
                                    <Label htmlFor={`ensemble-director-${ensemble.id}`}>Director</Label>
                                    <Input
                                      id={`ensemble-director-${ensemble.id}`}
                                      value={ensemble.director}
                                      onChange={(e) => updateEnsemble(ensemble.id, { director: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`ensemble-ageGroup-${ensemble.id}`}>Age Group</Label>
                                    <Select
                                      value={ensemble.ageGroup}
                                      onValueChange={(value) => updateEnsemble(ensemble.id, { ageGroup: value })}
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
                                    <Label htmlFor={`ensemble-auditioned-${ensemble.id}`}>Auditioned</Label>
                                    <Select
                                      value={ensemble.auditioned}
                                      onValueChange={(value) => updateEnsemble(ensemble.id, { auditioned: value })}
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
                                    <Label htmlFor={`ensemble-payLevel-${ensemble.id}`}>Pay Level</Label>
                                    <Select
                                      value={ensemble.payLevel}
                                      onValueChange={(value) => updateEnsemble(ensemble.id, { payLevel: value })}
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
                                    <Label htmlFor={`ensemble-season-${ensemble.id}`}>Season</Label>
                                    <Input
                                      id={`ensemble-season-${ensemble.id}`}
                                      value={ensemble.season}
                                      onChange={(e) => updateEnsemble(ensemble.id, { season: e.target.value })}
                                      placeholder="e.g., September-June"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`ensemble-rehearsalDetails-${ensemble.id}`}>Rehearsal Details</Label>
                                    <Input
                                      id={`ensemble-rehearsalDetails-${ensemble.id}`}
                                      value={ensemble.rehearsalDetails}
                                      onChange={(e) => updateEnsemble(ensemble.id, { rehearsalDetails: e.target.value })}
                                      placeholder="e.g., Sundays 2-4pm"
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor={`ensemble-ageRestrictions-${ensemble.id}`}>Age Restrictions</Label>
                                    <Select
                                      value={ensemble.ageRestrictions}
                                      onValueChange={(value) => updateEnsemble(ensemble.id, { ageRestrictions: value })}
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
                                    <Label htmlFor={`ensemble-otherRestrictions-${ensemble.id}`}>Other Restrictions</Label>
                                    <Select
                                      value={ensemble.otherRestrictions}
                                      onValueChange={(value) => updateEnsemble(ensemble.id, { otherRestrictions: value })}
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
                                    <Label htmlFor={`ensemble-website-${ensemble.id}`}>Website</Label>
                                    <Input
                                      id={`ensemble-website-${ensemble.id}`}
                                      type="url"
                                      value={ensemble.website}
                                      onChange={(e) => updateEnsemble(ensemble.id, { website: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`ensemble-location-${ensemble.id}`}>Location</Label>
                                    <Input
                                      id={`ensemble-location-${ensemble.id}`}
                                      value={ensemble.location}
                                      onChange={(e) => updateEnsemble(ensemble.id, { location: e.target.value })}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <Label htmlFor={`ensemble-description-${ensemble.id}`}>Description</Label>
                                  <Textarea
                                    id={`ensemble-description-${ensemble.id}`}
                                    value={ensemble.description}
                                    onChange={(e) => updateEnsemble(ensemble.id, { description: e.target.value })}
                                    rows={3}
                                  />
                                </div>
                              </CardContent>
                            )}
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex space-x-4 pt-6 border-t">
                    <Button type="submit" className="flex-1">
                      {isEditMode ? "Update Organization & Ensembles" : "Create Organization & Ensembles"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetForm}
                      className="flex-1"
                    >
                      Reset Form
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}