import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Music, Search, User, Mail, ArrowRight, MessageCircle, Landmark, Users, Palette } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Organization, Ensemble } from "@shared/schema";

export default function Home() {
  const { data: organizations = [] } = useQuery<Organization[]>({
    queryKey: ["/api/organizations"],
  });

  const { data: ensembles = [] } = useQuery<Ensemble[]>({
    queryKey: ["/api/ensembles"],
  });

  // Calculate distinct ensemble types
  const distinctEnsembleTypes = new Set(ensembles.map(ensemble => ensemble.ensembleType).filter(Boolean)).size;

  return (
    <div className="min-h-screen bg-dark-bg text-gray-900 dark:text-dark-text">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-transparent">
        {/* Background Image - full width */}
        <div className="w-full">
          <img 
            src="/hero-background.jpg" 
            alt=""
            className="w-full h-auto"
          />
        </div>
        
        {/* Content Section - below the image */}
        <div className="bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Every Voice Deserves a <span className="text-gold">Home</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Our mission is to connect the choral community in Kansas City by offering a comprehensive directory of local ensembles. Whether you're a singer looking for an opportunity to make music, a director looking to expand your group, or a listener looking to support Kansas City's vibrant choral music scene, we aim to bridge that gap.
              </p>
                                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link href="/directory">
                            <Button size="lg" className="bg-gold hover:bg-gold-light text-white font-semibold px-8 py-3 transition-colors duration-200">
                              <Search className="mr-2 h-5 w-5" />
                              Browse Ensembles
                            </Button>
                          </Link>
                          <Link href="/contact">
                            <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white font-semibold px-8 py-3 transition-colors duration-200">
                              <Mail className="mr-2 h-5 w-5" />
                              Get in Touch
                            </Button>
                          </Link>
                        </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Landmark className="h-12 w-12 text-gray-900 dark:text-white mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{organizations.length}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Choral Organizations</h3>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-gray-900 dark:text-white mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{ensembles.length}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ensembles</h3>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Palette className="h-12 w-12 text-gray-900 dark:text-white mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{distinctEnsembleTypes}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ensemble Types</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* Kellyn Button Introduction */}
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Meet Your Choral Concierge
              </h2>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Kellyn Button
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                I started Local Vocal to help ensure that every singer's voice is heard. My goal is to nurture lifelong musicianship by guiding vocalists to ensembles that match their goals and fostering a community where music remains a priority through every stage of life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about">
                  <Button className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3">
                    <User className="mr-2 h-4 w-4" />
                    Learn More About Me
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="rounded-lg overflow-hidden shadow-lg w-4/5 max-w-md">
                <img 
                  src="/kellyn-headshot.jpg" 
                  alt="Kellyn Button - Choral Concierge"
                  className="w-full h-auto object-contain"
                  style={{ aspectRatio: '3/4' }}
                  onError={(e) => {
                    // Fallback to a styled placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center text-white" style="aspect-ratio: 3/4;">
                        <div class="text-center">
                          <svg class="h-16 w-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                          <h4 class="text-xl font-semibold">Kellyn Button</h4>
                          <p class="text-primary-light">Choral Concierge</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Ready to Get Started?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-200 hover:border-gold/30 group">
              <CardContent className="p-6 text-center flex flex-col h-full">
                <div className="flex-1">
                  <Search className="h-12 w-12 text-[#1B303C] mx-auto mb-4 group-hover:text-gold transition-colors duration-200" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Discover Ensembles</h3>
                  <p className="text-gray-600 dark:text-gray-200 mb-4">
                    Browse our comprehensive directory of choral groups across the metro area
                  </p>
                </div>
                <Link href="/directory">
                  <Button variant="outline" className="w-full group-hover:border-gold group-hover:text-gold transition-colors duration-200">
                    View Directory
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-200 hover:border-gold/30 group">
              <CardContent className="p-6 text-center flex flex-col h-full">
                <div className="flex-1">
                  <User className="h-12 w-12 text-[#1B303C] mx-auto mb-4 group-hover:text-gold transition-colors duration-200" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">About Local Vocal</h3>
                  <p className="text-gray-600 dark:text-gray-200 mb-4">
                    Learn about our mission and approach to connecting singers
                  </p>
                </div>
                <Link href="/about">
                  <Button variant="outline" className="w-full group-hover:border-gold group-hover:text-gold transition-colors duration-200">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-200 hover:border-gold/30 group">
              <CardContent className="p-6 text-center flex flex-col h-full">
                <div className="flex-1">
                  <Mail className="h-12 w-12 text-[#1B303C] mx-auto mb-4 group-hover:text-gold transition-colors duration-200" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ask the Expert</h3>
                  <p className="text-gray-600 dark:text-gray-200 mb-4">
                    Get personalized recommendations based on your interests
                  </p>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="w-full group-hover:border-gold group-hover:text-gold transition-colors duration-200">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
