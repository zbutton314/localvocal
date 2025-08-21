import React, { useState } from 'react';
import { Header } from '../components/header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Plus, X, Info } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

interface Ensemble {
  id: string;
  name: string;
  director: string;
  genre: string;
  voiceType: string;
  ageGroup: string;
}

export default function SubmitGroup() {
  const [organizationName, setOrganizationName] = useState('');
  const [website, setWebsite] = useState('');
  const [missionStatement, setMissionStatement] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addEnsemble = () => {
    const newEnsemble: Ensemble = {
      id: Date.now().toString(),
      name: '',
      director: '',
      genre: '',
      voiceType: '',
      ageGroup: ''
    };
    setEnsembles([...ensembles, newEnsemble]);
  };

  const removeEnsemble = (id: string) => {
    setEnsembles(ensembles.filter(ensemble => ensemble.id !== id));
  };

  const updateEnsemble = (id: string, field: keyof Ensemble, value: string) => {
    setEnsembles(ensembles.map(ensemble => 
      ensemble.id === id ? { ...ensemble, [field]: value } : ensemble
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form
    setOrganizationName('');
    setWebsite('');
    setMissionStatement('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setEnsembles([]);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="bg-card">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-card-foreground mb-4">Thank You!</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Your submission has been received. We'll review the information and be in touch soon to confirm details and collect any additional information needed before listing your group on our site.
                </p>
                <Button onClick={() => setShowSuccess(false)} className="bg-gold hover:bg-gold-light">
                  Submit Another Group
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
      <Header />
      
      {/* Page Header */}
                    <section className="bg-gradient-to-r from-[#688799] to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Submit Your Group
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Improve your visibility by adding your organization and ensembles to the Local Vocal directory.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="mb-8 bg-card border-gold">
            <Info className="h-4 w-4 text-gold" />
            <AlertDescription className="text-card-foreground">
              We will review your submission and reach out with any clarifying questions before listing your group.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Organization Information */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Organization Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="orgName" className="text-card-foreground">Organization Name *</Label>
                    <Input
                      id="orgName"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      required
                      className="bg-background border-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-card-foreground">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder=""
                      className="bg-background border-input"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mission" className="text-card-foreground">Mission Statement *</Label>
                  <Textarea
                    id="mission"
                    value={missionStatement}
                    onChange={(e) => setMissionStatement(e.target.value)}
                    required
                    rows={4}
                    className="bg-background border-input"
                    placeholder="Describe your organization's mission and goals..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-card-foreground">Contact Name *</Label>
                    <Input
                      id="contactName"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                      className="bg-background border-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-card-foreground">Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                      className="bg-background border-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="text-card-foreground">Phone</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="bg-background border-input"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ensembles */}
            <Card className="bg-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-card-foreground">Ensembles</CardTitle>
                  <Button
                    type="button"
                    onClick={addEnsemble}
                    variant="outline"
                    className="border-gold text-gold hover:bg-gold hover:text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ensemble
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {ensembles.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No ensembles added yet.
                  </p>
                ) : (
                  ensembles.map((ensemble, index) => (
                    <div key={ensemble.id} className="border border-border rounded-lg p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-card-foreground">Ensemble {index + 1}</h3>
                        <Button
                          type="button"
                          onClick={() => removeEnsemble(ensemble.id)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-card-foreground">Ensemble Name *</Label>
                          <Input
                            value={ensemble.name}
                            onChange={(e) => updateEnsemble(ensemble.id, 'name', e.target.value)}
                            required
                            className="bg-background border-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-card-foreground">Director *</Label>
                          <Input
                            value={ensemble.director}
                            onChange={(e) => updateEnsemble(ensemble.id, 'director', e.target.value)}
                            required
                            className="bg-background border-input"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-card-foreground">Genre/Style</Label>
                          <Input
                            value={ensemble.genre}
                            onChange={(e) => updateEnsemble(ensemble.id, 'genre', e.target.value)}
                            placeholder="e.g., Classical, Jazz, Gospel"
                            className="bg-background border-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-card-foreground">Voice Type</Label>
                          <Input
                            value={ensemble.voiceType}
                            onChange={(e) => updateEnsemble(ensemble.id, 'voiceType', e.target.value)}
                            placeholder="e.g., SATB, SSA, TTBB"
                            className="bg-background border-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-card-foreground">Age Group</Label>
                          <Input
                            value={ensemble.ageGroup}
                            onChange={(e) => updateEnsemble(ensemble.id, 'ageGroup', e.target.value)}
                            placeholder="e.g., Adult, Youth, Mixed"
                            className="bg-background border-input"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold hover:bg-gold-light text-white px-8 py-3 text-lg"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Group'}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
